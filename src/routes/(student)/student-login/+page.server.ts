import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { studentCreateSchema, studentForgotPwdSchema, studentLoginSchema } from './student-schema';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		studentLoginForm: await superValidate(zod(studentLoginSchema)),
		studentCreateForm: await superValidate(zod(studentCreateSchema)),
		studentForgotPwdForm: await superValidate(zod(studentForgotPwdSchema))
	};
};

export const actions: Actions = {
	studentLoginEvent: async ({ locals: { supabase }, request }) => {
		const form = await superValidate(request, zod(studentLoginSchema));

		if (!form.valid) return fail(400, { form });

		const {
			data: { user },
			error
		} = await supabase.auth.signInWithPassword({
			email: form.data.email,
			password: form.data.password
		});

		if (error) return fail(401, { form, msg: error.message });
		else if (user) return { form, msg: 'Welcome back!' };
	}
};
