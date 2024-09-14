import { getContext, setContext } from 'svelte';

class AdminRoute {
  private route = $state('');

  setRoute(param: string) {
    this.route = param;
  }

  getRoute() {
    return this.route;
  }
}

const STUDENT_ROUTE_KEY = Symbol('adminRoute');

export const initAdminRoute = () => {
  return setContext(STUDENT_ROUTE_KEY, new AdminRoute());
};

export const fromAdminRouteState = () => {
  return getContext<ReturnType<typeof initAdminRoute>>(STUDENT_ROUTE_KEY);
};
