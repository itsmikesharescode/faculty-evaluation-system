import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { addProfSchema } from './admin-departments-schema';
import { fail } from '@sveltejs/kit';
import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import type { ProfessorType } from '$lib/types';

export const load: PageServerLoad = async () => {
	return {
		addProfForm: await superValidate(zod(addProfSchema))
	};
};

export const actions: Actions = {
	addProfEvent: async ({ locals: { supabase }, request }) => {
		const form = await superValidate(request, zod(addProfSchema));

		if (!form.valid) return fail(400, { form });

		const { data, error } = (await supabase.rpc('add_professor', {
			fullname_client: form.data.profName,
			sections_client: form.data.sections
		})) as PostgrestSingleResponse<ProfessorType[]>;

		if (error) return fail(401, { form, msg: error.message });
		return { form, msg: 'Success added professor', data };
	}
};
