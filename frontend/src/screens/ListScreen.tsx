import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Sae, PromotionFilter, DomaineFilter } from '../types/sae';
import { fetchAllSae } from '../api/client';

const PROMOTIONS: PromotionFilter[] = ['TOUS', 'MMI2', 'MMI3'];
const DOMAINES: DomaineFilter[] = ['TOUS', 'Web', 'Création', 'DI', '3D'];

type Props = {
  onSelectSae: (sae: Sae) => void;
  onAddPress: () => void;
};

export default function ListScreen({ onSelectSae, onAddPress }: Props) {
  const [list, setList] = useState<Sae[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [promo, setPromo] = useState<PromotionFilter>('TOUS');
  const [domaine, setDomaine] = useState<DomaineFilter>('TOUS');
  const [sortByNote, setSortByNote] = useState(true);

  const load = useCallback(async () => {
    try {
      const data = await fetchAllSae();
      setList(data);
    } catch (e) {
      Alert.alert('Erreur', 'Impossible de charger les SAÉ. Vérifie que le backend tourne sur le port 8080.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const onRefresh = () => {
    setRefreshing(true);
    load();
  };

  const filtered = list
    .filter((s) => (promo === 'TOUS' ? true : s.promotion === promo))
    .filter((s) => (domaine === 'TOUS' ? true : s.domaine === domaine))
    .slice()
    .sort((a, b) => {
      if (!sortByNote) return 0;
      const na = a.noteObtenue ?? 0;
      const nb = b.noteObtenue ?? 0;
      return nb - na;
    });

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Chargement des SAÉ…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Banque SAÉ – BUT MMI Meaux</Text>
        <TouchableOpacity style={styles.addBtn} onPress={onAddPress}>
          <Text style={styles.addBtnText}>+ Ajouter</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filters}>
        <Text style={styles.filterLabel}>Promotion</Text>
        <View style={styles.chipRow}>
          {PROMOTIONS.map((p) => (
            <TouchableOpacity
              key={p}
              style={[styles.chip, promo === p && styles.chipActive]}
              onPress={() => setPromo(p)}
            >
              <Text style={[styles.chipText, promo === p && styles.chipTextActive]}>{p}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.filterLabel}>Domaine</Text>
        <View style={styles.chipRow}>
          {DOMAINES.map((d) => (
            <TouchableOpacity
              key={d}
              style={[styles.chip, domaine === d && styles.chipActive]}
              onPress={() => setDomaine(d)}
            >
              <Text style={[styles.chipText, domaine === d && styles.chipTextActive]}>{d}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.sortBtn} onPress={() => setSortByNote(!sortByNote)}>
          <Text style={styles.sortBtnText}>
            Trier par note : {sortByNote ? '↓ décroissant' : '— désactivé'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => onSelectSae(item)} activeOpacity={0.8}>
            <Text style={styles.cardTitle}>{item.titre}</Text>
            <View style={styles.cardMeta}>
              <Text style={styles.cardMetaText}>{item.promotion}</Text>
              {item.domaine && <Text style={styles.cardMetaText}> • {item.domaine}</Text>}
              {item.noteObtenue != null && (
                <Text style={styles.cardNote}>Note : {item.noteObtenue}</Text>
              )}
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Aucune SAÉ pour ces filtres.</Text>
        }
      />
    </View>
  );
}

const COLORS = {
  primary: '#0066b3',
  primaryDark: '#004c8a',
  background: '#f5f7fa',
  card: '#ffffff',
  text: '#1a1a2e',
  textSecondary: '#5c5c7a',
  border: '#e0e4e8',
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background },
  loadingText: { marginTop: 12, color: COLORS.textSecondary },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 12,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: { fontSize: 20, fontWeight: '700', color: COLORS.text },
  addBtn: { backgroundColor: COLORS.primary, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 8 },
  addBtnText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  filters: { paddingHorizontal: 16, paddingVertical: 12, backgroundColor: COLORS.card, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  filterLabel: { fontSize: 12, fontWeight: '600', color: COLORS.textSecondary, marginBottom: 6 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  chip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, backgroundColor: COLORS.background },
  chipActive: { backgroundColor: COLORS.primary },
  chipText: { fontSize: 13, color: COLORS.text },
  chipTextActive: { color: '#fff' },
  sortBtn: { alignSelf: 'flex-start', paddingVertical: 6 },
  sortBtnText: { fontSize: 13, color: COLORS.primary, fontWeight: '600' },
  listContent: { padding: 16, paddingBottom: 32 },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text, marginBottom: 6 },
  cardMeta: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' },
  cardMetaText: { fontSize: 13, color: COLORS.textSecondary },
  cardNote: { fontSize: 13, color: COLORS.primary, fontWeight: '600', marginLeft: 8 },
  empty: { textAlign: 'center', color: COLORS.textSecondary, marginTop: 24 },
});
