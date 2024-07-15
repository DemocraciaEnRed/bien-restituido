import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { assetFormSteps } from "@/lib/utils/constants";

const FormAsset = () => {
  return (
    <Accordion type="single" collapsible>
      {assetFormSteps.map((step) => (
        <AccordionItem key={step.slug} value={step.slug} className="border-b-0">
          <div className="rounded-2xl w-full bg-gray-50 border border-gray-100  px-3">
            <AccordionTrigger className="py-2">{step.title}</AccordionTrigger>
            <AccordionContent className="border-t-2 pt-3">
              {step.component}
            </AccordionContent>
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FormAsset;
