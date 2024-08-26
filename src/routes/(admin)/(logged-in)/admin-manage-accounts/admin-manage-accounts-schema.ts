import { z } from 'zod';

const sectionRegex = /-/;

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
		sections: z.string().refine(
			(value) => {
				// Split the sections by comma
				const sectionsArray = value.split(',');

				// Ensure multiple sections are provided if there is more than one section
				if (sectionsArray.length < 1) {
					return false; // Return false if there's only one section (no commas)
				}

				// Check each section against the regex
				return sectionsArray.every((section) => sectionRegex.test(section.trim()));
			},
			{
				message: 'Invalid section format.'
			}
		),
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

export const updateStudEmailSchema = z.object({
	studentId: z.string(),
	email: z.string().email({ message: 'Must enter a valid email.' })
});

export const updateStudInfoSchema = z.object({
	studentId: z.string(),
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
	sections: z.string().refine(
		(value) => {
			// Split the sections by comma
			const sectionsArray = value.split(',');

			// Ensure multiple sections are provided if there is more than one section
			if (sectionsArray.length < 1) {
				return false; // Return false if there's only one section (no commas)
			}

			// Check each section against the regex
			return sectionsArray.every((section) => sectionRegex.test(section.trim()));
		},
		{
			message: 'Invalid section format.'
		}
	)
});

export const updateStudPwdSchema = z
	.object({
		studentId: z.string(),
		newPwd: z.string().min(8, { message: 'Must choose a strong password.' }),
		confirmNewPwd: z.string()
	})
	.superRefine(({ newPwd, confirmNewPwd }, ctx) => {
		if (newPwd !== confirmNewPwd) {
			ctx.addIssue({
				code: 'custom',
				message: 'Must confirm new password.',
				path: ['confirmNewPwd']
			});
		}
	});

export type CreateStudentSchema = typeof createStudentSchema;
export type UpdateStudEmailSchema = typeof updateStudEmailSchema;
export type UpdateStudPwdSchema = typeof updateStudPwdSchema;
export type UpdateStudInfoSchema = typeof updateStudInfoSchema;
