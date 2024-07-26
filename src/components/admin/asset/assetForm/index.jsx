"use client";
import React, { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import GeneralInfo from "./general-info";
import AssetInfo from "./asset-info";
import JudicialProcess from "./judicial-process";
import DestinationInfo from "./destination-info";
import { Button } from "@/components/ui/button";
import { saveAsset } from "@/lib/server-actions/admin/asset-actions/asset";

const FormAsset = () => {
  const [generalData, setGeneralData] = useState({});
  const [assetData, setAssetData] = useState({});
  const [judicialData, setJudicialData] = useState({});
  const [destinationData, setDestinationtData] = useState({});

  const assetFormSteps = [
    {
      title: "Información general",
      slug: "informacion-general",
      component: <GeneralInfo setGeneralData={setGeneralData} />,
      data: generalData,
    },
    {
      title: "Información del bien",
      slug: "informacion-bien",
      component: <AssetInfo setAssetData={setAssetData} />,
      data: assetData,
    },
    {
      title: "Proceso Judicial",
      slug: "proceso-judicial",
      component: <JudicialProcess setJudicialData={setJudicialData} />,
      data: judicialData,
    },
    {
      title: "Información destino",
      slug: "informacion-destino",
      component: <DestinationInfo setDestinationtData={setDestinationtData} />,
      data: destinationData,
    },
  ];

  const submit = () => {
    saveAsset({ ...generalData, ...assetData });
  };

  const [tab, setActiveTab] = useState(assetFormSteps[0].slug);
  return (
    <div className="flex">
      <div className="w-3/4 p-3">
        <Accordion
          type="single"
          defaultValue={tab}
          onValueChange={setActiveTab}
          collapsible
        >
          {assetFormSteps.map((step, idx) => (
            <AccordionItem
              key={step.slug}
              value={step.slug}
              className="border-b-0 my-2"
            >
              <div className="rounded-2xl w-full bg-gray-50 border border-gray-100  px-3">
                <AccordionTrigger className="py-2">
                  {step.title}
                </AccordionTrigger>
                <AccordionContent
                  forceMount={true}
                  hidden={step.slug !== tab}
                  className="border-t-2 pt-3"
                >
                  {step.component}
                </AccordionContent>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
        <Button onClick={submit}>enviar</Button>
      </div>
      <div className="w-1/4 border-l-2 border-l-slate-500 p-3">
        {assetFormSteps.map((step, idx) => (
          <div key={idx}>
            <p>{step.title}</p>
            {step.data &&
              Object.keys(step.data).map((key) => (
                <p key={idx + key}>{step.data[key]}</p>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormAsset;
