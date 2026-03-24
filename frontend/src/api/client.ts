import { Sae } from '../types/sae';

// Appareil réel : utilise l'IP du PC sur le réseau local
// Adapter si ton IP change (ex: vérifier dans les logs Expo)
const API_BASE = 'http://192.168.137.214:8080/api/sae';

export async function fetchAllSae(): Promise<Sae[]> {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Erreur chargement SAÉ');
  return res.json();
}

export async function addSae(sae: Omit<Sae, 'id'>): Promise<Sae> {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sae),
  });
  if (!res.ok) throw new Error('Erreur ajout SAÉ');
  return res.json();
}
