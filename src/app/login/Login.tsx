"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

interface UserData {
  password: string;
  email: string;
}

const Login: React.FC = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [userData, setUserData] = useState<UserData>({
    password: "",
    email: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const responseNextAuth = await signIn("credentials", {
      email: userData.email,
      password: userData.password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      return;
    }

    router.push("/");
  };

  return (
    <div className="py-16">
      <div className="p-10 border rounded-lg shadow-lg w-2/6 mx-auto bg-white">
        <h1 className="text-center text-xl font-bold mt-2">Iniciar sesión</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="font-bold mt-2">Email:</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              required
              minLength={8}
              maxLength={100}
              onChange={handleChange}
              className="form-control mt-2"
            />
          </div>

          <div>
            <label className="font-bold mt-2">Contraseña:</label>
            <input
              type="password"
              name="password"
              value={userData.password}
              minLength={8}
              required
              onChange={handleChange}
              className="form-control mt-2"
            />
          </div>
          <div className="mx-auto w-2/5">
            <button type="submit" className="btn-primary mt-5 justify-center">
              Iniciar sesión
            </button>
          </div>
        </form>
        {errors.length > 0 && (
          <div className="bg-red-100 rounded-lg border mt-5 p-4">
            <ul className="mb-2">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
