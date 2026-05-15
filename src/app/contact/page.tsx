import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1310px] px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-[#403D3D] max-w-2xl mx-auto">
          Have a question or need help? We&apos;re here to assist you.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <Card className="rounded-none border-[#E5E7EB]">
          <CardContent className="p-6 text-center">
            <Mail className="h-8 w-8 mx-auto text-[#0F4041] mb-3" />
            <h3 className="font-semibold mb-1">Email</h3>
            <p className="text-sm text-[#403D3D]">support@culturecloset.com</p>
          </CardContent>
        </Card>
        <Card className="rounded-none border-[#E5E7EB]">
          <CardContent className="p-6 text-center">
            <Phone className="h-8 w-8 mx-auto text-[#0F4041] mb-3" />
            <h3 className="font-semibold mb-1">Phone</h3>
            <p className="text-sm text-[#403D3D]">+1 (555) 123-4567</p>
          </CardContent>
        </Card>
        <Card className="rounded-none border-[#E5E7EB]">
          <CardContent className="p-6 text-center">
            <MapPin className="h-8 w-8 mx-auto text-[#0F4041] mb-3" />
            <h3 className="font-semibold mb-1">Location</h3>
            <p className="text-sm text-[#403D3D]">Global — AU, CA, NZ, UK, US</p>
          </CardContent>
        </Card>
      </div>

      <Card className="max-w-xl mx-auto mt-12 rounded-none border-[#E5E7EB]">
        <CardContent className="p-6">
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" className="rounded-none border-[#E5E7EB]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" className="rounded-none border-[#E5E7EB]" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="How can we help?" className="rounded-none border-[#E5E7EB]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" rows={5} placeholder="Tell us more..." className="rounded-none border-[#E5E7EB]" />
            </div>
            <Button className="w-full bg-[#0F4041] hover:bg-[#0a3334] rounded-none">Send Message</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
