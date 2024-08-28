<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { fromDashboardRouteState } from '../../../_states/fromDashboardRoute.svelte';
	import { enhance } from '$app/forms';
	import { Loader } from 'lucide-svelte';
	import { answerFormatter } from '../_helpers/answerFormatter';

	const dashboardRoute = fromDashboardRouteState();

	let submitLoader = $state(false);

	const submitAnsEvent: SubmitFunction = () => {
		submitLoader = true;
		return async ({ result, update }) => {
			const { status } = result;

			switch (status) {
				case 200:
					break;

				case 401:
					break;
			}
			await update();
			submitLoader = false;
		};
	};
</script>

<form method="post" action="?/submitAnsEvent" use:enhance={submitAnsEvent}>
	<input name="projObj" type="hidden" value={dashboardRoute.getActiveProf()} />
	<input
		name="answersArr"
		type="hidden"
		value={JSON.stringify(answerFormatter(dashboardRoute.getAnswers(), 5))}
	/>
	<Button disabled={submitLoader} type="submit" class="relative">
		{#if submitLoader}
			<div class="absolute flex h-full w-full items-center justify-center rounded-lg bg-primary">
				<Loader class="h-[15px] w-[15px] animate-spin" />
			</div>
		{/if}
		Submit Answers
	</Button>
</form>
