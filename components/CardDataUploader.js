import {
  FormControl,
  FormHelperText,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";

const CardDataUploader = ({ cardData, updateCardData }) => {
  let handleInputChange = (e) => {
    let inputValue = e.target.value;
    updateCardData(JSON.parse(inputValue));
  };

  return (
    <FormControl my="32px">
      <FormLabel>Card Data</FormLabel>
      <FormHelperText mb="8px">
        Paste card data here in JSON format as an array of objects that each
        have a name, color, and indexNumber field. Color must be exactly
        "White", "Blue", "Black", "Red", "Green", "Gold", "Artifact", or "Land".
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
