<script lang="ts">
	import '../app.css';
	import '@fontsource/poppins';

	const { children } = $props();
</script>

{@render children()}

<style>
	:global(html) {
		font-family: 'Poppins', sans-serif;
	}
</style>
