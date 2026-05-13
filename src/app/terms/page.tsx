export default function TermsPage() {
  return (
    <div className="mx-auto max-w-[1310px] px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-[#0F0D1A]">Terms of Service</h1>
      <div className="prose prose-stone max-w-none text-[#403D3D]">
        <p className="mb-4">
          Welcome to Culture Closet. By using our platform, you agree to these Terms of Service.
          Please read them carefully.
        </p>
        <h2 className="text-xl font-semibold text-[#0F0D1A] mt-6 mb-3">1. Account Registration</h2>
        <p className="mb-4">
          You must be at least 18 years old to create an account. You are responsible for
          maintaining the confidentiality of your account information.
        </p>
        <h2 className="text-xl font-semibold text-[#0F0D1A] mt-6 mb-3">2. Buying and Selling</h2>
        <p className="mb-4">
          Sellers must accurately describe items and their condition. Buyers must pay promptly upon
          purchase. All sales are final unless the item is significantly not as described.
        </p>
        <h2 className="text-xl font-semibold text-[#0F0D1A] mt-6 mb-3">3. Prohibited Items</h2>
        <p className="mb-4">
          Counterfeit goods, prohibited substances, and items that violate intellectual property
          rights are not allowed on Culture Closet.
        </p>
        <h2 className="text-xl font-semibold text-[#0F0D1A] mt-6 mb-3">4. Platform Fees</h2>
        <p className="mb-4">
          Culture Closet charges a platform fee on each transaction. Current fees are displayed in
          your seller dashboard.
        </p>
      </div>
    </div>
  );
}
