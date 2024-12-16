<script lang="ts">
  import type { Infer, SuperValidated } from 'sveltekit-superforms';
  import type { DeleteProfSchema, UpdateProfSchema } from '../admin-records-schema';
  import * as Table from '$lib/components/ui/table';
  import Actions from './Actions.svelte';
  import Sections from '$lib/components/general/Sections.svelte';
  import { getScoreDescription } from '../_helpers/getScoreDescription';
  import Subjects from '$lib/components/general/Subjects.svelte';
  import type { ProfessorType } from '$lib/types';

  interface Props {
    updateProfForm: SuperValidated<Infer<UpdateProfSchema>>;
    deleteProfForm: SuperValidated<Infer<DeleteProfSchema>>;
    filteredProgram: ProfessorType[];
  }

  const { filteredProgram, updateProfForm, deleteProfForm }: Props = $props();
</script>

<Table.Root>
  <Table.Caption>
    <!-- {#if departmentRoute.getDepProf(depRoute.getRoute())?.length}
      A list of professors for <strong>{depRoute.getRoute()}</strong>.
    {:else}
      There is no professor present for <strong>{depRoute.getRoute()}</strong>.
    {/if} -->
  </Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head class="max-w-fit"></Table.Head>
      <Table.Head class="truncate">Professor Name</Table.Head>
      <Table.Head class="truncate">Created At</Table.Head>
      <Table.Head class="truncate">Subjects</Table.Head>
      <Table.Head class="truncate">Section</Table.Head>
      <Table.Head class="truncate">Final Grade</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each filteredProgram ?? [] as professor}
      <Table.Row>
        <Table.Cell>
          <Actions {professor} {updateProfForm} {deleteProfForm} />
        </Table.Cell>
        <Table.Cell class="truncate font-medium">{professor.fullname}</Table.Cell>
        <Table.Cell class="truncate">
          {new Date(professor.created_at).toLocaleDateString()} @
          {new Date(professor.created_at).toLocaleTimeString()}
        </Table.Cell>
        <Table.Cell class="truncate">
          {#if professor.subjects.split(',').length > 1}
            <Subjects subjects={professor.subjects.split(',')} />
          {:else}
            <span>{professor.subjects}</span>
          {/if}
        </Table.Cell>

        <Table.Cell class="truncate">
          {#if professor.sections.split(',').length > 1}
            <Sections sections={professor.sections.split(',')} />
          {:else}
            <span>{professor.sections}</span>
          {/if}
        </Table.Cell>
        <Table.Cell class="truncate"
          >{professor.final_grade ? getScoreDescription(Number(professor.final_grade)) : 'N/A'}
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
