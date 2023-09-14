// api.ts

import { Categoria, Subcategoría, Provincia, Poblacion } from '../interfaces/interfaces';

const apiUrl = 'https://nest-users-production.up.railway.app/api/v1';

export const fetchCategorias = async (): Promise<Categoria[]> => {
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

export const fetchSubcategorias = async (id: string): Promise<Subcategoría[]> => {
  try {
    const response = await fetch(`${apiUrl}/subcategorias/categoria/${id}`);
    if (!response.ok) {
      throw new Error('La solicitud no pudo completarse con éxito');
    }
    const data: Subcategoría[] = await response.json();
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
