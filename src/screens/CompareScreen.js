import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import gems from '../data/gems.json';
import GemCard from '../components/GemCard';
import { COLORS, formatLKR } from '../theme';

const sorted = [...gems].sort((a, b) => a.name.localeCompare(b.name));

export default function CompareScreen({ route }) {
  const [a, setA] = useState(gems.find((g) => g.id === route.params?.firstId) || null);
  const [b, setB] = useState(null);

  const pick = (gem) => {
    if (!a) return setA(gem);
    if (!b && gem.id !== a.id) return setB(gem);
  };

  const reset = () => {
    setA(null);
    setB(null);
  };

  const rows =
    a && b
      ? [
          ['Type', a.category, b.category],
          ['Colour', a.colour, b.colour],
          ['Hardness', String(a.hardness), String(b.hardness)],
          ['District', a.district, b.district],
          ['Price from', formatLKR(a.priceMin), formatLKR(b.priceMin)],
          ['Price to', formatLKR(a.priceMax), formatLKR(b.priceMax)],
        ]
      : [];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 14 }}>
      {a && b ? (
        <>
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={[styles.cell, styles.head]} />
              <Text style={[styles.cell, styles.head]}>{a.name}</Text>
              <Text style={[styles.cell, styles.head]}>{b.name}</Text>
            </View>
            {rows.map(([label, v1, v2]) => (
              <View key={label} style={styles.row}>
                <Text style={[styles.cell, styles.label]}>{label}</Text>
                <Text style={styles.cell}>{v1}</Text>
                <Text style={styles.cell}>{v2}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.verdict}>
            {a.hardness === b.hardness
              ? 'Both gems have the same hardness.'
              : `${a.hardness > b.hardness ? a.name : b.name} is harder, so it is more scratch resistant.`}
          </Text>
          <TouchableOpacity style={styles.btn} onPress={reset}>
            <Text style={styles.btnText}>Compare other gems</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.hint}>
            {!a ? 'Step 1: choose the first gem' : `Step 2: choose a gem to compare with ${a.name}`}
          </Text>
          {a && (
            <TouchableOpacity onPress={reset}>
              <Text style={styles.clear}>Selected: {a.name}  ✕ change</Text>
            </TouchableOpacity>
          )}
          {sorted
            .filter((g) => !a || g.id !== a.id)
            .map((g) => (
              <GemCard key={g.id} gem={g} onPress={() => pick(g)} />
            ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  hint: { fontSize: 16, fontWeight: '700', marginBottom: 10, color: COLORS.text },
  clear: { color: COLORS.primary, fontWeight: '700', marginBottom: 10 },
  table: { backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden' },
  row: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#DDD',
  },
  cell: { flex: 1, padding: 10, fontSize: 13, color: COLORS.text },
  head: { backgroundColor: COLORS.primary, color: '#fff', fontWeight: '800' },
  label: { fontWeight: '700', color: COLORS.muted },
  verdict: { marginVertical: 14, fontWeight: '600', color: COLORS.text },
  btn: { backgroundColor: COLORS.primary, padding: 13, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700' },
});
