import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getCollection, removeFromCollection } from '../storage/collection';
import { COLORS, formatLKR } from '../theme';

export default function CollectionScreen({ navigation }) {
  const [items, setItems] = useState([]);

  // Reload every time the tab is opened
  useFocusEffect(
    useCallback(() => {
      getCollection().then(setItems);
    }, [])
  );

  const confirmDelete = (item) => {
    Alert.alert('Remove gem', `Remove ${item.gemName} from your collection?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: async () => {
          await removeFromCollection(item.id);
          setItems(await getCollection());
        },
      },
    ]);
  };

  const totalCarat = items.reduce((s, i) => s + i.carat, 0);
  const totalPaid = items.reduce((s, i) => s + i.price, 0);

  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <View style={styles.sumBox}>
          <Text style={styles.sumNum}>{items.length}</Text>
          <Text style={styles.sumLabel}>Gems</Text>
        </View>
        <View style={styles.sumBox}>
          <Text style={styles.sumNum}>{totalCarat.toFixed(2)}</Text>
          <Text style={styles.sumLabel}>Total carats</Text>
        </View>
        <View style={styles.sumBox}>
          <Text style={styles.sumNum}>{formatLKR(totalPaid)}</Text>
          <Text style={styles.sumLabel}>Total paid</Text>
        </View>
      </View>

      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 12 }}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Text style={styles.empty}>Your collection is empty.</Text>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Gems')}>
              <Text style={styles.btnText}>Browse gems</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.gemName}</Text>
              <Text style={styles.sub}>
                {item.carat} ct • {item.price ? formatLKR(item.price) : 'Price not set'}
              </Text>
              <Text style={styles.date}>Added {item.addedOn}</Text>
            </View>
            <TouchableOpacity onPress={() => confirmDelete(item)}>
              <Text style={styles.del}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  summary: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    padding: 14,
    justifyContent: 'space-around',
  },
  sumBox: { alignItems: 'center' },
  sumNum: { color: COLORS.accent, fontSize: 18, fontWeight: '800' },
  sumLabel: { color: '#E6DDF7', fontSize: 12 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  name: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  sub: { color: COLORS.primary, marginTop: 3, fontWeight: '600' },
  date: { color: COLORS.muted, fontSize: 12, marginTop: 2 },
  del: { fontSize: 22, paddingLeft: 12 },
  empty: { color: COLORS.muted, fontSize: 16, marginBottom: 14 },
  btn: { backgroundColor: COLORS.primary, paddingHorizontal: 20, paddingVertical: 11, borderRadius: 10 },
  btnText: { color: '#fff', fontWeight: '700' },
});
