import type { AdminLayoutQueryType, ProfessorType } from '$lib/types';
import { getContext, setContext } from 'svelte';

export const departments = ['BSIS', 'BSE', 'BTVTED', 'DOMT', 'DICT'];

class DepartmentsRoute {
	private professors = $state<AdminLayoutQueryType['professors'] | null>(null);

	setProfs(param: AdminLayoutQueryType['professors'] | null) {
		this.professors = param;
	}

	getProfs() {
		return this.professors;
	}

	setDepProf(param: ProfessorType[], dep: 'BSIS' | 'BSE' | 'BTVTED' | 'DOMT' | 'DICT') {
		if (this.professors) {
			if (dep === 'BSIS') this.professors.bsisDep = param;
			else if (dep === 'BSE') this.professors.bseDep = param;
			else if (dep === 'BTVTED') this.professors.btvtedDep = param;
			else if (dep === 'DICT') this.professors.dictDep = param;
			else if (dep === 'DOMT') this.professors.domtDep = param;
		}
	}

	getDepProf(dep: 'BSIS' | 'BSE' | 'BTVTED' | 'DOMT' | 'DICT') {
		if (dep === 'BSIS') return this.professors?.bsisDep;
		else if (dep === 'BSE') return this.professors?.bseDep;
		else if (dep === 'BTVTED') return this.professors?.btvtedDep;
		else if (dep === 'DICT') return this.professors?.dictDep;
		else if (dep === 'DOMT') return this.professors?.domtDep;
	}
}

const DEPARTMENT_KEY = Symbol('departmentRouteKey');

export const initDepartmentsRoute = () => {
	return setContext(DEPARTMENT_KEY, new DepartmentsRoute());
};

export const fromDepartmentsRouteState = () => {
	return getContext<ReturnType<typeof initDepartmentsRoute>>(DEPARTMENT_KEY);
};
