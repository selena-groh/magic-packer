type ColorSymbol = "W" | "U" | "B" | "R" | "G" | "P" | "C";
type HybridColorSymbol = `${ColorSymbol | number}/${ColorSymbol}`;
type ManaSymbol = ColorSymbol | HybridColorSymbol | number | "X" | "Y";
export type ManaCost = `{${ManaSymbol}}`;

export const ManaCostRegex = /\{[WUBRGPCXY0-9](?:\/[WUBRGPCXY])*\}/;

/**
 * Define a custom type guard to assert whether an unknown value is a ManaCost.
 */
export function isManaCost(maybeManaCost: unknown): maybeManaCost is ManaCost {
  return typeof maybeManaCost === "string" && ManaCostRegex.test(maybeManaCost);
}

export enum Color {
  Land = "Land",
  Gold = "Gold",
  White = "White",
  Blue = "Blue",
  Black = "Black",
  Red = "Red",
  Green = "Green",
  Artifact = "Artifact", // Note: I personally opted to categorize Artifacts as Colorless in my data to make adding X cards per color to each pack easier.
  Colorless = "Colorless",
}

export type RawCard = {
  name: string;
  mana_cost: string;
  type: string;
  image: string;
  back?: {
    name: string;
    type: string;
    image: string;
  };
};

export type Card = {
  name: string;
  color: Color;
  indexNumber?: number;
  mana_cost?: string;
  type?: string;
  image?: string;
  back?: {
    name: string;
    type: string;
    image: string;
  };
};

export type CardBuckets = { [key in Color]?: Card[] };

export type Pack = {
  packNum: number;
  cards: Card[];
};
