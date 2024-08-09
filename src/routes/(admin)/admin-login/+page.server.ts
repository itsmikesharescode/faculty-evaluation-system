import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { adminLoginSchema } from './admin-schema';

export const load: PageServerLoad = async () => {
	return {
		adminLoginForm: await superValidate(zod(adminLoginSchema))
	};
};
