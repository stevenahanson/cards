"use client";
import { useEffect, useState } from "react";
import { getNewDeck } from "@/app/utils/deckApi";

export default function Home() {
  const [deckId, setDeckId] = useState([]);

  useEffect(() => {
    async function loadDeck() {
      try {
        const data = await getNewDeck();
        setDeckId(data.deck_id);
        console.log("deckId: ", data.deck_id);
      } catch (err) {
        console.error(err);
      }
    }

    loadDeck();
  }, []);

  return (
    <>
      <main className="p-6">
        <h1 className="text-2xl font-bold">Deck of Cards</h1>
        <p>Deck ID: {deckId ? deckId : "Loading..."}</p>
        <button className="bg-amber-400">Draw Card</button>
      </main>
    </>
  );
}
