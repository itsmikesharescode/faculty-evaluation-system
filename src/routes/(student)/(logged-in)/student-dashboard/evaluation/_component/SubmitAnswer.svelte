<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { fromDashboardRouteState } from '../../../_states/fromDashboardRoute.svelte';
  import { enhance } from '$app/forms';
  import { Loader } from 'lucide-svelte';
  import { answerFormatter } from '../_helpers/answerFormatter';
  import type { ResultModel } from '$lib/types';
  import { toast } from 'svelte-sonner';
  import { goto } from '$app/navigation';

  let { comment }: { comment: string } = $props();

  const dashboardRoute = fromDashboardRouteState();

  let submitLoader = $state(false);

  const submitAnsEvent: SubmitFunction = () => {
    submitLoader = true;
    return async ({ result, update }) => {
      const { status, data } = result as ResultModel<{ msg: string }>;

      switch (status) {
        case 200:
          toast.success('', { description: data.msg });
          await goto('/student-dashboard');
          break;

        case 401:
          toast.error('', { description: data.msg });
          break;
      }
      await update();
      submitLoader = false;
    };
  };
</script>

<form method="post" action="?/submitAnsEvent" use:enhance={submitAnsEvent}>
  <input name="profObj" type="hidden" value={JSON.stringify(dashboardRoute.getActiveProf())} />
  <input name="comment" type="hidden" value={comment} />
  <input
    name="answersArr"
    type="hidden"
    value={JSON.stringify(answerFormatter(dashboardRoute.getAnswers(), 5))}
  />
  <Button disabled={submitLoader} type="submit" class="relative">
    {#if submitLoader}
      <div class="absolute flex h-full w-full items-center justify-center rounded-lg bg-primary">
        <Loader class="h-[15px] w-[15px] animate-spin" />
      </div>
    {/if}
    Submit Answers
  </Button>
</form>
