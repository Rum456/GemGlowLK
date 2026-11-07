import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'gemglow_collection';

export async function getCollection() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

async function save(list) {
  await AsyncStorage.setItem(KEY, JSON.stringify(list));
}

export async function addToCollection({ gemId, gemName, carat, price, note }) {
  const list = await getCollection();
  const item = {
    id: Date.now().toString(),
    gemId,
    gemName,
    carat: Number(carat) || 0,
    price: Number(price) || 0,
    note: note || '',
    addedOn: new Date().toISOString().slice(0, 10),
  };
  await save([item, ...list]);
  return item;
}

export async function removeFromCollection(id) {
  const list = await getCollection();
  await save(list.filter((i) => i.id !== id));
}
