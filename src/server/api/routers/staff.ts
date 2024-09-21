import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

const isAuthorized = (role: string | undefined) =>
  role === "OWNER" || role === "MANAGER";

export const staffRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    if (!isAuthorized(ctx.session.user.role)) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You do not have permission to access staff information.",
      });
    }

    const staff = await ctx.db.restaurant
      .findUnique({
        where: { id: ctx.session.user.restaurantId },
      })
      .staff();

    return staff;
  }),

  removeStaff: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!isAuthorized(ctx.session.user.role)) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You do not have permission to remove staff.",
        });
      }

      const staffMember = await ctx.db.user.findUnique({
        where: { id: input.id },
      });

      if (
        !staffMember ||
        staffMember.restaurantId !== ctx.session.user.restaurantId
      ) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You do not have permission to remove this staff member.",
        });
      }

      await ctx.db.user.delete({
        where: { id: input.id },
      });

      return null;
    }),
});
