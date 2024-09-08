import { useEffect, useState } from "react";
import Packer from "./Packer";
import CardDataUploader from "./CardDataUploader";
import { Card } from "../utilities/types";
import PackingConfigurator from "./PackingConfigurator";

const CARDS_OF_EACH_COLOR = 1;
const CARDS_PER_PACK = 15;
const NUM_OF_PACKS = 24;

const ConfigurablePacker = () => {
  const [cardData, setCardData] = useState<Card[]>([]);

  const [cardsOfEachColor, setCardsOfEachColor] = useState(CARDS_OF_EACH_COLOR);
  const [cardsPerPack, setCardsPerPack] = useState(CARDS_PER_PACK);
  const [numOfPacks, setNumOfPacks] = useState(NUM_OF_PACKS);

  // This counter increments when the config changes and is used to remount the Packer so that the cards get re-packed.
  const [configChangedCount, setConfigChangedCount] = useState(0);

  useEffect(() => {
    setConfigChangedCount(configChangedCount + 1);
  }, [cardsOfEachColor, cardsPerPack, numOfPacks, cardData]);

  return (
    <>
      <CardDataUploader updateCardData={setCardData} />
      <PackingConfigurator
        cardsOfEachColor={cardsOfEachColor}
        setCardsOfEachColor={setCardsOfEachColor}
        cardsPerPack={cardsPerPack}
        setCardsPerPack={setCardsPerPack}
        numOfPacks={numOfPacks}
        setNumOfPacks={setNumOfPacks}
        cardCount={cardData.length}
      />
      {cardData.length > 0 && (
        <Packer
          key={configChangedCount}
          cardsOfEachColor={cardsOfEachColor}
          cardsPerPack={cardsPerPack}
          numOfPacks={numOfPacks}
          cardData={cardData}
        />
      )}
    </>
  );
};

export default ConfigurablePacker;
