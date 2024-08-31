export type AnswerType = {
	headerTitle: string;
	value: number;
	id: string;
};

type Accumulator = {
	[key: string]: {
		headerTitle: string;
		sum: number;
		length: number;
	};
};

// will format the answers
export const answerFormatter = (answerArr: AnswerType[], scoreVar: number) => {
	const accumulator: Accumulator = answerArr.reduce<Accumulator>((acc, curr) => {
		if (!acc[curr.headerTitle]) {
			acc[curr.headerTitle] = {
				headerTitle: curr.headerTitle,
				sum: curr.value,
				length: 1
			};
		} else {
			acc[curr.headerTitle].sum += curr.value;
			acc[curr.headerTitle].length += 1;
		}

		return acc;
	}, {});

	return Object.values(accumulator).map((item) => ({
		...item,
		percentage: (item.sum / (item.length * scoreVar)) * 100
	}));
};
