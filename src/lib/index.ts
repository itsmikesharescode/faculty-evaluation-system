export const adminPaths = [
	'/admin-dashboard',
	'/admin-questionnaire',
	'/admin-questionnaire/create',
	'/admin-departments',
	'/admin-manage-accounts'
];

export const studentPaths = [
	'/student-dashboard',
	'/student-manage-account',
	'/student-dashboard/evaluationform'
];

export const formatName = (fullname: string, suffix: string | null) => {
	const formatter = fullname.split(',');
	const lastName = formatter[0];
	const firstName = formatter[1];
	const middleInitial = formatter[2];

	return `${lastName}, ${firstName} ${middleInitial}. ${suffix ?? ''}`;
};
