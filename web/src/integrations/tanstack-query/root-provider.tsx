import { QueryClient } from '@tanstack/react-query'
import pocketbaseClient from '../pocketbase/client';

export function getContext() {
  const queryClient = new QueryClient();
  const pb = pocketbaseClient();

  return {
    queryClient,
    pb
  }
}
export default function TanstackQueryProvider() {}
