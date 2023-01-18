import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import MagicCard from "components/MagicCard";

const CardGroupAccordionItem = ({ title, cards }) => {
  return (
    <AccordionItem>
      <h3>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h3>
      <AccordionPanel pb={4}>
        <Box as="ol" px={6} py={2}>
          {cards?.map(
            (card) =>
              card && (
                <li key={`${title}-${card?.indexNumber}`}>
                  <MagicCard card={card} />
                </li>
              )
          )}
        </Box>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default CardGroupAccordionItem;
