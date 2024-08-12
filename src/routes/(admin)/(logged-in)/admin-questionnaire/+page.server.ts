import type { PostgrestMaybeSingleResponse } from '@supabase/supabase-js';
import type { Actions, PageServerLoad } from './$types';
import type { EvaluationType } from '$lib/types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({}) => {};

export const actions: Actions = {
	useEvalEvent: async ({ locals: { supabase }, request }) => {
		const evalId = (await request.formData()).get('evalId');

		const { data, error } = (await supabase.rpc('use_eval_form', {
			eval_form_id_client: Number(evalId)
		})) as PostgrestMaybeSingleResponse<EvaluationType[]>;

		if (error) return fail(401, { msg: error.message });

		return {
			msg: 'Success',
			data
		};
	}
};
