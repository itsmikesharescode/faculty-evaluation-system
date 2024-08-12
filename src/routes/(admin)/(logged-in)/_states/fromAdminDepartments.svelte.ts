import { getContext, setContext } from 'svelte';

export const departments = ['BSIS', 'BSE', 'BTVTED', 'OMT', 'DICT'];

class DepartmentsRoute {
	private activeRoute = $state(departments[0]);

	setRoute(param: string) {
		this.activeRoute = param;
	}

	getRoute() {
		return this.activeRoute;
	}
}

const DEPARTMENT_KEY = Symbol('departmentRouteKey');

export const initDepartmentsRoute = () => {
	return setContext(DEPARTMENT_KEY, new DepartmentsRoute());
};

export const fromDepartmentsRouteState = () => {
	return getContext<ReturnType<typeof initDepartmentsRoute>>(DEPARTMENT_KEY);
};
