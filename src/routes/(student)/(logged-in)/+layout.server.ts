import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import type { LayoutServerLoad } from './$types';
import type { StudentLayoutQueryType } from '$lib/types';

export const load: LayoutServerLoad = async ({ locals: { supabase } }) => {
	const { data, error } = await supabase.rpc('student_layout_load');
	console.log(data, error?.message); // need proper logic matching for sections

	return {
		studentLayoutQ: (await supabase.rpc(
			'student_layout_load'
		)) as PostgrestSingleResponse<StudentLayoutQueryType>
	};
};
