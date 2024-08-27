import { z } from 'zod';

const sectionRegex = /^[A-Z0-9]+-[A-Z0-9]+$/;

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
			// Ensure there are no leading or trailing spaces
			const trimmedValue = value.trim();

			// Reject if the trimmed value doesn't match the original value (indicating leading/trailing spaces)
			if (trimmedValue !== value) {
				return false;
			}

			// Split the sections by comma
			const sectionsArray = trimmedValue.split(',');

			// Ensure each section is valid and has no leading/trailing spaces
			return sectionsArray.every((section) => sectionRegex.test(section));
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
