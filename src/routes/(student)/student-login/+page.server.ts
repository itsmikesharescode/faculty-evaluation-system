import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { studentCreateSchema, studentForgotPwdSchema, studentLoginSchema } from './student-schema';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async () => {
	return {
		studentLoginForm: await superValidate(zod(studentLoginSchema)),
		studentCreateForm: await superValidate(zod(studentCreateSchema)),
		studentForgotPwdForm: await superValidate(zod(studentForgotPwdSchema))
	};
};
