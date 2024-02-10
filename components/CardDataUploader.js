import {
  FormControl,
  FormHelperText,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";

const CardDataUploader = ({ cardData, updateCardData }) => {
  let handleInputChange = (e) => {
    // Remove whitespace
    let inputValue = e.target.value.replace(/\s+/g, "");

    if (inputValue === "") {
      updateCardData([]);
    } else {
      updateCardData(JSON.parse(inputValue));
    }
  };

  return (
    <FormControl my="32px">
      <FormLabel>Card Data</FormLabel>
      <FormHelperText mb="8px">
        Paste card data here in JSON format as an array of objects that each
        have a name, color, and indexNumber field. Color must be exactly
        "White", "Blue", "Black", "Red", "Green", "Gold", "Artifact", or "Land".
        For help, try using{" "}
        <a href="https://jsonformatter.curiousconcept.com/">
          https://jsonformatter.curiousconcept.com/
        </a>{" "}
        on the "Compact" setting.
      </FormHelperText>
      <Textarea
        value={JSON.stringify(cardData)}
        onChange={handleInputChange}
        size="xs"
        resize="vertical"
        height="150px"
      />
    </FormControl>
  );
};

export default CardDataUploader;
