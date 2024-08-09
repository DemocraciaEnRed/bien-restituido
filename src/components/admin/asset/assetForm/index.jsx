"use client";
import React, { useState } from "react";
import { useFormState } from "react-dom";

import { redirect, useRouter } from "next/navigation";
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
// import { useS3Upload } from "next-s3-upload";
// import { logDOM } from "@testing-library/react";

const FormAsset = () => {
  const router = useRouter();
  // let { uploadToS3 } = useS3Upload();
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

  const [tab, setActiveTab] = useState([assetFormSteps[0].slug]);

  const submit = async (event) => {
    event.preventDefault();
    let tabs = [];
    let form = document.getElementById("assetForm");
    Object.keys(form.elements).forEach((key) => {
      const item = form.elements[key];
      
      if (
        item.classList.contains("omittedButton") ||
        item.classList.contains("submitButton")
      )
      return;

      const label = item.parentNode.getElementsByTagName("label")[0];

      const input = item.parentNode.getElementsByTagName("button")[0] || item;

      if (!item.checkValidity()) {
        tabs.push(item.closest(".accordionItem").dataset.slug);
        label?.classList.add("!text-red-600");
        input.classList.add("border-red-600");
        input.classList.add("text-red-600");
        if (item.type === "radio") label?.classList.add("!border-red-600");
      } else {
        label?.classList.remove("!text-red-600");
        input.classList.remove("border-red-600");
        input.classList.remove("text-red-600");
        if (item.type === "radio") label?.classList.remove("!border-red-600");
      }
    });
    setActiveTab([...new Set(tabs)]);
    const data = new FormData(form);

    const value = Object.fromEntries(data.entries());

    Object.keys(value).forEach((key) => {
      if (value[key] instanceof File) {
        // const { url } = uploadToS3(value[key]);
        value[key] = value[key].name;
      }
      if (value[key] === "on") value[key] = true;
    });

    if (form.checkValidity()) {
      try {
        // const assetBigData = {
        //   ...generalData,
        //   ...assetData,
        //   ...judicialData,
        //   ...destinationData,
        // };
        // Object.keys(assetBigData).forEach((key) => {
        //   if (assetBigData[key] instanceof File) {
        //     // const { url } = uploadToS3(assetBigData[key]);
        //     assetBigData[key] = assetBigData[key].name;
        //   }
        // });

        const asset = await saveAsset(value);
        if (asset === "ok") router.push("/admin/bien");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const [errorMessage, dispatch] = useFormState(submit, undefined);
  return (
    <div className="flex">
      <div className="w-3/4 p-3">
        <form id="assetForm">
          <Accordion
            type="multiple"
            defaultValue={tab}
            onValueChange={setActiveTab}
          >
            {assetFormSteps.map((step, idx) => (
              <AccordionItem
                key={step.slug}
                value={step.slug}
                className="border-b-0 my-2 accordionItem"
                data-slug={step.slug}
              >
                <div className="rounded-2xl w-full bg-gray-50 border border-gray-100  px-3">
                  <AccordionTrigger className="py-2 omittedButton">
                    {step.title}
                  </AccordionTrigger>
                  <AccordionContent
                    forceMount={true}
                    hidden={!tab.includes(step.slug)}
                    className="border-t-2 pt-3"
                  >
                    {step.component}
                  </AccordionContent>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
          <Button onClick={submit} className="submitButton">
            Enviar
          </Button>
        </form>
      </div>
      {/* <div className="w-1/4 border-l-2 border-l-slate-500 p-3">
        {assetFormSteps.map((step, idx) => (
          <div key={idx}>
            <p>{step.title}</p>
            {step.data &&
              Object.keys(step.data).map((key) => (
                <p key={idx + key}>{step.data[key]}</p>
              ))}
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default FormAsset;
