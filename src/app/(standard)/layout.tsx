import { Flex, Container, Heading, Text } from "@chakra-ui/react";
import { SkipNavLink, SkipNavContent } from "@chakra-ui/skip-nav";

const Layout = ({ children }) => {
  return (
    <Flex minHeight="100vh" flexDirection="column">
      <SkipNavLink>Skip to content</SkipNavLink>
      <main>
        <Container
          flexGrow="1"
          py={{ base: 8, md: 16 }}
          px={4}
          maxWidth="1200px"
        >
          <SkipNavContent />
          <Heading as="h1" size="2xl">
            Magic Packer
          </Heading>
          <Text color="gray.600" mb="32px">
            Generate randomized packs of Magic: The Gathering cards for draft or
            sealed.
          </Text>
          {children}
        </Container>
      </main>
    </Flex>
  );
};

export default Layout;
