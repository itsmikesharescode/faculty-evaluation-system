import { getContext, setContext } from 'svelte';

export const departments = ['BSIS', 'BSE', 'BTVTED', 'DOMT', 'DICT'];

class DepRouteState {
	private route = $state<string>(departments[0]);

	setRoute(param: string) {
		this.route = param;
	}

	getRoute() {
		return this.route;
	}
}

const DEP_ROUTE_STATE_KEY = Symbol('depRouteStateKey');

export const initDepRouteState = () => {
	return setContext(DEP_ROUTE_STATE_KEY, new DepRouteState());
};

export const fromDepRouteState = () => {
	return getContext<ReturnType<typeof initDepRouteState>>(DEP_ROUTE_STATE_KEY);
};
