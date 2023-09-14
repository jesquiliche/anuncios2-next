'use client'
import React, { useState, useEffect } from 'react';
import CarruselCategorias from '../components/CarruselCategorias';
import { Categoria } from '../interfaces/interfaces'; // Asegúrate de que la importación sea correcta

const Categorias = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const fetchCategorias = async () => {
    // Definimos la URL del endpoint
    const apiUrl = 'https://nest-users-production.up.railway.app/api/v1/categorias';

    try {
      // Realizamos la solicitud GET usando fetch y await
      const response = await fetch(apiUrl);

      // Verificamos si la respuesta es exitosa
      if (!response.ok) {
        throw new Error('La solicitud no pudo completarse con éxito');
      }

      // Parseamos la respuesta como JSON
      const data: Categoria[] = await response.json();

      // Extraemos las categorías de los datos y las almacenamos en el estado
      if (data && Array.isArray(data)) {
        setCategorias(data);
      }
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  };

  useEffect(() => {
    // Utilizamos useEffect para cargar las categorías cuando el componente se monte
    fetchCategorias();
  }, []); // El segundo argumento vacío [] asegura que el efecto se ejecute solo una vez al montar el componente.

  return (
    <div>
      <CarruselCategorias data={categorias} />
    </div>
  );
};

export default Categorias;
