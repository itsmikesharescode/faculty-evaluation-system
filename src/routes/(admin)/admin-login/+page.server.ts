import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { adminLoginSchema } from './admin-schema';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  return {
    adminLoginForm: await superValidate(zod(adminLoginSchema))
  };
};

export const actions: Actions = {
  adminLoginEvent: async ({ locals: { supabase }, request }) => {
    const form = await superValidate(request, zod(adminLoginSchema));

    if (!form.valid) return fail(400, { form });
    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.data.email,
      password: form.data.password
    });

    if (error) return fail(401, { form, msg: error.message });
    if (data.user) return { form, msg: 'Welcome back!', user: data.user };
  }
};
