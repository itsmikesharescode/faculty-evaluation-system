<script lang="ts">
	import { initDepRouteState } from './_states/fromDepRoutes.svelte';

	const { children } = $props();

	initDepRouteState();
</script>

{@render children()}
