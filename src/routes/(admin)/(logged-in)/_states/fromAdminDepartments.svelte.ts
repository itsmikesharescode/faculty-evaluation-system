import type { ProfessorType } from '$lib/types';
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

	private professors = $state<ProfessorType[] | null>(null);
	private activeProf = $state<ProfessorType | null>(null);

	setProfs(param: ProfessorType[] | null) {
		this.professors = param;
	}

	getProfs() {
		return this.professors;
	}

	setActive(param: ProfessorType | null) {
		this.activeProf = param;
	}

	getActive() {
		return this.activeProf;
	}
}

const DEPARTMENT_KEY = Symbol('departmentRouteKey');

export const initDepartmentsRoute = () => {
	return setContext(DEPARTMENT_KEY, new DepartmentsRoute());
};

export const fromDepartmentsRouteState = () => {
	return getContext<ReturnType<typeof initDepartmentsRoute>>(DEPARTMENT_KEY);
};
