import type { User } from '@supabase/supabase-js';
import { getContext, setContext } from 'svelte';

class UserState {
	private user = $state<User | null>(null);

	setUser(param: User | null) {
		this.user = param;
	}

	getUser() {
		return this.user;
	}
}

const USER_KEY = Symbol('userMedium');

export const initUser = () => {
	return setContext(USER_KEY, new UserState());
};

export const fromUserState = () => {
	return getContext<ReturnType<typeof initUser>>(USER_KEY);
};
