<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';

  interface Props {
    firstVisit: boolean;
  }

  let { firstVisit = $bindable() }: Props = $props();

  const handleContinue = () => {
    localStorage.setItem('policy', 'accepted');
  };
</script>

<AlertDialog.Root bind:open={firstVisit}>
  <AlertDialog.Content class="flex max-h-screen max-w-[70dvw] flex-col  md:max-h-[70dvh]">
    <h1 class="mb-4 text-3xl font-bold">Privacy Policy</h1>
    <div class="flex overflow-auto">
      <div class="mx-auto max-w-4xl p-6">
        <p class="mb-6">
          This Privacy Policy outlines how ProfEval System collects, uses, and protects the personal
          information of users, including students and administrators. We are committed to ensuring
          the privacy and security of your data.
        </p>

        <h2 class="mb-3 text-2xl font-semibold">Information We Collect</h2>
        <div class="mb-6">
          <h3 class="text-xl font-medium">Student Information:</h3>
          <ul class="list-disc pl-6">
            <li>Name</li>
            <li>Student ID</li>
            <li>Email address</li>
            <li>Evaluation responses</li>
          </ul>
        </div>

        <div class="mb-6">
          <h3 class="text-xl font-medium">Administrator Information:</h3>
          <ul class="list-disc pl-6">
            <li>Name</li>
            <li>Email address</li>
            <li>Password</li>
          </ul>
        </div>

        <h2 class="mb-3 text-2xl font-semibold">How We Use Your Information</h2>
        <ul class="mb-6 list-disc pl-6">
          <li>
            <strong>To provide services:</strong> We use your information to deliver the services you
            have requested, such as allowing students to evaluate professors and administrators to manage
            the evaluation process.
          </li>
          <li>
            <strong>To improve our services:</strong> We may use your information to analyze usage patterns,
            identify trends, and improve our website and services.
          </li>
          <li>
            <strong>To communicate with you:</strong> We may use your contact information to send you
            important updates, notifications, or marketing communications.
          </li>
        </ul>

        <h2 class="mb-3 text-2xl font-semibold">Sharing Your Information</h2>
        <p class="mb-6">We may share your information with:</p>
        <ul class="mb-6 list-disc pl-6">
          <li>
            <strong>Third-party service providers:</strong> We may engage third-party service providers
            to help us operate our website and services. These providers will only have access to your
            information as needed to perform their functions.
          </li>
          <li>
            <strong>Law enforcement:</strong> We may disclose your information to law enforcement authorities
            if required by law or to protect our rights or the rights of others.
          </li>
        </ul>

        <h2 class="mb-3 text-2xl font-semibold">Your Rights</h2>
        <ul class="mb-6 list-disc pl-6">
          <li>
            <strong>Access your information:</strong> You can request access to the personal information
            we hold about you.
          </li>
          <li>
            <strong>Correct your information:</strong> You can request that we correct any inaccurate
            or incomplete information.
          </li>
          <li>
            <strong>Delete your information:</strong> You can request that we delete your personal information.
          </li>
        </ul>

        <h2 class="mb-3 text-2xl font-semibold">Security</h2>
        <p class="mb-6">
          We implement appropriate technical and organizational measures to protect your personal
          information from unauthorized access, disclosure, alteration, or destruction. However, no
          method of transmission over the internet or electronic storage is completely secure.
        </p>

        <h2 class="mb-3 text-2xl font-semibold">Changes to This Policy</h2>
        <p class="mb-6">
          We may update this Privacy Policy from time to time. We will notify you of any significant
          changes by posting a notice on our website.
        </p>

        <h2 class="mb-3 text-2xl font-semibold">Contact Us</h2>
        <p class="mb-6">
          If you have any questions about this Privacy Policy or our practices, please contact us.
        </p>
      </div>
    </div>

    <AlertDialog.Footer>
      <AlertDialog.Action onclick={handleContinue}>Continue</AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
