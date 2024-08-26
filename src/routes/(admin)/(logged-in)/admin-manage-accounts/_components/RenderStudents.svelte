<script lang="ts">
	import { fromManageAccountRouteState } from '../../_states/fromAdminManageAccounts.svelte';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import type {
		UpdateStudEmailSchema,
		UpdateStudInfoSchema,
		UpdateStudPwdSchema
	} from '../admin-manage-accounts-schema';
	import * as Table from '$lib/components/ui/table';
	import Actions from './Actions.svelte';

	interface Props {
		updateStudEmailForm: SuperValidated<Infer<UpdateStudEmailSchema>>;
		updateStudPwdForm: SuperValidated<Infer<UpdateStudPwdSchema>>;
		updateStudInfoForm: SuperValidated<Infer<UpdateStudInfoSchema>>;
	}

	const { ...props }: Props = $props();

	const manageAccountRoute = fromManageAccountRouteState();
</script>

<Table.Root>
	<Table.Caption>A list of student accounts</Table.Caption>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-[100px]"></Table.Head>
			<Table.Head class="truncate">Student Name</Table.Head>
			<Table.Head class="truncate">ID Number</Table.Head>
			<Table.Head class="truncate">Year Level</Table.Head>
			<Table.Head class="truncate">Section</Table.Head>
			<Table.Head class="truncate">Course</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each manageAccountRoute.getStudents() ?? [] as student}
			<Table.Row>
				<Table.Cell>
					<Actions
						{student}
						updateStudEmailForm={props.updateStudEmailForm}
						updateStudPwdForm={props.updateStudPwdForm}
						updateStudInfoForm={props.updateStudInfoForm}
					/>
				</Table.Cell>
				<Table.Cell class="font-medium">{student.user_meta_data.fullname}</Table.Cell>
				<Table.Cell class="truncate">{student.user_meta_data.id_number}</Table.Cell>
				<Table.Cell class="truncate">{student.user_meta_data.year_level}</Table.Cell>
				<Table.Cell class="truncate">{student.user_meta_data.section}</Table.Cell>
				<Table.Cell class="truncate">{student.user_meta_data.course}</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
