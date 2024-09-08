import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import CARD_DATA from "data/sample_card_data.json";
import { getColorFromCard } from "src/utilities/magic_helpers";

const CardDataUploader = ({ updateCardData }) => {
  const [value, setValue] = useState(JSON.stringify(CARD_DATA));
  const [error, setError] = useState(null);

  let handleSubmit = () => {
    if (value === "") {
      updateCardData([]);
    } else {
      try {
        let data = JSON.parse(value);
        // Hack for author's data to generate color
        if (data && data[0] && !data[0].color && data[0].mana_cost) {
          data = data.map((card) => ({
            ...card,
            color: getColorFromCard(card),
          }));
        }
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
        have a name, color, and optional indexNumber field. Color must be
        exactly "White", "Blue", "Black", "Red", "Green", "Gold", "Colorless",
        or "Land".
        <br />
        For help, try using{" "}
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
