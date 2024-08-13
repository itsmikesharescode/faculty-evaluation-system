<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import type { ProfessorType } from '$lib/types';

	interface Props {
		professor: ProfessorType;
	}

	const { professor }: Props = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger
		class="flex w-full cursor-pointer items-center justify-center rounded-lg  p-[5px] text-sm hover:bg-secondary"
	>
		View Sections
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-[300px]">
		<DropdownMenu.Group class="flex flex-col p-[10px]">
			<p class="p-[10px] text-center text-sm">
				This is <strong>{professor.fullname}</strong> sections holding.
			</p>
			<div class="flex max-h-[18rem] flex-col gap-4 overflow-auto">
				{#each professor.sections.split(',') as section, index}
					<p>{section}</p>
				{/each}
			</div>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
