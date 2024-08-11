<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger
		class="flex w-full cursor-pointer items-center justify-center rounded-lg  p-[5px] text-sm hover:bg-secondary"
		>View Sections</DropdownMenu.Trigger
	>
	<DropdownMenu.Content class="w-[300px]">
		<DropdownMenu.Group class="p-[10px]">
			<p class="p-[10px] text-center text-sm">
				This is <strong>Lesley Marksman</strong> sections holding.
			</p>
			<div class="grid h-[18rem] gap-4 overflow-auto">
				{#each Array(30) as _, index}
					<p>1234567KK{index + 1}</p>
				{/each}
			</div>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
