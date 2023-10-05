'use client'
import React, { useState } from 'react';
import { postRegister } from '@/services/api';

interface UserData {
    name: string,
    primer_apellido: string,
    segundo_apellido: string,
    user_name: string,
    password: string,
    email: string
}
const Register: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    primer_apellido: '',
    segundo_apellido: '',
    user_name: '',
    password: '',
    email: '',
  });

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let apiurl=process.env.NEXT_PUBLIC_API_URL || "http://localhost/400/api/v1";
    apiurl+='/auth/register'
    // Aquí puedes enviar los datos del formulario al servidor o realizar alguna acción con ellos
    postRegister(apiurl,userData)
    console.log('Datos enviados:', userData);
  };

  return (
    <div className="py-28">
    <div className='p-10 border rounded-lg shadow-lg w-11/12 md:w-2/6 mx-auto bg-white'>
      <h1 className="text-center text-xl font-bold mt-2">Formulario de Registro</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className='font-bold mt-2'>Nombre:</label>
          <input
            type="text"
            name="name"
            maxLength={100}
            required
            value={userData.name}
            onChange={handleChange}
            className='form-control mt-2'
          />
        </div>
        <div>
          <label className='font-bold mt-2'>Primer Apellido:</label>
          <input
            type="text"
            name="primer_apellido"
            maxLength={100}
            required
            value={userData.primer_apellido}
            onChange={handleChange}
            className='form-control mt-2'
          />
        </div>
        <div>
          <label className='font-bold mt-2'>Segundo Apellido:</label>
          <input
            type="text"
            name="segundo_apellido"
            maxLength={100}
            required
            value={userData.segundo_apellido}
            onChange={handleChange}
            className='form-control mt-2'
          />
        </div>
        <div>
          <label className='font-bold mt-2'>Nombre de Usuario:</label>
          <input
            type="text"
            name="user_name"
            maxLength={20}
            required
            value={userData.user_name}
            onChange={handleChange}
            className='form-control mt-2'
          />
        </div>
        <div>
          <label className='font-bold mt-2'>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            minLength={8}
            required
            onChange={handleChange}
            className='form-control mt-2'
          />
        </div>
        <div>
          <label className='font-bold mt-2'>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            required
            minLength={8}
            maxLength={100}
            onChange={handleChange}
            className='form-control mt-2'
          />
        </div>
        <div className='mx-auto md:w-2/5'>
        <button type="submit" className='btn-primary mt-5'>Registrarse</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Register;
