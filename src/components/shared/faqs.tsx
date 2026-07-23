import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

function AccordionItemFAQs(props: React.ComponentProps<typeof AccordionItem>) {
  return (
    <AccordionItem
      {...props}
      className={cn(
        "bg-secondary/30 data-[state=open]:bg-card data-[state=open]:border-border rounded-lg border border-transparent px-5 py-2 transition-colors data-[state=open]:shadow-sm lg:px-7",
        props.className,
      )}
    />
  );
}

function AccordionTriggerFAQs(props: React.ComponentProps<typeof AccordionTrigger>) {
  return (
    <AccordionTrigger
      {...props}
      className={cn("[&[data-state=open]>svg]:text-foreground text-base lg:text-lg", props.className)}
    />
  );
}

function AccordionContentFAQs(props: React.ComponentProps<typeof AccordionContent>) {
  return <AccordionContent {...props} className={cn("text-muted-foreground lg:text-base", props.className)} />;
}

export function FAQs() {
  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-6 py-14 md:grid-cols-2 md:gap-14 md:px-10 md:py-25">
      <div className="flex w-full flex-col">
        <h2 className="text-3xl leading-[1.1] font-medium tracking-tighter text-balance md:text-wrap">
          Frequently
          <br />
          Asked <span className="text-muted-foreground">Questions</span>
        </h2>

        <p className="text-muted-foreground mt-1 block text-xs tracking-tighter md:text-xl">
          Everything you need to know about our AI-powered image and video editing tools.
        </p>

        <Button className="mt-4 w-fit" size="lg" asChild>
          <Link href="/tools">Explore Tools</Link>
        </Button>
      </div>

      <Accordion type="single" collapsible defaultValue="free" className="grid w-full gap-4">
        <AccordionItemFAQs value="free">
          <AccordionTriggerFAQs>Are the tools free to use?</AccordionTriggerFAQs>

          <AccordionContentFAQs>
            <p>
              Yes. Many of our image and video editing tools are completely free to use. Premium features may be
              available for advanced workflows.
            </p>
          </AccordionContentFAQs>
        </AccordionItemFAQs>

        <AccordionItemFAQs value="formats">
          <AccordionTriggerFAQs>Which file formats do you support?</AccordionTriggerFAQs>

          <AccordionContentFAQs>
            <p>
              We support popular image formats like JPG, PNG, WebP, AVIF, SVG, GIF, and video formats including MP4,
              MOV, WebM, and more.
            </p>
          </AccordionContentFAQs>
        </AccordionItemFAQs>

        <AccordionItemFAQs value="security">
          <AccordionTriggerFAQs>Are my files secure and private?</AccordionTriggerFAQs>

          <AccordionContentFAQs>
            <p>
              Absolutely. Your files are processed securely and are automatically deleted after processing. We never
              store or share your uploads.
            </p>
          </AccordionContentFAQs>
        </AccordionItemFAQs>

        <AccordionItemFAQs value="limits">
          <AccordionTriggerFAQs>Is there a limit on image compression or editing?</AccordionTriggerFAQs>

          <AccordionContentFAQs>
            <p>
              You can compress, convert, enhance, and edit your files without unnecessary restrictions, making it easy
              to handle projects of any size.
            </p>
          </AccordionContentFAQs>
        </AccordionItemFAQs>

        <AccordionItemFAQs value="ai">
          <AccordionTriggerFAQs>What AI tools are available?</AccordionTriggerFAQs>

          <AccordionContentFAQs>
            <p>
              Our platform includes AI image enhancement, background removal, object removal, image upscaling, file
              compression, format conversion, video editing, and many more creative tools.
            </p>
          </AccordionContentFAQs>
        </AccordionItemFAQs>
      </Accordion>
    </div>
  );
}
