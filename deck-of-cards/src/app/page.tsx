"use client";
import { useEffect, useState } from "react";
import { getNewDeck, drawCard } from "@/app/utils/deckApi";
import Image from "next/image";

export default function Home() {
  const [deckId, setDeckId] = useState<string>("");
  const [cards, setCards] = useState<any[]>([]);

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

  const handleDraw = async () => {
    if (!deckId) return;

    try {
      const data = await drawCard(deckId);
      const newCard = data.cards[0];
      setCards((prev) => [...prev, newCard]);
      console.log("drew card:", newCard);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <main>
        <div className="py-2 w-full h-full border-b-2 border-gray-300">
          <h1 className="px-2 text-xl text-gray-500 uppercase">snap!</h1>
        </div>
        <div className="flex flex-col items-center justify-center py-10">
          <div>
            <h2 className="uppercase py-4">some text!</h2>
          </div>

          {/* Cards */}
          <div className="flex space-x-6 text-white py-10">
            {/* Previous card */}
            <div className="w-24 h-34 border-2 border-black rounded-sm flex items-center justify-center ">
              {cards.length > 1 && (
                <Image
                  src={cards[cards.length - 2].image}
                  width={100}
                  height={150}
                  alt="Previous card"
                  className="object-contain"
                />
              )}
            </div>
            {/* Current card */}
            <div className="w-24 h-34 border-2 border-black rounded-sm flex items-center justify-center">
              {cards.length > 0 && (
                <Image
                  src={cards[cards.length - 1].image}
                  width={100}
                  height={150}
                  alt="Current card"
                  className="object-contain"
                />
              )}
            </div>
          </div>

          <button
            onClick={handleDraw}
            className="bg-blue-400 text-white p-2 rounded-md border-2 border-blue-500"
          >
            Draw card
          </button>
        </div>
      </main>
    </>
  );
}
