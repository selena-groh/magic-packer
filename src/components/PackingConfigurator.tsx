import { Flex, FormControl, FormErrorMessage } from "@chakra-ui/react";
import ControlledNumberInput from "./ControlledNumberInput";

const PackingConfigurator = ({
  cardsOfEachColor,
  setCardsOfEachColor,
  cardsPerPack,
  setCardsPerPack,
  numOfPacks,
  setNumOfPacks,
  cardCount,
}) => {
  // TODO: update this logic to account for cardsOfEachColor as well
  const isError = cardCount > 0 && cardsPerPack * numOfPacks > cardCount;

  return (
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
      <FormErrorMessage>
        Warning: Not enough cards. You've requested {numOfPacks} packs with{" "}
        {cardsPerPack} cards per pack which requires {numOfPacks * cardsPerPack}{" "}
        cards, but there are only {cardCount} total cards.
      </FormErrorMessage>
    </FormControl>
  );
};

export default PackingConfigurator;
