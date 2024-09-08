import { Flex, Container } from "@chakra-ui/react";
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
          maxWidth="1000px"
        >
          <SkipNavContent />
          {children}
        </Container>
      </main>
    </Flex>
  );
};

export default Layout;
