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
});
