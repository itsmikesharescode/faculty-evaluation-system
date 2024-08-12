import type { SupabaseClient } from '@supabase/supabase-js';
import { getContext, setContext } from 'svelte';

class SupabaseState {
	private supabase = $state<SupabaseClient | null>(null);

	setClient(param: SupabaseClient | null) {
		this.supabase = param;
	}

	getClient() {
		return this.supabase;
	}
}

const SUPA_KEY = Symbol('supabaseClient');

export const initSupabase = () => {
	return setContext(SUPA_KEY, new SupabaseState());
};

export const fromSupabaseClient = () => {
	return getContext<ReturnType<typeof initSupabase>>(SUPA_KEY);
};
