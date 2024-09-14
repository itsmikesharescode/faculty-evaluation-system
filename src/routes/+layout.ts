import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr';
import type { LayoutLoad } from './$types';

const supabaseUrl = import.meta.env.VITE_SB_URL;
const supabaseAnonKey = import.meta.env.VITE_ANON_KEY;

export const load: LayoutLoad = async ({ data, depends, fetch }) => {
  /**
   * Declare a dependency so the layout can be invalidated, for example, on
   * session refresh.
   */
  depends('supabase:auth');

  const supabase = isBrowser()
    ? createBrowserClient(supabaseUrl, supabaseAnonKey, {
        global: {
          fetch
        }
      })
    : createServerClient(supabaseUrl, supabaseAnonKey, {
        global: {
          fetch
        },
        cookies: {
          getAll() {
            return data.cookies;
          }
        }
      });

  /**
   * It's fine to use `getSession` here, because on the client, `getSession` is
   * safe, and on the server, it reads `session` from the `LayoutData`, which
   * safely checked the session using `safeGetSession`.
   */
  const {
    data: { session }
  } = await supabase.auth.getSession();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return { session, supabase, user };
};
