import AssetSerch from "@/components/admin/asset/asset-serch";

export default function Home() {
  return (
    <div>
      <header className="flex flex-row text-white bg-[#034EA2] min-h-20">
        <div className="container py-16 w-full">
          <h1 className="text-3xl font-bold">Bien Restituido</h1>
          <p className="text-lg font-extralight pt-3 w-5/12">Accedé al Registro Nacional y Público de bienes cautelados y recuperados del crimen organizado en Argentina.</p>
        </div>

      </header>
      <div className="container">
        <h2 className="text-2xl font-bold mr-5 my-5">Buscador de bienes</h2>
        <AssetSerch />
      </div>
    </div>
  );
}
