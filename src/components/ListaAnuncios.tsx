import React from "react";
import { Anuncio } from "@/interfaces/interfaces";
import Link from "next/link";


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

      <div className="grid grid-cols-3 mt-2 gap-4 pb-10">
        {anuncios?.map((a) => (
          
          <div  key={a.id} className="grid-col-1 mb-1 rounded-lg border shadow-lg bg-slate-100  p-2 flex flex-col justify-between hover:bg-slate-200">
           <Link href={`/detalle/${a.id}`}>
            <div>
              <h1 className="text-1xl text-center font-bold">{a.subcategoria.nombre}</h1>
              <h1 className="text-1xl text-center text-red-500 italic font-bold">{a.precio} €</h1>
              
              <img
               
                src={`${api_images}${a.imagen}`}
                className="w-full  rounded-lg shadow-md mt-2"
                alt={a.titulo}
              />
              {/*<h1 className="text-1xl text-center font-bold mt-2">{a.poblacion.nombre}</h1>*/}
              <h1 className="text-1xl text-center font-semibold mt-2">{a.titulo}</h1>
              <h1 className="text-1xl mt-2">{a.description}</h1>
            </div>
            </Link> 
          </div>
          
        ))}
      </div>
    </>
  );
};

export default ListaAnuncios;
