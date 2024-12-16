import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import {
  createProgramSchema,
  updateProgramSchema,
  deleteProgramSchema
} from './admin-programs-schema';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  return {
    createProgramForm: await superValidate(zod(createProgramSchema)),
    updateProgramForm: await superValidate(zod(updateProgramSchema)),
    deleteProgramForm: await superValidate(zod(deleteProgramSchema))
  };
};

export const actions: Actions = {
  createProgramEvent: async ({ locals: { supabase }, request }) => {
    const form = await superValidate(request, zod(createProgramSchema));
    if (!form.valid) return fail(400, { form });
    const { error } = await supabase.from('programs_tb').insert({
      name: form.data.name,
      code: form.data.code
    });

    if (error) return fail(401, { form, msg: error.message });
    return { form, msg: 'Program successfully created.' };
  },

  updateProgramEvent: async ({ locals: { supabase }, request }) => {
    const form = await superValidate(request, zod(updateProgramSchema));
    if (!form.valid) return fail(400, { form });
    const { error } = await supabase
      .from('programs_tb')
      .update({
        name: form.data.name,
        code: form.data.code
      })
      .eq('id', Number(form.data.id));

    if (error) return fail(401, { form, msg: error.message });
    return { form, msg: 'Program sucessfully updated.' };
  },

  deleteProgramEvent: async ({ locals: { supabase }, request }) => {
    const form = await superValidate(request, zod(deleteProgramSchema));
    if (!form.valid) return fail(400, { form });
    const { error } = await supabase.from('programs_tb').delete().eq('id', Number(form.data.id));

    if (error) return fail(401, { form, msg: error.message });
    return { form, msg: 'Program successfully deleted.' };
  }
};
