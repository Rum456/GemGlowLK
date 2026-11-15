import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'gemglow_recent';
const MAX = 5;

// Returns an array of gem ids, newest first, e.g. [7, 1, 12]
export async function getRecent() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

// Puts the gem at the front of the list (no duplicates, max 5)
export async function addRecent(gemId) {
  try {
    const ids = await getRecent();
    const updated = [gemId, ...ids.filter((i) => i !== gemId)].slice(0, MAX);
    await AsyncStorage.setItem(KEY, JSON.stringify(updated));
  } catch (e) {
    // ignore storage errors
  }
}
