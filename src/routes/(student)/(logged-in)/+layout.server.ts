import type { PostgrestSingleResponse } from '@supabase/supabase-js';
import type { LayoutServerLoad } from './$types';
import type { StudentLayoutQueryType } from '$lib/types';

export const load: LayoutServerLoad = async ({ locals: { supabase } }) => {
  const studentLayout = async () => {
    const { data, error } = (await supabase.rpc(
      'student_layout_load'
    )) as PostgrestSingleResponse<StudentLayoutQueryType>;

    if (error) return null;
    return data;
  };

  return {
    studentLayoutQ: await studentLayout()
  };
};
