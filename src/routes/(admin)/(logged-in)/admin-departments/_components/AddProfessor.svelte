<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { addProfSchema, type AddProfSchema } from '../admin-departments-schema';
	import { Loader, X } from 'lucide-svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { fromDepartmentsRouteState } from '../../_states/fromAdminDepartments.svelte';
	import type { ProfessorType, ResultModel } from '$lib/types';
	import { toast } from 'svelte-sonner';

	interface Props {
		addProfForm: SuperValidated<Infer<AddProfSchema>>;
	}

	const { addProfForm }: Props = $props();

	const departmentRoute = fromDepartmentsRouteState();

	let open = $state(false);

	const form = superForm(addProfForm, {
		validators: zodClient(addProfSchema),
		id: crypto.randomUUID(),
		onUpdate({ result }) {
			const { status, data } = result as ResultModel<{ msg: string; data: ProfessorType[] }>;

			switch (status) {
				case 200:
					toast.success('Create Professor', { description: data.msg });
					departmentRoute.setProfs(data.data);
					open = false;
					break;
				case 401:
					toast.error('Create Professor', { description: data.msg });
					break;
			}
		}
	});

	const { form: formData, enhance, submitting } = form;
</script>

<Button onclick={() => (open = true)} class="max-w-fit">Add Professor</Button>

<AlertDialog.Root bind:open>
	<AlertDialog.Content>
		<button
			onclick={() => (open = false)}
			class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
		>
			<X class="h-4 w-4" />
			<span class="sr-only">Close</span>
		</button>
		<AlertDialog.Header>
			<AlertDialog.Title>Add Professor</AlertDialog.Title>
			<AlertDialog.Description>
				Answer the following fields to add professor.
			</AlertDialog.Description>
		</AlertDialog.Header>

		<form method="POST" action="?/addProfEvent" use:enhance class="flex flex-col gap-[10px]">
			<Form.Field {form} name="department">
				<Form.Control let:attrs>
					<Input {...attrs} value={departmentRoute.getRoute()} class="hidden" />
				</Form.Control>
			</Form.Field>

			<Form.Field {form} name="profName">
				<Form.Control let:attrs>
					<Form.Label>Professor Name</Form.Label>
					<Input
						{...attrs}
						bind:value={$formData.profName}
						placeholder="Enter the professor name"
					/>
				</Form.Control>

				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="sections">
				<Form.Control let:attrs>
					<Form.Label>Sections</Form.Label>
					<Textarea
						{...attrs}
						bind:value={$formData.sections}
						placeholder="Enter the professor sections"
					/>
				</Form.Control>

				<Form.FieldErrors />
			</Form.Field>
			<p class="text-sm leading-7 text-muted-foreground">
				Adding section that is > 1 must follow this format section1,sectio2, etc example
				<strong>1234567KK1, 1234567KK2, ... </strong>
			</p>

			<div class="flex justify-end">
				<Form.Button disabled={$submitting} class="relative ">
					{#if $submitting}
						<div
							class="absolute flex h-full w-full items-center justify-center rounded-lg bg-primary"
						>
							<Loader class="h-[15px] w-[15px] animate-spin" />
						</div>
					{/if}
					Add
				</Form.Button>
			</div>
		</form>
	</AlertDialog.Content>
</AlertDialog.Root>
