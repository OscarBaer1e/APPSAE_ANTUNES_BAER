package iut.mmi.webAppli;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Entité JPA représentant une SAÉ (Situation d'Apprentissage et d'Évaluation) du BUT MMI.
 */
@Entity
@Table(name = "sae")
public class Sae {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String titre;

    @Column(nullable = false, length = 10)
    private String promotion; // MMI2 ou MMI3

    @Column(length = 20)
    private String semestre;

    @Column(length = 50)
    private String domaine; // Web, Création, DI, 3D

    @Column(columnDefinition = "TEXT")
    private String competences;

    @Column(columnDefinition = "TEXT")
    private String auteurs; // Ressources humaines

    @Column(name = "date_debut")
    private LocalDate dateDebut;

    @Column(name = "date_fin")
    private LocalDate dateFin;

    @Column(name = "note_obtenue", precision = 4, scale = 2)
    private BigDecimal noteObtenue;

    @Column(name = "taux_reussite", precision = 5, scale = 2)
    private BigDecimal tauxReussite;

    @Column(name = "ue_correspondante", length = 100)
    private String ueCorrespondante;

    @Column(name = "lien_site", length = 500)
    private String lienSite;

    @Column(name = "lien_productions", columnDefinition = "TEXT")
    private String lienProductions;

    @Column(name = "images_urls", columnDefinition = "TEXT")
    private String imagesUrls; // Liens séparés par \n ou ,

    public Sae() {
    }

    // Getters et setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }

    public String getPromotion() { return promotion; }
    public void setPromotion(String promotion) { this.promotion = promotion; }

    public String getSemestre() { return semestre; }
    public void setSemestre(String semestre) { this.semestre = semestre; }

    public String getDomaine() { return domaine; }
    public void setDomaine(String domaine) { this.domaine = domaine; }

    public String getCompetences() { return competences; }
    public void setCompetences(String competences) { this.competences = competences; }

    public String getAuteurs() { return auteurs; }
    public void setAuteurs(String auteurs) { this.auteurs = auteurs; }

    public LocalDate getDateDebut() { return dateDebut; }
    public void setDateDebut(LocalDate dateDebut) { this.dateDebut = dateDebut; }

    public LocalDate getDateFin() { return dateFin; }
    public void setDateFin(LocalDate dateFin) { this.dateFin = dateFin; }

    public BigDecimal getNoteObtenue() { return noteObtenue; }
    public void setNoteObtenue(BigDecimal noteObtenue) { this.noteObtenue = noteObtenue; }

    public BigDecimal getTauxReussite() { return tauxReussite; }
    public void setTauxReussite(BigDecimal tauxReussite) { this.tauxReussite = tauxReussite; }

    public String getUeCorrespondante() { return ueCorrespondante; }
    public void setUeCorrespondante(String ueCorrespondante) { this.ueCorrespondante = ueCorrespondante; }

    public String getLienSite() { return lienSite; }
    public void setLienSite(String lienSite) { this.lienSite = lienSite; }

    public String getLienProductions() { return lienProductions; }
    public void setLienProductions(String lienProductions) { this.lienProductions = lienProductions; }

    public String getImagesUrls() { return imagesUrls; }
    public void setImagesUrls(String imagesUrls) { this.imagesUrls = imagesUrls; }
}
