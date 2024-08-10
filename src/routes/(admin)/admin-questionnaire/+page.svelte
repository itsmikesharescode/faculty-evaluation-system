<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { MoveUpRight } from 'lucide-svelte';
	import { fromAdminRouteState } from '../_states/fromAdminRoute.svelte';

	const route = fromAdminRouteState();
	route.setRoute('/admin-questionnaire');
</script>

<div class="min-h-screen border-l-[1px] border-slate-300 p-[10px]">
	<div class="flex flex-col gap-[10px]">
		<div class="sticky top-[3.3rem] transition-all">
			<a
				href="/admin-questionnaire/create"
				class="flex max-w-fit items-center gap-[5px] bg-primary p-[10px] text-sm font-semibold text-white"
				>Create Questionnaires <MoveUpRight class="h-[15px] w-[15px]" /></a
			>
		</div>

		<div class="flex flex-col gap-[20px]">
			{#each Array(10) as _}
				<div class="rounded-lg border-black bg-secondary p-[20px] shadow-lg">
					<div class="">
						<p>Evaluation Title: Rating Element</p>
						<p>Selection Range: 1 - 5</p>
						<p>Number Of Questions: 8</p>
					</div>
					<div class="flex items-center justify-end gap-[5px]">
						<Button>Used</Button>
						<Button variant="destructive">Delete</Button>
						<Button>Update</Button>
						<Button>View</Button>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
