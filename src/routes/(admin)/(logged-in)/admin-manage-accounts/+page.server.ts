import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import {
  createStudentSchema,
  updateStudEmailSchema,
  updateStudInfoSchema,
  updateStudPwdSchema
} from './admin-manage-accounts-schema';
import { fail } from '@sveltejs/kit';
import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import type { StudentType } from '$lib/types';

export const load: PageServerLoad = async () => {
  return {
    createStudentForm: await superValidate(zod(createStudentSchema)),
    updateStudEmailForm: await superValidate(zod(updateStudEmailSchema)),
    updateStudPwdForm: await superValidate(zod(updateStudPwdSchema)),
    updateStudInfoForm: await superValidate(zod(updateStudInfoSchema))
  };
};

export const actions: Actions = {
  createStudentAccEvent: async ({ locals: { supabaseAdmin }, request }) => {
    const form = await superValidate(request, zod(createStudentSchema));
    if (!form.valid) return fail(400, { form });

    const { error } = await supabaseAdmin.auth.admin.createUser({
      email: form.data.email,
      password: form.data.password,
      email_confirm: true,
      user_metadata: {
        role: 'student',
        email: form.data.email,
        id_number: form.data.idNumber,
        fullname: `${form.data.lastName},${form.data.firstName},${form.data.middleInitial},`,
        suffix: form.data.nameSuffix ? form.data.nameSuffix : null,
        gender: form.data.gender,
        year_level: form.data.yearLevel,
        course: form.data.course,
        section: form.data.sections,
        mobile_number: 'N/A',
        address: 'N/A'
      }
    });

    if (error) return fail(401, { form, msg: error.message });

    const { data, error: studentsError } = (await supabaseAdmin
      .from('student_list_tb')
      .select('*')) as PostgrestSingleResponse<StudentType[]>;

    if (studentsError) return fail(401, { form, msg: studentsError.message });

    return { form, msg: 'Account Created', data };
  },

  updateStudInfoEvent: async ({ locals: { supabaseAdmin }, request }) => {
    const form = await superValidate(request, zod(updateStudInfoSchema));

    if (!form.valid) return fail(400, { form });

    const { error } = await supabaseAdmin.auth.admin.updateUserById(form.data.studentId, {
      user_metadata: {
        id_number: form.data.idNumber,
        fullname: `${form.data.lastName},${form.data.firstName},${form.data.middleInitial},`,
        suffix: form.data.nameSuffix ? form.data.nameSuffix : null,
        gender: form.data.gender,
        year_level: form.data.yearLevel,
        course: form.data.course,
        section: form.data.sections
      }
    });

    if (error) return fail(401, { form, msg: error.message });

    const { data, error: studentsError } = (await supabaseAdmin
      .from('student_list_tb')
      .select('*')) as PostgrestSingleResponse<StudentType[]>;

    if (studentsError) return fail(401, { form, msg: studentsError.message });

    return { form, msg: 'User account updated.', data };
  },

  updateStudEmailEvent: async ({ locals: { supabaseAdmin }, request }) => {
    const form = await superValidate(request, zod(updateStudEmailSchema));

    if (!form.valid) return fail(400, { form });

    const { error } = await supabaseAdmin.auth.admin.updateUserById(form.data.studentId, {
      email: form.data.email,
      user_metadata: {
        email: form.data.email
      }
    });

    if (error) return fail(401, { form, msg: error.message });

    const { data, error: studentsError } = (await supabaseAdmin
      .from('student_list_tb')
      .select('*')) as PostgrestSingleResponse<StudentType[]>;

    if (studentsError) return fail(401, { form, msg: studentsError.message });

    return { form, msg: 'User email updated.', data };
  },

  updateStudPwdEvent: async ({ locals: { supabaseAdmin }, request }) => {
    const form = await superValidate(request, zod(updateStudPwdSchema));

    if (!form.valid) return fail(400, { form });
    const { error } = await supabaseAdmin.auth.admin.updateUserById(form.data.studentId, {
      password: form.data.newPwd
    });

    if (error) return fail(401, { form, msg: error.message });

    const { data, error: studentsError } = (await supabaseAdmin
      .from('student_list_tb')
      .select('*')) as PostgrestSingleResponse<StudentType[]>;

    if (studentsError) return fail(401, { form, msg: studentsError.message });

    return { form, msg: 'User password updated.', data };
  },

  deleteAccountEvent: async ({ locals: { supabaseAdmin }, request }) => {
    const studentId = (await request.formData()).get('studentId') as string;

    const { error } = await supabaseAdmin.auth.admin.deleteUser(studentId);

    if (error) return fail(401, { msg: error.message });

    const { data, error: studentsError } = (await supabaseAdmin
      .from('student_list_tb')
      .select('*')) as PostgrestSingleResponse<StudentType[]>;

    if (studentsError) return fail(401, { msg: studentsError.message });

    return { msg: 'Account Deleted', data };
  }
};
