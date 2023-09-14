import Image from 'next/image'
import FilterInicio from "../components/FilterInicio"
import Categorias from "../components/Categorias"
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <FilterInicio/>
      <Categorias />
      
    </main>
  )
}
