<script lang="ts">
	import { fromAdminRouteState } from '../_states/fromAdminRoute.svelte';

	const route = fromAdminRouteState();
	route.setRoute('/admin-manage-accounts');
</script>

<div class="min-h-screen border-l-[1px] border-slate-300"></div>
