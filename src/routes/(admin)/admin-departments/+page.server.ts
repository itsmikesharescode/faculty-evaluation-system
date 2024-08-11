import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { addProfSchema } from './admin-departments-schema';

export const load: PageServerLoad = async () => {
	return {
		addProfForm: await superValidate(zod(addProfSchema))
	};
};
