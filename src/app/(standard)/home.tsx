"use client";

import React from "react";
import { Link } from "@chakra-ui/next-js";
import { Flex } from "@chakra-ui/react";

const Home = () => {
  return (
    <Flex direction={["column", "row"]} gap="32px" justify="flex-start">
      <Link href="/packer">Get Packing!</Link>
      <Link href="/parser">Get Parsing! (WIP)</Link>
      <Link href="/pack">View an individual pack (WIP)</Link>
    </Flex>
  );
};

export default Home;
