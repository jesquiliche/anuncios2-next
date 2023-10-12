import CarruselFotos from "@/components/CarrusellFotos";
import styles from "./page.module.css";
import { fetchAnunciosById, fetchFotos } from "@/services/api";

export default async function Detalle({ params }: { params: { id: string } }) {
  const { id } = params;
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost/4000/api/v1";
  const api_images = process.env.NEXT_PUBLIC_IMAGES_URL;

  const anuncio = await fetchAnunciosById(id);
  const fotos = await fetchFotos(id);
  const fecha = new Date(anuncio.createdAt);
  const fechaFormateada = fecha.toLocaleDateString(undefined);

  return (
    <main className={styles.main}>
      <div className="p-4 w-11/12 mx-auto bg-white mt-5 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto">
          <div className="col-span-1 bg-white">
            <h1 className="text-shadow-red text-sm font-bold italic justify-end md:text-3xl">
              {Math.round(anuncio.precio)} €
            </h1>
            {/*    <img
              className="mt-5 rounded-lg mx-auto "
              src={`${api_images}${anuncio.imagen}`}
              alt={anuncio.titulo}
  />*/}
            <CarruselFotos data={fotos} mainImage={anuncio.imagen} />
          </div>

          <div className="col-span-2 px-4 bg-white">
            <h1 className="text-2xl font-bold mt-3 text-center">
              {anuncio.titulo}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div className="border p-2 rounded-lg shadow-lg h-full bg-slate-100">
                <label className="font-bold">Categoría</label>
                <h2 className="text-1xl">{`${anuncio.subcategoria.categoria.nombre}`}</h2>

                <label className="font-bold">Subcategoría</label>
                <h2 className="text-1xl">{`${anuncio.subcategoria.nombre}`}</h2>
                <label className="font-bold">Población</label>
                <h2 className="text-1xl">{`${anuncio.cod_postal}-${anuncio.poblacion.nombre}`}</h2>
                <label className="font-bold">Fecha</label>

                <h2 className="text-1xl">{fechaFormateada}</h2>
              </div>
              <div className="border p-2 rounded-lg shadow-lg h-full bg-slate-100">
                <label className="font-bold">Precio</label>
                <h2 className="text-1xl">{`${anuncio.precio} Euros`}</h2>
                <label className="font-bold">Estado</label>
                <h2 className="text-1xl">{`${anuncio.estado.titulo} Euros`}</h2>
                <label className="font-bold">Vendedor</label>
                <h2 className="text-1xl">{anuncio.user.name}</h2>
                <label className="font-bold">Teléfono</label>
                <h2 className="text-1xl">{anuncio.telefono}</h2>
              </div>
            </div>

            <div className="mt-5 bg-slate-100 rounded-lg shadow-lg p-2">
              <h1 className="text-center font-bold text-2xl">Descripción</h1>
              <h1 className="mt-5 text-1xl text-justify">
                {anuncio.description}
              </h1>
            </div>
          </div>
          {/*   <div className="px-4 col-span-3">
          {fotos.length>0 && 
          <CarruselFotos data={fotos} />}
          </div>*/}
        </div>
      </div>
    </main>
  );
}
