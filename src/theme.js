import { extendTheme } from "@chakra-ui/react";

const primaryColor = "#6F0B46";

const theme = extendTheme({
  colors: {
    primary: primaryColor,
  },
  fonts: {
    body: "system-ui, sans-serif",
    heading: "Roboto Serif, serif",
    mono: "Menlo, monospace",
  },
  components: {
    Heading: {
      sizes: {
        "2xl": {
          fontWeight: "normal",
          marginBottom: "16px",
        },
        xl: {
          fontWeight: "light",
          marginBottom: "16px",
        },
        lg: {
          fontWeight: "light",
          marginBottom: "12px",
        },
        md: {
          fontWeight: "normal",
        },
      },
    },
    Link: {
      baseStyle: {
        color: "primary",
        _hover: { textDecorationThickness: "1px", color: "primary" },
        transition: "color 200ms",
      },
      variants: {
        icon: {
          color: "gray.800",
          _hover: { textDecorationThickness: "1px", color: "primary" },
          transition: "color 200ms",
        },
        inverse: {
          color: "white",
          _hover: { textDecorationThickness: "1px", color: "white" },
        },
      },
    },
    Tag: {
      parts: ["container", "label", "closeButton"],
      variants: {
        outline: {
          container: {
            boxShadow: `inset 0 0 0px 1px ${primaryColor}`,
            color: "primary",
          },
        },
        solid: {
          container: {
            bg: "primary",
            color: "white",
          },
        },
      },
    },
  },
});

export default theme;
