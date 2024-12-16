import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import type { LayoutServerLoad } from './$types';
import type { AdminLayoutQueryType } from '$lib/types';

export const load: LayoutServerLoad = async ({ locals: { supabase } }) => {
  const adminLayoutQ = async () => {
    const { data, error } = (await supabase.rpc(
      'admin_layout_load'
    )) as PostgrestSingleResponse<AdminLayoutQueryType>;
    if (error) return null;
    return data;
  };

  return {
    adminLayoutQ: await adminLayoutQ()
  };
};
