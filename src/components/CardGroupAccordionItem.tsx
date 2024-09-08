import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import MagicCard from "@/components/MagicCard";
import { sortCards } from "@/utilities/magic_helpers";
import { Card } from "@/utilities/types";

const CardGroupAccordionItem = ({
  title,
  cards,
}: {
  title: string;
  cards: Card[];
}) => {
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
          {cards?.sort(sortCards)?.map(
            (card) =>
              card && (
                <li key={`${title}-${card?.name}`}>
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
