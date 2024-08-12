<script lang="ts">
	import { fromAdminRouteState } from '../_states/fromAdminRoute.svelte';
	import RenderEvals from './_components/RenderEvals.svelte';
	import CreateEval from './_components/CreateEval.svelte';

	const route = fromAdminRouteState();

	route.setRoute('/admin-questionnaire');
</script>

<div class="min-h-screen border-l-[1px] border-slate-300 p-[10px]">
	<div class="flex flex-col gap-[10px]">
		<CreateEval />
		<RenderEvals />
	</div>
</div>
