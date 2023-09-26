'use client'
import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Subcategoria,
  Categoria,
  Provincia,
  Poblacion,
  Estado,
} from "@/interfaces/interfaces";
import {
  fetchCategorias,
  fetchProvincias,
  fetchSubcategorias,
  fetchPoblaciones,
  fetchEstados,
} from "@/services/api";

export interface AnuncioData {
  titulo: string;
  description: string;
  imagen: string;
  precio: number;
  telefono: string;
  subcategoria: string;
  estado: string;
  user: string;
  provincia: string;
  cod_postal: string;
}

const AnunciosAdd: React.FC = () => {
  const [categoria, setCategoria] = useState("");
  const [subcategoria, setSubCategoria] = useState("");
  const [provincia, setProvincia] = useState("");
  const [poblacion, setPoblacion] = useState("");
  const [estado, setEstado] = useState("");
  const [titulo, setTitulo] = useState("");

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [provincias, setProvincias] = useState<Provincia[]>([]);
  const [subcategorias, setSubcategorias] = useState<Subcategoria[]>([]);
  const [poblaciones, setPoblaciones] = useState<Poblacion[]>([]);
  const [estados, setEstados] = useState<Estado[]>([]);
  const [anuncio, setAnuncio] = useState<AnuncioData>({
    titulo: "",
    description: "",
    imagen: "",
    precio: 0,
    telefono: "",
    subcategoria: "",
    estado: "",
    user: "",
    provincia: "",
    cod_postal: "",
  });

  const apiurl: string =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

  const handleCategoriaChange = async (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    const selectedIndex = event.target.selectedIndex;
    const selectedText = event.target.options[selectedIndex].text;
    setCategoria(selectedText);
    setSubcategorias(await fetchSubcategorias(selectedValue));
  };

  const handleProvinciasChange = async (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setProvincia(selectedValue);
    setPoblaciones(await fetchPoblaciones(selectedValue));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(anuncio)
  };

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
        <form
          onSubmit={handleSubmit}
          className="mt-4 mb-4 w-4/5 py-5 bg-white mx-auto px-4 rounded-lg border shadow-lg"
        >
          <h1 className="text-center text-xl font-bold">Publicar anuncio</h1>
          <div className="grid grid-cols-2 gap-4 p-4">
            <div>
              <div>
                <label htmlFor="categoria" className="text-gray-700 font-bold">
                  Categoría:
                </label>
                <select
                  id="categoria"
                  name="categoria"
                  required
                  onChange={handleCategoriaChange}
                  
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-gray-700"
                >
                  <option value=""></option>
                  {categorias.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="subcategoria"
                  className="text-gray-700 font-bold"
                >
                  Subcategoria:
                </label>
                <select
                  id="subcategoria"
                  name="subcategoria"
                  value={subcategoria}
                  required
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
              </div>
              <div>
                <label htmlFor="provincia" className="text-gray-700 font-bold">
                  Provincia:
                </label>
                <select
                  id="provincia"
                  name="provincia"
                  value={provincia}
                  required
                  onChange={handleProvinciasChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-gray-700"
                >
                  <option value=""></option>
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
                  value={poblacion}
                  onChange={(e) => setPoblacion(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-gray-700"
                >
                  <option value=""></option>
                  {poblaciones.length > 0 &&
                    poblaciones.map((p) => (
                      <option key={p.codigo} value={p.codigo}>
                        {p.nombre}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="estado" className="text-gray-700 font-bold">
                  Estado:
                </label>
                <select
                  id="estado"
                  name="estado"
                  value={estado}
                  required
                  onChange={(e) => setEstado(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-gray-700"
                >
                  <option value=""></option>
                  {estados.length > 0 &&
                    estados.map((e) => (
                      <option key={e.id} value={e.titulo}>
                        {e.titulo}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label htmlFor="titulo" className="text-gray-700 font-bold">
                  Título:
                </label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  value={titulo}
                  required
                  onChange={(e) => setTitulo(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-gray-700"
                />
              </div>
              <div>
                <label htmlFor="precio" className="text-gray-700 font-bold">
                  Precio:
                </label>
                <input
                  type="number"
                  id="precio"
                  name="precio"
                  value={0}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-gray-700"
                />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="descripcion" className="mx-4 text-gray-700 font-bold">
              Descripción:
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              required
              value="Eemplo"
              className="w-full mx-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-gray-700"
            >435345</textarea>
          </div>
          <div className="mt-10">
            <button type="submit" className="flex flex-row btn-primary mx-auto">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AnunciosAdd;
