import AnunciosFilter from "@/components/AnunciosFilter";
import { useSession, signIn, signOut } from "next-auth/react"


import styles from "./page.module.css";


export default function Home(){
 

  
  return (
    <main className={styles.main}>
      <AnunciosFilter />
           
    </main>
  )
}
