import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

const items = [
  {
    id: 1,
    name: "Pro Plan",
    image: "https://placehold.co/64x64/png",
    price: "$29.00",
    quantity: 1,
  },
  {
    id: 2,
    name: "Team License",
    image: "https://placehold.co/64x64/png",
    price: "$19.00",
    quantity: 2,
  },
];

export default function CheckoutPage() {
  return (
    <div className="bg-card pt-36 pb-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col px-4 lg:flex-row">
        <div className="mx-auto w-full">
          <h2 className="px-3 py-6 text-2xl leading-none font-semibold">Payment details</h2>

          <div className="paddle-checkout-frame w-full" />
        </div>

        <div className="bg-background flex w-full flex-col gap-4 rounded-lg p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <img src={items[0].image} alt={items[0].name} className="h-8.5 w-8.5 object-cover" />
              <h2 className="text-2xl leading-none font-semibold">{items[0].name}</h2>
            </div>
            <p className="text-muted-foreground pt-1 text-sm whitespace-nowrap">+{items.length - 1} more</p>
          </div>

          <div className="flex flex-col">
            <p>$29.00 now</p>
            <p className="text-muted-foreground mt-1 text-sm">Then $19.00/month after 14 days</p>
          </div>

          <Accordion
            type="single"
            collapsible
            className="bg-background lg:bg-card mx-auto w-full rounded-lg"
            defaultValue="order-summary"
          >
            <AccordionItem value="order-summary">
              <AccordionTrigger className="text-md cursor-pointer px-4 hover:no-underline">
                <h3 className="text-md">Show order summary</h3>
              </AccordionTrigger>

              <AccordionContent className="px-4">
                <div className="mt-4">
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 text-sm">
                        <img src={item.image} alt={item.name} className="h-8.5 w-8.5 rounded-lg object-cover" />

                        <div className="w-0 min-w-0 flex-1">
                          <p className="truncate font-medium">{item.name}</p>

                          <div className="flex items-center justify-between">
                            <p className="text-muted-foreground">{item.price}</p>

                            <span className="text-muted-foreground">x{item.quantity}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-col gap-2">
                    <Separator className="mb-1 w-full" />

                    <div className="flex justify-between">
                      <p className="text-muted-foreground">Subtotal</p>
                      <p>$67.00</p>
                    </div>

                    <div className="flex justify-between">
                      <p className="text-muted-foreground">Discount</p>
                      <p>-$5.00</p>
                    </div>

                    <div className="flex justify-between">
                      <p className="text-muted-foreground">Tax</p>
                      <p>$3.00</p>
                    </div>

                    <Separator className="my-1 w-full" />

                    <div className="flex justify-between">
                      <p className="text-muted-foreground">Total</p>
                      <p>$65.00</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
