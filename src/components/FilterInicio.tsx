"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Subcategoría,
  Categoria,
  Provincia,
  Poblacion,
} from "../interfaces/interfaces";
import {
  fetchCategorias,
  fetchProvincias,
  fetchSubcategorias,
  fetchPoblaciones,
} from "@/services/api";

const FilterInicio: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [provincias, setProvincias] = useState<Provincia[]>([]);
  const [selectedCategoria, setSelectedCategoria] = useState<string>("");
  const [subcategorias, setSubcategorias] = useState<Subcategoría[]>([]);
  const [poblaciones, setPoblaciones] = useState<Poblacion[]>([]);

  const handleCategoriaChange = async (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setSelectedCategoria(selectedValue);
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
        const categoriasData = await fetchCategorias();
        const provinciasData = await fetchProvincias();
        // Realiza las demás solicitudes según sea necesario
        // Luego, actualiza los estados con los datos obtenidos
        setCategorias(categoriasData);
        setProvincias(provinciasData);
        // ...
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="border-0 shadow-lg mt-20 p-5 rounded-lg bg-slate-200 w-4/5 mx-auto">
      <h1 className="text-center text-3xl font-bold">¿Qué estás buscando?</h1>
      <form className="flex items-center space-x-4 mt-8 mb-4">
        <div className="flex-1">
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
        <div className="flex-1">
          <label htmlFor="subcategoria" className="text-gray-700 font-bold">
            Subcategoría:
          </label>
          <select
            id="subcategoria"
            name="subcategoria"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">Selecciona una subcategoría</option>
            {subcategorias.length > 0 &&
              subcategorias.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nombre}
                </option>
              ))}
          </select>
        </div>
        <div className="flex-1">
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
        <div className="flex-1">
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
          <button
            type="submit"
            className="px-4 mt-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterInicio;
