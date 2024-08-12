import type { EvaluationType } from '$lib/types';
import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals: { supabase }, request }) => {
	const { evaluation, evaluationTitle } = await request.json();

	const { data, error } = (await supabase.rpc('insert_question', {
		questions_client: evaluation,
		evaluation_title_client: evaluationTitle
	})) as PostgrestSingleResponse<EvaluationType[] | null>;

	if (error) return json({ msg: error.message }, { status: 401 });

	return json({ msg: 'Upload success', data });
};
