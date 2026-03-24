export interface Sae {
  id: number;
  titre: string;
  promotion: string;
  semestre: string | null;
  domaine: string | null;
  competences: string | null;
  auteurs: string | null;
  dateDebut: string | null;
  dateFin: string | null;
  noteObtenue: number | null;
  tauxReussite: number | null;
  ueCorrespondante: string | null;
  lienSite: string | null;
  lienProductions: string | null;
  imagesUrls: string | null;
}

export type PromotionFilter = 'TOUS' | 'MMI2' | 'MMI3';
export type DomaineFilter = 'TOUS' | 'Web' | 'Création' | 'DI' | '3D';
