"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [deckId, setDeckId] = useState([]);

  useEffect(() => {
    async function getCards() {
      const url =
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        setDeckId(result.deck_id);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error(String(error));
        }
      }
    }

    getCards();
  }, []);

  return <>{deckId && <h2>Deck ready</h2>}</>;
}
