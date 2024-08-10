<script lang="ts">
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';

	interface Props {
		index: number;
	}

	const { index: outsideIndex }: Props = $props();
</script>

<Popover.Root>
	<Popover.Trigger asChild let:builder>
		<Button builders={[builder]} variant="link">View Sections</Button>
	</Popover.Trigger>
	<Popover.Content class="w-fit">
		<div class="grid gap-4">
			{#each Array(10) as _, index}
				<p>1234567KK{outsideIndex}{index + 1}</p>
			{/each}
		</div>
	</Popover.Content>
</Popover.Root>
