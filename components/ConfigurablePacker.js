import Packer from "components/Packer";
import { Flex, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ControlledNumberInput from "components/ControlledNumberInput";
import { CARD_DATA } from "data/card_data";

const CARDS_OF_EACH_COLOR = 1;
const CARDS_PER_PACK = 15;
const NUM_OF_PACKS = 24;
const CARD_COUNT = CARD_DATA.length;

const ConfigurablePacker = () => {
  const [cardsOfEachColor, setCardsOfEachColor] = useState(CARDS_OF_EACH_COLOR);
  const [cardsPerPack, setCardsPerPack] = useState(CARDS_PER_PACK);
  const [numOfPacks, setNumOfPacks] = useState(NUM_OF_PACKS);

  // TODO: update this logic to account for cardsOfEachColor as well
  const isError = cardsPerPack * numOfPacks > CARD_COUNT;

  const [configChangedCount, setConfigChangedCount] = useState(0);

  useEffect(
    () => setConfigChangedCount(configChangedCount + 1),
    [cardsOfEachColor, cardsPerPack, numOfPacks]
  );

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
            {numOfPacks * cardsPerPack} cards, but there are only {CARD_COUNT}{" "}
            total cards.
          </FormErrorMessage>
        )}
      </FormControl>
      <Packer
        cardsOfEachColor={cardsOfEachColor}
        cardsPerPack={cardsPerPack}
        numOfPacks={numOfPacks}
        key={configChangedCount}
      />
    </>
  );
};

export default ConfigurablePacker;
