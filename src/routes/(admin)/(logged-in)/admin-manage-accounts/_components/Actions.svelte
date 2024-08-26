<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import type { StudentType } from '$lib/types';
	import { CircleEllipsis } from 'lucide-svelte';
	import type {
		UpdateStudEmailSchema,
		UpdateStudInfoSchema,
		UpdateStudPwdSchema
	} from '../admin-manage-accounts-schema';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import UpdateStudent from './_operations/UpdateStudent.svelte';

	interface Props {
		student: StudentType;
		updateStudEmailForm: SuperValidated<Infer<UpdateStudEmailSchema>>;
		updateStudPwdForm: SuperValidated<Infer<UpdateStudPwdSchema>>;
		updateStudInfoForm: SuperValidated<Infer<UpdateStudInfoSchema>>;
	}

	const { ...props }: Props = $props();

	let updateSignal = $state(false);
	let deleteSignal = $state(false);

	const handleUpdate = () => (updateSignal = true);
	const handleDelete = () => (deleteSignal = true);
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class="flex items-center">
		<CircleEllipsis />
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group class="">
			<DropdownMenu.Item onclick={handleUpdate} class="flex items-center justify-center">
				Update
			</DropdownMenu.Item>
			<DropdownMenu.Item onclick={handleDelete} class="flex items-center justify-center">
				Delete
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<UpdateStudent
	bind:updateSignal
	student={props.student}
	updateStudEmailForm={props.updateStudEmailForm}
	updateStudPwdForm={props.updateStudPwdForm}
	updateStudInfoForm={props.updateStudInfoForm}
/>
