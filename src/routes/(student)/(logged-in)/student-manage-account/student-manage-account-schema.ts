import { z } from 'zod';

const sectionRegex = /-/;

export const updateAccInfoSchema = z.object({
	firstName: z.string().min(1, { message: 'Must enter first name.' }),
	middleInitial: z
		.string()
		.min(1, { message: 'Must enter middle initial.' })
		.max(1, { message: 'Max char is 1.' }),
	lastName: z.string().min(1, { message: 'Must enter last name.' }),
	nameSuffix: z.string().optional(),
	yearLevel: z
		.string()
		.refine((v) => ['First Year', 'Second Year', 'Third Year', 'Fourth Year'].includes(v), {
			message: 'Must enter a valid year level'
		}),
	course: z.string().min(1, { message: 'Must enter course.' }),
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
	contactNumber: z
		.string()
		.optional()
		.refine((value) => !value || /^[+]\d{12}$/.test(value), {
			message: 'Invalid contact number. It should be in the format +631234567890.'
		}),
	address: z.string().optional()
});

export const updateEmailSchema = z.object({
	newEmail: z.string().email({ message: 'Must enter a valid email.' })
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
export type UpdateEmailSchema = typeof updateEmailSchema;
export type UpdatePwdSchema = typeof updatePwdSchema;
