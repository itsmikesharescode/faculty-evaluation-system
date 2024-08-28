import type { ProfessorType } from '$lib/types';
import type { Actions } from './$types';
import type { AnswerType } from './_helpers/answerFormatter';

export const actions: Actions = {
	submitAnsEvent: async ({ locals: { supabase }, request }) => {
		const formData = await request.formData();
		const answersArr = JSON.parse(formData.get('answersArr') as string) as AnswerType[];
		const profObj = JSON.parse(formData.get('profObj') as string) as ProfessorType;
	}
};
