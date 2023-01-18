import {
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

const ControlledNumberInput = ({ label, name, value, updateValue }) => {
  return (
    <div>
      <FormLabel>{label}</FormLabel>
      <NumberInput
        onChange={(valueString) => updateValue(parseInt(valueString))}
        value={value}
        name={name}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </div>
  );
};

export default ControlledNumberInput;
