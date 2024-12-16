<script lang="ts">
  import { fromManageAccountRouteState } from '../../_states/fromAdminManageAccounts.svelte';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import * as Table from '$lib/components/ui/table';
  import Actions from './Actions.svelte';
  import type { DeleteProgramSchema, UpdateProgramSchema } from '../admin-programs-schema';
  import { page } from '$app/stores';

  interface Props {
    updateProgramForm: SuperValidated<Infer<UpdateProgramSchema>>;
    deleteProgramForm: SuperValidated<Infer<DeleteProgramSchema>>;
  }

  const { updateProgramForm, deleteProgramForm }: Props = $props();
</script>

<Table.Root>
  <Table.Caption>A list of all programs</Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head class="w-fit"></Table.Head>
      <Table.Head class="truncate">Program Name</Table.Head>
      <Table.Head class="truncate">Program Code</Table.Head>
      <Table.Head class="truncate">Created At</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each $page.data.adminLayoutQ.programs as program}
      <Table.Row>
        <Table.Cell>
          <Actions {program} {updateProgramForm} {deleteProgramForm} />
        </Table.Cell>
        <Table.Cell class="">{program.name}</Table.Cell>
        <Table.Cell class="">{program.code}</Table.Cell>
        <Table.Cell class="truncate">
          {new Date(program.created_at).toLocaleDateString()} @ {new Date(
            program.created_at
          ).toLocaleTimeString()}
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
