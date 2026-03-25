import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="font-playfair text-4xl font-bold text-[#1A1A1A] mb-4">Page Not Found</h1>
        <p className="font-inter text-warm-gray mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/">
          <Button className="bg-[#1A1A1A] text-white hover:bg-gold rounded-none font-inter tracking-wide">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
