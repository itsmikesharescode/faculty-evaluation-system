<script lang="ts">
	import { fromAdminRouteState } from '../_states/fromAdminRoute.svelte';

	const route = fromAdminRouteState();
	route.setRoute('/admin-manage-accounts');
</script>
