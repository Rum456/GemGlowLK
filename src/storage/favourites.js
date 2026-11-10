import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'gemglow_favourites';

// Returns an array of favourite gem ids, e.g. [1, 5, 11]
export async function getFavourites() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

// Adds the id if it is not a favourite yet, removes it if it is.
// Returns the updated array of ids.
export async function toggleFavourite(gemId) {
  const ids = await getFavourites();
  const updated = ids.includes(gemId) ? ids.filter((i) => i !== gemId) : [...ids, gemId];
  await AsyncStorage.setItem(KEY, JSON.stringify(updated));
  return updated;
}
