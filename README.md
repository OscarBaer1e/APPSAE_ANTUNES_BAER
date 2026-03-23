# TP React Native – SAÉ BUT MMI (Baer / Antunes)

Projet full stack : **MySQL** + **Spring Boot** (API REST) + **React Native / Expo** (app mobile).

---

## 1. Base de données (MySQL – XAMPP)

1. Démarre **MySQL** (XAMPP ou autre) sur le port **3306**.
2. Crée la base si besoin et exécute le script SQL :
   - Ouvrir **phpMyAdmin** ou un client MySQL.
   - Créer la base : `CREATE DATABASE IF NOT EXISTS TP_SAE; USE TP_SAE;`
   - Exécuter le fichier : **`demo/src/main/resources/sql/schema_sae.sql`**  
     (crée la table `sae` et insère 3 exemples).

---

## 2. Back-end (Spring Boot)

- **Dossier** : `demo/`
- **Config** : `demo/src/main/resources/application.properties`  
  - Connexion à `jdbc:mysql://localhost:3306/TP_SAE`  
  - Modifier `spring.datasource.username` et `spring.datasource.password` si besoin.

**Lancer le back-end :**

- Avec **IntelliJ** : lancer la classe `WebAppliApplication`.
- En ligne de commande : depuis `demo/` → `./mvnw spring-boot:run`

L’API est disponible sur **http://localhost:8080** :
- `GET /api/sae` → liste des SAÉ (tri par note)
- `POST /api/sae` → ajout d’une SAÉ (body JSON).

---

## 3. Front-end (React Native / Expo)

- **Dossier** : `frontend/`
- **URL API** : dans `frontend/src/api/client.ts`, l’URL est :
  - **Android émulateur** : `http://10.0.2.2:8080`
  - **iOS / Web** : `http://localhost:8080`  
  Pour un **appareil réel**, remplacer par l’IP de ton PC (ex. `192.168.1.10`).

**Lancer l’app :**

```bash
cd frontend
npm start
```

Puis choisir **w** (web), **a** (Android) ou **i** (iOS).

**Fonctionnalités :**
- Liste des SAÉ avec filtres **Promotion** (MMI2/MMI3) et **Domaine** (Web, Création, DI, 3D).
- Tri par **note** (décroissant).
- Clic sur une SAÉ → détail + **galerie d’images** (champ `images_urls`).
- Formulaire **« + Ajouter »** pour créer une nouvelle SAÉ (appel POST à l’API).

---

## Résumé des étapes

| Étape | Action |
|-------|--------|
| 1 | MySQL lancé → exécuter `demo/src/main/resources/sql/schema_sae.sql` sur la base `TP_SAE`. |
| 2 | Lancer le back-end Spring Boot (`demo/`). |
| 3 | Lancer l’app Expo (`frontend/` → `npm start`). |

Design : thème bleu / gris, adapté aux étudiants BUT MMI de Meaux.
