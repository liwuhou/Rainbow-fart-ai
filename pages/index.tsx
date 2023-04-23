import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [thing, setThing] = useState("");
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event) {
    event.preventDefault();
    try {
      setIsLoading(true)
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ thing }),
      });

      const data = await response.json();
      setIsLoading(false)
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(data.result);
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>AI Rainbow Fart</title>
        <link rel="icon" href="/rainbow.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.icon}>🌈</h1>
        <h3>AI Rainbow Fart</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="thing"
            placeholder="What have you done?"
            value={thing}
            onChange={(e) => setThing(e.target.value)}
          />
          <input type="submit" value="Draw a Rainbow" />
        </form>
        {
          isLoading ? 'Loading...' : (
            <div
              className={styles.result}
              dangerouslySetInnerHTML={{ __html: result }}
            />
          )
        }
      </main>
    </div>
  );
}
