import Image from "next/image";
import styles from "./page.module.css";
import SalesTable from "@/components/salesTable/SalesTable";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <SalesTable />
      </div>
    </main>
  );
}
