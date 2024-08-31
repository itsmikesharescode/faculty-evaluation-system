<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { fromDepartmentsRouteState } from '../../../_states/fromAdminDepartments.svelte';
	import type { EvaluatedOrigType, ProfessorType } from '$lib/types';
	import { toast } from 'svelte-sonner';
	import { Loader, X } from 'lucide-svelte';
	import ResultLineChart from '../ResultLineChart.svelte';
	import { fromSupabaseClient } from '../../../../../_states/fromSupabaseClient.svelte';
	import type { PostgrestSingleResponse } from '@supabase/supabase-js';
	import ResultBarChart from '../ResultBarChart.svelte';

	interface Props {
		professor: ProfessorType;
		viewSignal: boolean;
	}

	let { viewSignal = $bindable(), professor }: Props = $props();

	const supabase = fromSupabaseClient();

	const departmentRoute = fromDepartmentsRouteState();

	const getResults = async () => {
		type SummaryMapType = {
			[headerTitle: string]: {
				totalPercentage: number;
				count: number;
			};
		};

		const sb = supabase.getClient();

		if (sb) {
			const { data, error } = (await sb
				.from('evaluated_list_tb')
				.select('*')
				.eq('professor_id', professor.id)) as PostgrestSingleResponse<EvaluatedOrigType[]>;

			if (error) {
				toast.error('Viewing Result', { description: error.message });
				return [];
			} else if (data) {
				const arrayOfAns = data.map((item) => item.answers_copy);

				const flattenedArray = arrayOfAns.flat();

				// Create a map to hold sums and counts for each headerTitle
				const summaryMap = flattenedArray.reduce((acc, item) => {
					if (!acc[item.headerTitle]) {
						acc[item.headerTitle] = { totalPercentage: 0, count: 0 };
					}
					acc[item.headerTitle].totalPercentage += item.percentage;
					acc[item.headerTitle].count += 1;
					return acc;
				}, {} as SummaryMapType);

				// Calculate the average percentage for each headerTitle
				const averageArray = Object.keys(summaryMap).map((headerTitle) => {
					const { totalPercentage, count } = summaryMap[headerTitle];
					return {
						headerTitle,
						percentage: totalPercentage / count
					};
				});

				return averageArray;
			}

			return [];
		}

		return [];
	};
</script>

<AlertDialog.Root bind:open={viewSignal}>
	<AlertDialog.Content class="flex max-h-screen max-w-[1200px] flex-col gap-[0.625rem]">
		<button
			onclick={() => (viewSignal = false)}
			class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
		>
			<X class="" />
			<span class="sr-only">Close</span>
		</button>
		<AlertDialog.Header>
			<AlertDialog.Title>Viewing Evaluation Result</AlertDialog.Title>
			<AlertDialog.Description>
				You are viewing <strong>total</strong> evaluation result for
				<strong>{professor.fullname}</strong>
				from our database.
			</AlertDialog.Description>
		</AlertDialog.Header>

		<div class="h-full overflow-auto">
			{#await getResults()}
				<Skeleton class="h-full w-full rounded-none bg-slate-400" />
			{:then datas}
				<div class="flex flex-col gap-[1rem]">
					<div class="flex flex-wrap gap-[1rem]">
						{#each datas as result}
							<div class="bg-secondary p-[1rem]">
								<p class="text-sm font-semibold">{result.headerTitle}</p>
								<p class="text-sm">Score: <strong>{result.percentage.toFixed(0)} %</strong></p>
							</div>
						{/each}

						<div class="bg-primary p-[1rem] text-white">
							<p class="text-sm font-semibold">Total Score</p>
							<p class="text-center">
								{(
									datas.map((item) => item.percentage).reduce((acc, curr) => acc + curr) /
									datas.length
								).toFixed(0)} %
							</p>
						</div>
					</div>

					<div class="grid md:grid-cols-2">
						<div class="h-[40dvh]">
							<ResultLineChart {datas} {professor} />
						</div>
						<div class="h-[40dvh]">
							<ResultBarChart {datas} {professor} />
						</div>
					</div>
				</div>
			{/await}
		</div>
	</AlertDialog.Content>
</AlertDialog.Root>
