// types.ts

  
  export interface Categoria {
    id: number;
    nombre: string;
    descripcion: any;
    imagen: string;
    deletedAt: any;
  }
  
  export interface Provincia {
    codigo: string;
    nombre: string;
    deletedAt: any;
  }
  
  export interface Poblacion {
    codigo: string;
    nombre: string;
    cod_provincia: string;
    deletedAt: any;
  }
  
  export interface Estado {
    id: number
    titulo: string
    deletedAt: any
  }
  
  export interface Subcategoria {
    id: number
    nombre: string
    descripcion: any
    imagen: any
    deletedAt: any
    categoria: Categoria
  }

  export interface User {
    id: number
    name: string
    primer_apellido: string
    segundo_apellido: string
    user_name: string
    password: string
    email: string
    role: string
    deletedAt: any
  }
  
  export interface Anuncios {
    totalPages: number
    records: number
    data: Anuncio[]
  }
  
  export interface Anuncio {
    id: number
    titulo: string
    description: string
    imagen: string
    precio: string
    telefono: string
    provincia: string
    cod_postal: string
    deletedAt: any
    createdAt: Date
    subcategoria: Subcategoria
    estado: Estado
    user:User
    poblacion: Poblacion
  }