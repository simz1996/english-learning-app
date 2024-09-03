import { createRouter } from '@trpc/server';
import { z } from 'zod';

export const userRouter = createRouter()
  .query('getUser', {
    input: z.number(),
    resolve: async ({ input }) => {
      // Fetch user data from the database
    },
  })
  .mutation('updateProgress', {
    input: z.object({
      userId: z.number(),
      score: z.number(),
    }),
    resolve: async ({ input }) => {
      // Update user progress in the database
    },
  });
