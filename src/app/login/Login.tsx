'use client'
import React, { useState } from 'react';
import { postRegister } from '@/services/api';

interface UserData {
    password: string,
    email: string
}
const Login: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
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
    apiurl+='/auth/login'
    // Aquí puedes enviar los datos del formulario al servidor o realizar alguna acción con ellos
  //  postRegister(apiurl,userData)
    console.log('Datos enviados:', userData);
  };

  return (
    <div className="py-20">
    <div className='mt-10 p-10 border rounded-lg shadow-lg w-3/5 mx-auto bg-white'>
      <h1 className="text-center text-2xl font-bold mt-2">Iniciar sesión</h1>
      <form onSubmit={handleSubmit}>
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
        
        <button type="submit" className='btn-primary mt-5'>Iniciar sesión</button>
        
      </form>
    </div>
    </div>
  );
};

export default Login;
