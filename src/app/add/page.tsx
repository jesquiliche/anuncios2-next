
import AddAnuncio from "@/components/AddAnuncio";
import styles from "./page.module.css";
import { fetchAnunciosById } from "@/services/api";

export default async function Add() {
  
  return (
    <main className={styles.main}>
      <AddAnuncio/>
    </main>
  )

  }
