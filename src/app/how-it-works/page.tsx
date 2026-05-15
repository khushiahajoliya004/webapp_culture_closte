import { Card, CardContent } from "@/components/ui/card";
import { Camera, Star, Truck, ShoppingBag, Heart, MessageSquare } from "lucide-react";

const buyerSteps = [
  { icon: ShoppingBag, title: "Browse Collection", desc: "Explore thousands of pre-loved South Asian outfits and accessories" },
  { icon: Heart, title: "Select & Pay", desc: "Choose your favorites and checkout securely with Stripe" },
  { icon: Truck, title: "Get Your Items", desc: "Receive your order and enjoy your new-to-you fashion" },
];

const sellerSteps = [
  { icon: Camera, title: "Create Listing", desc: "Take great photos and write an honest description" },
  { icon: Star, title: "Set Price", desc: "Be fair and consider the original price and condition" },
  { icon: Truck, title: "Ship & Earn", desc: "Pack carefully and ship promptly to earn great reviews" },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-[1310px] px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">How Culture Closet Works</h1>
        <p className="text-[#403D3D] max-w-2xl mx-auto">
          Whether you&apos;re buying or selling, we make it easy to participate in sustainable South Asian fashion.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card className="rounded-none border-[#E5E7EB]">
          <CardContent className="p-5 md:p-8">
            <h2 className="text-xl font-bold text-[#0F4041] mb-6">For Buyers</h2>
            <div className="space-y-6">
              {buyerSteps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0F4041]/10 flex items-center justify-center shrink-0">
                    <step.icon className="h-5 w-5 text-[#0F4041]" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="text-sm text-[#403D3D]">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-none border-[#E5E7EB]">
          <CardContent className="p-5 md:p-8">
            <h2 className="text-xl font-bold text-[#D57429] mb-6">For Sellers</h2>
            <div className="space-y-6">
              {sellerSteps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#D57429]/10 flex items-center justify-center shrink-0">
                    <step.icon className="h-5 w-5 text-[#D57429]" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="text-sm text-[#403D3D]">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-[#FFF2F0] rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Why Choose Culture Closet?</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div>
            <h3 className="font-semibold mb-2">Authentic Pieces</h3>
            <p className="text-sm text-[#403D3D]">
              Every item is verified by our community of sellers who take pride in their wardrobe
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Secure Payments</h3>
            <p className="text-sm text-[#403D3D]">
              Your transactions are protected with Stripe&apos;s industry-leading security
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Community Support</h3>
            <p className="text-sm text-[#403D3D]">
              Our team is here to help with any questions about buying or selling
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
