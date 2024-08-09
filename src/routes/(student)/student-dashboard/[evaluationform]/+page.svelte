<script lang="ts">
	import { onMount } from 'svelte';
	import { Progress } from '$lib/components/ui/progress/index.js';
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import Button from '$lib/components/ui/button/button.svelte';

	let value = 13;
	onMount(() => {
		const timer = setTimeout(() => (value = 66), 500);
		return () => clearTimeout(timer);
	});
</script>

<div class="min-h-screen p-[10px]">
	<div class="flex flex-col gap-[10px] bg-white p-[20px]">
		<div class="sticky top-[6.5dvh] flex items-center justify-center">
			<Progress {value} max={100} class="h-[20px] w-full rounded-none" />
			<p class="absolute bottom-0 text-xs font-semibold text-black">{value} % Completion</p>
		</div>

		<div class="flex flex-col gap-[10px]">
			<div class="">
				<p class="text-base text-muted-foreground">
					FACULTY: <strong class="text-black">Faculty Test 1</strong>
				</p>
				<p class="text-base text-muted-foreground">
					SUBJECT: <strong class="text-black">Faculty Test 1</strong>
				</p>
			</div>

			<p class="text-center text-xl font-semibold text-primary">FACULTY PERFORMANCE EVALUATION</p>

			<div class="">
				<p class="font-semibold">Direction:</p>
				<p class="text-sm leading-7 text-muted-foreground">
					This questionnare seeks your objective, honest and fair evaluation of your teacher in this
					subject. The highest possible rating is 5, the lowest is 1. All items are required.
				</p>
			</div>

			<!--Dynamic Questionares from database uploaded by admins-->
			<div class="flex flex-col gap-[20px] border-t-[1px] border-slate-300 py-[10px]">
				<p class="font-semibold text-primary">TEACHING FOR INDEPENDENT LEARNING</p>

				{#each Array(8) as _, index}
					<div class="flex flex-col gap-[10px]">
						<div class="">
							<p>
								{index + 1}. Allow students to apply concepts learned to demonstrate understanding
								of the lession.
							</p>
						</div>

						<div class="">
							<RadioGroup.Root value="comfortable">
								<div class="flex items-center space-x-2">
									<RadioGroup.Item value="outstanding" id={`r1${index + 1}`} />
									<Label for={`r1${index + 1}`}>
										Always
										<strong class="text-muted-foreground">(5 Scores)</strong>
									</Label>
								</div>
								<div class="flex items-center space-x-2">
									<RadioGroup.Item value="verysatisfactory" id={`r2${index + 1}`} />
									<Label for={`r2${index + 1}`}>
										Often
										<strong class="text-muted-foreground">(4 Scores) </strong>
									</Label>
								</div>
								<div class="flex items-center space-x-2">
									<RadioGroup.Item value="satisfactory" id={`r3${index + 1}`} />
									<Label for={`r3${index + 1}`}>
										Sometimes
										<strong class="text-muted-foreground">(3 Scores)</strong>
									</Label>
								</div>

								<div class="flex items-center space-x-2">
									<RadioGroup.Item value="fair" id={`r4${index + 1}`} />
									<Label for={`r4${index + 1}`}>
										Rarely
										<strong class="text-muted-foreground">(2 Scores)</strong>
									</Label>
								</div>

								<div class="flex items-center space-x-2">
									<RadioGroup.Item value="needsimprovement" id={`r5${index + 1}`} />
									<Label for={`r5${index + 1}`}>
										Never
										<strong class="text-muted-foreground">(1 Score)</strong>
									</Label>
								</div>
								<RadioGroup.Input name="spacing" />
							</RadioGroup.Root>
						</div>
					</div>
				{/each}

				<div class="flex items-center justify-between">
					<Button>Previous</Button>

					<div class="flex items-center gap-[5px]">
						<Button>Next</Button>
						<Button>Submit</Button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
