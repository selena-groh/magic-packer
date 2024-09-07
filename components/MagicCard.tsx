import { Badge } from "@chakra-ui/react";
import { COLORS } from "src/magic_constants";

const COLORS_TO_BADGE_COLORS = {
  [COLORS.COLORLESS]: "gray",
  [COLORS.WHITE]: "gray",
  [COLORS.BLUE]: "blue",
  [COLORS.BLACK]: "gray",
  [COLORS.RED]: "red",
  [COLORS.GREEN]: "green",
  [COLORS.GOLD]: "yellow",
  [COLORS.ARTIFACT]: "blackAlpha",
  [COLORS.LAND]: "purple",
};

const MagicCard = ({ card }) => {
  return (
    <Badge
      variant={card.color === COLORS.WHITE ? "outline" : "solid"}
      colorScheme={COLORS_TO_BADGE_COLORS[card.color]}
      textTransform="initial"
    >
      {card.name} (#{card.indexNumber} {card.color})
    </Badge>
  );
};

export default MagicCard;
