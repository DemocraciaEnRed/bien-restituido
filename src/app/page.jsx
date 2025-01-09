import AssetSerch from "@/components/admin/asset/asset-serch";
import AssetMap from "@/components/home/asset-map";
import { Globe, List, LoaderCircle } from "lucide-react";
import { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AssetListHome from "@/components/home/asset-list-home";
import BannerHome from "@/components/home/banner";
import DownloadButton from "@/components/admin/asset/download-button";
import { assetDestination } from "@/lib/utils/constants";
import { getCategories } from "@/lib/actions/home/fetch-data";

export const dynamic = "force-dynamic";

export default async function Home({
  searchParams: { estado, search, page, categoria },
}) {
  const destination = estado
    ? assetDestination.find((destination) => destination.slug === estado).value
    : null;
  const Categories = await getCategories();
  const category = categoria
    ? Categories.find((category) => category.slug === categoria)._id
    : null;

  return (
    <div className="mt-[theme(height.nav)]">
      <BannerHome />
      <div className="container">
        <div className="mt-3 flex justify-between md:items-center flex-col md:flex-row mb-3">
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
          <Tabs defaultValue="list">
            <TabsList className="w-full justify-end">
              <AssetSerch categories={Categories} />
              {/* <div className="p-1 ml-3 bg-stone-950 rounded-lg flex">
                <TabsTrigger value="list">
                  <List />
                </TabsTrigger>
                <TabsTrigger value="map">
                  <Globe />
                </TabsTrigger>
              </div> */}
            </TabsList>
            <TabsContent value="list">
              <div className="my-8 text-xl font-light">
                La herramienta cuenta con los datos de los bienes decomisados y
                cautelados en una serie de causas judiciales tramitadas por ante
                la Justicia Federal. No es posible brindar información sobre la
                totalidad de los bienes secuestrados por el Poder Judicial de la
                Nación debido a que Argentina no cuenta con un registro
                unificado en la materia.
                <br />
                Desde el Proyecto Bien Restituido buscamos transparentar esta
                información para que las organizaciones sociales y la ciudadanía
                puedan monitorear e impulsar una política efectiva de
                reutilización social de los bienes.
              </div>
              <AssetListHome
                filter={{
                  destination,
                  search,
                  page: page || 1,
                  limit: 20,
                  publish: true,
                  category,
                }}
              />
            </TabsContent>
            {/* <TabsContent value="map">
              <AssetMap />
            </TabsContent> */}
          </Tabs>
        </Suspense>
      </div>
    </div>
  );
}
