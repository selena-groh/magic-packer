import { COLORS } from "src/magic_constants";

// Note: to obtain indexNumber (e.g. 51) from a number (e.g. 51/540), you can run card.number.split("/")[0]
export function getIndexNumberFromTotalNumber(number) {
  return number.split("/")[0];
}

export function bucketCardsByColor(cards) {
  return {
    [COLORS.WHITE]: cards.filter((card) => card.color === COLORS.WHITE),
    [COLORS.BLUE]: cards.filter((card) => card.color === COLORS.BLUE),
    [COLORS.BLACK]: cards.filter((card) => card.color === COLORS.BLACK),
    [COLORS.RED]: cards.filter((card) => card.color === COLORS.RED),
    [COLORS.GREEN]: cards.filter((card) => card.color === COLORS.GREEN),
    [COLORS.GOLD]: cards.filter((card) => card.color === COLORS.GOLD),
    [COLORS.ARTIFACT]: cards.filter(
      (card) =>
        card.color === COLORS.ARTIFACT || card.color === COLORS.COLORLESS
    ),
    [COLORS.LAND]: cards.filter((card) => card.color === COLORS.LAND),
  };
}

// This function is specific to one set of data created by the repo's author and will not work for other arrays of cards. See the comment below this function for an algorithm to color cards generally, though that algorithm is not implemented in code.
export function DO_NOT_USE_colorRepoAuthorsCards(cards) {
  return cards.map((card) => {
    if (card.indexNumber < 3) {
      return { ...card, color: COLORS.ARTIFACT }; // could be Colorless OR Artifact
    } else if (cardNumber < 64) {
      return { ...card, color: COLORS.WHITE };
    } else if (cardNumber < 126) {
      return { ...card, color: COLORS.BLUE };
    } else if (cardNumber < 188) {
      return { ...card, color: COLORS.BLACK };
    } else if (cardNumber < 251) {
      return { ...card, color: COLORS.RED };
    } else if (cardNumber < 311) {
      return { ...card, color: COLORS.GREEN };
    } else if (cardNumber < 394) {
      return { ...card, color: COLORS.GOLD };
    } else if (cardNumber < 471) {
      return { ...card, color: COLORS.ARTIFACT };
    } else if (cardNumber <= 540) {
      return { ...card, color: COLORS.LAND };
    } else {
      return { ...card, color: "UNKNOWN" };
    }
  });
}

// General Algorithm to color cards
//
// 1. if card.type.supertype contains "Land" -> Land
// 2. if card.cost contains more than 1 WUBRG -> Gold
//     - strip out all characters besides WUBRG
//     - deduplicate so that WW becomes W
//     - check that character count is 2+
// 3. if card.cost contains W -> White
// 4. if card.cost contains U -> Blue
// 5. if card.cost contains B -> Black
// 6. if card.cost contains R -> Red
// 7. if card.cost contains G -> Green
// 8. else -> Artifact

// --- OR ---
// 8. if card.type.supertype contains "Artifact" -> Artifact
// 9. else -> Colorless
