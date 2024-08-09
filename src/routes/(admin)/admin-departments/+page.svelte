<script lang="ts">
	import { fromAdminRouteState } from '../_states/fromAdminRoute.svelte';

	const route = fromAdminRouteState();
	route.setRoute('/admin-departments');
</script>
