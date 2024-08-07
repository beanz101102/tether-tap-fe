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

      const result = await ctx.db.$queryRaw`
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
        tap_tether_mine_packs mp
      LEFT JOIN 
        user_tap_tether_mine_packs ump ON mp.id = ump.mine_pack_id AND ump.user_id = ${userId}
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
        isPurchased: pack.user_pack_id !== null,
        userPackId: pack.user_pack_id,
        endTime: pack.end_time,
        isActive: pack.end_time ? new Date(pack.end_time) > new Date() : false,
      }));

      return formattedResult;
    }),
});
