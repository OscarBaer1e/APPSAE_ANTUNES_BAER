-- Script de création de la table SAE pour le projet BUT MMI
-- Base : TP_SAE (à créer si besoin : CREATE DATABASE IF NOT EXISTS TP_SAE; USE TP_SAE;)

CREATE TABLE IF NOT EXISTS sae (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    promotion VARCHAR(10) NOT NULL COMMENT 'MMI2 ou MMI3',
    semestre VARCHAR(20) DEFAULT NULL,
    domaine VARCHAR(50) DEFAULT NULL COMMENT 'Web, Création, DI, 3D',
    competences TEXT DEFAULT NULL,
    auteurs TEXT DEFAULT NULL COMMENT 'Ressources humaines',
    date_debut DATE DEFAULT NULL,
    date_fin DATE DEFAULT NULL,
    note_obtenue DECIMAL(4,2) DEFAULT NULL,
    taux_reussite DECIMAL(5,2) DEFAULT NULL COMMENT 'Ex: 85.50 pour 85.5%',
    ue_correspondante VARCHAR(100) DEFAULT NULL,
    lien_site VARCHAR(500) DEFAULT NULL,
    lien_productions TEXT DEFAULT NULL,
    images_urls TEXT DEFAULT NULL COMMENT 'Liens d''images séparés par des retours à la ligne ou virgules'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Exemples de données fictives pour tests
INSERT INTO sae (titre, promotion, semestre, domaine, competences, auteurs, date_debut, date_fin, note_obtenue, taux_reussite, ue_correspondante, lien_site, lien_productions, images_urls) VALUES
(
    'Site vitrine pour une association locale',
    'MMI2',
    'S3',
    'Web',
    'HTML, CSS, JavaScript, Intégration, Responsive',
    'Oscar B., Léa M., Thomas R.',
    '2024-09-01',
    '2024-12-15',
    16.50,
    92.00,
    'UE Projet Web',
    'https://exemple-association.vercel.app',
    'https://github.com/equipe/sae-site-association',
    'https://exemple.com/img1.jpg\nhttps://exemple.com/img2.jpg'
),
(
    'Court métrage documentaire - Patrimoine de Meaux',
    'MMI3',
    'S5',
    'Création',
    'Prise de vue, Montage, Son, Scénario',
    'Marie D., Lucas F., Inès K.',
    '2025-01-10',
    '2025-04-20',
    15.00,
    88.50,
    'UE Création audiovisuelle',
    NULL,
    'https://drive.google.com/dossier-productions',
    'https://exemple.com/affiche.png\nhttps://exemple.com/plan.png'
),
(
    'Application de datavisualisation - Données ouvertes',
    'MMI3',
    'S6',
    'DI',
    'React, API REST, Chart.js, Analyse de données',
    'Alexandre T., Chloé V., Hugo W.',
    '2025-02-01',
    '2025-05-30',
    17.25,
    95.00,
    'UE Développement Interactif',
    'https://dataviz-sae.vercel.app',
    'https://github.com/equipe/dataviz-sae',
    'https://exemple.com/capture1.png,https://exemple.com/capture2.png'
);
