<script lang="ts">
  import { fromAdminRouteState } from '../_states/fromAdminRoute.svelte';
  import CreateProgram from './_components/CreateProgram.svelte';
  import RenderPrograms from './_components/RenderPrograms.svelte';

  const { data } = $props();

  const route = fromAdminRouteState();
  route.setRoute('/admin-programs');
</script>

<div class="flex min-h-screen flex-col gap-[20px] border-l-[1px] border-slate-300 p-[10px]">
  <div class="">
    <CreateProgram createProgramForm={data.createProgramForm} />
  </div>

  <RenderPrograms
    updateProgramForm={data.updateProgramForm}
    deleteProgramForm={data.deleteProgramForm}
  />
</div>
