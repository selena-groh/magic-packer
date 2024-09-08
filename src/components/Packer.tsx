import { Accordion, Heading, SimpleGrid } from "@chakra-ui/react";
import CardGroupAccordionItem from "src/components/CardGroupAccordionItem";
import { Card } from "src/utilities/types";
import useCreatePacks from "./useCreatePacks";

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
  const {
    filledPacks,
    bucketedCardData,
    leftoverCards,
    leftoverBucketedCards,
  } = useCreatePacks({
    cardsOfEachColor,
    cardsPerPack,
    numOfPacks,
    cardData,
  });

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
