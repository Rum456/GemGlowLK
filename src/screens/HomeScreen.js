import React, { useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import gems from '../data/gems.json';
import GemCard from '../components/GemCard';
import { COLORS } from '../theme';

export default function HomeScreen({ navigation }) {
  // Gem of the day changes by date, picked from the local dataset
  const featured = useMemo(() => {
    const day = Math.floor(Date.now() / 86400000);
    return gems[day % gems.length];
  }, []);

  const categories = useMemo(() => {
    const counts = {};
    gems.forEach((g) => {
      counts[g.category] = (counts[g.category] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, []);

  const districts = useMemo(() => new Set(gems.map((g) => g.district)).size, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>💎 GemGlow LK</Text>
        <Text style={styles.heroSub}>Offline Sri Lankan Gemstone Guide & Collection Log</Text>
        <Text style={styles.stats}>
          {gems.length} gems • {districts} districts • Works offline
        </Text>
      </View>

      <Text style={styles.section}>Gem of the Day</Text>
      <GemCard gem={featured} onPress={() => navigation.navigate('GemDetails', { gem: featured })} />

      <Text style={styles.section}>Browse by Type</Text>
      <View style={styles.chips}>
        {categories.map(([cat, n]) => (
          <TouchableOpacity
            key={cat}
            style={styles.chip}
            onPress={() => navigation.navigate('Gems', { category: cat })}
          >
            <Text style={styles.chipText}>
              {cat} ({n})
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.section}>Quick Actions</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.action} onPress={() => navigation.navigate('Compare')}>
          <Text style={styles.actionText}>⚖️ Compare Gems</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={() => navigation.navigate('Collection')}>
          <Text style={styles.actionText}>📒 My Collection</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  hero: { backgroundColor: COLORS.primary, borderRadius: 16, padding: 20, marginBottom: 8 },
  heroTitle: { color: '#fff', fontSize: 26, fontWeight: '800' },
  heroSub: { color: '#E6DDF7', marginTop: 4 },
  stats: { color: COLORS.accent, marginTop: 10, fontWeight: '700' },
  section: { fontSize: 18, fontWeight: '700', color: COLORS.text, marginTop: 16, marginBottom: 10 },
  chips: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: {
    backgroundColor: '#fff',
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: { color: COLORS.primary, fontWeight: '600' },
  row: { flexDirection: 'row' },
  action: {
    flex: 1,
    backgroundColor: COLORS.accent,
    padding: 16,
    borderRadius: 12,
    marginRight: 8,
    alignItems: 'center',
  },
  actionText: { fontWeight: '700', color: '#2b2b2b' },
});
