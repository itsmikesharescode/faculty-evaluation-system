<script lang="ts">
	import { initDepartmentsRoute } from '../_states/fromAdminDepartments.svelte';

	const { children } = $props();

	initDepartmentsRoute();
</script>

{@render children()}
