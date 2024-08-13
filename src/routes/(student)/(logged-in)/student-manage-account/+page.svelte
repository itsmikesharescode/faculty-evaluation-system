<script lang="ts">
	import { fromStudentRouteState } from '../_states/fromStudentRoute.svelte';
	import { CircleUser } from 'lucide-svelte';
	import UpdateAccountInformation from './_components/UpdateAccountInformation.svelte';
	import UpdateAccountPassword from './_components/UpdateAccountPassword.svelte';
	import UpdateAccountEmail from './_components/UpdateAccountEmail.svelte';

	const { data } = $props();

	const route = fromStudentRouteState();
	route.setRoute('/student-manage-account');
</script>

<div class="min-h-screen border-l-[1px] border-slate-300">
	<div class="p-[0.625rem] md:p-[1.25rem]">
		<div class="flex flex-wrap items-center gap-[20px] bg-primary p-[10px] md:flex-nowrap">
			<CircleUser class="h-full w-[60px] p-[10px] text-white " />
			<div class="text-white">
				<p class="font-semibold leading-7">Account Information</p>
				<p class="text-sm leading-7">
					Frequent updates to your account information may disrupt data synchronization. Please
					exercise caution when making changes.
				</p>
			</div>
		</div>
	</div>

	<div class="grid gap-[20px] bg-secondary p-[0.625rem] md:grid-cols-2 md:p-[1.25rem]">
		<div class="bg-white p-[2rem]">
			<UpdateAccountInformation updateAccInfoForm={data.updateAccInfoForm} />
		</div>
		<div class="flex flex-col gap-[20px] bg-white p-[2rem]">
			<UpdateAccountPassword updatePwdForm={data.updatePwdForm} />

			<UpdateAccountEmail updateEmailForm={data.updateEmailForm} />
		</div>
	</div>
</div>
