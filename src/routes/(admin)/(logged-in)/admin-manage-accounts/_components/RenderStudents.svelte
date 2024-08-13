<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { EllipsisVertical } from 'lucide-svelte';
</script>

<div class="flex flex-col">
	<div
		class="sticky top-[3.3rem] grid grid-cols-[50%,40%,10%] font-semibold sm:grid-cols-[40%,20%,20%,10%,10%] md:grid-cols-[40%,20%,10%,10%,15%,5%]"
	>
		<span class="bg-secondary p-[0.625rem] text-sm">Full Name</span>
		<span class="hidden bg-secondary p-[0.625rem] text-sm md:block">ID number</span>
		<span class="hidden truncate bg-secondary p-[0.625rem] text-sm sm:block">Year Level</span>
		<span class="hidden bg-secondary p-[0.625rem] text-center text-sm sm:block">Section</span>
		<span class="bg-secondary p-[0.625rem] text-center text-sm">Course</span>
		<span class="bg-secondary p-[0.625rem] text-sm"></span>
	</div>

	{#each Array(100) as _}
		<div
			class="grid grid-cols-[50%,40%,10%] border-b-[1px] sm:grid-cols-[40%,20%,20%,10%,10%] md:grid-cols-[40%,20%,10%,10%,15%,5%]"
		>
			<span class="flex items-center p-[0.625rem] text-sm">Eviota, Mike John B</span>
			<span class="hidden items-center p-[0.625rem] text-sm md:flex">12345678910</span>
			<span class=" hidden items-center p-[0.625rem] text-sm sm:flex">Third</span>
			<span class="hidden items-center justify-center p-[0.625rem] text-sm sm:flex">1234567KK1</span
			>
			<span class="flex items-center justify-center p-[0.625rem] text-sm">BSIS</span>
			<span class="flex items-center p-[0.625rem] text-sm">
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
							<DropdownMenu.Item class="flex items-center justify-center md:hidden"
								>View Details</DropdownMenu.Item
							>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</span>
		</div>
	{/each}
</div>
