import { getContext, setContext } from 'svelte';

class StudentRoute {
	private route = $state('');

	setRoute(param: string) {
		this.route = param;
	}

	getRoute() {
		return this.route;
	}
}

const STUDENT_ROUTE_KEY = Symbol('studentRoute');

export const initStudentRoute = () => {
	return setContext(STUDENT_ROUTE_KEY, new StudentRoute());
};

export const fromStudentRouteState = () => {
	return getContext<ReturnType<typeof initStudentRoute>>(STUDENT_ROUTE_KEY);
};
