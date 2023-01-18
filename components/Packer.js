import { Accordion, Heading, SimpleGrid } from "@chakra-ui/react";
import { CARD_DATA, CARD_DATA_BY_COLOR } from "data/card_data";
import { useEffect, useState } from "react";
import CardGroupAccordionItem from "components/CardGroupAccordionItem";
import { COLORS } from "src/magic_constants";

const Packer = ({ cardsOfEachColor, cardsPerPack, numOfPacks }) => {
  let cardsRemaining = [...CARD_DATA];
  let bucketedCardsRemaining = { ...CARD_DATA_BY_COLOR };

  const [leftoverCards, setLeftoverCards] = useState(cardsRemaining);
  const [leftoverBucketedCards, setLeftoverBucketedCards] = useState(
    bucketedCardsRemaining
  );

  const packs = new Array(numOfPacks).fill({});
  const [filledPacks, setFilledPacks] = useState([]);

  function removeCard(cardToRemove) {
    cardsRemaining = cardsRemaining.filter(
      (card) => card.indexNumber !== cardToRemove.indexNumber
    );

    const colorBucket = cardToRemove.color;
    bucketedCardsRemaining[colorBucket] = bucketedCardsRemaining[
      colorBucket
    ].filter((card) => card.indexNumber !== cardToRemove.indexNumber);
  }

  function pickRandomCardIndex(cards) {
    return Math.floor(Math.random() * cards.length);
  }

  function pickCard(cards) {
    if (cards.length === 0) {
      return;
    }
    const randomCardIndex = pickRandomCardIndex(cards);
    const pickedCard = cards[randomCardIndex];
    removeCard(pickedCard);
    return pickedCard;
  }

  function pickNCards(n) {
    const pickedCards = [];
    for (let i = 0; i < n; i++) {
      const pickedCard = pickCard(cardsRemaining);
      if (pickedCard) {
        pickedCards.push(pickedCard);
      }
    }
    return pickedCards;
  }

  function pickNCardsOfEachColor(n) {
    const pickedCards = [];

    function pushIfDefined(obj) {
      if (obj) {
        pickedCards.push(obj);
      }
    }

    for (let i = 0; i < n; i++) {
      pushIfDefined(pickCard(bucketedCardsRemaining[COLORS.WHITE]));
      pushIfDefined(pickCard(bucketedCardsRemaining[COLORS.BLUE]));
      pushIfDefined(pickCard(bucketedCardsRemaining[COLORS.BLACK]));
      pushIfDefined(pickCard(bucketedCardsRemaining[COLORS.RED]));
      pushIfDefined(pickCard(bucketedCardsRemaining[COLORS.GREEN]));
      pushIfDefined(pickCard(bucketedCardsRemaining[COLORS.GOLD]));
      pushIfDefined(pickCard(bucketedCardsRemaining[COLORS.ARTIFACT]));
      pushIfDefined(pickCard(bucketedCardsRemaining[COLORS.LAND]));
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
      ].sort((a, b) => a.indexNumber - b.indexNumber);
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
      <SimpleGrid
        columns={{ sm: 1, md: 2 }}
        spacing={{ sm: 0, md: "40px" }}
        mb={{ sm: 0, md: "40px" }}
      >
        <Accordion allowMultiple>
          {filledPacks.slice(0, halfOfFilledPacksIndex).map((pack) => (
            <CardGroupAccordionItem
              key={pack?.packNum}
              title={`Pack #${pack.packNum} (${pack?.cards?.length} cards)`}
              cards={pack?.cards}
            />
          ))}
        </Accordion>
        <Accordion allowMultiple>
          {filledPacks.slice(halfOfFilledPacksIndex).map((pack) => {
            return (
              <CardGroupAccordionItem
                key={pack?.packNum}
                title={`Pack #${pack.packNum} (${pack?.cards?.length} cards)`}
                cards={pack?.cards}
              />
            );
          })}
        </Accordion>
      </SimpleGrid>
      <Heading as="h2" size="xl">
        Leftover Cards
      </Heading>
      <Accordion allowMultiple>
        <CardGroupAccordionItem
          title={`All Leftover Cards (${leftoverCards.length} cards)`}
          cards={leftoverCards}
        />
        {Object.entries(leftoverBucketedCards).map(([color, cards]) => (
          <CardGroupAccordionItem
            key={color}
            title={`${color} Cards (${cards.length} cards)`}
            cards={cards}
          />
        ))}
      </Accordion>
    </>
  );
};

export default Packer;
