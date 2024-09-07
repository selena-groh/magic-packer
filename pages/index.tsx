import Layout from "components/layout/Layout";
import { Heading, Text } from "@chakra-ui/react";
import ConfigurablePacker from "components/ConfigurablePacker";

const Home = () => (
  <Layout>
    <Heading as="h1" size="2xl">
      Magic Packer
    </Heading>
    <Text color="gray.600">
      Generate randomized packs of Magic: The Gathering cards for draft or
      sealed.
    </Text>
    <ConfigurablePacker />
  </Layout>
);

export default Home;
