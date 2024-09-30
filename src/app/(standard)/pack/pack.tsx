"use client";

import React from "react";
import data from "data/sample_card_data.json";
import { Heading, SimpleGrid } from "@chakra-ui/react";
import MagicCard from "@/components/MagicCard";
import { Card } from "@/utilities/types";

const Pack = () => {
  return (
    <div>
      <Heading as="h2" size="xl">
        Pack #
      </Heading>
      <SimpleGrid columns={5} spacing="4px">
        {(data as Card[]).map((card) => (
          <MagicCard card={card} />
        ))}
      </SimpleGrid>
    </div>
  );
};

export default Pack;
