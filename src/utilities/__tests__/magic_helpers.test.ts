import { getColorFromCard, splitManaCostIntoArray } from "../magic_helpers";

describe("splitManaCostIntoArray", () => {
  test.each([
    ["", []],
    ["{W}", ["{W}"]],
    ["{W}{U}{B}{R}{G}", ["{W}", "{U}", "{B}", "{R}", "{G}"]],
    ["{1}{G}", ["{1}", "{G}"]],
    ["{W/G}{P}", ["{W/G}", "{P}"]],
  ])('mana_cost "%s" becomes "%s"', (mana_cost, expected) => {
    expect(splitManaCostIntoArray(mana_cost)).toEqual(expected);
  });
  test.each([["{"], ["{W"], ["{}"], ["{Q}"]])(
    'mana_cost "%s" throws Error "Invalid Mana Cost"',
    (mana_cost) => {
      expect(() => splitManaCostIntoArray(mana_cost)).toThrow(
        "Invalid Mana Cost"
      );
    }
  );
});

describe("getColorFromCard", () => {
  test.each([
    {
      card: {
        name: "Fy'Alari, the Guiding",
        mana_cost: "",
        type: "Legendary Creature Land",
        image:
          "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/FyAlari the Guiding.png",
      },
      color: "Land",
    },
    {
      card: {
        name: "A God from the Ashes",
        mana_cost: "",
        type: "Prophecy",
        image:
          "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/A God from the Ashes.png",
      },
      color: "Gold",
    },
    {
      card: {
        name: "Emrakul, Who Shattered the Moon",
        mana_cost: "",
        type: "Legendary Creature",
        image:
          "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Emrakul Who Shattered the Moon.png",
      },
      color: "Colorless",
    },
    {
      card: {
        name: "Galactic Palm",
        mana_cost: "{X}{U}{R}",
        type: "Instant",
        image:
          "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Galactic Palm.png",
      },
      color: "Gold",
    },
    {
      card: {
        name: "Ghost Shadow Lotus",
        mana_cost: "{0}",
        type: "Artifact",
        image:
          "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Ghost Shadow Lotus.png",
      },
      color: "Colorless",
    },
    {
      card: {
        name: "Grafted Spy Network",
        mana_cost: "{U/P}",
        type: "Instant",
        image:
          "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Grafted Spy Network.png",
      },
      color: "Blue",
    },
    {
      card: {
        name: "Phyrexian Trading Post",
        mana_cost: "{P}",
        type: "Artifact",
        image:
          "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Phyrexian Trading Post.png",
      },
      color: "Colorless",
    },
    {
      card: {
        name: "Piranai, The Blighted Bloom",
        mana_cost: "{B/G}",
        type: "Legendary Creature",
        image:
          "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Piranai The Blighted Bloom.png",
      },
      color: "Gold",
    },
    {
      card: {
        name: "Ravnican Renaissance",
        mana_cost: "{U}{U}{U}",
        type: "Instant",
        image:
          "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Ravnican Renaissance.png",
      },
      color: "Blue",
    },
    {
      card: {
        name: "Shape the Shadows",
        mana_cost: "{G}{G}{U}{U}",
        type: "Sorcery",
        image:
          "https://jjkv.github.io/jazzy_vintage_cube_images/output_images/Shape the Shadows.png",
      },
      color: "Gold",
    },
  ])('card "$card.name" has color "$color"', ({ card, color }) => {
    expect(getColorFromCard(card)).toEqual(color);
  });
});
