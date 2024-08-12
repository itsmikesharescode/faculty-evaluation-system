<script lang="ts">
	import { UserRound, UserRoundCheck, MoveUpRight } from 'lucide-svelte';

	interface Props {
		link: string;
		count: number;
		title: string;
		selection: 'totalStudents' | 'totalEvaluated' | 'totalProfessors';
	}

	const { link, count, selection, title }: Props = $props();
</script>

<div class="grid gap-[20px] rounded-lg border-[1px] border-black p-[20px]">
	<div class="flex items-end">
		{#if selection === 'totalStudents'}
			<UserRound class="h-[30px] w-[30px] " />
		{:else if selection === 'totalEvaluated'}
			<UserRoundCheck class="h-[30px] w-[30px] " />
		{:else if selection === 'totalProfessors'}
			<UserRound class="h-[30px] w-[30px] " />
		{/if}

		<p class="text-xl font-semibold">{title}</p>
	</div>
	<div class="flex items-center justify-between gap-[10px]">
		<a href={link} class="flex items-center gap-[5px] bg-primary p-[10px] text-sm text-white">
			View Data
			<MoveUpRight class="h-[15px] w-[15px]" />
		</a>
		<p class="text-6xl font-extrabold">{count}</p>
	</div>
</div>
