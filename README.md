# GemGlow LK – Offline Sri Lankan Gemstone Guide & Collection Log

ICA 03 – Individual React Native Project

GemGlow LK is a mobile app (React Native + Expo) about gemstones found in Sri Lanka. It works fully offline: all data is stored locally in the app.

## Features

- Local dataset of 30 Sri Lankan gemstones (`src/data/gems.json`)
- Home screen with a gem of the day, browse by type, and quick actions
- Gem list with search, colour filter, type filter and sorting
- Gem details screen with hardness, district, approximate price range and care tip
- Compare two gems side by side
- My Collection: add gems with carat weight and price paid, delete them, and see totals (saved with AsyncStorage)
- Care and buying tips, including how to spot fake gems
- No internet, API or online database needed

## Screens (6)

1. Home
2. Gem List (search, filter, sort)
3. Gem Details
4. Compare Gems
5. My Collection
6. Care & Buying Tips

## Tech

- React Native (Expo)
- React Navigation (bottom tabs + native stack)
- AsyncStorage (local storage)
- Local JSON file (dataset)

## Run

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go on your phone.

## Note

Prices in the dataset are approximate values in LKR per carat, for guidance only.

## Author

Rumana Zeerin
Reg No:- 2022ICT113 
University of Vavuniya, Faculty of Applied Science
