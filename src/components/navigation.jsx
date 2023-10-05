"use client";
import Link from "next/link";
import Router from "next/router";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from "next-auth/react";

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
    <nav className="bg-white shadow-lg fixed w-full z-40 border-b-2 opacity-95">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
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
                  href="/login"
                  className="nav-link"
                >
                  Login
                </Link>
                <button
                  onClick={cierraSesion}
                  className="nav-link"
                >
                  Logout
                </button>
             
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
            className="nav-link-small "
          >
            Inicio
          </Link>
          <Link
            href="/MejorValoradas"
            className="nav-link-small"
          >
            Más valoradas
          </Link>
          <Link
            href="/EnCartelera"
            className="nav-link-small"
          >
            En cartelera
          </Link>
          <Link
            href="/Proximamente"
            className="nav-link-small"          >
            Proximamente
          </Link>
          <Link
            href="/Populares"
            className="nav-link-small" 
          >
            Populares
          </Link>
          <Link
            href="/Personas"
            className="nav-link-small" 
          >
            Actores
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default ResponsiveMenu;
