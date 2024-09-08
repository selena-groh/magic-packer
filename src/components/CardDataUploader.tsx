import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import CARD_DATA from "data/card_data.json";

const CardDataUploader = ({ updateCardData }) => {
  const [value, setValue] = useState(JSON.stringify(CARD_DATA));
  const [error, setError] = useState(null);

  let handleSubmit = () => {
    // Remove whitespace
    // let inputValue = value.replace(/\s+/g, "");

    if (value === "") {
      updateCardData([]);
    } else {
      try {
        const data = JSON.parse(value);
        updateCardData(data);
        setError(null);
      } catch (e) {
        setError(e.message);
      }
    }
  };

  return (
    <FormControl my="32px" isInvalid={error}>
      <FormErrorMessage>Error parsing card data: {error}</FormErrorMessage>
      <FormLabel>Card Data</FormLabel>
      <FormHelperText mb="8px">
        Paste card data here in JSON format as an array of objects that each
        have a name, color, and indexNumber field. Color must be exactly
        "White", "Blue", "Black", "Red", "Green", "Gold", "Colorless", or
        "Land". For help, try using{" "}
        <a href="https://jsonformatter.curiousconcept.com/">
          https://jsonformatter.curiousconcept.com/
        </a>{" "}
        on the "Compact" setting.
      </FormHelperText>
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        size="xs"
        resize="vertical"
        height="150px"
        mb="16px"
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </FormControl>
  );
};

export default CardDataUploader;
