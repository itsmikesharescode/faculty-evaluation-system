import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { addProfSchema, updateProfSchema, deleteProfSchema } from './admin-records-schema';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  return {
    addProfForm: await superValidate(zod(addProfSchema)),
    updateProfForm: await superValidate(zod(updateProfSchema)),
    deleteProfForm: await superValidate(zod(deleteProfSchema))
  };
};

export const actions: Actions = {
  addProfEvent: async ({ locals: { supabase }, request }) => {
    const form = await superValidate(request, zod(addProfSchema));

    if (!form.valid) return fail(400, { form });
    console.log(form.data);
    const { error } = await supabase.from('professor_list_tb').insert({
      fullname: form.data.profName,
      sections: form.data.sections,
      department: form.data.department,
      subjects: form.data.subjects
    });
    if (error) return fail(401, { form, msg: error.message });
    return { form, msg: 'Professor successfully added.' };
  },

  updateProfEvent: async ({ locals: { supabase }, request }) => {
    const form = await superValidate(request, zod(updateProfSchema));

    if (!form.valid) return fail(400, { form });
    const { error } = await supabase
      .from('professor_list_tb')
      .update({
        fullname: form.data.profName,
        sections: form.data.sections,
        department: form.data.department
      })
      .eq('id', form.data.profId);

    if (error) return fail(401, { form, msg: error.message });
    return { form, msg: 'Professor successfully updated.' };
  },

  deleteProfEvent: async ({ locals: { supabase }, request }) => {
    const form = await superValidate(request, zod(deleteProfSchema));

    if (!form.valid) return fail(400, { form });
    console.log(form.data);
    const { error } = await supabase
      .from('professor_list_tb')
      .delete()
      .eq('id', Number(form.data.profId));

    if (error) return fail(401, { form, msg: error.message });
    return { form, msg: 'Professor successfully deleted.' };
  }
};
