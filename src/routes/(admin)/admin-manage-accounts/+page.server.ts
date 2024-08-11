import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { createStudentSchema } from './admin-manage-accounts-schema';

export const load: PageServerLoad = async () => {
	return {
		createStudentForm: await superValidate(zod(createStudentSchema))
	};
};
