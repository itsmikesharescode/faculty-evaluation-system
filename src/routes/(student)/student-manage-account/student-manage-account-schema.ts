import { z } from 'zod';

export const updateAccInfoSchema = z.object({
	firstName: z.string().min(1, { message: 'Must enter first name.' }),
	middleInitial: z
		.string()
		.min(1, { message: 'Must enter middle initial.' })
		.max(1, { message: 'Max char is 1.' }),
	lastName: z.string().min(1, { message: 'Must enter last name.' }),
	nameSuffix: z.string().optional(),
	gender: z
		.string()
		.refine((v) => ['Male', 'Female'].includes(v), { message: 'Must enter a valid gender.' }),
	yearLevel: z
		.string()
		.refine((v) => ['First Year', 'Second Year', 'Third Year', 'Fourth Year'].includes(v), {
			message: 'Must enter a valid year level'
		}),
	course: z.string().min(1, { message: 'Must enter course.' }),
	section: z.string().min(1, { message: 'Must enter your section.' }),
	contactNumber: z
		.string()
		.optional()
		.refine((value) => !value || /^[+]\d{12}$/.test(value), {
			message: 'Invalid contact number. It should be in the format +631234567890.'
		}),
	address: z.string().optional()
});

export const updatePwdSchema = z
	.object({
		newPwd: z.string().min(8, { message: 'Must choose a strong password.' }),
		confirmNewPwd: z.string()
	})
	.superRefine(({ newPwd, confirmNewPwd }, ctx) => {
		if (newPwd !== confirmNewPwd) {
			ctx.addIssue({
				code: 'custom',
				message: 'Must confirm your new password',
				path: ['confirmNewPwd']
			});
		}
	});

export type UpdateAccInfoSchema = typeof updateAccInfoSchema;
export type UpdatePwdSchema = typeof updatePwdSchema;
