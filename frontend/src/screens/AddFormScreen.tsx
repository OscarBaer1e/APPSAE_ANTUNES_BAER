import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { addSae } from '../api/client';
import { Sae } from '../types/sae';

type Props = {
  onSuccess: () => void;
  onCancel: () => void;
};

const DOMAINES = ['Web', 'Création', 'DI', '3D'];
const PROMOTIONS = ['MMI2', 'MMI3'];

export default function AddFormScreen({ onSuccess, onCancel }: Props) {
  const [titre, setTitre] = useState('');
  const [promotion, setPromotion] = useState<'MMI2' | 'MMI3'>('MMI2');
  const [semestre, setSemestre] = useState('');
  const [domaine, setDomaine] = useState('');
  const [competences, setCompetences] = useState('');
  const [auteurs, setAuteurs] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [noteObtenue, setNoteObtenue] = useState('');
  const [tauxReussite, setTauxReussite] = useState('');
  const [ueCorrespondante, setUeCorrespondante] = useState('');
  const [lienSite, setLienSite] = useState('');
  const [lienProductions, setLienProductions] = useState('');
  const [imagesUrls, setImagesUrls] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const toNum = (s: string): number | null => {
    const n = parseFloat(s.replace(',', '.'));
    return isNaN(n) ? null : n;
  };

  const handleSubmit = async () => {
    if (!titre.trim()) {
      Alert.alert('Erreur', 'Le titre est obligatoire.');
      return;
    }
    setSubmitting(true);
    try {
      const body: Omit<Sae, 'id'> = {
        titre: titre.trim(),
        promotion,
        semestre: semestre.trim() || null,
        domaine: domaine.trim() || null,
        competences: competences.trim() || null,
        auteurs: auteurs.trim() || null,
        dateDebut: dateDebut.trim() || null,
        dateFin: dateFin.trim() || null,
        noteObtenue: toNum(noteObtenue),
        tauxReussite: toNum(tauxReussite),
        ueCorrespondante: ueCorrespondante.trim() || null,
        lienSite: lienSite.trim() || null,
        lienProductions: lienProductions.trim() || null,
        imagesUrls: imagesUrls.trim() || null,
      };
      await addSae(body);
      Alert.alert('Succès', 'SAÉ ajoutée.', [{ text: 'OK', onPress: onSuccess }]);
    } catch (e) {
      Alert.alert('Erreur', 'Impossible d\'ajouter la SAÉ. Vérifie le backend.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={onCancel}>
          <Text style={styles.cancelText}>Annuler</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Nouvelle SAÉ</Text>
        <TouchableOpacity onPress={handleSubmit} disabled={submitting}>
          <Text style={[styles.saveText, submitting && styles.saveDisabled]}>{submitting ? '…' : 'Enregistrer'}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <Field label="Titre *" value={titre} onChangeText={setTitre} placeholder="Ex. Site vitrine association" />
        <Text style={styles.fieldLabel}>Promotion</Text>
        <View style={styles.chipRow}>
          {PROMOTIONS.map((p) => (
            <TouchableOpacity key={p} style={[styles.chip, promotion === p && styles.chipActive]} onPress={() => setPromotion(p as 'MMI2' | 'MMI3')}>
              <Text style={[styles.chipText, promotion === p && styles.chipTextActive]}>{p}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Field label="Semestre" value={semestre} onChangeText={setSemestre} placeholder="S3, S5…" />
        <Text style={styles.fieldLabel}>Domaine</Text>
        <View style={styles.chipRow}>
          {DOMAINES.map((d) => (
            <TouchableOpacity key={d} style={[styles.chip, domaine === d && styles.chipActive]} onPress={() => setDomaine(d)}>
              <Text style={[styles.chipText, domaine === d && styles.chipTextActive]}>{d}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Field label="Compétences" value={competences} onChangeText={setCompetences} placeholder="HTML, CSS, React…" multiline />
        <Field label="Auteurs" value={auteurs} onChangeText={setAuteurs} placeholder="Noms des participants" />
        <Field label="Date début (AAAA-MM-JJ)" value={dateDebut} onChangeText={setDateDebut} placeholder="2024-09-01" />
        <Field label="Date fin (AAAA-MM-JJ)" value={dateFin} onChangeText={setDateFin} placeholder="2024-12-15" />
        <Field label="Note obtenue" value={noteObtenue} onChangeText={setNoteObtenue} placeholder="16.5" keyboardType="decimal-pad" />
        <Field label="Taux réussite %" value={tauxReussite} onChangeText={setTauxReussite} placeholder="92" keyboardType="decimal-pad" />
        <Field label="UE correspondante" value={ueCorrespondante} onChangeText={setUeCorrespondante} placeholder="UE Projet Web" />
        <Field label="Lien site" value={lienSite} onChangeText={setLienSite} placeholder="https://…" />
        <Field label="Lien productions" value={lienProductions} onChangeText={setLienProductions} placeholder="https://…" />
        <Field label="URLs images (une par ligne)" value={imagesUrls} onChangeText={setImagesUrls} placeholder="https://…" multiline />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Field({
  label,
  value,
  onChangeText,
  placeholder,
  multiline,
  keyboardType,
}: {
  label: string;
  value: string;
  onChangeText: (s: string) => void;
  placeholder?: string;
  multiline?: boolean;
  keyboardType?: 'decimal-pad' | 'default';
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.inputMultiline]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
        keyboardType={keyboardType}
      />
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
  cancelText: { fontSize: 16, color: COLORS.textSecondary },
  title: { fontSize: 18, fontWeight: '700', color: COLORS.text },
  saveText: { fontSize: 16, color: COLORS.primary, fontWeight: '600' },
  saveDisabled: { opacity: 0.6 },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 40 },
  field: { marginBottom: 16 },
  fieldLabel: { fontSize: 13, fontWeight: '600', color: COLORS.textSecondary, marginBottom: 6 },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.text,
  },
  inputMultiline: { minHeight: 80, textAlignVertical: 'top' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border },
  chipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipText: { fontSize: 13, color: COLORS.text },
  chipTextActive: { color: '#fff' },
});
