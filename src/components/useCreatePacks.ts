import { useEffect, useState } from "react";
import { Card, Color, Pack } from "src/utilities/types";
import { bucketCardsByColor, sortCards } from "src/utilities/magic_helpers";

function pickRandomCardIndex(cards: Card[]): number {
  return Math.floor(Math.random() * cards.length);
}

function useCreatePacks({
  cardsOfEachColor,
  cardsPerPack,
  numOfPacks,
  cardData,
}) {
  const bucketedCardData = bucketCardsByColor([...cardData]);
  let cardsRemaining = [...cardData];
  let bucketedCardsRemaining = { ...bucketedCardData };

  const [leftoverCards, setLeftoverCards] = useState<Card[]>(cardsRemaining);
  const [leftoverBucketedCards, setLeftoverBucketedCards] = useState(
    bucketedCardsRemaining
  );

  const packs = new Array(numOfPacks).fill({});
  const [filledPacks, setFilledPacks] = useState<Pack[]>([]);

  function removeCard(cardToRemove: Card) {
    cardsRemaining = cardsRemaining.filter(
      (card) => card.name !== cardToRemove.name
    );

    const colorBucket = cardToRemove.color;
    bucketedCardsRemaining[colorBucket] = bucketedCardsRemaining[
      colorBucket
    ]?.filter((card) => card.name !== cardToRemove.name);
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

  useEffect(() => {
    const newPacks = packs.map((pack, index) => {
      const pickedCardsOfEachColor = pickNCardsOfEachColor(cardsOfEachColor);
      const pickedRandomCards = pickNCards(
        cardsPerPack - pickedCardsOfEachColor.length
      );
      const allPickedCards = [
        ...pickedCardsOfEachColor,
        ...pickedRandomCards,
      ].sort(sortCards);
      return {
        packNum: index + 1,
        cards: allPickedCards,
      };
    });
    setFilledPacks(newPacks);
    setLeftoverCards(cardsRemaining);
    setLeftoverBucketedCards(bucketedCardsRemaining);
  }, []);

  return {
    filledPacks,
    leftoverCards,
    leftoverBucketedCards,
  };
}

export default useCreatePacks;
