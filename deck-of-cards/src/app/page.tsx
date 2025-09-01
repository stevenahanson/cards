"use client";
import { useEffect, useState } from "react";
import { getNewDeck, drawCard } from "@/app/utils/deckApi";
import Image from "next/image";

export default function Home() {
  const [deckId, setDeckId] = useState<string>("");
  const [cards, setCards] = useState<any[]>([]);
  const [valueMatches, setValueMatches] = useState<number>(0);
  const [suitMatches, setSuitMatches] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [isFinished, setIsFinished] = useState(false);

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

      setCards((prev) => {
        const updatedCards = [...prev, newCard];

        if (updatedCards.length >= 2) {
          const prevCard = updatedCards[updatedCards.length - 2];

          if (newCard.value === prevCard.value) {
            setValueMatches((count) => count + 1);
            setMessage("SNAP VALUE!");
          } else if (newCard.suit === prevCard.suit) {
            setSuitMatches((count) => count + 1);
            setMessage("SNAP SUIT!");
          } else {
            setMessage("");
          }
        }

        if (updatedCards.length === 52) {
          setIsFinished(true);
        }

        return updatedCards;
      });
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
            {message && (
              <div className="py-4 text-lg font-bold text-red-500">
                {message}
              </div>
            )}
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

          {!isFinished ? (
            <button
              onClick={handleDraw}
              className="bg-blue-400 text-white p-2 rounded-md border-2 border-blue-500"
            >
              Draw card
            </button>
          ) : (
            <div className="mt-4 text-lg">
              <p>Total value matches: {valueMatches}</p>
              <p>Total suit matches: {suitMatches}</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
