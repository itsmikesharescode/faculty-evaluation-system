import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import type { LayoutServerLoad } from './$types';
import type { AdminLayoutQueryType } from '$lib/types';

export const load: LayoutServerLoad = async ({ locals: { supabase } }) => {
	const { data, error } = await supabase.rpc('admin_layout_load');
	console.log(data, error?.message);

	return {
		adminLayoutQ: (await supabase.rpc(
			'admin_layout_load'
		)) as PostgrestSingleResponse<AdminLayoutQueryType>
	};
};
