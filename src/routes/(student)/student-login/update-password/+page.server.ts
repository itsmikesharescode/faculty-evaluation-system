import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { studentUpdatePwdSchema } from '../student-schema';

export const load: PageServerLoad = async () => {
	return {
		studentUpdatePwdForm: await superValidate(zod(studentUpdatePwdSchema))
	};
};
