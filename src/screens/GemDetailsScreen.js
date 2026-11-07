import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { addToCollection } from '../storage/collection';
import { COLORS, COLOUR_DOTS, formatLKR } from '../theme';

function Row({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

export default function GemDetailsScreen({ route, navigation }) {
  const { gem } = route.params;
  const [carat, setCarat] = useState('');
  const [price, setPrice] = useState('');

  const handleAdd = async () => {
    if (!carat || isNaN(Number(carat)) || Number(carat) <= 0) {
      Alert.alert('Enter carat weight', 'Please enter a valid carat weight, e.g. 2.5');
      return;
    }
    await addToCollection({
      gemId: gem.id,
      gemName: gem.name,
      carat,
      price: price || 0,
    });
    setCarat('');
    setPrice('');
    Alert.alert('Added', `${gem.name} was added to your collection.`, [
      { text: 'View collection', onPress: () => navigation.navigate('Main', { screen: 'Collection' }) },
      { text: 'OK' },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <View style={styles.header}>
        <View style={[styles.dot, { backgroundColor: COLOUR_DOTS[gem.colour] || '#999' }]} />
        <Text style={styles.title}>{gem.name}</Text>
        <Text style={styles.badge}>{gem.category}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.desc}>{gem.description}</Text>
      </View>

      <View style={styles.card}>
        <Row label="Colour" value={gem.colour} />
        <Row label="Mohs hardness" value={String(gem.hardness)} />
        <Row label="Found in" value={gem.district} />
        <Row
          label="Approx. price"
          value={`${formatLKR(gem.priceMin)} – ${formatLKR(gem.priceMax)} per carat`}
        />
      </View>

      <Text style={styles.section}>🧼 Care Tip</Text>
      <View style={styles.card}>
        <Text style={styles.desc}>{gem.care}</Text>
      </View>

      <Text style={styles.note}>
        Prices are rough estimates for guidance only. Real prices depend on quality, cut and treatment.
      </Text>

      <Text style={styles.section}>➕ Add to My Collection</Text>
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Carat weight (e.g. 2.5)"
          keyboardType="decimal-pad"
          value={carat}
          onChangeText={setCarat}
        />
        <TextInput
          style={styles.input}
          placeholder="Price paid in Rs. (optional)"
          keyboardType="number-pad"
          value={price}
          onChangeText={setPrice}
        />
        <TouchableOpacity style={styles.btn} onPress={handleAdd}>
          <Text style={styles.btnText}>Add to Collection</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: COLORS.accent, marginTop: 4 }]}
        onPress={() => navigation.navigate('Compare', { firstId: gem.id })}
      >
        <Text style={[styles.btnText, { color: '#2b2b2b' }]}>⚖️ Compare with another gem</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: { alignItems: 'center', marginBottom: 12 },
  dot: { width: 70, height: 70, borderRadius: 35, marginBottom: 8 },
  title: { fontSize: 26, fontWeight: '800', color: COLORS.text },
  badge: {
    marginTop: 6,
    backgroundColor: COLORS.primary,
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
    fontWeight: '600',
  },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 10 },
  desc: { fontSize: 15, color: COLORS.text, lineHeight: 22 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#DDD',
  },
  label: { color: COLORS.muted },
  value: { fontWeight: '700', color: COLORS.text, flexShrink: 1, textAlign: 'right', marginLeft: 12 },
  section: { fontSize: 17, fontWeight: '700', marginTop: 10, marginBottom: 8 },
  note: { fontSize: 12, color: COLORS.muted, fontStyle: 'italic', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    marginBottom: 10,
  },
  btn: { backgroundColor: COLORS.primary, padding: 13, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700' },
});
