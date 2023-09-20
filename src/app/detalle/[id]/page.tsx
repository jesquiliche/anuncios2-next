
import styles from "./page.module.css";
import { fetchAnunciosById } from "@/services/api";

export default async function Detalle({ params }: { params: { id: string } }) {
  const { id } = params;
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost/400/api/v1";
  const api_images = process.env.NEXT_PUBLIC_IMAGES_URL;

  const cargaDatos = async () => {
    const anuncio = await fetchAnunciosById(apiUrl + "/anuncios", id);
    return anuncio;
  };

  const anuncio = await cargaDatos();
  
  const fecha = new Date(anuncio.createdAt);
  const fechaFormateada = fecha.toLocaleDateString(undefined);

  return (
    <main className={styles.main}>
      <div className="p-20">
        <div className="mt-10 grid grid-cols-2 gap-4 w-4/5 p-8 rounded-lg shadow-lg mx-auto bg-white">
          <div className="col-span-2">
            <h1 className="text-2xl font-bold mt-3">{anuncio.titulo}</h1>
            <div className="grid grid-cols-2 gap-4 mt-3">
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
            <img
              className="mt-5 rounded-lg shadow-md w-full"
              src={`${api_images}${anuncio.imagen}`}
              alt={anuncio.titulo}
            />

            <div className="mt-5 bg-slate-100 rounded-lg shadow-lg p-2">
            <h1 className="text-center font-bold text-2xl">Descripción</h1>
              <h1 className="mt-5 text-1xl text-justify">{anuncio.description}</h1>
            </div>
          </div>

      
        </div>
      </div>
    </main>
  );
}
