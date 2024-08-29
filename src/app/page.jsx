import AssetSerch from "@/components/admin/asset/asset-serch";
import AssetMap from "@/components/home/asset-map";
import { Globe, List, LoaderCircle } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AssetListHome from "@/components/home/asset-list-home";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div>
      <header className="flex flex-row text-white bg-[#034EA2] min-h-20 relative overflow-hidden">
        <Image
          src="/escudo.png"
          width={0}
          height={0}
          sizes="100vw"
          alt="escudo"
          className="absolute h-full w-auto bottom-[-30%]  right-1/4"
        />
        <div className="container py-16 w-full relative z-10 bg-[#034EA29C]">
          <h1 className="text-3xl font-bold">Bien Restituido</h1>
          <p className="text-lg font-extralight pt-3 md:w-5/12 w-full">
            Accedé al Registro Nacional y Público de bienes cautelados y
            recuperados del crimen organizado en Argentina.
          </p>
        </div>
      </header>
      <div className="container">
        <h2 className="text-2xl font-bold mr-5 my-5">Buscador de bienes</h2>
        <Suspense
          fallback={
            <div>
              <LoaderCircle className="animate-spin inline" /> Cargando...
            </div>
          }
        >
          <AssetSerch />

          <Tabs defaultValue="list" className="mt-3">
            <TabsList className="w-full justify-end">
              <TabsTrigger value="list">
                <List />
              </TabsTrigger>
              <TabsTrigger value="map">
                <Globe />
              </TabsTrigger>
            </TabsList>
            <TabsContent value="list">
              <AssetListHome />
            </TabsContent>
            <TabsContent value="map">
              <AssetMap />
            </TabsContent>
          </Tabs>
        </Suspense>
      </div>
    </div>
  );
}
