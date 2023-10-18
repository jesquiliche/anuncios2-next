"use client";
import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
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
import Link from "next/link";
import Previews from "@/components/MyDropzone";

interface File extends Blob {
  readonly lastModified: number;
  readonly name: string;
}
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
  file: File | null;
}

const AnunciosAdd: React.FC = () => {
  // Estados para rastrear valores del formulario y cargvscode-file://vscode-app/c:/Users/jesus/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.htmlar datos
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [images, setImages] = useState<string[] | null>(null);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  const formRef: React.RefObject<HTMLFormElement> = useRef(null);
  const { data: session, status } = useSession();
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
    file: null,
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // Función para recibir la lista de ficheros
  const handleFilesUploaded = (files: File[]) => {
    console.log("Funcion llamada en add");
    setUploadedFiles(files);
  };
  const apiurl: string =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

  const router = useRouter();

  const handleImagenChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const files = event.target.files;
    let imagenes: string[] = [];

    if (files && files.length > 0) {
      for (let x = 1; x < files.length; x++) {
        imagenes.push(URL.createObjectURL(files[x]));
      }
      setImages(imagenes);
    }

    if (file) {
      // Crear una URL de objeto para la vista previa de la imagen
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setAnuncio({
        ...anuncio,
        file: file,
        imagen: file.name,
      });
    }
  };

  // Controlador de cambio de categoría
  const handleCategoriaChange = async (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    // const selectedIndex = event.target.selectedIndex;
    // const selectedText = event.target.options[selectedIndex].text;

    // Cargar subcategorías basadas en la categoría seleccionada
    setSubcategorias(await fetchSubcategorias(selectedValue));
  };

  // Controlador de cambio de provincia
  const handleProvinciasChange = async (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;

    // Actualizar el estado del anuncio con la provincia seleccionada
    setAnuncio({
      ...anuncio,
      provincia: selectedValue,
    });

    // Cargar poblaciones basadas en la provincia seleccionada
    setPoblaciones(await fetchPoblaciones(selectedValue));
  };

  // Controlador genérico para cambios en los campos del formulario
  const handleOnChange = async (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // Actualizar el estado del anuncio según el campo que cambió
    setAnuncio({
      ...anuncio,
      [e.target.name]: e.target.value,
    });
  };

  // Controlador de envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setOk("");

    // Crear un objeto FormData con los datos del formulario
    const formData = new FormData();
    formData.append("titulo", anuncio.titulo);
    formData.append("description", anuncio.description);
    if (anuncio.file) {
      formData.append("imagen", anuncio.imagen);
      formData.append("file", anuncio.file);
    }
    formData.append("precio", String(anuncio.precio));
    formData.append("telefono", anuncio.telefono);
    formData.append("subcategoria", anuncio.subcategoria);
    formData.append("estado", anuncio.estado);
    if (session?.user?.email) {
      formData.append("user", session.user.email);
    }
    formData.append("provincia", anuncio.provincia);
    formData.append("cod_postal", anuncio.cod_postal);

    try {
      // Enviar la solicitud POST a tu API
      const token = session?.user?.token || ""; // Si session, user o token son null o undefined, asigna una cadena vacía '' como valor predeterminado.

      const response = await fetch(`${apiurl}/anuncios`, {
        method: "POST",
        headers: {
          // Agregar el encabezado de autorización con el token JWT
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        // La solicitud fue exitosa, puedes manejar la respuesta aquí si es necesario
        const data = await response.json();

        uploadFilesServer(data.id, uploadedFiles);

        setOk("Anuncio publicado correctamente id: " + data.id);
        formRef?.current?.reset();
        setError("");
        resetValues();
      } else {
        // La solicitud no fue exitosa, maneja el error aquí
        if (response.status == 401) {
          alert("Sesión caducada");
          signOut();
          const urlWithoutParam = "/login";
          //Redirigir a página de login
          router.push(urlWithoutParam);
        }
        const dataError = await response.json();
        setError(dataError.message);
      }
    } catch (error) {
      // Manejar errores de red u otros errores aquí
      alert(error);
      console.error("Error de red:", error);
    }
  };

  const uploadFile = async (id: string, file: File) => {
    try {
      const token = session?.user?.token || "";

      const formData = new FormData();
      formData.append("anuncio_id", id);
      formData.append("file", file);

      const response = await fetch(`${apiurl}/fotos/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const dataError = await response.json();
        setError(dataError.message);
        return; // O manejar el error de alguna manera
      }

      // Archivo subido con éxito, puedes realizar alguna acción aquí
      console.log(`Archivo ${file.name} subido con éxito.`);
    } catch (error) {
      // Manejar errores de red u otros errores aquí
      alert(error);
      console.error("Error de red:", error);
    }
  };

  const uploadFilesServer = async (id: string, fotos: File[]) => {
    try {
      for (const file of fotos) {
        await uploadFile(id, file);
      }
    } catch (error) {
      // Manejar errores de carga de archivos aquí
      alert(error);
      console.error("Error al cargar archivos:", error);
    }
  };

  //Limpia todos los campos del formulario
  const resetValues = () => {
    setAnuncio({
      ...anuncio,
      precio: 0,
      titulo: "",
      subcategoria: "",
      estado: "",
      description: "",
      telefono: "",
    });
    setImagePreview(null);
  };

  //Borrar mensajes de éxito de al guardar
  const closeOkMessage = () => {
    setOk("");
  };

  //Borra mensajes de error despues del último guardado
  const closeErrorMessage = () => {
    setError("");
  };

  // Cargar datos iniciales cuando el componente se monta
  useEffect(() => {
    const fetchData = async () => {
      //La sesión se esta cargando
      if (status === "loading") {
        return "Loading or not authenticated...";
      }
      //Si no ha iniciado sesión
      if (!session) {
        const urlWithoutParam = "/login";
        //Redirigir a página de login
        router.push(urlWithoutParam);
      }
      try {
        // Cargar categorías, provincias y estados
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
      <div className="py-5 w-full">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mb-4 w-11/12 md:w-4/6 py-5 bg-white px-4 rounded-lg border shadow-lg mx-auto"
        >
          <h1 className="text-center text-xl font-bold">Publicar anuncio</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4 p-4">
            <div>
              <div>
                <label htmlFor="categoria" className="text-gray-700 font-bold">
                  Categoría:
                </label>
                <select
                  id="categoria"
                  name="categoria"
                  required
                  autoFocus
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
                <label
                  htmlFor="subcategoria"
                  className="text-gray-700 font-bold"
                >
                  Subcategoria:
                </label>
                <select
                  id="subcategoria"
                  name="subcategoria"
                  value={anuncio.subcategoria}
                  required
                  onChange={handleOnChange}
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
                  required
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
                  id="cod_postal"
                  name="cod_postal"
                  onChange={handleOnChange}
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
            </div>
            <div>
              <div>
                <label htmlFor="estado" className="text-gray-700 font-bold">
                  Estado:
                </label>
                <select
                  id="estado"
                  name="estado"
                  value={anuncio.estado}
                  required
                  onChange={handleOnChange}
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
                <label htmlFor="titulo" className="text-gray-700 font-bold">
                  Título:
                </label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  value={anuncio.titulo}
                  minLength={10}
                  maxLength={254}
                  required
                  onChange={handleOnChange}
                  className="form-control w-full"
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
                  min="1"
                  max="1000000"
                  value={anuncio.precio}
                  onChange={handleOnChange}
                  required
                  className="form-control w-full"
                />
              </div>
              <div>
                <label htmlFor="precio" className="text-gray-700 font-bold">
                  Telefono:
                </label>
                <input
                  type="telf"
                  id="telefono"
                  name="telefono"
                  maxLength={15}
                  value={anuncio.telefono}
                  onChange={handleOnChange}
                  required
                  className="form-control w-full"
                />
              </div>
            </div>
            <div>
              <label htmlFor="imagen" className="text-gray-700 font-bold">
                Imagen portada:
              </label>
              <input
                type="file"
                id="file"
                multiple
                name="file"
                accept="image/*" // Para permitir solo archivos de imagen
                required
                onChange={handleImagenChange}
                className="form-control w-full mb-2"
              />
              <img
                className="rounded-lg h-40"
                id="image-preview"
                src={imagePreview || ""}
                alt="Vista previa de la imagen"
                style={{
                  display: imagePreview ? "block" : "none",
                  maxWidth: "100%",
                  margin: "0 auto",
                }}
              />
            </div>
          </div>
          <h1 className="text-center font-bold">Galería de imagenes</h1>
          <Previews onFilesUploaded={handleFilesUploaded} />
          <div className="mx-4 mt-2">
            <label
              htmlFor="descripcion"
              className="mx-4 text-gray-700 font-bold"
            >
              Descripción:
            </label>
            <textarea
              id="description"
              name="description"
              minLength={10}
              required
              onChange={handleOnChange}
              className="form-control w-full mx-auto"
            >
              {anuncio.description}
            </textarea>
          </div>

          {ok && (
            <div className="flex justify-between mx-auto w-11/12 md:w-3/5 mt-2 p-4 bg-green-100 border rounded-lg">
              {ok}
              <button
                onClick={closeOkMessage}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                Cerrar
              </button>
            </div>
          )}
          {error && (
            <div className="w-3/5 mt-2 mx-auto p-4 bg-red-100 border rounded-lg">
              {error}
              <button
                onClick={closeErrorMessage}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                Cerrar
              </button>
            </div>
          )}
          <div className="flex mt-10 mx-auto w-1/5">
            <button type="submit" className="btn-primary mx-2">
              Añadir
            </button>
            <Link href="/" className="btn-primary mx-2">
              Volver
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default AnunciosAdd;
