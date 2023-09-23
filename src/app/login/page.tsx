
import styles from "./page.module.css";
import Login from "./Login";

export default async function LoginPage() {
 
  return (
    <main className={styles.main}>
      <Login />
    </main>
  );
}
