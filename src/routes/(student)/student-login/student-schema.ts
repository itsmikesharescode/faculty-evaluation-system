import { courseNames, yearLevels } from '$lib';
import { z } from 'zod';

const sectionRegex = /^[0-9]{2}[A-Z]+-[0-9][A-Z]+$/;

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
		yearLevel: z.string().refine((v) => yearLevels.includes(v), {
			message: 'Must enter a valid year level'
		}),
		course: z
			.string()
			.refine((v) => courseNames.includes(v), { message: 'Must choose your course.' }),
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

export const studentForgotPwdSchema = z.object({
	email: z.string().email({ message: 'Must enter a valid email.' })
});

export type StudentLoginSchema = typeof studentLoginSchema;
export type StudentCreateSchema = typeof studentCreateSchema;
export type StudentForgotPwdSchema = typeof studentForgotPwdSchema;

export const studentUpdatePwdSchema = z
	.object({
		newPwd: z.string().min(8, { message: 'Must choose a strong password.' }),
		confirmNewPwd: z.string()
	})
	.superRefine(({ newPwd, confirmNewPwd }, ctx) => {
		if (newPwd !== confirmNewPwd) {
			ctx.addIssue({
				code: 'custom',
				message: 'Passwords must match.',
				path: ['confirmNewPwd']
			});
		}
	});

export type StudentUpdatePwdSchema = typeof studentUpdatePwdSchema;
