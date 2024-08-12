import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { supabase } }) => {
	return {
		questions: await supabase.from('evaluation_list_tb').select('*')
	};
};
