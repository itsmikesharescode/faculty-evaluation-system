<script lang="ts">
  import { fromManageAccountRouteState } from '../../_states/fromAdminManageAccounts.svelte';
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import * as Table from '$lib/components/ui/table';
  import Actions from './Actions.svelte';
  import Sections from '$lib/components/general/Sections.svelte';
  import type { DeleteProgramSchema, UpdateProgramSchema } from '../admin-programs-schema';

  interface Props {
    updateProgramForm: SuperValidated<Infer<UpdateProgramSchema>>;
    deleteProgramForm: SuperValidated<Infer<DeleteProgramSchema>>;
  }

  const { updateProgramForm, deleteProgramForm }: Props = $props();

  const manageAccountRoute = fromManageAccountRouteState();
</script>

<Table.Root>
  <Table.Caption>A list of student accounts</Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head class="w-fit"></Table.Head>
      <Table.Head class="truncate">Program Name</Table.Head>
      <Table.Head class="truncate">Program Code</Table.Head>
      <Table.Head class="truncate">Created At</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each Array(5) as _}
      <Table.Row>
        <Table.Cell>
          <Actions {updateProgramForm} {deleteProgramForm} />
        </Table.Cell>
        <Table.Cell class="">Bachelor of Science in Information Tech</Table.Cell>
        <Table.Cell class="">BSIT</Table.Cell>
        <Table.Cell class="truncate">{new Date()}</Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
