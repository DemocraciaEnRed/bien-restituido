import AssetSerch from "@/components/admin/asset/asset-serch";
import AssetMap from "@/components/home/asset-map";
import { Globe, List, LoaderCircle } from "lucide-react";
import { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AssetListHome from "@/components/home/asset-list-home";
import BannerHome from "@/components/home/banner";
import DownloadButton from "@/components/admin/asset/download-button";

export const dynamic = "force-dynamic";

export default function Home({ searchParams: { estado, search, page } }) {
  const destination = estado;
  return (
    <div>
      <BannerHome />
      <div className="container">
        <div className="mt-3 flex justify-between items-center">
          <h2 className="text-2xl font-bold mr-5 my-5">Buscador de bienes</h2>
          <DownloadButton filter={{ archivedAt: null, search: search }} />
        </div>
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
              <AssetListHome
                filter={{
                  destination,
                  search,
                  page: page || 1,
                  limit: 20,
                  publish: true,
                }}
              />
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
