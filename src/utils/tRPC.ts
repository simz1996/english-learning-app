import { createTRPCNext } from '@trpc/next';
import { AppRouter } from '../pages/api/trpc/[trpc-endpoints]';

export const trpc = createTRPCNext<AppRouter>({
  config: () => ({
    url: '/api/trpc',
  }),
  ssr: false,
});
