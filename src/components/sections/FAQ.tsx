import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { homepageFAQs } from "@/data/content";

export default function FAQ() {
  return (
    <section id="faq" className="section-padding bg-warm-white" aria-labelledby="faq-heading">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold" aria-hidden="true" />
              <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold font-medium">Common Questions</span>
              <div className="h-px w-8 bg-gold" aria-hidden="true" />
            </div>
            <h2 id="faq-heading" className="font-playfair text-3xl md:text-4xl font-bold text-[#1A1A1A]">Frequently Asked Questions</h2>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {homepageFAQs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white border border-warm-border rounded-sm px-6 data-[state=open]:border-gold/50 transition-colors duration-200">
                <AccordionTrigger className="font-inter text-sm font-semibold text-[#1A1A1A] hover:text-gold py-5 hover:no-underline text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-inter text-sm text-warm-gray leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
