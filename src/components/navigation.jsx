"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { useSession,  signOut } from "next-auth/react";

const ResponsiveMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const {data:session}=useSession();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const cierraSesion = () => {
    signOut({ redirect: false });
    router.push("/");
  };

  return (
    <>
    
    <nav className="bg-white shadow-xl fixed w-full z-40 border-b-1 opacity-80 p-1">
    <div className="bg-white-900 flex justify-between items-center py-1 px-4">
      <h1 className="text-shadow text-sm mx-5 font-bold italic text-slate-200 md:text-3xl">Anuncios</h1>
  {!session ? (
    <Link href="/login" className="btn-primary">
      Login
    </Link>
  ) : (
    <button onClick={cierraSesion} className="btn-primary">
      Logout
    </button>
  )}
</div>
  <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <div className="flex inset-y-0 left-0  items-center justify-between sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
            <img
              src="/gif-aviso.gif"
              className="h-8 mr-3"
              alt="Anuncios segunda mano logo"
            />
         
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link
                  href="/"
                  className="nav-link"
                >
                  Inicio
                </Link>
                <Link
                  href="/register"
                  className="nav-link"
                >
                  Registrarse
                </Link>
                <Link
                  href="/add"
                  className="nav-link"
                >
                  Publicar
                </Link>
                <Link
                  href="/"
                  className="nav-link bg-slate-100"
                >
                  {session?.user?.email}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${isOpen ? "block" : "hidden"} sm:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
        <Link
                  href="/"
                  className="nav-link-small"
                >
                  Inicio
                </Link>
                <Link
                  href="/login"
                  className="nav-link-small"
                >
                  Login
                </Link>
                <button
                  onClick={cierraSesion}
                  className="nav-link-small"
                >
                  Logout
                </button>
             
                <Link
                  href="/register"
                  className="nav-link-small"
                >
                  Registrarse
                </Link>
                <Link
                  href="/add"
                  className="nav-link-small"
                >
                  Publicar
                </Link>
                <Link
                  href="/"
                  className="nav-link-small bg-slate-100"
                >
                  {session?.user?.email}
                </Link>
        </div>
      </div>
    </nav>
    </>
  );
};

export default ResponsiveMenu;
