import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { studentLoginSchema } from './student-schema';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async () => {
	return {
		studentLoginForm: await superValidate(zod(studentLoginSchema))
	};
};
