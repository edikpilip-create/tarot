export type SpreadCard = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export const spreadCardIds = [
  "mag",
  "high-priestess",
  "empress",
  "emperor",
  "hierophant",
  "lovers",
  "chariot",
  "strength",
  "hermit",
  "wheel-of-fortune",
  "justice",
  "hanged-man",
  "death",
  "temperance",
  "devil",
  "tower",
  "star",
  "moon",
  "sun",
  "judgement",
  "world",
] as const;

export type SpreadCardId = (typeof spreadCardIds)[number];

export type SpreadCardContent = {
  id: SpreadCardId;
  title: string;
  description: string;
  imageAlt: string;
  imageSrc?: string;
};

export function createSpreadCards(entries: readonly SpreadCardContent[]): SpreadCard[] {
  return entries.map((entry, index) => ({
    id: entry.id,
    title: entry.title,
    description: entry.description,
    imageSrc: entry.imageSrc ?? `/media/spread-card-${String(index + 1).padStart(2, "0")}.webp`,
    imageAlt: entry.imageAlt,
  }));
}

export function drawSpreadCards(
  cards: readonly SpreadCard[],
  count: number,
  random: () => number = Math.random,
): SpreadCard[] {
  const shuffledCards = [...cards];

  for (let index = shuffledCards.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffledCards[index], shuffledCards[swapIndex]] = [shuffledCards[swapIndex], shuffledCards[index]];
  }

  return shuffledCards.slice(0, count);
}
