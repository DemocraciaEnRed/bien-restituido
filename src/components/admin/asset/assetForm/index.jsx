"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { useToast } from "@/components/ui/use-toast";

import GeneralInfo from "./general-info";
import AssetInfo from "./asset-info";
import JudicialProcess from "./judicial-process";
import DestinationInfo from "./destination-info";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaCircleCheck, FaCircleMinus, FaCircleXmark } from "react-icons/fa6";
import {
  editAsset,
  saveAsset,
} from "@/lib/actions/admin/asset-actions/asset-client";
import { togglePublish } from "@/lib/actions/admin/asset-actions/asset";

const FormAsset = ({ assetEdit }) => {
  const router = useRouter();
  const { toast } = useToast();

  const assetFormSteps = [
    {
      title: "Información general",
      slug: "informacion-general",
      component: <GeneralInfo assetEdit={assetEdit} />,
    },
    {
      title: "Información del bien",
      slug: "informacion-bien",
      component: <AssetInfo assetEdit={assetEdit} />,
    },
    {
      title: "Proceso Judicial",
      slug: "proceso-judicial",
      component: <JudicialProcess assetEdit={assetEdit} />,
    },
    {
      title: "Información destino",
      slug: "informacion-destino",
      component: <DestinationInfo assetEdit={assetEdit} />,
    },
  ];

  const [tab, setActiveTab] = useState(assetFormSteps[0].slug);
  const [incompleteTab, setIncompleteTab] = useState(null);

  const handleTab = (value) => {
    setActiveTab(value);
  };
  const handleNextStep = (value) => {
    const currentStep = assetFormSteps.find((step) => step.slug === tab);
    const index = assetFormSteps.indexOf(currentStep);
    const step = value === "next" ? index + 1 : index - 1;
    setActiveTab(assetFormSteps[step].slug);
  };

  const submit = async (event) => {
    event.preventDefault();
    let tabs = [];
    let form = document.getElementById("assetForm");
    Object.keys(form.elements).forEach((key) => {
      const item = form.elements[key];
      if (item instanceof RadioNodeList) return;

      if (
        item.classList.contains("omittedButton") ||
        item.classList.contains("submitButton")
      )
        return;

      const label = item.parentNode.getElementsByTagName("label")[0];

      const input = item.parentNode.getElementsByTagName("button")[0] || item;

      if (!item.checkValidity()) {
        tabs.push(item.closest(".tabContent").dataset.slug);
        label?.classList.add("!text-red-600");
        input.classList.add("!border-red-600");
        input.classList.add("!text-red-600");
        if (item.type === "radio") label?.classList.add("!border-red-600");
      } else {
        label?.classList.remove("!text-red-600");
        input.classList.remove("!border-red-600");
        input.classList.remove("!text-red-600");
        if (item.type === "radio") label?.classList.remove("!border-red-600");
      }
    });
    setIncompleteTab([...new Set(tabs)]);
    const data = new FormData(form);

    const formData = Object.fromEntries(data.entries());

    const realFormData = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key] instanceof File) {
        realFormData.append(key, formData[key], formData[key].name);
      } else {
        if (formData[key] === "on") formData[key] = true;
        realFormData.append(key, formData[key]);
      }
    });

    if (form.checkValidity()) {
      try {
        let resp;
        if (assetEdit) resp = await editAsset(assetEdit._id, realFormData);
        else resp = await saveAsset(realFormData);

        if (resp.status === 200) {
          router.push(`/admin/bien/editar/${resp.asset._id}`);
          router.refresh();
        }
      } catch (err) {
        toast({
          description: err.message,
          variant: "destructive",
        });
      }
    }
  };

  const renderTabTrigger = (step, idx) => {
    if (incompleteTab)
      return (
        <TabsTrigger
          key={step.slug}
          value={step.slug}
          onClick={() => handleTab(step.slug)}
          className={
            "text-base whitespace-pre-line text-start h-full bg-white p-2 rounded-2xl border-2 w-full justify-between gap-2 " +
            (incompleteTab.includes(step.slug)
              ? "border-red-600 text-red-500"
              : "border-green-600 text-green-500")
          }
        >
          {idx + 1}. {step.title}
          {incompleteTab.includes(step.slug) ? (
            <FaCircleXmark size={25} className="text-red-500" />
          ) : (
            <FaCircleCheck size={25} className="text-green-500" />
          )}
        </TabsTrigger>
      );

    return (
      <TabsTrigger
        key={step.slug}
        value={step.slug}
        onClick={() => handleTab(step.slug)}
        className="text-base whitespace-pre-line text-start h-full bg-white p-2 rounded-2xl border-2 w-full justify-between gap-2 "
      >
        {idx + 1}. {step.title}
        <FaCircleMinus size={25} />
      </TabsTrigger>
    );
  };

  return (
    <div>
      <form id="assetForm" className="flex">
        <div className="w-3/4 p-3">
          <Tabs value={tab} className="mb-4">
            <TabsList className={`h-auto w-full grid grid-cols-4 gap-4`}>
              {assetFormSteps.map((step, idx) => renderTabTrigger(step, idx))}
            </TabsList>
            {assetFormSteps.map((step, idx) => (
              <TabsContent
                className="bg-white p-5 rounded-2xl border-2 tabContent"
                forceMount={true}
                key={step.slug}
                value={step.slug}
                hidden={!tab.includes(step.slug)}
                data-slug={step.slug}
              >
                {step.component}
              </TabsContent>
            ))}
          </Tabs>
          <div className="text-right">
            {assetFormSteps[0].slug !== tab && (
              <Button
                type="button"
                className="mx-2"
                onClick={() => handleNextStep("back")}
              >
                Anterior
              </Button>
            )}
            {assetFormSteps.slice(-1)[0].slug !== tab && (
              <Button
                type="button"
                className="mx-2"
                onClick={() => handleNextStep("next")}
              >
                Siguiente
              </Button>
            )}
          </div>
        </div>
        {assetEdit && (
          <input
            type="checkbox"
            name="publish"
            hidden
            readOnly
            checked={assetEdit.publish}
            id=""
          />
        )}
        <div className="w-1/4 p-3 pt-24">
          {(assetFormSteps.slice(-1)[0].slug === tab || assetEdit) && (
            <Button onClick={submit} className="submitButton w-full my-2">
              Guardar
            </Button>
          )}
          {assetEdit && (
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                togglePublish(assetEdit._id);
              }}
              className="submitButton w-full my-2"
            >
              {assetEdit.publish ? "Despublicar" : "Publicar"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormAsset;



