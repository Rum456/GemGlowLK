import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, COLOUR_DOTS, formatLKR } from '../theme';

export default function GemCard({ gem, onPress, selected }) {
  return (
    <TouchableOpacity
      style={[styles.card, selected && styles.selected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.dot, { backgroundColor: COLOUR_DOTS[gem.colour] || '#999' }]} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{gem.name}</Text>
        <Text style={styles.sub}>
          {gem.category} • {gem.colour} • Hardness {gem.hardness}
        </Text>
        <Text style={styles.price}>
          {formatLKR(gem.priceMin)} – {formatLKR(gem.priceMax)} / ct
        </Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  selected: { borderWidth: 2, borderColor: COLORS.accent },
  dot: { width: 38, height: 38, borderRadius: 19, marginRight: 12 },
  name: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  sub: { fontSize: 12, color: COLORS.muted, marginTop: 2 },
  price: { fontSize: 12, color: COLORS.primary, marginTop: 4, fontWeight: '600' },
  arrow: { fontSize: 26, color: COLORS.muted, marginLeft: 8 },
});
