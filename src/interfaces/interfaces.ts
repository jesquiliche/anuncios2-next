// types.ts

export interface Subcategoría {
    id: number;
    nombre: string;
    descripcion: any;
    imagen: any;
    deletedAt: any;
    categoria: Categoria;
  }
  
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
  