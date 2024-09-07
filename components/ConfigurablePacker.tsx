import { useEffect, useState } from "react";
import { Flex, FormControl, FormErrorMessage } from "@chakra-ui/react";
import Packer from "components/Packer";
import ControlledNumberInput from "components/ControlledNumberInput";
import CardDataUploader from "components/CardDataUploader";
import { CARD_DATA } from "data/card_data";

const CARDS_OF_EACH_COLOR = 1;
const CARDS_PER_PACK = 15;
const NUM_OF_PACKS = 24;

const ConfigurablePacker = () => {
  const [cardsOfEachColor, setCardsOfEachColor] = useState(CARDS_OF_EACH_COLOR);
  const [cardsPerPack, setCardsPerPack] = useState(CARDS_PER_PACK);
  const [numOfPacks, setNumOfPacks] = useState(NUM_OF_PACKS);

  const [cardData, setCardData] = useState(CARD_DATA);

  const cardCount = cardData.length;
  // TODO: update this logic to account for cardsOfEachColor as well
  const isError = cardsPerPack * numOfPacks > cardCount;

  // This counter increments when the config changes and is used to remount the Packer so that the cards get re-packed.
  const [configChangedCount, setConfigChangedCount] = useState(0);

  useEffect(() => {
    setConfigChangedCount(configChangedCount + 1);
  }, [cardsOfEachColor, cardsPerPack, numOfPacks, cardData]);

  return (
    <>
      <FormControl my="32px" isInvalid={isError}>
        <Flex direction={["column", "row"]} gap="8px" justify="space-between">
          <ControlledNumberInput
            label="Number of Packs"
            name="numOfPacks"
            value={numOfPacks}
            updateValue={setNumOfPacks}
          />
          <ControlledNumberInput
            label="Total Cards Per Pack"
            name="cardsPerPack"
            value={cardsPerPack}
            updateValue={setCardsPerPack}
          />
          <ControlledNumberInput
            label="Cards Per Color Per Pack"
            name="cardsOfEachColor"
            value={cardsOfEachColor}
            updateValue={setCardsOfEachColor}
          />
        </Flex>
        {isError && (
          <FormErrorMessage>
            Warning: Not enough cards. You've requested {numOfPacks} packs with{" "}
            {cardsPerPack} cards per pack which requires{" "}
            {numOfPacks * cardsPerPack} cards, but there are only {cardCount}{" "}
            total cards.
          </FormErrorMessage>
        )}
      </FormControl>
      <CardDataUploader cardData={cardData} updateCardData={setCardData} />
      <Packer
        key={configChangedCount}
        cardsOfEachColor={cardsOfEachColor}
        cardsPerPack={cardsPerPack}
        numOfPacks={numOfPacks}
        cardData={cardData}
      />
    </>
  );
};

export default ConfigurablePacker;
