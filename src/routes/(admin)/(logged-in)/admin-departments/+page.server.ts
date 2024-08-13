import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { addProfSchema, updateProfSchema } from './admin-departments-schema';
import { fail } from '@sveltejs/kit';
import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import type { ProfessorType } from '$lib/types';

export const load: PageServerLoad = async () => {
	return {
		addProfForm: await superValidate(zod(addProfSchema)),
		updateProfForm: await superValidate(zod(updateProfSchema))
	};
};

export const actions: Actions = {
	addProfEvent: async ({ locals: { supabase }, request }) => {
		const form = await superValidate(request, zod(addProfSchema));

		if (!form.valid) return fail(400, { form });

		const { data, error } = (await supabase.rpc('add_professor', {
			department_client: form.data.department,
			fullname_client: form.data.profName,
			sections_client: form.data.sections
		})) as PostgrestSingleResponse<ProfessorType[]>;

		if (error) return fail(401, { form, msg: error.message });
		return { form, msg: 'Success added professor', data };
	},

	updateProfEvent: async ({ locals: { supabase }, request }) => {
		const form = await superValidate(request, zod(updateProfSchema));

		if (!form.valid) return fail(400, { form });

		const { data, error } = (await supabase.rpc('update_professor', {
			department_client: form.data.department,
			fullname_client: form.data.profName,
			sections_client: form.data.sections,
			prof_id_client: form.data.profId
		})) as PostgrestSingleResponse<ProfessorType[]>;

		if (error) return fail(401, { form, msg: error.message });
		return { form, msg: 'Successfully updated.', data };
	},

	deleteProfEvent: async ({ locals: { supabase }, request }) => {
		const profId = (await request.formData()).get('profId') as string;

		const { data, error } = (await supabase.rpc('delete_professor', {
			prof_id_client: Number(profId)
		})) as PostgrestSingleResponse<ProfessorType[]>;

		if (error) return fail(401, { msg: error.message });
		return { msg: 'Success deleted a professor', data };
	}
};
