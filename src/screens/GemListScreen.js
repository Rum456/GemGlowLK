import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import gems from '../data/gems.json';
import GemCard from '../components/GemCard';
import { COLORS } from '../theme';

const colours = ['All', ...Array.from(new Set(gems.map((g) => g.colour))).sort()];
const SORTS = ['A–Z', 'Price ↑', 'Price ↓', 'Hardness ↓'];

export default function GemListScreen({ navigation, route }) {
  const [query, setQuery] = useState('');
  const [colour, setColour] = useState('All');
  const [category, setCategory] = useState(null);
  const [sort, setSort] = useState('A–Z');

  // Category chip pressed on the Home screen
  useEffect(() => {
    if (route.params?.category) setCategory(route.params.category);
  }, [route.params?.category]);

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = gems.filter((g) => {
      const matchQ =
        !q ||
        g.name.toLowerCase().includes(q) ||
        g.district.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q);
      const matchC = colour === 'All' || g.colour === colour;
      const matchCat = !category || g.category === category;
      return matchQ && matchC && matchCat;
    });
    list = [...list];
    if (sort === 'A–Z') list.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'Price ↑') list.sort((a, b) => a.priceMin - b.priceMin);
    if (sort === 'Price ↓') list.sort((a, b) => b.priceMax - a.priceMax);
    if (sort === 'Hardness ↓') list.sort((a, b) => b.hardness - a.hardness);
    return list;
  }, [query, colour, category, sort]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search by name, type or district..."
        value={query}
        onChangeText={setQuery}
        clearButtonMode="while-editing"
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
        {colours.map((c) => (
          <TouchableOpacity
            key={c}
            style={[styles.chip, colour === c && styles.chipActive]}
            onPress={() => setColour(c)}
          >
            <Text style={[styles.chipText, colour === c && styles.chipTextActive]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
        {SORTS.map((s) => (
          <TouchableOpacity
            key={s}
            style={[styles.chip, sort === s && styles.chipActive]}
            onPress={() => setSort(s)}
          >
            <Text style={[styles.chipText, sort === s && styles.chipTextActive]}>{s}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {category && (
        <TouchableOpacity style={styles.catBar} onPress={() => setCategory(null)}>
          <Text style={styles.catText}>Type: {category}  ✕ (tap to clear)</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.count}>{data.length} gem(s) found</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <GemCard gem={item} onPress={() => navigation.navigate('GemDetails', { gem: item })} />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No gems match your search.</Text>}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, padding: 12 },
  search: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  filterRow: { flexGrow: 0, marginTop: 10 },
  chip: {
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  chipActive: { backgroundColor: COLORS.primary },
  chipText: { color: COLORS.primary, fontWeight: '600' },
  chipTextActive: { color: '#fff' },
  catBar: { backgroundColor: COLORS.accent, padding: 8, borderRadius: 8, marginTop: 10 },
  catText: { fontWeight: '700', textAlign: 'center' },
  count: { marginVertical: 10, color: COLORS.muted },
  empty: { textAlign: 'center', marginTop: 40, color: COLORS.muted },
});
