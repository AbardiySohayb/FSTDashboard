import { primaryColor } from "../utils/theme"
import { hierarchieGrades } from "../data/mockData"

// Fonction pour obtenir la couleur du grade
export const getGradeColor = (grade) => {
  switch (grade) {
    case "Classe Normale":
      return "#3498DB" // Bleu
    case "Hors Classe":
    case "Classe Supérieure":
    case "Classe Principale":
      return "#9B59B6" // Violet
    case "Classe Exceptionnelle":
      return "#F1C40F" // Or
    default:
      return primaryColor
  }
}

// Fonction pour filtrer les employés
export const filterEmployees = (employees, filters) => {
  return employees.filter((emp) => {
    // Filtre par terme de recherche (nom, prénom, email)
    const matchesSearch =
      !filters.searchTerm ||
      emp.nom.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      emp.prenom.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(filters.searchTerm.toLowerCase())

    // Filtre par département
    const matchesDepartment = !filters.department || emp.departement === filters.department

    // Filtre par catégorie
    const matchesCategorie = !filters.categorie || emp.categorie === filters.categorie

    // Filtre par niveau de grade (seulement si une catégorie est sélectionnée)
    const matchesGrade = !filters.grade || emp.niveauGrade === filters.grade

    // Filtre par échelon (seulement si un grade est sélectionné)
    const matchesEchelon = !filters.echelon || emp.echelon.toString() === filters.echelon

    // Filtre par poste
    const matchesPoste = !filters.poste || emp.poste === filters.poste

    // Filtre par statut
    const matchesStatut = !filters.statut || emp.statut === filters.statut

    return (
      matchesSearch &&
      matchesDepartment &&
      matchesCategorie &&
      matchesGrade &&
      matchesEchelon &&
      matchesPoste &&
      matchesStatut
    )
  })
}

// Fonction pour obtenir les grades disponibles pour une catégorie
export const getGradesForCategorie = (categorie) => {
  if (!categorie || !hierarchieGrades[categorie]) {
    return []
  }
  return hierarchieGrades[categorie].grades.map((grade) => grade.nom)
}

// Fonction pour obtenir les échelons disponibles pour une catégorie et un grade
export const getEchelonsForGrade = (categorie, grade) => {
  if (!categorie || !grade || !hierarchieGrades[categorie]) {
    return []
  }

  const gradeInfo = hierarchieGrades[categorie].grades.find((g) => g.nom === grade)
  return gradeInfo ? gradeInfo.echelons : []
}
