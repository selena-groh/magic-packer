import { Accordion, Heading, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CardGroupAccordionItem from "src/components/CardGroupAccordionItem";
import { Card, Color, Pack } from "src/utilities/types";
import { bucketCardsByColor, sortCards } from "src/utilities/magic_helpers";

function getNumberOfCardsText(cards: Card[]): string {
  if (typeof cards?.length === "undefined") {
    return "";
  }
  if (cards?.length === 1) {
    return ` (${cards?.length} card)`;
  } else {
    return ` (${cards?.length} cards)`;
  }
}

function getPercentageOfCardsLeftoverText(
  leftoverCards: Card[],
  allCards: Card[]
): string {
  if (
    typeof leftoverCards?.length === "undefined" ||
    typeof allCards?.length === "undefined"
  ) {
    return "";
  }

  return ` -- ${Math.floor(
    (leftoverCards?.length / allCards?.length) * 100
  )}% of total unused in packs`;
}

function pickRandomCardIndex(cards: Card[]): number {
  return Math.floor(Math.random() * cards.length);
}

const Packer = ({
  cardsOfEachColor,
  cardsPerPack,
  numOfPacks,
  cardData,
}: {
  cardsOfEachColor: number;
  cardsPerPack: number;
  numOfPacks: number;
  cardData: Card[];
}) => {
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

  const halfOfFilledPacksIndex = Math.ceil(filledPacks.length / 2);

  return (
    <>
      <Heading as="h2" size="xl">
        Packs
      </Heading>
      <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={{ sm: 0, md: "40px" }}>
        <Accordion allowMultiple>
          {filledPacks.slice(0, halfOfFilledPacksIndex).map((pack) => (
            <CardGroupAccordionItem
              key={pack?.packNum}
              title={`Pack #${pack.packNum}${getNumberOfCardsText(
                pack?.cards
              )}`}
              cards={pack?.cards}
            />
          ))}
        </Accordion>
        <Accordion allowMultiple>
          {filledPacks.slice(halfOfFilledPacksIndex).map((pack) => {
            return (
              <CardGroupAccordionItem
                key={pack?.packNum}
                title={`Pack #${pack.packNum}${getNumberOfCardsText(
                  pack?.cards
                )}`}
                cards={pack?.cards}
              />
            );
          })}
        </Accordion>
      </SimpleGrid>
      <Heading as="h2" size="xl" mt="40px">
        Leftover Cards
      </Heading>
      <Accordion allowMultiple>
        <CardGroupAccordionItem
          title={`All Leftover Cards${getNumberOfCardsText(leftoverCards)}`}
          cards={leftoverCards}
        />
        {Object.entries(leftoverBucketedCards).map(([color, cards]) => (
          <CardGroupAccordionItem
            key={color}
            title={`Leftover ${color} Cards${getNumberOfCardsText(
              cards
            )}${getPercentageOfCardsLeftoverText(
              cards,
              bucketedCardData[color]
            )}`}
            cards={cards}
          />
        ))}
      </Accordion>
      <Heading as="h2" size="xl" mt="40px">
        All Cards
      </Heading>
      <Accordion allowMultiple>
        <CardGroupAccordionItem
          title={`All Cards${getNumberOfCardsText(cardData)}`}
          cards={cardData}
        />
        {Object.entries(bucketedCardData).map(([color, cards]) => (
          <CardGroupAccordionItem
            key={color}
            title={`All ${color} Cards${getNumberOfCardsText(cards)}`}
            cards={cards}
          />
        ))}
      </Accordion>
    </>
  );
};

export default Packer;
