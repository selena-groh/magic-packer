import {
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

const ControlledNumberInput = ({
  label,
  name,
  value,
  updateValue,
}: {
  label: string;
  name: string;
  value: number;
  updateValue: (number) => void;
}) => {
  return (
    <div>
      <FormLabel>{label}</FormLabel>
      <NumberInput
        onChange={(valueString) =>
          updateValue(valueString ? parseInt(valueString) : 0)
        }
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
