import { z } from 'zod';
import { departments } from '../_states/fromAdminDepartments.svelte';

const sectionRegex = /^[0-9]{2}[A-Z]+-[0-9][A-Z]+$/;

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
			message: 'Invalid section format. Please use formats like 24BSIS-1M, 24BSIS-2M, 23BSIS-2P1E.'
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

			// Check each section against the regex
			return sectionsArray.every((section) => sectionRegex.test(section));
		},
		{
			message: 'Invalid section format. Please use formats like 1234567KK or 1234567KK1,1234567KK2.'
		}
	)
});

export type AddProfSchema = typeof addProfSchema;
export type UpdateProfSchema = typeof updateProfSchema;
