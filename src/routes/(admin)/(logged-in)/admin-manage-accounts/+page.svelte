<script lang="ts">
	import { fromAdminRouteState } from '../_states/fromAdminRoute.svelte';
	import CreateStudentAccount from './_components/CreateStudentAccount.svelte';
	import RenderStudents from './_components/RenderStudents.svelte';

	const { data } = $props();

	const route = fromAdminRouteState();
	route.setRoute('/admin-manage-accounts');
</script>

<div class="flex min-h-screen flex-col gap-[20px] border-l-[1px] border-slate-300 p-[10px]">
	<div class="">
		<CreateStudentAccount createStudentForm={data.createStudentForm} />
	</div>

	<RenderStudents />
</div>
