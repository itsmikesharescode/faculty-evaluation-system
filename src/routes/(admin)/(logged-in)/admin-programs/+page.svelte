<script lang="ts">
  import { fromAdminRouteState } from '../_states/fromAdminRoute.svelte';
  import CreateProgram from './_components/CreateProgram.svelte';
  import RenderStudents from './_components/RenderPrograms.svelte';

  const { data } = $props();

  const route = fromAdminRouteState();
  route.setRoute('/admin-manage-accounts');
</script>

<div class="flex min-h-screen flex-col gap-[20px] border-l-[1px] border-slate-300 p-[10px]">
  <div class="">
    <CreateProgram createProgramForm={data.createProgramForm} />
  </div>

  <RenderStudents
    updateProgramForm={data.updateProgramForm}
    deleteProgramForm={data.deleteProgramForm}
  />
</div>
