import type { EvaluationType } from '$lib/types';
import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import { json, type RequestHandler } from '@sveltejs/kit';
import type { SurveyCreationSchema } from './create-questions-schema';

export const POST: RequestHandler = async ({ locals: { supabase }, request }) => {
	const surveyQuestions = (await request.json()) as SurveyCreationSchema | null;

	if (surveyQuestions) {
		const { data, error } = (await supabase.rpc('insert_question', {
			evaluation_data_client: surveyQuestions
		})) as PostgrestSingleResponse<EvaluationType[]>;

		if (error) return json({ msg: error.message }, { status: 401 });

		return json({ msg: 'Evaluation Form Created.', data });
	}

	return json({ msg: 'Upload success' });
};
