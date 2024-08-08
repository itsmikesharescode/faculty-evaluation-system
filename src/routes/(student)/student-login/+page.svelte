<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { studentLoginSchema } from './student-schema';
	import fes_icon from '../../../assets/fes_icon.png?enhanced';

	const { data } = $props();

	const form = superForm(data.studentLoginForm, {
		validators: zodClient(studentLoginSchema)
	});

	const { form: formData, enhance } = form;
</script>

<div class="min-h-screen md:grid md:grid-cols-[60%,40%]">
	<div class="flex min-h-[30dvh] flex-col items-center justify-center bg-green-500 pt-[5rem]">
		<div class="flex flex-col items-center justify-center gap-[20px]">
			<enhanced:img src={fes_icon} class="h-[150px] w-[150px]" alt="landing_icon"></enhanced:img>
			<p class="text-center text-3xl">Faculty <strong>Evaluation</strong> System</p>
			<p class="text-center text-3xl text-muted-foreground">
				Evaluate as <strong class="text-primary">Student</strong>
			</p>
		</div>
	</div>
	<div class="h-[70px] w-full rounded-b-[100%] bg-green-500 md:hidden"></div>

	<div class="">
		<div class="mx-auto mt-[5dvh] flex max-w-[450px] flex-col gap-[10px] p-[20px] md:mt-[20dvh]">
			<p class="text-xl font-semibold leading-7">Student Log in</p>
			<form method="POST" use:enhance>
				<Form.Field {form} name="email">
					<Form.Control let:attrs>
						<Form.Label>Official Email</Form.Label>
						<Input {...attrs} bind:value={$formData.email} placeholder="Enter your email" />
					</Form.Control>
					<Form.Description>Enter your email.</Form.Description>
					<Form.FieldErrors />
				</Form.Field>
				<div class="flex flex-col gap-[10px]">
					<Form.Button class="w-full">Log in</Form.Button>
					<a
						href="/"
						class="w-full rounded-sm bg-secondary p-[10px] text-center text-muted-foreground"
					>
						Back
					</a>
				</div>
			</form>
		</div>
	</div>
</div>
