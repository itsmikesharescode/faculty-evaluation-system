<script lang="ts">
	import Section from './_render_professor_component/Section.svelte';
	import { EllipsisVertical } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
</script>

<div class="">
	<!--Table Header-->
	<div
		class="sticky top-[7rem] grid grid-cols-[60%,20%,10%,10%] border-y-[1px] border-black bg-slate-400 text-sm font-semibold"
	>
		<span class=" p-[0.625rem]">Professor Name</span>
		<span class=" p-[0.625rem] text-center">Section</span>
		<span class=" p-[0.625rem] text-center">Result</span>
		<span class="border-r-[1px] border-black p-[0.625rem] text-center"></span>
	</div>

	<!--Table Data-->
	{#each Array(30) as _, index}
		<div class="grid grid-cols-[60%,20%,10%,10%] border-b-[1px] border-black text-sm">
			<span class="flex items-center p-[0.625rem]">Lesley Marksman</span>
			<span class="flex items-center justify-center p-[0.625rem]"><Section {index} /></span>
			<span class="flex items-center justify-center p-[0.625rem] text-center">70%</span>
			<span class="flex items-center justify-end p-[0.625rem]">
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<EllipsisVertical />
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<DropdownMenu.Label class="flex items-center justify-center"
								>Actions</DropdownMenu.Label
							>
							<DropdownMenu.Separator />
							<DropdownMenu.Item class="flex items-center justify-center">Delete</DropdownMenu.Item>
							<DropdownMenu.Item class="flex items-center justify-center">Update</DropdownMenu.Item>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</span>
		</div>
	{/each}
</div>
