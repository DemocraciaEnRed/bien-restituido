"use client";
import { Button } from "@/components/ui/button";
import { downloadAssets } from "@/lib/actions/home/fetch-data";
import { formatDate, jsonToCsv } from "@/lib/utils";
import { Download } from "lucide-react";
import React from "react";
import { FaFileCsv } from "react-icons/fa6";

const DownloadButton = ({ filter = {} }) => {
  const handleDownload = async () => {
    const now = new Date();
    const assets = await downloadAssets(filter);

    const csvData = new Blob([jsonToCsv(assets)], {
      type: "text/csv",
    });
    const csvURL = URL.createObjectURL(csvData);
    const link = document.createElement("a");
    link.href = csvURL;
    link.download = `${formatDate(now)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button onClick={handleDownload} className="bg-stone-950">
      <span className="mr-2">Descargar base de datos</span>
      <FaFileCsv />
    </Button>
  );
};

export default DownloadButton;
