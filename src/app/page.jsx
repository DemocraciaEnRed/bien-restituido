import AssetSerch from "@/components/admin/asset/asset-serch";
import AssetMap from "@/components/asset-map";
import Image from "next/image";

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
        <AssetSerch />

        <AssetMap />
      </div>
    </div>
  );
}
