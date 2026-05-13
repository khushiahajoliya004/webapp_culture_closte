export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1310px] px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-[#0F0D1A]">About Culture Closet</h1>
      <div className="prose prose-stone max-w-none">
        <p className="text-lg text-[#403D3D] mb-4">
          Culture Closet is the leading marketplace for pre-loved South Asian fashion and decor in
          Australia, Canada, New Zealand, the United Kingdom, and the United States.
        </p>
        <p className="text-[#403D3D] mb-4">
          We believe that every piece of traditional South Asian clothing carries stories,
          tradition, and elegance. Our mission is to give these beautiful garments a second life by
          connecting sellers who want to declutter their wardrobes with buyers seeking affordable,
          sustainable fashion for weddings, festivals, and special occasions.
        </p>
        <p className="text-[#403D3D] mb-4">
          Founded with a passion for sustainability and cultural preservation, Culture Closet has
          grown into a vibrant community of thousands of buyers and sellers who share a love for
          South Asian fashion.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-4 text-[#0F0D1A]">Our Values</h2>
        <ul className="list-disc pl-5 space-y-2 text-[#403D3D]">
          <li>
            <strong>Sustainability</strong> — Reduce fashion waste by giving pre-loved items a new
            home
          </li>
          <li>
            <strong>Accessibility</strong> — Make traditional South Asian fashion affordable and
            accessible
          </li>
          <li>
            <strong>Community</strong> — Build trust between buyers and sellers through transparent
            transactions
          </li>
          <li>
            <strong>Quality</strong> — Ensure every listing meets our standards for condition and
            authenticity
          </li>
        </ul>
      </div>
    </div>
  );
}
