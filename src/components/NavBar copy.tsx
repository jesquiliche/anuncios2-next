"use client";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation'

const NavBar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const cierraSesion = () => {
    signOut({ redirect: false });
    router.push("/");
  };

  return (
    <header className="fixed w-full">
      <nav className="border-gray-200 dark:bg-gray-900 shadow-lg bg-white mz-auto w-full">
        <div className="flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/" className="flex items-center">
            <img
              src="/gif-aviso.gif"
              className="h-8 mr-3"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Anuncios segunda mano
            </span>
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-censpan"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-4 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  href="/"
                  className="block py-2 px-2 hover:bg-slate-500 hover:text-white rounded-lg"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="block py-2 px-2   hover:bg-slate-500 hover:text-white rounded-lg"
                >
                  Registrarse
                </Link>
              </li>

              <li>
                <button
                  onClick={cierraSesion}
                  className="block py-2 px-2 hover:bg-slate-500 hover:text-white rounded-lg"
                >
                  Logout
                </button>
              </li>

              <li>
                <Link
                  href="/login"
                  className="block py-2 px-2 hover-bg-slate-500 hover-text-white rounded-lg"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  href="/add"
                  className="block py-2 px-2 hover-bg-slate-500 hover-text-white rounded-lg"
                >
                  Publicar
                </Link>
              </li>

              <li>
                             </li>
            </ul>
          </div>
          <Link
                  href="/"
                  className="block py-2 px-2 bg-slate-100 hover-bg-slate-500 hover-text-white rounded-lg"
                >
                  {session?.user?.email}
                </Link>

        </div>
      </nav>
    </header>
  );
};

export default NavBar;
