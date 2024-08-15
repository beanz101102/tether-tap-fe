import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const tapGameRouter = createTRPCRouter({
  getFriends: publicProcedure
    .input(
      z.object({
        userId: z.number(),
        page: z.number().min(1).default(1),
        limit: z.number().min(1).default(10),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { userId, page, limit } = input;
      const skip = (page - 1) * limit;

      const result = await ctx.db.$queryRaw`
      SELECT
      u.id,
      u.name as display_name,
      u.avatar as avatar_url,
      COALESCE(c.balance, 0) AS total_coins_earned,
      COALESCE((t.changed_amount), 0) AS changed_amount
      FROM
        referrals r
      JOIN
        users u ON r.user_id_referee = u.id
      LEFT JOIN
        tap_game_user_coins c ON r.user_id_referee = c.user_id
      LEFT JOIN
        tap_game_tracking_histories t ON t.user_id = r.user_id_referee AND t.action_reason = 'INVITED_BY_FRIEND'
      WHERE
        r.user_id_referer = ${userId}
      LIMIT ${limit} OFFSET ${skip}
`;

      return result;
    }),
  getMinePacks: publicProcedure
    .input(
      z.object({
        userId: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { userId } = input;

      const result: any[] = await ctx.db.$queryRaw`
      SELECT 
        mp.id AS pack_id,
        mp.name,
        mp.image,
        mp.cost,
        mp.upgraded_amt,
        mp.duration,
        mp.pack_type,
        ump.id AS user_pack_id,
        ump.end_time
      FROM 
        tap_tether_mine_pack_models mp
      LEFT JOIN 
        user_tap_tether_mine_pack_models ump ON mp.id = ump.mine_pack_id AND ump.user_id = ${userId}
      ORDER BY 
        mp.id ASC
      `;

      // Process the result to format it as needed
      const formattedResult = (result as unknown as any).map((pack: any) => ({
        id: pack.pack_id,
        name: pack.name,
        image: pack.image,
        cost: pack.cost.toString(), // Convert Decimal to string
        upgradedAmt: pack.upgraded_amt.toString(), // Convert Decimal to string
        duration: pack.duration,
        packType: pack.pack_type,
        isPurchased: pack.user_pack_id !== null && pack.end_time !== null && new Date(pack.end_time) > new Date(),
        userPackId: pack.user_pack_id,
        endTime: pack.end_time,
        isActive: pack.end_time ? new Date(pack.end_time) > new Date() : false,
      }));

      return formattedResult;
    }),
  getListTransactionHistory: publicProcedure
    .input(
      z.object({
        address: z.string(),
        status: z.enum(['deposit', 'withdraw', 'all']).default('deposit'), // Adding status input
        page: z.number().int().positive().default(1),
        pageSize: z.number().int().positive().default(10),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { address, status, page, pageSize } = input;

      const statusFilter =
        status === 'all' ? ['deposit', 'withdraw'] : [status];

      const whereCondition = status === 'all'
        ? {
          OR: [
            { from: address, type: { in: statusFilter } },
            { to: address, type: { in: statusFilter } },
          ],
        }
        : status === 'withdraw'
          ? { from: address, type: { in: statusFilter } }
          : { to: address, type: { in: statusFilter } };

      const [totalRecords, listTransactionHistory] = await Promise.all([
        ctx.db.transferTransactionHistory.count({
          where: whereCondition,
        }),
        ctx.db.transferTransactionHistory.findMany({
          where: whereCondition,
          skip: (page - 1) * pageSize,
          take: pageSize,
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            token: true,
          },
        })
      ]);

      const safeListTransactionHistory = listTransactionHistory.map(transaction => ({
        ...transaction,
        token: transaction.token || null,
      }));


      return {
        totalRecords,
        listTransactionHistory: safeListTransactionHistory,
        totalPages: Math.ceil(totalRecords / pageSize),
        currentPage: page,
      };
    })

});
