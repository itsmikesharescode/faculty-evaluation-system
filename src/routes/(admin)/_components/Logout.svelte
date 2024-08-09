<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { LogOut } from 'lucide-svelte';

	interface Props {
		showLogout: boolean;
	}

	let { showLogout = $bindable() }: Props = $props();
</script>

<AlertDialog.Root bind:open={showLogout}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title class="flex items-center gap-[10px]">
				<LogOut />
				Log out
			</AlertDialog.Title>
			<AlertDialog.Description>
				You are about to log out from the ProfEval System.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action>Continue</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
