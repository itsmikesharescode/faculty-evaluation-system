import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import type { LayoutServerLoad } from './$types';
import type { StudentLayoutQueryType } from '$lib/types';

export const load: LayoutServerLoad = async ({ locals: { supabase } }) => {
	return {
		studentLayoutQ: (await supabase.rpc(
			'student_layout_load'
		)) as PostgrestSingleResponse<StudentLayoutQueryType>
	};
};
