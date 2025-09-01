export async function getNewDeck() {
  const res = await fetch(
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  );
  if (!res.ok) {
    throw new Error("Failed to fetch new deck");
  }
  return res.json();
}

export async function drawCard(deckId: string) {
  const res = await fetch(
    `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
  );
  if (!res.ok) {
    throw new Error("Failed to draw card");
  }
  return res.json();
}
