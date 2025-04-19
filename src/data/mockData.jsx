// Générer plus d'employés pour tester la pagination et la virtualisation
export const generateMockEmployees = (count) => {
    const baseEmployees = [
      {
        id: 1,
        nom: "Alami",
        prenom: "Mohammed",
        dateNaissance: "1975-05-15",
        adresse: "123 Rue Hassan II, Casablanca",
        telephone: "0661234567",
        email: "m.alami@fstm.ac.ma",
        departement: "Informatique",
        poste: "Professeur",
        categorie: "Enseignant-Chercheur",
        dateDeRecrutement: "2010-09-01",
        dateDeGrade: "2018-01-15",
        AncienneteEchelon: "2018-01-15",
        niveauGrade: "Classe Normale",
        echelon: 4,
        statut: "Actif",
        photo: "/placeholder.svg?height=100&width=100",
        diplomes: ["Doctorat en Informatique", "Master en Réseaux"],
        competences: ["Java", "Réseaux", "Sécurité informatique"],
        soldeConges: { annuel: 30, maladie: 15 },
        historiqueConges: [],
        historiquePromotions: [
          {
            date: "2016-01-15",
            ancienGrade: "Classe Normale",
            ancienEchelon: 3,
            nouveauGrade: "Classe Normale",
            nouveauEchelon: 4,
            type: "Automatique",
          },
          {
            date: "2018-01-15",
            ancienGrade: "Classe Normale",
            ancienEchelon: 4,
            nouveauGrade: "Hors Classe",
            nouveauEchelon: 1,
            type: "Demande acceptée",
          },
        ],
      },
      {
        id: 2,
        nom: "Zohra",
        prenom: "Fatima",
        dateNaissance: "1980-03-22",
        adresse: "45 Avenue Mohammed V, Rabat",
        telephone: "0662345678",
        email: "f.zohra@fstm.ac.ma",
        departement: "Mathématiques",
        poste: "Maître de conférences",
        categorie: "Enseignant-Chercheur",
        dateDeRecrutement: "2012-09-01",
        dateDeGrade: "2017-06-10",
        AncienneteEchelon: "2017-06-10",
        niveauGrade: "Hors Classe",
        echelon: 2,
        statut: "Actif",
        photo: "/placeholder.svg?height=100&width=100",
        diplomes: ["Doctorat en Mathématiques", "Master en Algèbre"],
        competences: ["Analyse", "Algèbre", "Statistiques"],
        soldeConges: { annuel: 30, maladie: 15 },
        historiqueConges: [],
        historiquePromotions: [
          {
            date: "2015-06-10",
            ancienGrade: "Classe Normale",
            ancienEchelon: 3,
            nouveauGrade: "Classe Normale",
            nouveauEchelon: 4,
            type: "Automatique",
          },
          {
            date: "2017-06-10",
            ancienGrade: "Classe Normale",
            ancienEchelon: 4,
            nouveauGrade: "Hors Classe",
            nouveauEchelon: 1,
            type: "Demande acceptée",
          },
          {
            date: "2019-06-10",
            ancienGrade: "Hors Classe",
            ancienEchelon: 1,
            nouveauGrade: "Hors Classe",
            nouveauEchelon: 2,
            type: "Automatique",
          },
        ],
      },
      {
        id: 3,
        nom: "Benali",
        prenom: "Youssef",
        dateNaissance: "1985-11-10",
        adresse: "78 Boulevard Anfa, Casablanca",
        telephone: "0663456789",
        email: "y.benali@fstm.ac.ma",
        departement: "Physique",
        poste: "Technicien de labo",
        categorie: "Personnel Technique",
        dateDeRecrutement: "2015-02-15",
        dateDeGrade: "2019-02-15",
        AncienneteEchelon: "2019-02-15",
        niveauGrade: "Classe Normale",
        echelon: 3,
        statut: "Actif",
        photo: "/placeholder.svg?height=100&width=100",
        diplomes: ["Licence en Physique", "DUT en Instrumentation"],
        competences: ["Instrumentation", "Maintenance", "Électronique"],
        soldeConges: { annuel: 25, maladie: 10 },
        historiqueConges: [],
        historiquePromotions: [
          {
            date: "2017-02-15",
            ancienGrade: "Classe Normale",
            ancienEchelon: 1,
            nouveauGrade: "Classe Normale",
            nouveauEchelon: 2,
            type: "Automatique",
          },
          {
            date: "2019-02-15",
            ancienGrade: "Classe Normale",
            ancienEchelon: 2,
            nouveauGrade: "Classe Normale",
            nouveauEchelon: 3,
            type: "Automatique",
          },
        ],
      },
      {
        id: 4,
        nom: "Tazi",
        prenom: "Amina",
        dateNaissance: "1990-07-25",
        adresse: "12 Rue Ibn Sina, Marrakech",
        telephone: "0664567890",
        email: "a.tazi@fstm.ac.ma",
        departement: "Chimie",
        poste: "Assistante administrative",
        categorie: "Personnel Administratif",
        dateDeRecrutement: "2018-05-01",
        dateDeGrade: "2021-05-01",
        AncienneteEchelon: "2021-05-01",
        niveauGrade: "Classe Normale",
        echelon: 2,
        statut: "Actif",
        photo: "/placeholder.svg?height=100&width=100",
        diplomes: ["Licence en Administration", "BTS Secrétariat"],
        competences: ["Word", "Excel", "Gestion administrative"],
        soldeConges: { annuel: 30, maladie: 15 },
        historiqueConges: [],
        historiquePromotions: [
          {
            date: "2020-05-01",
            ancienGrade: "Classe Normale",
            ancienEchelon: 1,
            nouveauGrade: "Classe Normale",
            nouveauEchelon: 2,
            type: "Automatique",
          },
        ],
      },
      {
        id: 5,
        nom: "Idrissi",
        prenom: "Karim",
        dateNaissance: "1982-12-03",
        adresse: "56 Avenue des FAR, Tanger",
        telephone: "0665678901",
        email: "k.idrissi@fstm.ac.ma",
        departement: "Biologie",
        poste: "Chercheur",
        categorie: "Enseignant-Chercheur",
        dateDeRecrutement: "2014-10-01",
        dateDeGrade: "2020-01-15",
        AncienneteEchelon: "2020-01-15",
        niveauGrade: "Hors Classe",
        echelon: 1,
        statut: "Actif",
        photo: "/placeholder.svg?height=100&width=100",
        diplomes: ["Doctorat en Biologie", "Master en Microbiologie"],
        competences: ["Microbiologie", "Biochimie", "PCR"],
        soldeConges: { annuel: 30, maladie: 15 },
        historiqueConges: [],
        historiquePromotions: [
          {
            date: "2016-10-01",
            ancienGrade: "Classe Normale",
            ancienEchelon: 1,
            nouveauGrade: "Classe Normale",
            nouveauEchelon: 2,
            type: "Automatique",
          },
          {
            date: "2018-10-01",
            ancienGrade: "Classe Normale",
            ancienEchelon: 2,
            nouveauGrade: "Classe Normale",
            nouveauEchelon: 3,
            type: "Automatique",
          },
          {
            date: "2020-01-15",
            ancienGrade: "Classe Normale",
            ancienEchelon: 3,
            nouveauGrade: "Hors Classe",
            nouveauEchelon: 1,
            type: "Demande acceptée",
          },
        ],
      },
    ]
  
    // Si le nombre demandé est inférieur ou égal à la base, retourner juste la base
    if (count <= baseEmployees.length) {
      return baseEmployees.slice(0, count)
    }
  
    // Sinon, générer des employés supplémentaires
    const result = [...baseEmployees]
    const departments = [
      "Informatique",
      "Mathématiques",
      "Physique",
      "Chimie",
      "Biologie",
      "Géologie",
      "Économie",
      "Droit",
      "Médecine",
    ]
    const postes = [
      "Professeur",
      "Maître de conférences",
      "Technicien de labo",
      "Assistante administrative",
      "Chercheur",
      "Directeur",
      "Secrétaire",
      "Ingénieur",
    ]
    const categories = ["Enseignant-Chercheur", "Personnel Technique", "Personnel Administratif"]
    const niveauxGrade = [
      "Classe Normale",
      "Hors Classe",
      "Classe Exceptionnelle",
      "Classe Supérieure",
      "Classe Principale",
    ]
    const statuts = ["Actif", "En congé", "Suspendu"]
    const noms = [
      "Alaoui",
      "Benjelloun",
      "Chaoui",
      "Daoudi",
      "El Fassi",
      "Fathi",
      "Ghali",
      "Haddad",
      "Idrissi",
      "Jebli",
      "Karimi",
      "Lahlou",
      "Mansouri",
      "Naciri",
      "Ouazzani",
      "Qabbaj",
      "Radi",
      "Saidi",
      "Tazi",
      "Wahbi",
      "Ziani",
    ]
    const prenoms = [
      "Ahmed",
      "Brahim",
      "Chaimae",
      "Driss",
      "Elias",
      "Fatima",
      "Ghita",
      "Hassan",
      "Imane",
      "Jamal",
      "Kenza",
      "Leila",
      "Mohamed",
      "Nadia",
      "Omar",
      "Rachida",
      "Samir",
      "Touria",
      "Youssef",
      "Zineb",
    ]
  
    for (let i = baseEmployees.length + 1; i <= count; i++) {
      const nom = noms[Math.floor(Math.random() * noms.length)]
      const prenom = prenoms[Math.floor(Math.random() * prenoms.length)]
      const departement = departments[Math.floor(Math.random() * departments.length)]
      const poste = postes[Math.floor(Math.random() * postes.length)]
      const categorie = categories[Math.floor(Math.random() * categories.length)]
      const niveauGrade = niveauxGrade[Math.floor(Math.random() * niveauxGrade.length)]
      const echelon = Math.floor(Math.random() * 5) + 1
      const statut = statuts[Math.floor(Math.random() * statuts.length)]
  
      // Générer une date aléatoire entre 1970 et 2000
      const year = 1970 + Math.floor(Math.random() * 30)
      const month = Math.floor(Math.random() * 12) + 1
      const day = Math.floor(Math.random() * 28) + 1
      const dateNaissance = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`
  
      // Générer une date de recrutement aléatoire entre 2000 et 2020
      const yearRecrutement = 2000 + Math.floor(Math.random() * 20)
      const monthRecrutement = Math.floor(Math.random() * 12) + 1
      const dayRecrutement = Math.floor(Math.random() * 28) + 1
      const dateDeRecrutement = `${yearRecrutement}-${monthRecrutement.toString().padStart(2, "0")}-${dayRecrutement.toString().padStart(2, "0")}`
  
      // Générer une date de grade aléatoire après la date de recrutement
      const yearGrade = yearRecrutement + Math.floor(Math.random() * (2023 - yearRecrutement))
      const monthGrade = Math.floor(Math.random() * 12) + 1
      const dayGrade = Math.floor(Math.random() * 28) + 1
      const dateDeGrade = `${yearGrade}-${monthGrade.toString().padStart(2, "0")}-${dayGrade.toString().padStart(2, "0")}`
  
      result.push({
        id: i,
        nom,
        prenom,
        dateNaissance,
        adresse: `${Math.floor(Math.random() * 100) + 1} Rue ${Math.floor(Math.random() * 100) + 1}, Ville`,
        telephone: `06${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`,
        email: `${prenom.toLowerCase().charAt(0)}.${nom.toLowerCase()}@fstm.ac.ma`,
        departement,
        poste,
        categorie,
        dateDeRecrutement,
        dateDeGrade,
        AncienneteEchelon: dateDeGrade,
        niveauGrade,
        echelon,
        statut,
        photo: "/placeholder.svg?height=100&width=100",
        diplomes: ["Diplôme 1", "Diplôme 2"],
        competences: ["Compétence 1", "Compétence 2", "Compétence 3"],
        soldeConges: { annuel: Math.floor(Math.random() * 20) + 10, maladie: Math.floor(Math.random() * 15) + 5 },
        historiqueConges: [],
        historiquePromotions: [],
      })
    }
  
    return result
  }
  
  // Générer 100 employés pour tester la pagination et la virtualisation
  export const employees = generateMockEmployees(100)
  
  // Liste des départements pour le filtre
  export const departments = [
    "Informatique",
    "Mathématiques",
    "Physique",
    "Chimie",
    "Biologie",
    "Géologie",
    "Économie",
    "Droit",
    "Médecine",
  ]
  
  // Structure hiérarchique des catégories, grades et échelons
  export const hierarchieGrades = {
    "Enseignant-Chercheur": {
      grades: [
        {
          nom: "Classe Normale",
          echelons: [1, 2, 3, 4, 5],
        },
        {
          nom: "Hors Classe",
          echelons: [1, 2, 3, 4],
        },
        {
          nom: "Classe Exceptionnelle",
          echelons: [1, 2, 3],
        },
      ],
    },
    "Personnel Administratif": {
      grades: [
        {
          nom: "Classe Normale",
          echelons: [1, 2, 3, 4],
        },
        {
          nom: "Classe Supérieure",
          echelons: [1, 2, 3],
        },
      ],
    },
    "Personnel Technique": {
      grades: [
        {
          nom: "Classe Normale",
          echelons: [1, 2, 3, 4],
        },
        {
          nom: "Classe Principale",
          echelons: [1, 2],
        },
      ],
    },
  }
  
  // Liste des catégories
  export const categories = Object.keys(hierarchieGrades)
  
  // Liste des postes
  export const postes = [
    "Professeur",
    "Maître de conférences",
    "Technicien de labo",
    "Assistante administrative",
    "Chercheur",
    "Directeur",
    "Secrétaire",
    "Ingénieur",
  ]
  
  // Liste des statuts
  export const statuts = ["Actif", "En congé", "Suspendu"]
  
  export const niveauxGrade = [
    "Classe Normale",
    "Hors Classe",
    "Classe Exceptionnelle",
    "Classe Supérieure",
    "Classe Principale",
  ]
  
  export const echelons = [1, 2, 3, 4, 5]
  