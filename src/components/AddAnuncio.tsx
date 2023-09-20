'use client'
import React, {useState,useEffect, ChangeEvent} from "react"
import {Subcategoria,Categoria,Provincia,Poblacion,Estado,  Anuncios,
} from "@/interfaces/interfaces";
import {fetchCategorias, fetchProvincias, fetchSubcategorias,
  fetchPoblaciones,fetchEstados,fetchAnuncios
} from "@/services/api";

export default async function AddAnuncio() {
 
 //Campos utilizados para los valores de búsqueda
 //en la llamada a la api
 const [categoria, setCategoria] = useState("");
 const [subcategoria, setSubCategoria] = useState("");
 const [provincia, setProvincia] = useState("");
 const [poblacion, setPoblacion] = useState("");
 const [estado, setEstado] = useState("");
 const [titulo, setTitulo] = useState("");
 const [startDate, setStartDate] = useState("");
 const [endDate, setEndDate] = useState("");

 //Estados para reelenar los litBox
 const [categorias, setCategorias] = useState<Categoria[]>([]);
 const [provincias, setProvincias] = useState<Provincia[]>([]);
 const [subcategorias, setSubcategorias] = useState<Subcategoria[]>([]);
 const [poblaciones, setPoblaciones] = useState<Poblacion[]>([]);
 const [estados, setEstados] = useState<Estado[]>([]);
 const [anuncios, setAnuncios] = useState<Anuncios>();

 //URL de la api
 const apiurl: string =
   process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

   useEffect(() => {
    const fetchData = async () => {
      try {
        setCategorias(await fetchCategorias());
        setProvincias(await fetchProvincias());
        setEstados(await fetchEstados());
               
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="p-20">
        <div className="mt-10 grid grid-cols-2 gap-4 w-4/5 p-8 rounded-lg shadow-lg mx-auto bg-white">
          <div className="col-span-2">
            <h1 className="text-2xl font-bold mt-3">Añadir Anuncio</h1>
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div className="border p-2 rounded-lg shadow-lg h-full bg-slate-100">
                <label className="font-bold">Categoría</label>
                <select
                id="categoria"
                name="categoria"
              
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-gray-700"
              >
                <option value=""></option>
                {categorias.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombre}
                  </option>
                ))}
              </select>
                
                <label className="font-bold">Subcategoría</label>
                <select
                id="subcategoria"
                name="subcategoria"
                value={subcategoria}
                onChange={(e) => setSubCategoria(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-gray-700"
              >
                <option value=""></option>
                {subcategorias.length > 0 &&
                  subcategorias.map((s) => (
                    <option key={s.id} value={s.nombre}>
                      {s.nombre}
                    </option>
                  ))}
              </select>
                
                
                <label className="font-bold">Población</label>
                
                <label className="font-bold">Fecha</label>
                
                
              </div>
              <div className="border p-2 rounded-lg shadow-lg h-full bg-slate-100">
              <label className="font-bold">Precio</label>
                <label className="font-bold">Estado</label>
                
                <label className="font-bold">Vendedor</label>
                
                <label className="font-bold">Teléfono</label>
                

              </div>
            </div>
           
            <div className="mt-5 bg-slate-100 rounded-lg shadow-lg p-2">
            <h1 className="text-center font-bold text-2xl">Descripción</h1>
              <h1 className="mt-5 text-1xl text-justify">Descripción</h1>
            </div>
          </div>

      
        </div>
      </div>
    </>
  );
}
