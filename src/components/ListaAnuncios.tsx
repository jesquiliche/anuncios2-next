import React from "react";
import { Anuncio } from "@/interfaces/interfaces";

interface Props{
    anuncios?:Anuncio[]
}

const api_images = process.env.NEXT_PUBLIC_IMAGES_URL;

const ListaAnuncios = ({anuncios}:Props) => {
  return (
    <>
      <h1 className="text-xl text-center font-bold ">
        Anuncios de segunda mano
      </h1>

      <div className="grid grid-cols-3 mt-2 gap-4 h-full pb-10">
        {anuncios?.map((a) => (
          <div className="grid-col-1 mb-1 rounded-lg border shadow-lg bg-slate-100 p-2 flex flex-col justify-between">
            <div>
              <h1 className="text-1xl text-center font-semibold">{a.subcategoria.nombre}</h1>
              <h1 className="text-1xl text-center font-semibold">{a.precio} €</h1>
              <img
               
                src={`${api_images}${a.imagen}`}
                className="w-full h-40 rounded-lg shadow-md mt-2"
                alt={a.titulo}
              />
              <h1 className="text-1xl text-center font-semibold mt-2">{a.titulo}</h1>
              <h1 className="text-1xl mt-2">{a.description}</h1>
            </div>
            <a className="text-center px-4 mt-1 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:bg-blue-600">
              Ver
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListaAnuncios;
