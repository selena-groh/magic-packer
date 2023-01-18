# magic-packer

## Technologies

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Chakra UI](https://chakra-ui.com/)

## Local Development
### Setup
```sh
git clone <repo URL>
cd magic-packer
yarn
```

### Adding Data
1. In the [`data/card_data.js`](data/card_data.js) file, add data in the following shape:
```js
export const CARD_DATA = [
  {
    name: "Sample White Card Name",
    cost: "2W",
    type: {
      supertype: "Creature",
      subtype: "",
    },
    color: "White",
    indexNumber: "1",
  },
  ...
];
export const CARD_DATA_BY_COLOR = {
  White: [
    {
      name: "Sample Card Name",
      cost: "2W",
      type: {
        supertype: "Creature",
        subtype: "",
      },
      color: "White",
      indexNumber: "1",
    },
  ],
  Blue: [...],
  Black: [...],
  Red: [...],
  Green: [...],
  Gold: [...],
  Artifact: [...],
  Land: [...],
};
```
> **_NOTE:_** if your data has number in the form of "51/540", you can use the `getIndexNumberFromTotalNumber()` function in [`magic_helpers.js`](src/magic_helpers.js) to generate index numbers.

> **_NOTE:_** if your data does not have the "color" field, you can generate it using the algorithm described in [`magic_helpers.js`](src/magic_helpers.js). This algorithm is not implemented yet in code.

### Running
Finally, run the following to get the application running locally:
```sh
yarn run dev
```
