import PropTypes from "prop-types";
import chakraTheme from "src/theme";
import { ChakraProvider } from "@chakra-ui/react";

// Client-side cache, shared for the whole session of the user in the browser.

const App = (props) => {
  const { Component, pageProps } = props;

  return (
    <ChakraProvider theme={chakraTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default App;
