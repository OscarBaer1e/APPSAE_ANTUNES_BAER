import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  Dimensions,
} from 'react-native';
import { Sae } from '../types/sae';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_SIZE = SCREEN_WIDTH - 32;

type Props = {
  sae: Sae;
  onBack: () => void;
};

function parseImageUrls(imagesUrls: string | null): string[] {
  if (!imagesUrls || !imagesUrls.trim()) return [];
  return imagesUrls
    .split(/[\n,]+/)
    .map((u) => u.trim())
    .filter(Boolean);
}

export default function DetailScreen({ sae, onBack }: Props) {
  const imageUrls = parseImageUrls(sae.imagesUrls);

  const openLink = (url: string) => {
    Linking.openURL(url).catch(() => {});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backBtnText}>← Retour</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{sae.titre}</Text>
        <View style={styles.badges}>
          <View style={styles.badge}><Text style={styles.badgeText}>{sae.promotion}</Text></View>
          {sae.domaine && <View style={styles.badge}><Text style={styles.badgeText}>{sae.domaine}</Text></View>}
          {sae.noteObtenue != null && (
            <View style={[styles.badge, styles.badgeNote]}>
              <Text style={styles.badgeText}>Note : {sae.noteObtenue}</Text>
            </View>
          )}
        </View>

        {imageUrls.length > 0 && (
          <View style={styles.gallerySection}>
            <Text style={styles.sectionTitle}>Galerie</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.gallery}>
              {imageUrls.map((uri, i) => (
                <View key={i} style={styles.imageWrap}>
                  <Image source={{ uri }} style={styles.galleryImage} resizeMode="cover" />
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {sae.semestre && <Row label="Semestre" value={sae.semestre} />}
        {sae.ueCorrespondante && <Row label="UE" value={sae.ueCorrespondante} />}
        {sae.competences && <Row label="Compétences" value={sae.competences} />}
        {sae.auteurs && <Row label="Auteurs" value={sae.auteurs} />}
        {sae.dateDebut && <Row label="Début" value={sae.dateDebut} />}
        {sae.dateFin && <Row label="Fin" value={sae.dateFin} />}
        {sae.tauxReussite != null && <Row label="Taux réussite" value={`${sae.tauxReussite} %`} />}

        {sae.lienSite && (
          <TouchableOpacity style={styles.linkBtn} onPress={() => openLink(sae.lienSite!)}>
            <Text style={styles.linkBtnText}>Ouvrir le site</Text>
          </TouchableOpacity>
        )}
        {sae.lienProductions && (
          <TouchableOpacity style={[styles.linkBtn, styles.linkBtnSecondary]} onPress={() => openLink(sae.lienProductions!)}>
            <Text style={styles.linkBtnTextSecondary}>Lien productions</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const COLORS = {
  primary: '#0066b3',
  background: '#f5f7fa',
  card: '#ffffff',
  text: '#1a1a2e',
  textSecondary: '#5c5c7a',
  border: '#e0e4e8',
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingHorizontal: 16, paddingTop: 56, paddingBottom: 8, backgroundColor: COLORS.card, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  backBtn: { alignSelf: 'flex-start' },
  backBtnText: { fontSize: 16, color: COLORS.primary, fontWeight: '600' },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 32 },
  title: { fontSize: 22, fontWeight: '700', color: COLORS.text, marginBottom: 12 },
  badges: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  badge: { backgroundColor: COLORS.border, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  badgeNote: { backgroundColor: COLORS.primary },
  badgeText: { fontSize: 13, color: COLORS.text, fontWeight: '600' },
  gallerySection: { marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text, marginBottom: 10 },
  gallery: { marginHorizontal: -16 },
  imageWrap: { width: IMAGE_SIZE, height: IMAGE_SIZE * 0.6, marginRight: 12, borderRadius: 12, overflow: 'hidden', backgroundColor: COLORS.border },
  galleryImage: { width: '100%', height: '100%' },
  row: { marginBottom: 12 },
  rowLabel: { fontSize: 12, color: COLORS.textSecondary, marginBottom: 2 },
  rowValue: { fontSize: 15, color: COLORS.text },
  linkBtn: { backgroundColor: COLORS.primary, paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginTop: 8 },
  linkBtnSecondary: { backgroundColor: COLORS.border, marginTop: 8 },
  linkBtnText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  linkBtnTextSecondary: { color: COLORS.text, fontWeight: '600', fontSize: 15 },
});
