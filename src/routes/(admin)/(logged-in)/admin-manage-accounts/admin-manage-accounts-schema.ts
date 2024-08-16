import { z } from 'zod';

export const createStudentSchema = z
	.object({
		email: z.string().email({ message: 'Must enter student valid email.' }),
		idNumber: z.string().min(5, { message: 'Must enter student valid id number.' }),
		firstName: z.string().min(1, { message: 'Must enter student first name.' }),
		middleInitial: z
			.string()
			.min(1, { message: 'Must enter student middle initial.' })
			.max(1, { message: 'Max char is 1.' }),
		lastName: z.string().min(1, { message: 'Must enter student last name.' }),
		nameSuffix: z.string().optional(),
		gender: z.string().refine((v) => ['Male', 'Female'].includes(v), {
			message: 'Must enter student valid gender.'
		}),
		yearLevel: z
			.string()
			.refine((v) => ['First Year', 'Second Year', 'Third Year', 'Fourth Year'].includes(v), {
				message: 'Must enter student valid year level'
			}),
		course: z.string().min(1, { message: 'Must enter student course.' }),
		section: z.string().min(1, { message: 'Must enter student your section.' }),
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

export const updateStudentSchema = z
	.object({
		student_id: z.string(),
		email: z.string().email({ message: 'Must enter student valid email.' }),
		idNumber: z.string().min(5, { message: 'Must enter student valid id number.' }),
		firstName: z.string().min(1, { message: 'Must enter student first name.' }),
		middleInitial: z
			.string()
			.min(1, { message: 'Must enter student middle initial.' })
			.max(1, { message: 'Max char is 1.' }),
		lastName: z.string().min(1, { message: 'Must enter student last name.' }),
		nameSuffix: z.string().optional(),
		gender: z.string().refine((v) => ['Male', 'Female'].includes(v), {
			message: 'Must enter student valid gender.'
		}),
		yearLevel: z
			.string()
			.refine((v) => ['First Year', 'Second Year', 'Third Year', 'Fourth Year'].includes(v), {
				message: 'Must enter student a valid year level'
			}),
		course: z.string().min(1, { message: 'Must enter student course.' }),
		section: z.string().min(1, { message: 'Must enter student section.' }),
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

export type CreateStudentSchema = typeof createStudentSchema;
export type UpdateStudentSchema = typeof updateStudentSchema;
