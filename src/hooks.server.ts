import { createServerClient } from '@supabase/ssr';
import { type Handle, redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { adminPaths, studentPaths } from '$lib';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { PRIVATE_SUPABASE_ADMIN_KEY } from '$env/static/private';

const supabase: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => event.cookies.getAll(),

      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          event.cookies.set(name, value, { ...options, path: '/' });
        });
      }
    }
  });

  event.locals.supabaseAdmin = createServerClient(PUBLIC_SUPABASE_URL, PRIVATE_SUPABASE_ADMIN_KEY, {
    cookies: {
      getAll: () => event.cookies.getAll(),

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
      return { session: null, user: null };
    }

    return { session, user };
  };

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
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
