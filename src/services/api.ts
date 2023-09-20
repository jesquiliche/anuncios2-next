// api.ts

import { Categoria, Subcategoria, Provincia, Poblacion,Estado,Anuncios,Anuncio } from '../interfaces/interfaces';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchCategorias = async (): Promise<Categoria[]> => {
  console.log(apiUrl);
  try {
    const response = await fetch(`${apiUrl}/categorias`);
    if (!response.ok) {
      throw new Error('La solicitud no pudo completarse con éxito');
    }
    const data: Categoria[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error al cargar categorías:', error);
    throw error;
  }
};

export const fetchSubcategorias = async (id: string): Promise<Subcategoria[]> => {
  try {
    const response = await fetch(`${apiUrl}/subcategorias/categoria/${id}`);
    if (!response.ok) {
      throw new Error('La solicitud no pudo completarse con éxito');
    }
    const data: Subcategoria[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error al cargar subcategorías:', error);
    throw error;
  }
};

export const fetchPoblaciones = async (codigo: string): Promise<Poblacion[]> => {
  try {
    const response = await fetch(`${apiUrl}/poblaciones/provincia/${codigo}`);
    if (!response.ok) {
      throw new Error('La solicitud no pudo completarse con éxito');
    }
    const data: Poblacion[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error al cargar poblaciones:', error);
    throw error;
  }
};

export const fetchProvincias = async (): Promise<Provincia[]> => {
  try {
    const response = await fetch(`${apiUrl}/provincias`);
    if (!response.ok) {
      throw new Error('La solicitud no pudo completarse con éxito');
    }
    const data: Provincia[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error al cargar provincias:', error);
    throw error;
  }
};

export const fetchEstados = async (): Promise<Estado[]> => {
  try {
    const response = await fetch(`${apiUrl}/estados`);
    if (!response.ok) {
      throw new Error('La solicitud no pudo completarse con éxito');
    }
    const data: Estado[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error al cargar provincias:', error);
    throw error;
  }
};

export const fetchAnuncios = async (url:string): Promise<Anuncios> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
       
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const data: Anuncios = await response.json();
    return data;
  } catch (error) {
    console.error('Error al cargar Anuncios:', error);
    throw error;
  }
};

export const fetchAnunciosById = async (url:string,id:string): Promise<Anuncio> => {
  try {
    const response = await fetch(`${url}/${id}`,{ cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const data: Anuncio = await response.json();
    return data;
  } catch (error) {
    console.error('Error al cargar Anuncios:', error);
    throw error;
  }
};
