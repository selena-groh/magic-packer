import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";

const CardDataUploader = ({ cardData, updateCardData }) => {
  let handleInputChange = (e) => {
    let inputValue = e.target.value;
    updateCardData(JSON.parse(inputValue));
  };

  return (
    <FormControl my="32px">
      <FormLabel>Card Data</FormLabel>
      <Textarea
        value={JSON.stringify(cardData)}
        onChange={handleInputChange}
        placeholder="Paste card data here in JSON format."
        size="xs"
        resize="vertical"
        height="200px"
      />
    </FormControl>
  );
};

export default CardDataUploader;
