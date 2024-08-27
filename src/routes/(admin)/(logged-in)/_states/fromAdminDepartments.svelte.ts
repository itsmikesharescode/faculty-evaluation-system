import type { ProfessorType } from '$lib/types';
import { getContext, setContext } from 'svelte';

export const departments = ['BSIS', 'BSE', 'BTVTED', 'DOMT', 'DICT'];

class DepartmentsRoute {
	private professors = $state<ProfessorType[] | null>(null);

	setProfs(param: ProfessorType[] | null) {
		this.professors = param;
	}

	getProfs() {
		return this.professors;
	}
}

const DEPARTMENT_KEY = Symbol('departmentRouteKey');

export const initDepartmentsRoute = () => {
	return setContext(DEPARTMENT_KEY, new DepartmentsRoute());
};

export const fromDepartmentsRouteState = () => {
	return getContext<ReturnType<typeof initDepartmentsRoute>>(DEPARTMENT_KEY);
};
