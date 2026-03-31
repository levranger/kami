import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { servicePages } from "@/data/content";

const SERVICES_IMAGE =
  "https://mgx-backend-cdn.metadl.com/generate/images/1059255/2026-03-25/e1af882e-f03a-4728-9967-697ac37319ce.png";

export default function ServicesGrid() {
  return (
    <section id="services" className="section-padding bg-warm-white" aria-labelledby="services-heading">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold" />
            <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold font-medium">Our Treatments</span>
            <div className="h-px w-8 bg-gold" />
          </div>
          <h2 id="services-heading" className="font-playfair text-3xl md:text-4xl font-bold text-[#1A1A1A]">Premium Services</h2>
          <p className="font-inter text-warm-gray mt-3 max-w-lg mx-auto text-sm leading-relaxed">
            Advanced aesthetic treatments tailored to your unique needs, delivered with expertise and the latest technology.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="space-y-6">
            {servicePages.slice(0, 3).map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>

          <div className="hidden lg:block relative rounded-sm overflow-hidden">
            <Image
              src={SERVICES_IMAGE}
              alt="Luxury treatment environment at Kami Aesthetics Aventura"
              fill
              className="object-cover"
              sizes="33vw"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-playfair text-white text-lg font-semibold">Where Science<br />Meets Beauty</p>
            </div>
          </div>

          <div className="space-y-6">
            {servicePages.slice(3, 6).map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: { slug: string; title: string; shortDescription: string } }) {
  return (
    <div className="bg-white border border-warm-border p-6 rounded-sm hover-lift group">
      <h3 className="font-playfair text-lg font-semibold text-[#1A1A1A] mb-2 group-hover:text-gold transition-colors duration-200">{service.title}</h3>
      <p className="font-inter text-sm text-warm-gray leading-relaxed mb-4">{service.shortDescription}</p>
      <Link href={`/services/${service.slug}`}>
        <Button variant="link" className="p-0 h-auto font-inter text-xs tracking-wider uppercase text-[#1A1A1A] hover:text-gold group/btn">
          Learn More
          <ArrowRight className="ml-1.5 h-3 w-3 group-hover/btn:translate-x-1 transition-transform duration-200" />
        </Button>
      </Link>
    </div>
  );
}
