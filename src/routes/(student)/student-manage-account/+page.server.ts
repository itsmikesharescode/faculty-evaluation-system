import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import {
	updatePwdSchema,
	updateAccInfoSchema,
	updateEmailSchema
} from './student-manage-account-schema';

export const load: PageServerLoad = async () => {
	return {
		updateAccInfoForm: await superValidate(zod(updateAccInfoSchema)),
		updateEmailForm: await superValidate(zod(updateEmailSchema)),
		updatePwdForm: await superValidate(zod(updatePwdSchema))
	};
};
