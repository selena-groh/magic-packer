import { Badge } from "@chakra-ui/react";
import { Card, Color } from "@/utilities/types";

const COLOR_TO_BADGE_COLOR: { [key in Color]: string } = {
  [Color.White]: "gray",
  [Color.Blue]: "blue",
  [Color.Black]: "gray",
  [Color.Red]: "red",
  [Color.Green]: "green",
  [Color.Gold]: "yellow",
  [Color.Colorless]: "blackAlpha",
  [Color.Artifact]: "blackAlpha",
  [Color.Land]: "purple",
};

const MagicCard = ({ card }: { card: Card }) => {
  return (
    <Badge
      variant={card.color === Color.White ? "outline" : "solid"}
      colorScheme={COLOR_TO_BADGE_COLOR[card.color]}
      textTransform="initial"
    >
      {card.name} ({card.indexNumber ? `#${card.indexNumber} ` : ""}
      {card.color})
    </Badge>
  );
};

export default MagicCard;
