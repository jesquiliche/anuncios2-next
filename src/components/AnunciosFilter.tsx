'use client'
import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Subcategoria,
  Categoria,
  Provincia,
  Poblacion,
  Estado,
  Anuncios
} from "@/interfaces/interfaces";
import {
  fetchCategorias,
  fetchProvincias,
  fetchSubcategorias,
  fetchPoblaciones,
  fetchEstados,
  fetchAnuncios,
} from "@/services/api";

const AnunciosFilter: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [provincias, setProvincias] = useState<Provincia[]>([]);
  const [selectedCategoria, setSelectedCategoria] = useState<string>("");
  const [subcategorias, setSubcategorias] = useState<Subcategoria[]>([]);
  const [poblaciones, setPoblaciones] = useState<Poblacion[]>([]);
  const [estados, setEstados] = useState<Estado[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [anuncios, setAnuncios] = useState<Anuncios>();
  const [loading, setLoading] = useState(false);

  const handleCategoriaChange = async (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setSubcategorias(await fetchSubcategorias(selectedValue));
  };

  const handleProvinciasChange = async (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setPoblaciones(await fetchPoblaciones(selectedValue));
  };

 

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setCategorias(await fetchCategorias());
        setProvincias(await fetchProvincias());
        setEstados(await fetchEstados());
        setAnuncios(await fetchAnuncios()); 
        alert(anuncios)
        // ...
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-4 w-11/12 gap-4 mx-auto">
      <div className="col-span-1 border-0 shadow-lg mt-10 p-5 rounded-lg">
        <h1 className="text-center text-xl font-bold">¿Qué estás buscando?</h1>
        <form className="items-center space-y-4 mt-4 mb-4">
          <div>
            <label htmlFor="desdeFecha" className="text-gray-700 font-bold">
              Desde fecha:
            </label>
            <input
              type="date"
              id="desdeFecha"
              name="desdeFecha"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label htmlFor="hastaFecha" className="text-gray-700 font-bold">
              Hasta fecha:
            </label>
            <input
              type="date"
              id="hastaFecha"
              name="hastaFecha"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label htmlFor="categoria" className="text-gray-700 font-bold">
              Categoría:
            </label>
            <select
              id="categoria"
              name="categoria"
              value={selectedCategoria}
              onChange={handleCategoriaChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">Selecciona una categoría</option>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="subcategoria" className="text-gray-700 font-bold">
              Subcategoria:
            </label>
            <select
              id="subcategoria"
              name="subcategoria"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">Selecciona una Subcategoria</option>
              {subcategorias.length > 0 &&
                subcategorias.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nombre}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label htmlFor="provincia" className="text-gray-700 font-bold">
              Provincia:
            </label>
            <select
              id="provincia"
              name="provincia"
              onChange={handleProvinciasChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">Selecciona una provincia</option>
              {provincias.map((p) => (
                <option key={p.codigo} value={p.codigo}>
                  {p.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="poblacion" className="text-gray-700 font-bold">
              Población:
            </label>
            <select
              id="poblacion"
              name="poblacion"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">Selecciona una población</option>
              {poblaciones.length > 0 &&
                poblaciones.map((p) => (
                  <option key={p.codigo} value={p.codigo}>
                    {p.nombre}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label htmlFor="estado" className="text-gray-700 font-bold">
              Estado:
            </label>
            <select
              id="estado"
              name="estado"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">Selecciona un estado</option>
              {estados.length > 0 &&
                estados.map((e) => (
                  <option key={e.id} value={e.titulo}>
                    {e.titulo}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label htmlFor="search" className="text-gray-700 font-bold">
              Búsqueda:
            </label>
            <input
              type="text"
              id="search"
              name="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <button
              type="submit"
              className="px-4 mt-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Buscar
            </button>
          </div>
        </form>
      </div>
      <div className="col-span-3 border-0 shadow-lg mt-10 p-5 rounded-lg w-full">
        {anuncios?.data.map(a=>(
          <h1 className="text-3xl">{a.titulo}</h1>

        ))}
      </div>
    </div>
  );
};

export default AnunciosFilter;
