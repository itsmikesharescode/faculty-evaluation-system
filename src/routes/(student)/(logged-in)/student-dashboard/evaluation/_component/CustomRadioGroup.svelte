<script lang="ts">
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	interface Props {
		index: number;
		questionObj: { id: string; question: string };
	}

	const { index, questionObj }: Props = $props();
</script>

<div class="">
	<p>
		{index + 1} ). {questionObj.question}
	</p>
</div>

<div class="p-[0.625rem]">
	<RadioGroup.Root
		onchange={(e) => {
			const target = e.target as HTMLInputElement;
			console.log(target.value, index);
		}}
	>
		<div class="flex items-center space-x-2">
			<RadioGroup.Item value="5" id={`r1${questionObj.id}`} />
			<Label for={`r1${questionObj.id}`}>
				Always
				<strong class="text-muted-foreground">(5)</strong>
			</Label>
		</div>
		<div class="flex items-center space-x-2">
			<RadioGroup.Item value="4" id={`r2${questionObj.id}`} />
			<Label for={`r2${questionObj.id}`}>
				Often
				<strong class="text-muted-foreground">(4) </strong>
			</Label>
		</div>
		<div class="flex items-center space-x-2">
			<RadioGroup.Item value="3" id={`r3${questionObj.id}`} />
			<Label for={`r3${questionObj.id}`}>
				Sometimes
				<strong class="text-muted-foreground">(3)</strong>
			</Label>
		</div>

		<div class="flex items-center space-x-2">
			<RadioGroup.Item value="2" id={`r4${questionObj.id}`} />
			<Label for={`r4${questionObj.id}`}>
				Rarely
				<strong class="text-muted-foreground">(2)</strong>
			</Label>
		</div>

		<div class="flex items-center space-x-2">
			<RadioGroup.Item value="1" id={`r5${questionObj.id}`} />
			<Label for={`r5${questionObj.id}`}>
				Never
				<strong class="text-muted-foreground">(1)</strong>
			</Label>
		</div>
		<RadioGroup.Input name={questionObj.id} />
	</RadioGroup.Root>
</div>
