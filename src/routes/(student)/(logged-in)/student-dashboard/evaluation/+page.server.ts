import type { ProfessorType } from '$lib/types';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

interface ParsedAnsType {
	headerTitle: string;
	sum: number;
	length: number;
	percentage: number;
}

export const actions: Actions = {
	submitAnsEvent: async ({ locals: { supabase, user }, request }) => {
		const formData = await request.formData();
		const answersArr = JSON.parse(formData.get('answersArr') as string) as ParsedAnsType[] | null;
		const profObj = JSON.parse(formData.get('profObj') as string) as ProfessorType | null;
		if (answersArr && profObj && user) {
			const { error } = await supabase.from('evaluated_list_tb').insert([
				{
					student_id: user.id,
					professor_id: profObj.id,
					answers_copy: answersArr
				}
			]);

			if (error) return fail(401, { msg: error.message });
			return { msg: `You have successfully evaluated professor ${profObj.fullname}` };
		}
	}
};
