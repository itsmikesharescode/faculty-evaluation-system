<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select/index.js';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { studentCreateSchema, type StudentCreateSchema } from '../student-schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { ResultModel } from '$lib/types';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { fromUserState } from '../../../_states/fromRootState.svelte';
	import type { User } from '@supabase/supabase-js';
	import { CircleHelp, Loader } from 'lucide-svelte';
	import { courseNames, yearLevels } from '$lib';
	import * as Popover from '$lib/components/ui/popover';

	interface Props {
		studentCreateForm: SuperValidated<Infer<StudentCreateSchema>>;
	}

	const { studentCreateForm }: Props = $props();

	const user = fromUserState();

	const form = superForm(studentCreateForm, {
		validators: zodClient(studentCreateSchema),
		id: crypto.randomUUID(),
		invalidateAll: false,
		onUpdate({ result }) {
			const { status, data } = result as ResultModel<{ msg: string; user: User }>;

			switch (status) {
				case 200:
					toast.success('Register', { description: data.msg });
					user.setUser(data.user);
					goto('/student-dashboard');
					break;

				case 401:
					toast.error('Register', { description: data.msg });
					break;
			}
		}
	});

	const { form: formData, enhance, submitting } = form;

	const selectedGender = $derived(
		$formData.gender ? { label: $formData.gender, value: $formData.gender } : undefined
	);

	const yearLevel = $derived(
		$formData.yearLevel ? { label: $formData.yearLevel, value: $formData.yearLevel } : undefined
	);

	const courseName = $derived(
		$formData.yearLevel ? { label: $formData.course, value: $formData.course } : undefined
	);
</script>

<p class="p-[20px] text-center text-xl font-semibold leading-7">Student Registration</p>
<form method="POST" action="?/studentRegisterEvent" use:enhance class="flex flex-col gap-[10px]">
	<Form.Field {form} name="idNumber">
		<Form.Control let:attrs>
			<Form.Label>ID Number</Form.Label>
			<Input {...attrs} bind:value={$formData.idNumber} placeholder="Enter your id number" />
		</Form.Control>

		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Email</Form.Label>
			<Input {...attrs} bind:value={$formData.email} placeholder="Enter your email" />
		</Form.Control>

		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="firstName">
		<Form.Control let:attrs>
			<Form.Label>First Name</Form.Label>
			<Input {...attrs} bind:value={$formData.firstName} placeholder="Enter your first name" />
		</Form.Control>

		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="middleInitial">
		<Form.Control let:attrs>
			<Form.Label>Middle Initial</Form.Label>
			<Input
				{...attrs}
				bind:value={$formData.middleInitial}
				placeholder="Enter your middle initial"
			/>
		</Form.Control>

		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="lastName">
		<Form.Control let:attrs>
			<Form.Label>Last Name</Form.Label>
			<Input {...attrs} bind:value={$formData.lastName} placeholder="Enter your last name" />
		</Form.Control>

		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="nameSuffix">
		<Form.Control let:attrs>
			<Form.Label>Name Suffix (optional)</Form.Label>
			<Input {...attrs} bind:value={$formData.nameSuffix} placeholder="Enter your name suffix" />
		</Form.Control>

		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="gender">
		<Form.Control let:attrs>
			<Form.Label>Gender</Form.Label>
			<Select.Root
				selected={selectedGender}
				onSelectedChange={(v) => {
					v && ($formData.gender = v.value);
				}}
			>
				<Select.Trigger {...attrs}>
					<Select.Value placeholder="Select your gender" />
				</Select.Trigger>
				<Select.Content>
					<Select.Item value="Male" label="Male" />
					<Select.Item value="Female" label="Female" />
				</Select.Content>
			</Select.Root>
			<input hidden bind:value={$formData.gender} name={attrs.name} />
		</Form.Control>

		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="yearLevel">
		<Form.Control let:attrs>
			<Form.Label>Year Level</Form.Label>
			<Select.Root
				selected={yearLevel}
				onSelectedChange={(v) => {
					v && ($formData.yearLevel = v.value);
				}}
			>
				<Select.Trigger {...attrs}>
					<Select.Value placeholder="Select your year level" />
				</Select.Trigger>
				<Select.Content>
					{#each yearLevels as yearLevel}
						<Select.Item value={yearLevel} label={yearLevel} />
					{/each}
				</Select.Content>
			</Select.Root>
			<input hidden bind:value={$formData.yearLevel} name={attrs.name} />
		</Form.Control>

		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="course">
		<Form.Control let:attrs>
			<Form.Label>Course</Form.Label>
			<Select.Root
				selected={courseName}
				onSelectedChange={(v) => {
					v && ($formData.course = v.value);
				}}
			>
				<Select.Trigger {...attrs}>
					<Select.Value placeholder="Select your course" />
				</Select.Trigger>
				<Select.Content>
					{#each courseNames as course}
						<Select.Item value={course} label={course} />
					{/each}
				</Select.Content>
			</Select.Root>
			<input hidden bind:value={$formData.course} name={attrs.name} />
		</Form.Control>

		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="sections">
		<Form.Control let:attrs>
			<Form.Label>Section</Form.Label>
			<div class="relative flex items-center">
				<Input
					{...attrs}
					bind:value={$formData.sections}
					placeholder="Enter your section"
					class="pr-[2rem]"
				/>
				<Popover.Root>
					<Popover.Trigger class="absolute right-0 mr-[5px]">
						<CircleHelp />
					</Popover.Trigger>
					<Popover.Content>
						<p class="text-sm leading-7">
							Please use formats like <strong>24BSIS-1M, 24BSIS-2M, 23BSIS-2P1E</strong>.
						</p>

						<p class="text-sm leading-7">Example:</p>
						<p class="text-sm leading-7">Single section: <strong>24BSIS-1M</strong></p>
						<p class="text-sm leading-7">
							Multiple section: <strong>24BSIS-1M, 24BSIS-2M, 23BSIS-2P1E</strong>.
						</p>
					</Popover.Content>
				</Popover.Root>
			</div>
		</Form.Control>

		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="password">
		<Form.Control let:attrs>
			<Form.Label>Password</Form.Label>
			<Input
				type="password"
				{...attrs}
				bind:value={$formData.password}
				placeholder="Enter your password"
			/>
		</Form.Control>

		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="confirmPassword">
		<Form.Control let:attrs>
			<Form.Label>Confirm Password</Form.Label>
			<Input
				type="password"
				{...attrs}
				bind:value={$formData.confirmPassword}
				placeholder="Confirm your password"
			/>
		</Form.Control>

		<Form.FieldErrors />
	</Form.Field>

	<Form.Button disabled={$submitting} class="relative w-full">
		{#if $submitting}
			<div class="absolute flex h-full w-full items-center justify-center rounded-lg bg-primary">
				<Loader class="h-[15px] w-[15px] animate-spin" />
			</div>
		{/if}
		Register
	</Form.Button>

	<div class=" mt-[20px] flex flex-col gap-[10px]">
		<a href="/student-login" class="mx-auto max-w-fit text-sm transition-all hover:underline"
			>Log in here</a
		>
	</div>
</form>
