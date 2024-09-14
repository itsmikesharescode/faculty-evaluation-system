import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import {
  updatePwdSchema,
  updateAccInfoSchema,
  updateEmailSchema
} from './student-manage-account-schema';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  return {
    updateAccInfoForm: await superValidate(zod(updateAccInfoSchema)),
    updateEmailForm: await superValidate(zod(updateEmailSchema)),
    updatePwdForm: await superValidate(zod(updatePwdSchema))
  };
};

export const actions: Actions = {
  updateAccountEvent: async ({ locals: { supabase }, request }) => {
    const form = await superValidate(request, zod(updateAccInfoSchema));

    if (!form.valid) return fail(400, { form });

    const {
      data: { user },
      error
    } = await supabase.auth.updateUser({
      data: {
        role: 'student',
        fullname: `${form.data.lastName},${form.data.firstName},${form.data.middleInitial},`,
        suffix: form.data.nameSuffix ? form.data.nameSuffix : null,
        year_level: form.data.yearLevel,
        course: form.data.course,
        section: form.data.sections,
        mobile_number: form.data.contactNumber,
        address: form.data.address
      }
    });

    if (error) return fail(401, { form, msg: error.message });
    else if (user) return { form, msg: 'Update successfully.' };
  },

  updatePasswordEvent: async ({ locals: { supabase }, request }) => {
    const form = await superValidate(request, zod(updatePwdSchema));

    if (!form.valid) return fail(400, { form });

    const {
      data: { user },
      error
    } = await supabase.auth.updateUser({
      password: form.data.newPwd
    });

    if (error) return fail(401, { form, msg: error.message });
    else if (user) return { form, msg: 'Password updated successfully.', user };
  },

  updateEmailEvent: async ({ locals: { supabase }, request }) => {
    const form = await superValidate(request, zod(updateEmailSchema));
    if (!form.valid) return fail(400, { form });

    const {
      data: { user },
      error
    } = await supabase.auth.updateUser({
      email: form.data.newEmail
    });

    if (error) return fail(401, { form, msg: error.message });
    else if (user)
      return {
        form,
        msg: `We have sent an confirmation link to your new email ${form.data.newEmail}`,
        user
      };
  }
};
