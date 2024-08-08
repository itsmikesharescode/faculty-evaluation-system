import { z } from 'zod';

export const studentLoginSchema = z.object({
	email: z.string().email({ message: 'Must enter a valid email.' }),
	password: z.string().min(1, { message: 'Must enter a password' })
});

export const studentCreateSchema = z
	.object({
		email: z.string().email({ message: 'Must enter a valid email.' }),
		idNumber: z.string().min(5, { message: 'Must enter a valid id number.' }),
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
		college: z.string().min(1, { message: 'Must enter college.' }),
		course: z.string().min(1, { message: 'Must enter course.' }),
		password: z.string().min(8, { message: 'Must choose a strong password.' }),
		confirmPassword: z.string()
	})
	.superRefine(({ password, confirmPassword }, ctx) => {
		if (password !== confirmPassword) {
			ctx.addIssue({
				code: 'custom',
				message: 'Confirm password must match Password.',
				path: ['confirmPassword']
			});
		}
	});

export const studentForgotPwdSchema = z.object({
	email: z.string().email({ message: 'Must enter a valid email.' })
});

export type StudentLoginSchema = typeof studentLoginSchema;
export type StudentCreateSchema = typeof studentCreateSchema;
export type StudentForgotPwdSchema = typeof studentForgotPwdSchema;
