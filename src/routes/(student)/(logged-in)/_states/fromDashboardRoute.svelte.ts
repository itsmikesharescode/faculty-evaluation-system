import type { EvaluationType, ProfessorType } from '$lib/types';
import { getContext, setContext } from 'svelte';

class DashboardRoute {
	private evaluationForms = $state<EvaluationType[] | null>(null);

	setEvals(param: EvaluationType[] | null) {
		this.evaluationForms = param;
	}

	getEvals() {
		return this.evaluationForms;
	}

	private professors = $state<ProfessorType[] | null>(null);
	private activeProf = $state<ProfessorType | null>(null);

	setProfs(param: ProfessorType[] | null) {
		this.professors = param;
	}

	getProfs() {
		return this.professors;
	}

	setActiveProf(param: ProfessorType | null) {
		this.activeProf = param;
	}

	getActiveProf() {
		return this.activeProf;
	}
}

const DASHBOARD_ROUTE_KEY = Symbol('dashboardRouteKey');

export const initDashboardRoute = () => {
	return setContext(DASHBOARD_ROUTE_KEY, new DashboardRoute());
};

export const fromDashboardRouteState = () => {
	return getContext<ReturnType<typeof initDashboardRoute>>(DASHBOARD_ROUTE_KEY);
};
