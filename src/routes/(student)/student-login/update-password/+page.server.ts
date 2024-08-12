import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { studentUpdatePwdSchema } from '../student-schema';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals: { supabase }, url }) => {
	const { data, error } = await supabase.auth.verifyOtp({
		token_hash: url.searchParams.get('token') ?? '',
		type: 'email'
	});

	if (error) redirect(303, `/?error=${error.message.split(' ').join('-')}`);

	if (data.user) {
		return {
			studentUpdatePwdForm: await superValidate(zod(studentUpdatePwdSchema))
		};
	} else {
		return {
			studentUpdatePwdForm: await superValidate(zod(studentUpdatePwdSchema))
		};
	}
};

export const actions: Actions = {
	updatePwdEvent: async ({ locals: { supabase }, request }) => {
		const form = await superValidate(request, zod(studentUpdatePwdSchema));

		if (!form.valid) return fail(400, { form });

		const {
			data: { user },
			error
		} = await supabase.auth.updateUser({
			password: form.data.newPwd
		});

		if (error) return fail(401, { form, msg: error.message });
		else if (user) return { form, msg: 'Password updated' };
	}
};
