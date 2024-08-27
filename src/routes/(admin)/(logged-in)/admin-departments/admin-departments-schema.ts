import { z } from 'zod';
import { departments } from '../_states/fromAdminDepartments.svelte';

const sectionRegex = /^[A-Z0-9]+-[A-Z0-9]+$/;

export const addProfSchema = z.object({
	department: z.string(),
	profName: z.string().min(1, { message: 'Must enter professor name.' }),
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

export const updateProfSchema = z.object({
	profId: z.number(),
	department: z
		.string()
		.refine((v) => departments.includes(v), { message: 'Must enter a valid department' }),
	profName: z.string().min(1, { message: 'Must enter professor name.' }),
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

export type AddProfSchema = typeof addProfSchema;
export type UpdateProfSchema = typeof updateProfSchema;
