export const getScoreDescription = (percentage: number) => {
	if (percentage < 0 || percentage > 100) {
		return 'Invalid percentage. Please provide a value between 0 and 100.';
	}

	// Convert the percentage to the corresponding score range
	const score = (percentage / 100) * (5.0 - 2.51) + 2.51;

	// Determine the corresponding description based on the score
	let description;
	if (score >= 4.51 && score <= 5.0) {
		description = 'Excellent';
	} else if (score >= 4.01 && score <= 4.5) {
		description = 'Very Satisfactory';
	} else if (score >= 3.51 && score <= 4.0) {
		description = 'Satisfactory';
	} else if (score >= 3.0 && score <= 3.5) {
		description = 'Fair';
	} else if (score >= 2.51 && score <= 3.0) {
		description = 'Needs Improvement';
	} else {
		description = 'Score out of range.';
	}

	// Return the score range and description
	return `${score.toFixed(2)} - ${description}`;
};
