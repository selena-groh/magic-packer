"use client";

import { Heading, Text } from "@chakra-ui/react";
import React from "react";
import ConfigurablePacker from "@/components/ConfigurablePacker";

const Home = () => {
  return (
    <>
      <Heading as="h1" size="2xl">
        Magic Packer
      </Heading>
      <Text color="gray.600">
        Generate randomized packs of Magic: The Gathering cards for draft or
        sealed.
      </Text>
      <ConfigurablePacker />
    </>
  );
};

export default Home;
