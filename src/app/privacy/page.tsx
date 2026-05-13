export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[1310px] px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-[#0F0D1A]">Privacy Policy</h1>
      <div className="prose prose-stone max-w-none text-[#403D3D]">
        <p className="mb-4">
          Culture Closet is committed to protecting your privacy. This Privacy Policy explains how
          we collect, use, and safeguard your personal information.
        </p>
        <h2 className="text-xl font-semibold text-[#0F0D1A] mt-6 mb-3">Information We Collect</h2>
        <p className="mb-4">
          We collect information you provide directly, such as your name, email, address, and
          payment information. We also collect usage data to improve our platform.
        </p>
        <h2 className="text-xl font-semibold text-[#0F0D1A] mt-6 mb-3">How We Use Your Information</h2>
        <p className="mb-4">
          We use your information to process transactions, communicate with you, and improve our
          services. We never sell your personal information to third parties.
        </p>
        <h2 className="text-xl font-semibold text-[#0F0D1A] mt-6 mb-3">Security</h2>
        <p className="mb-4">
          We implement industry-standard security measures to protect your data. All payment
          processing is handled securely by Stripe.
        </p>
      </div>
    </div>
  );
}
