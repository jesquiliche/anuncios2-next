import { Anuncio } from "@/interfaces/interfaces";
import styles from "./page.module.css";
import { fetchAnunciosById } from "@/services/api";

export default async function Detalle({ params }) {
  const { id } = params;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost/400/api/v1";
  const api_images=process.env.NEXT_PUBLIC_IMAGES_URL;

  const cargaDatos = async () => {
    const anuncio = await fetchAnunciosById(apiUrl+"/anuncios", id);
    return anuncio;
  };

  const anuncio = await cargaDatos();

  return (
    <main className={styles.main}>
      <div className="p-20">
      <div className="w-3/5 p-5 mt-5 rounded-lg shadow-lg mx-auto bg-white">
    
        <h1 className="text-center text-3xl mt-2">{`Subcategoria : ${anuncio.subcategoria.nombre}`}</h1>
        <img className="mt-5 rounded-lg shadow-md w-full" src={`${api_images}${anuncio.imagen}`} alt={anuncio.titulo} />
        <h1 className="text-center text-5xl">{id}</h1>
      </div>
      </div>
    </main>
  );
}
