import type { SupabaseJwt } from '$lib/types';
import { createServerClient } from '@supabase/ssr';
import type { Session } from '@supabase/supabase-js';
import { type Handle, redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import jwt from 'jsonwebtoken';
import { adminPaths, studentPaths } from '$lib';

const supabaseUrl = import.meta.env.VITE_SB_URL;
const supabaseAnonKey = import.meta.env.VITE_ANON_KEY;
const supabaseAdminKey = import.meta.env.VITE_ADMIN_KEY;
const jwtSecret = import.meta.env.VITE_JWT_KEY;

const supabase: Handle = async ({ event, resolve }) => {
  /**
   * Creates a Supabase client specific to this server request.
   *
   * The Supabase client gets the Auth token from the request cookies.
   */
  event.locals.supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () => event.cookies.getAll(),
      /**
       * SvelteKit's cookies API requires `path` to be explicitly set in
       * the cookie options. Setting `path` to `/` replicates previous/
       * standard behavior.
       */
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          event.cookies.set(name, value, { ...options, path: '/' });
        });
      }
    }
  });

  event.locals.supabaseAdmin = createServerClient(supabaseUrl, supabaseAdminKey, {
    cookies: {
      getAll: () => event.cookies.getAll(),
      /**
       * SvelteKit's cookies API requires `path` to be explicitly set in
       * the cookie options. Setting `path` to `/` replicates previous/
       * standard behavior.
       */
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          event.cookies.set(name, value, { ...options, path: '/' });
        });
      }
    }
  });

  event.locals.safeGetSession = async () => {
    const {
      data: { session }
    } = await event.locals.supabase.auth.getSession();
    if (!session) {
      return { session: null, user: null };
    }

    const {
      data: { user },
      error
    } = await event.locals.supabase.auth.getUser();
    if (error) {
      // JWT validation has failed
      return { session: null, user: null };
    }

    return { session, user };
  };

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      /**
       * Supabase libraries use the `content-range` and `x-supabase-api-version`
       * headers, so we need to tell SvelteKit to pass it through.
       */
      return name === 'content-range' || name === 'x-supabase-api-version';
    }
  });

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      /**
       * Supabase libraries use the `content-range` and `x-supabase-api-version`
       * headers, so we need to tell SvelteKit to pass it through.
       */
      return name === 'content-range' || name === 'x-supabase-api-version';
    }
  });
};

const authGuard: Handle = async ({ event, resolve }) => {
  const { session, user } = await event.locals.safeGetSession();
  event.locals.session = session;
  event.locals.user = user;

  const path = event.url.pathname;

  if (user && path === '/') {
    const { role } = user.user_metadata;
    if (role === 'student') redirect(303, '/student-dashboard');
    else if (role === 'admin') redirect(303, '/admin-dashboard');
  }

  if (user && adminPaths.includes(path)) {
    const { role } = user.user_metadata;
    if (role !== 'admin') redirect(303, '/student-dashboard?warning=you-can-get-banned');
  } else if (!user && adminPaths.includes(path)) redirect(303, '/');

  if (user && studentPaths.includes(path)) {
    const { role } = user.user_metadata;
    if (role !== 'student') redirect(303, '/admin-dashboard?msg=admin-cant-view-this-route');
  } else if (!user && studentPaths.includes(path)) redirect(303, '/');

  if (user && ['/student-login', '/admin-login'].includes(path)) {
    const { role } = user.user_metadata;
    if (role === 'student') redirect(303, '/student-dashboard');
    else if (role === 'admin') redirect(303, '/admin-dashboard');
  }

  return resolve(event);
};

export const handle: Handle = sequence(supabase, authGuard);
