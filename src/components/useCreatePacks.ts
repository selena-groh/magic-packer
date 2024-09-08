import { useEffect, useState } from "react";
import { Card, CardBuckets, Color, Pack } from "src/utilities/types";

function pickRandomCardIndex(cards: Card[]): number {
  return Math.floor(Math.random() * cards.length);
}

function createPacks({
  cardsOfEachColor,
  cardsPerPack,
  numOfPacks,
  cardData,
  bucketedCardData,
}: {
  cardsOfEachColor: number;
  cardsPerPack: number;
  numOfPacks: number;
  cardData: Card[];
  bucketedCardData: CardBuckets;
}): {
  filledPacks: Pack[];
  leftoverCards: Card[];
  leftoverBucketedCards: CardBuckets;
} {
  let cardsRemaining = [...cardData];
  let bucketedCardsRemaining = { ...bucketedCardData };

  function removeCard(cardToRemove: Card) {
    cardsRemaining = cardsRemaining.filter(
      (card) => card.name !== cardToRemove.name
    );

    // This is here because Artifact and Colorless are sometimes treated interchangeably, but this website treats them as the same
    const colorBucket =
      cardToRemove.color === Color.Artifact
        ? Color.Colorless
        : cardToRemove.color;
    bucketedCardsRemaining[colorBucket] = bucketedCardsRemaining[
      colorBucket
    ]?.filter((card) => card.name !== cardToRemove.name);

    // Artifact and Colorless are sometimes treated interchangeably,
    // So make sure we remove the card from the other bucket too
    // if (colorBucket === Color.Artifact) {
    //   bucketedCardsRemaining[Color.Colorless] = bucketedCardsRemaining[
    //     Color.Colorless
    //   ]?.filter((card) => card.name !== cardToRemove.name);
    // } else if (colorBucket === Color.Colorless) {
    //   bucketedCardsRemaining[Color.Artifact] = bucketedCardsRemaining[
    //     Color.Artifact
    //   ]?.filter((card) => card.name !== cardToRemove.name);
    // }
  }

  function pickCard(cards: Card[]): Card {
    if (cards.length === 0) {
      return;
    }
    const randomCardIndex = pickRandomCardIndex(cards);
    const pickedCard = cards[randomCardIndex];
    removeCard(pickedCard);
    return pickedCard;
  }

  function pickNCards(n: number): Card[] {
    const pickedCards = [];
    for (let i = 0; i < n; i++) {
      const pickedCard = pickCard(cardsRemaining);
      if (pickedCard) {
        pickedCards.push(pickedCard);
      }
    }
    return pickedCards;
  }

  function pickNCardsOfEachColor(n: number): Card[] {
    const pickedCards: Card[] = [];

    function pushIfDefined(obj) {
      if (obj) {
        pickedCards.push(obj);
      }
    }

    for (let i = 0; i < n; i++) {
      pushIfDefined(pickCard(bucketedCardsRemaining[Color.White]));
      pushIfDefined(pickCard(bucketedCardsRemaining[Color.Blue]));
      pushIfDefined(pickCard(bucketedCardsRemaining[Color.Black]));
      pushIfDefined(pickCard(bucketedCardsRemaining[Color.Red]));
      pushIfDefined(pickCard(bucketedCardsRemaining[Color.Green]));
      pushIfDefined(pickCard(bucketedCardsRemaining[Color.Gold]));
      pushIfDefined(pickCard(bucketedCardsRemaining[Color.Colorless]));
      pushIfDefined(pickCard(bucketedCardsRemaining[Color.Land]));
    }
    return pickedCards;
  }

  const packs = new Array(numOfPacks).fill({});
  const newPacks = packs.map((_, index) => {
    const pickedCardsOfEachColor = pickNCardsOfEachColor(cardsOfEachColor);
    const pickedRandomCards = pickNCards(
      cardsPerPack - pickedCardsOfEachColor.length
    );
    const allPickedCards = pickedCardsOfEachColor.concat(pickedRandomCards);
    return {
      packNum: index + 1,
      cards: allPickedCards,
    };
  });

  return {
    filledPacks: newPacks,
    leftoverCards: cardsRemaining,
    leftoverBucketedCards: bucketedCardsRemaining,
  };
}

function useCreatePacks(args: {
  cardsOfEachColor: number;
  cardsPerPack: number;
  numOfPacks: number;
  cardData: Card[];
  bucketedCardData: CardBuckets;
}): {
  filledPacks: Pack[];
  leftoverCards: Card[];
  leftoverBucketedCards: CardBuckets;
} {
  const [filledPacks, setFilledPacks] = useState<Pack[]>([]);
  const [leftoverCards, setLeftoverCards] = useState<Card[]>([]);
  const [leftoverBucketedCards, setLeftoverBucketedCards] =
    useState<CardBuckets>({});

  useEffect(() => {
    const result = createPacks(args);
    setFilledPacks(result.filledPacks);
    setLeftoverCards(result.leftoverCards);
    setLeftoverBucketedCards(result.leftoverBucketedCards);
  }, []);

  return {
    filledPacks,
    leftoverCards,
    leftoverBucketedCards,
  };
}

export default useCreatePacks;
