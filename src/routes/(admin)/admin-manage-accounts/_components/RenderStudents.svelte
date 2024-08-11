<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { EllipsisVertical } from 'lucide-svelte';
</script>

<div class="flex flex-col">
	<div class="sticky top-[3.3rem] grid grid-cols-[40%,20%,10%,10%,15%,5%] font-semibold">
		<span class="bg-secondary p-[10px] text-sm">Full Name</span>
		<span class="bg-secondary p-[10px] text-sm">ID number</span>
		<span class="bg-secondary p-[10px] text-sm">Year Level</span>
		<span class="bg-secondary p-[10px] text-sm">Section</span>
		<span class="bg-secondary p-[10px] text-sm">Course</span>
		<span class="bg-secondary p-[10px] text-sm"></span>
	</div>

	{#each Array(60) as _}
		<div class="grid grid-cols-[40%,20%,10%,10%,15%,5%] border-b-[1px]">
			<span class="flex items-center p-[10px] text-sm">Eviota, Mike John B</span>
			<span class="flex items-center p-[10px] text-sm">12345678910</span>
			<span class="flex items-center p-[10px] text-sm">Third</span>
			<span class="flex items-center p-[10px] text-sm">1234567KK1</span>
			<span class="flex items-center p-[10px] text-sm">BSIS</span>
			<span class="flex items-center p-[10px] text-sm">
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<EllipsisVertical />
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<DropdownMenu.Label class="flex items-center justify-center"
								>Action</DropdownMenu.Label
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
