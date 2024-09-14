import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {};

export const actions: Actions = {
  uploadEvaluationEvent: async ({ locals: { supabase }, request }) => {
    const { evaluation } = await request.json();

    return { msg: 'test' };
  }
};
