import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../theme';

const SECTIONS = [
  {
    title: '🔍 How to spot a fake gem',
    items: [
      'Glass and plastic often hide tiny round air bubbles. Natural gems usually show crystal-like inclusions.',
      'Real gems feel cold on the skin for longer than glass.',
      'A "too perfect" stone with no flaws at a very low price is a warning sign.',
      'Scratch test: a real sapphire or ruby will not be scratched by a steel knife.',
      'Ask a gem lab or a certified dealer to confirm expensive stones.',
    ],
  },
  {
    title: '🛒 Buying tips',
    items: [
      'Buy from licensed dealers and ask for a lab report (for example from the National Gem and Jewellery Authority, NGJA).',
      'Ask whether the stone is natural, heat-treated or synthetic. Heat treatment is common but must be told.',
      'Compare colour, clarity, cut and carat weight (the 4 Cs) before paying.',
      'Compare prices at more than one shop.',
      'Keep the receipt and certificate safe.',
    ],
  },
  {
    title: '🧼 General care',
    items: [
      'Store gems separately in soft pouches so harder gems do not scratch softer ones.',
      'Use warm water, mild soap and a soft brush for most gems.',
      'Take jewellery off for sports, cleaning and swimming.',
      'Soft stones (moonstone, apatite, sphene) need extra care. Do not use ultrasonic cleaners.',
      'Keep amethyst and rose quartz away from strong sunlight.',
    ],
  },
  {
    title: '📏 Mohs hardness quick guide',
    items: [
      '9 – Sapphire, Ruby (very durable)',
      '8 – 8.5 – Spinel, Topaz, Cat\'s Eye, Alexandrite',
      '7 – 7.5 – Quartz, Garnet, Tourmaline, Aquamarine, Zircon',
      '6 – 6.5 – Moonstone, Sunstone, Sinhalite',
      '5 – 5.5 – Apatite, Sphene (soft, wear carefully)',
    ],
  },
  {
    title: '🇱🇰 Did you know?',
    items: [
      'Ratnapura means "City of Gems" in Sinhala.',
      'Sri Lanka has been known for gems for over 2,000 years.',
      'Sinhalite was first identified in Sri Lanka.',
      'Padparadscha is one of the rarest sapphires and its name means lotus colour.',
    ],
  },
];

export default function TipsScreen() {
  const [open, setOpen] = useState(0);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 14 }}>
      {SECTIONS.map((s, idx) => (
        <View key={s.title} style={styles.card}>
          <TouchableOpacity onPress={() => setOpen(open === idx ? -1 : idx)}>
            <Text style={styles.title}>{s.title}</Text>
          </TouchableOpacity>
          {open === idx &&
            s.items.map((t) => (
              <Text key={t} style={styles.item}>
                • {t}
              </Text>
            ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 10 },
  title: { fontSize: 16, fontWeight: '700', color: COLORS.primary },
  item: { marginTop: 8, color: COLORS.text, lineHeight: 21 },
});
