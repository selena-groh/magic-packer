import Head from "next/head";
import { Flex, Container } from "@chakra-ui/react";
import { SkipNavLink, SkipNavContent } from "@chakra-ui/skip-nav";

const Layout = ({ children, title = "" }) => {
  return (
    <>
      <Head>
        <title>{title ? `${title} | Magic Packer` : "Magic Packer"}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
      </Head>
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
    </>
  );
};

export default Layout;
