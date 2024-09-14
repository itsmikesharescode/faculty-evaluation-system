<script lang="ts">
  import * as Table from '$lib/components/ui/table';
  import Actions from './Actions.svelte';
</script>

<Table.Root>
  <Table.Caption>No Record</Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head class="w-[3rem]"></Table.Head>
      <Table.Head class="truncate">Teacher Name</Table.Head>
      <Table.Head class="truncate">Department</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each Array(10) as _}
      <Table.Row>
        <Table.Cell>
          <Actions />
        </Table.Cell>
        <Table.Cell class="truncate font-medium">DR Husay</Table.Cell>
        <Table.Cell class="truncate">BSIS</Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
