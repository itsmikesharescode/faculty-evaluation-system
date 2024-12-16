<script lang="ts">
  import { page } from '$app/stores';
  import { adminPaths } from '$lib';
  import { fromSupabaseClient, initSupabase } from '../../_states/fromSupabaseClient.svelte';

  import AdminNav from './_components/AdminNav.svelte';

  import {
    fromManageAccountRouteState,
    initManageAccountRoute
  } from './_states/fromAdminManageAccounts.svelte';
  import {
    fromQuestionnaireRouteState,
    initQuestionnaireRoute
  } from './_states/fromAdminQuestionnaire.svelte';
  import { initAdminRoute } from './_states/fromAdminRoute.svelte';

  const { data, children } = $props();

  initSupabase();
  initAdminRoute();
  initQuestionnaireRoute();
  initManageAccountRoute();

  const questionnaireRoute = fromQuestionnaireRouteState();
  const manageAccountRoute = fromManageAccountRouteState();

  const supabase = fromSupabaseClient();

  $effect(() => {
    questionnaireRoute.setEvaluation($page.data.adminLayoutQ.evaluation_forms);
    manageAccountRoute.setStudents($page.data.adminLayoutQ.students);
    supabase.setClient(data.supabase);
  });
</script>

{#if !($page.url.pathname === '/admin-login')}
  <AdminNav {children} />
{/if}

{#if !adminPaths.includes($page.url.pathname)}
  {@render children()}
{/if}
