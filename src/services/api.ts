// api.ts

import { Categoria, Subcategoria, Provincia, Poblacion,Estado,Anuncios,Anuncio,Foto } from '../interfaces/interfaces';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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

export const fetchSubcategorias = async (id: string): Promise<Subcategoria[]> => {
  try {
    const response = await fetch(`${apiUrl}/subcategorias/categoria/${id}`);
    
    if (!response.ok) {
      throw new Error('Error em la solicitud');
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
    const response = await fetch(url,{ cache: 'no-store'});
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

export const fetchAnunciosById = async (id:string): Promise<Anuncio> => {
  try {
    const response = await fetch(`${apiUrl}/anuncios/${id}`,{ cache: 'no-store' });
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

export const fetchFotosByIdAnuncio = async (id:string): Promise<Anuncio> => {
  try {
    const response = await fetch(`${apiUrl}/anuncios/${id}`,{ cache: 'no-store' });
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


export async function postRegister(url:string,datos: {
  name: string;
  primer_apellido: string;
  segundo_apellido: string;
  user_name: string;
  password: string;
  email: string;
}) {
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    });

    if (response.ok) {
     
      alert('Datos enviados correctamente.');
      // Aquí puedes realizar acciones adicionales después de enviar los datos
    } else {
      switch (response.status) {
        case 409:
          throw new Error('Ya existe un Usuario con este email: '+response.statusText);    
          break;
        default:
          throw new Error('Error al enviar los datos:'+response.statusText);
          break;
      }
      
    }
  } catch (error) {
    alert(error);
  }
};

export const fetchFotos = async (id: string): Promise<Foto[]> => {
  try {
    const response = await fetch(`${apiUrl}/fotos/anuncio/${id}`);
    
    if (!response.ok) {
      throw new Error('Error em la solicitud');
    }
    const data: Foto[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error al cargar subcategorías:', error);
    throw error;
  }
};
