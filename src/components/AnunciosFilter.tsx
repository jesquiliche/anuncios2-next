"use client";
import { useSession } from "next-auth/react";
import React, { useState, useEffect, ChangeEvent } from "react";
import Link from "next/link";

import {
  Subcategoria,
  Categoria,
  Provincia,
  Poblacion,
  Estado,
  Anuncios,
} from "@/interfaces/interfaces";
import {
  fetchCategorias,
  fetchProvincias,
  fetchSubcategorias,
  fetchPoblaciones,
  fetchEstados,
  fetchAnuncios,
} from "@/services/api";
import SearchIcon from "./icons/SearchIcon";

const AnunciosFilter: React.FC = () => {
  const api_images = process.env.NEXT_PUBLIC_IMAGES_URL;
  const { data: session } = useSession();

  //Paginación
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [totalPages, setTotalPages] = useState(0);

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

  //Monta la URL a partir de los campos de busqueda informados
  function construirURL() {
    // Crea una nueva URL
    const url = new URL(apiurl + "/anuncios");

    //Establece la página inicial y el número de elementros por página
    url.searchParams.set("page", page.toString());
    url.searchParams.set("limit", limit.toString());

    // Accede a los estados locales del componente y agrega los parámetros correspondientes a la URL
    if (startDate) {
      url.searchParams.set("fecha_desde", startDate);
    }
    //alert(startDate)

    if (endDate) {
      url.searchParams.set("fecha_hasta", endDate);
    }

    if (categoria) {
      url.searchParams.set("categoria", categoria);
    }

    if (subcategoria) {
      url.searchParams.set("subcategoria", subcategoria);
    }

    if (poblacion) {
      url.searchParams.set("cod_postal", poblacion);
    }
    if (provincia) {
      url.searchParams.set("provincia", provincia);
    }

    if (estado) {
      url.searchParams.set("estado", estado);
    }

    if (titulo) {
      url.searchParams.set("titulo", titulo);
    }

    // Devuelve la URL completa como una cadena
    return url.toString();
  }

  //Cuando una nueva Categoría se cambia refresca/rellena
  //el combo asociado a partir del id de la categoria
  const handleCategoriaChange = async (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    const selectedIndex = event.target.selectedIndex; // Índice de la opción seleccionada
    const selectedText = event.target.options[selectedIndex].text;
    setCategoria(selectedText);
    setSubcategorias(await fetchSubcategorias(selectedValue));
  };

  //Cuando se selecciona la provincia rellena el combo
  //de poblaciones con las poblaciones correspondientes
  //a la provincia
  const handleProvinciasChange = async (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setProvincia(selectedValue);
    setPoblaciones(await fetchPoblaciones(selectedValue));
  };

  //Ejecutar Filtro
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita que se recargue la página por defecto al enviar el formulario
    setPage(1);
    const data = await fetchAnuncios(construirURL());
    setTotalPages(data.totalPages);
    setAnuncios(data);
  };

  const retrocedePagina = () => {
    if (page > 1) {
      setPage(page - 1); // Resta 1 para retroceder de página si no estás en la primera página
    }
  };

  const avanzaPagina = () => {
    if (page < totalPages) {
      setPage(page + 1); // Suma 1 para avanzar de página si no estás en la última página
    }
  };
  //Inicializar combos
  useEffect(() => {
    const fetchData = async () => {
      try {
        setCategorias(await fetchCategorias());
        setProvincias(await fetchProvincias());
        setEstados(await fetchEstados());
        const data = await fetchAnuncios(
          apiurl + "/anuncios?limit=" + limit.toString() + "&page=1"
        );

        await setTotalPages(data.totalPages);

        setAnuncios(data);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    fetchData();
  }, []);

  // Función para manejar la eliminación de un anuncio
  const handleBorrarAnuncio = async (id: Number) => {
    try {
      const confirmarBorrado = window.confirm(
        "¿Estás seguro de que quieres borrar este anuncio?"
      );
      if (!confirmarBorrado) {
        // Si el usuario confirma, ejecuta la eliminación
        return;
      }
      const token = session?.user.token;
      const response = await fetch(apiurl + `/anuncios/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Utiliza el token JWT de la sesión
        },
      });

      if (response.ok) {
        // Si la eliminación fue exitosa, actualiza la lista de anuncios
        const data = await fetchAnuncios(construirURL());
        setAnuncios(data);
      } else {
        // Maneja el caso en que la eliminación no sea exitosa
        console.error("Error al eliminar el anuncio");
        const msg = await response.json();
        console.log(msg);
        alert(msg);
      }
    } catch (error) {
      alert(error);
      console.error("Error al eliminar el anuncio:", error);
    }
  };

  //Refresca los anuncios siempre que se cambie de página
  useEffect(() => {
    const refrescar = async () => {
      const data = await fetchAnuncios(construirURL());

      await setTotalPages(data.totalPages);
      setAnuncios(data);
    };
    refrescar();
  }, [page]);

  const RenderPagination: React.FC = () => {
    return (
      <>
        <h4 className="text-center font-semibold">
          {page} de {totalPages}{" "}
        </h4>
        <div className="flex flex-col items-center mb-2">
          <div className="inline-flex mt-2 xs:mt-0">
            <button
              className="flex items-center justify-center px-3 h-8 text-md font-medium text-white bg-gray-500 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={retrocedePagina}
            >
              <svg
                className="w-3.5 h-3.5 mr-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 5H1m0 0 4 4M1 5l4-4"
                />
              </svg>
              Anterior
            </button>
            <button
              onClick={avanzaPagina}
              className="flex items-center justify-center px-3 h-8 text-md font-medium text-white bg-gray-500 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Siguiente
              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
     <div className="grid grid-cols-1 mx-auto md:grid-cols-1 lg:grid-cols-5  container lg:gap-4 py-28">
        <div className="w-full mx-auto border shadow-lg p-4 rounded-lg  bg-white">
          <h1 className="text-center text-xl font-bold">
            ¿Qué estás buscando?
          </h1>
          <form
            onSubmit={handleSubmit}
            className="items-center space-y-4 mt-4 mb-4"
          >
            {/*  <div>
              <label htmlFor="desdeFecha" className="text-gray-700 font-bold">
                Desde fecha:
              </label>
              <input
                type="date"
                id="desdeFecha"
                name="desdeFecha"
                value={startDate}
                onChange={(e) => {setStartDate(e.target.value)
                  alert(e.target.value)}
                  
                }
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-gray-700"
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
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-gray-700"
              />
            </div>
              */}
            <div>
              <label htmlFor="categoria" className="text-gray-700 font-bold">
                Categoría:
              </label>
              <select
                id="categoria"
                name="categoria"
                onChange={handleCategoriaChange}
                className="form-control w-full"
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
              <label htmlFor="subcategoria" className="text-gray-700 font-bold">
                Subcategoria:
              </label>
              <select
                id="subcategoria"
                name="subcategoria"
                value={subcategoria}
                onChange={(e) => setSubCategoria(e.target.value)}
                className="form-control w-full"
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
                onChange={handleProvinciasChange}
                className="form-control w-full"
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
                className="form-control w-full"
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
            <div>
              <label htmlFor="estado" className="text-gray-700 font-bold">
                Estado:
              </label>
              <select
                id="estado"
                name="estado"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="form-control w-full"
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
              <label htmlFor="search" className="text-gray-700 font-bold">
                Búsqueda:
              </label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="form-control w-full"
              />
            </div>
            <div>
              <button
                type="submit"
                className="flex flex-row btn-primary mx-auto"
              >
                <SearchIcon className="pr-1" /> Buscar
              </button>
            </div>
          </form>
        </div>
        <div className="col-span-4  w-full bg-white p-4 rounded-lg border shadow-lg">
          <h1 className="text-center text-xl font-bold">Anuncios</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            {anuncios &&
              anuncios?.data.map((a) => (
                <div
                  key={a.id}
                  className="grid-col-1 mb-1 rounded-lg border  bg-white p-2 flex flex-col justify-between hover:bg-slate-100 shadow-lg"
                >
                  <Link href={`/detalle/${a.id}`}>
                    <div>
                      <h1 className="text-1xl text-center font-bold">
                        {a.subcategoria.nombre}
                      </h1>
                      <h1 className="text-1xl text-center text-red-500 italic font-bold">
                        {a.precio} €
                      </h1>
                      <img
                        src={`${api_images}${a.imagen}`}
                        className="w-full  rounded-lg shadow-md mt-2"
                        alt={a.titulo}
                      />
                      {/*<h1 className="text-1xl text-center font-bold mt-2">{a.poblacion.nombre}</h1>*/}
                      <h1 className="text-md text-center font-semibold mt-2">
                        {a.titulo}
                      </h1>
                      <h1 className="text-1xl mt-2">
                        {a.description.substring(0, 100)} ....
                      </h1>
                    </div>
                  </Link>
                  {session && (
                    <div className="flex justify-between mt-2">
                      <button
                        onClick={() => handleBorrarAnuncio(a.id)} // Llama a la función de eliminación al hacer clic en el botón
                        className="btn-primary w-full m-1 text-md"
                      >
                        Borrar
                      </button>
                      <button className="btn-primary w-full m-1 text-md">
                        Editar
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </div>
          <RenderPagination />
        </div>
      </div>
    </>
  );
};

export default AnunciosFilter;
