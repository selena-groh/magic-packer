import {
  Card,
  CardBuckets,
  Color,
  isManaCost,
  ManaCost,
  RawCard,
} from "./types";

// Note: to obtain indexNumber (e.g. 51) from a number (e.g. 51/540), you can run card.number.split("/")[0]
export function getIndexNumberFromTotalNumber(
  number: `${number}/${number}`
): number {
  return parseInt(number.split("/")[0]);
}

// Splits a string into an array of each bracket e.g. "{W}{G/P}" becomes ["{W}", "{G/P}"]
export function splitManaCostIntoArray(mana_cost: string): ManaCost[] {
  const maybeManaCosts: unknown[] = mana_cost.match(/\{[^}]+\}/g) || [];

  if (maybeManaCosts.length === 0 && mana_cost) {
    throw new Error("Invalid Mana Cost");
  }

  const manaCosts: ManaCost[] = maybeManaCosts.map((maybeManaCost) => {
    if (isManaCost(maybeManaCost)) {
      return maybeManaCost as ManaCost;
    }
    throw new Error("Invalid Mana Cost");
  });

  return manaCosts;
}

export function bucketCardsByColor(cards: Card[]): CardBuckets {
  return {
    [Color.White]: cards.filter((card) => card.color === Color.White),
    [Color.Blue]: cards.filter((card) => card.color === Color.Blue),
    [Color.Black]: cards.filter((card) => card.color === Color.Black),
    [Color.Red]: cards.filter((card) => card.color === Color.Red),
    [Color.Green]: cards.filter((card) => card.color === Color.Green),
    [Color.Gold]: cards.filter((card) => card.color === Color.Gold),
    // Currently, Artifact and Colorless are treated interchangeably, but you could also add a Color.Artifact here and change code in useCreatePacks to treat them separately
    [Color.Colorless]: cards.filter(
      (card) => card.color === Color.Artifact || card.color === Color.Colorless
    ),
    [Color.Land]: cards.filter((card) => card.color === Color.Land),
  };
}

// General Algorithm to color cards
//
// 1. if card.type contains "Land" -> Land
// 2. if card.cost contains more than 1 WUBRG OR card.type is Prophecy -> Gold
// 3. if card.cost contains W -> White
// 4. if card.cost contains U -> Blue
// 5. if card.cost contains B -> Black
// 6. if card.cost contains R -> Red
// 7. if card.cost contains G -> Green
// 8. else -> Colorless

// --- OR ---
// 8. if card.type contains "Artifact" -> Artifact
// 9. else -> Colorless

const MANA_AFFECTING_CARD_COLOR = ["W", "U", "B", "R", "G"];

export function getColorFromManaCost(mana_cost: string): Color {
  // Strip out all characters besides WUBRG
  const coloredManaChars = mana_cost
    .split("")
    .filter((char) => MANA_AFFECTING_CARD_COLOR.includes(char));

  // Deduplicate so that WW becomes W
  var deduplicatedColoredManaChars = new Set(coloredManaChars);

  // If there's more than one color in the deduplicated set, the card is gold
  if (deduplicatedColoredManaChars.size > 1) {
    return Color.Gold;
  }

  // Else, there's only one color (or zero) so we return the appropriate color
  const setIter = deduplicatedColoredManaChars.keys();
  switch (setIter.next().value) {
    case "W":
      return Color.White;
    case "U":
      return Color.Blue;
    case "B":
      return Color.Black;
    case "R":
      return Color.Red;
    case "G":
      return Color.Green;
    default:
      return Color.Colorless;
  }
}

export function getColorFromCard(card: RawCard): Color {
  if (card.type.includes("Land")) {
    return Color.Land;
  }
  if (card.type.includes("Prophecy")) {
    return Color.Gold;
  }
  return getColorFromManaCost(card.mana_cost);
}

export function sortCards(a: Card, b: Card): number {
  if (a.indexNumber && b.indexNumber) {
    return a.indexNumber - b.indexNumber;
  }
  if (a.color < b.color) {
    return -1;
  }
  if (a.color > b.color) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}
