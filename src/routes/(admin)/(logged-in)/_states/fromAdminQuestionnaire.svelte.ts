import type { EvaluationType } from '$lib/types';
import { getContext, setContext } from 'svelte';

class QuestionnairState {
	private evaluation = $state<EvaluationType[] | null>(null);
	private activeEvaluation = $state<EvaluationType | null>(null);

	setEvaluation(param: EvaluationType[] | null) {
		this.evaluation = param;
	}

	getEvaluation() {
		return this.evaluation;
	}

	setActive(param: EvaluationType | null) {
		this.activeEvaluation = param;
	}

	getActive() {
		return this.activeEvaluation;
	}
}

const QS_KEY = Symbol('questionnaireRouteKey');

export const initQuestionnaireRoute = () => {
	return setContext(QS_KEY, new QuestionnairState());
};

export const fromQuestionnaireRouteState = () => {
	return getContext<ReturnType<typeof initQuestionnaireRoute>>(QS_KEY);
};
