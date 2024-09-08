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

1. In the [`data/card_data.json`](data/card_data.json) file, add data in the following shape. Only name and color are currently required, and indexNumber is optional. Color must be exactly "White", "Blue", "Black", "Red", "Green", "Gold", "Colorless", or "Land".

```json
[{"name":"Sample White Card Name","color":"White","indexNumber":"1"},{"name":"Sample Blue Card Name","color":"Blue","indexNumber":"2"},{"name":"Sample Black Card Name","color":"Black","indexNumber":"3"},{"name":"Sample Red Card Name","color":"Red","indexNumber":"4"},{"name":"Sample Green Card Name","color":"Green","indexNumber":"5"},{"name":"Sample Gold Card Name","color":"Gold","indexNumber":"6"},{"name":"Sample Artifact Card Name","color":"Artifact","indexNumber":"7"},{"name":"Sample Land Card Name","color":"Land","indexNumber":"8"}];
```

> **_NOTE:_** if your data has number in the form of "51/540", you can use the `getIndexNumberFromTotalNumber()` function in [`magic_helpers.js`](src/utilities/magic_helpers.ts) to generate index numbers.

> **_NOTE:_** if your data does not have the "color" field, you can generate it using the functions in [`magic_helpers.ts`](src/utilities/magic_helpers.ts).

### Running

Finally, run the following to get the application running locally:

```sh
yarn run dev
```
