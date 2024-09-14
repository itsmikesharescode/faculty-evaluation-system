import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { studentCreateSchema, studentForgotPwdSchema, studentLoginSchema } from './student-schema';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  return {
    studentLoginForm: await superValidate(zod(studentLoginSchema)),
    studentCreateForm: await superValidate(zod(studentCreateSchema)),
    studentForgotPwdForm: await superValidate(zod(studentForgotPwdSchema))
  };
};

export const actions: Actions = {
  studentLoginEvent: async ({ locals: { supabase }, request }) => {
    const form = await superValidate(request, zod(studentLoginSchema));

    if (!form.valid) return fail(400, { form });

    const {
      data: { user },
      error
    } = await supabase.auth.signInWithPassword({
      email: form.data.email,
      password: form.data.password
    });

    if (error) return fail(401, { form, msg: error.message });
    else if (user) return { form, msg: 'Welcome back!', user };
  },

  studentRegisterEvent: async ({ locals: { supabase }, request }) => {
    const form = await superValidate(request, zod(studentCreateSchema));
    if (!form.valid) return fail(400, { form });

    const {
      data: { user },
      error
    } = await supabase.auth.signUp({
      email: form.data.email,
      password: form.data.password,
      options: {
        data: {
          role: 'student',
          email: form.data.email,
          id_number: form.data.idNumber,
          fullname: `${form.data.lastName},${form.data.firstName},${form.data.middleInitial},`,
          suffix: form.data.nameSuffix ? form.data.nameSuffix : null,
          gender: form.data.gender,
          year_level: form.data.yearLevel,
          course: form.data.course,
          section: form.data.sections,
          mobile_number: null,
          address: null
        }
      }
    });

    if (error) return fail(401, { form, msg: error.message });
    else if (user) return { form, msg: 'Account created.', user };
  },

  studentForgotPwdEvent: async ({ locals: { supabase }, request }) => {
    const form = await superValidate(request, zod(studentForgotPwdSchema));
    if (!form.valid) return fail(400, { form });

    const { error } = await supabase.auth.resetPasswordForEmail(form.data.email);

    if (error) return fail(401, { form, msg: error.message });
    return {
      form,
      msg: `An email containing a password reset link has been sent to your email ${form.data.email}`
    };
  }
};
