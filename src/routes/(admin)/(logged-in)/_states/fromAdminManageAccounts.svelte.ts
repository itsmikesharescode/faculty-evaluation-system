import type { StudentType } from '$lib/types';
import { getContext, setContext } from 'svelte';

class ManageAccountRoute {
  private students = $state<StudentType[] | null>(null);

  setStudents(param: StudentType[] | null) {
    this.students = param;
  }

  getStudents() {
    return this.students;
  }
}

const MANAGE_ACCOUNT_ROUTE_KEY = Symbol('manageAccountRoute');

export const initManageAccountRoute = () => {
  return setContext(MANAGE_ACCOUNT_ROUTE_KEY, new ManageAccountRoute());
};

export const fromManageAccountRouteState = () => {
  return getContext<ReturnType<typeof initManageAccountRoute>>(MANAGE_ACCOUNT_ROUTE_KEY);
};
