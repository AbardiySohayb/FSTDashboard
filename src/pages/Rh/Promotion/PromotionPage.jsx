"use client"
import { Routes, Route } from "react-router-dom"
import PromotionDashboard from "./PromotionDashboard"
import NouvelleDemandePromotion from "./NouvelleDemandePromotion"
import HistoriquePromotions from "./HistoriquePromotions"
import ReglesPromotion from "./ReglesPromotion"
import { Box, Paper, Card, Chip, Avatar, styled, alpha } from "@mui/material"

// Composants stylisés
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
  height: "100%",
}))

const GradeChip = styled(Chip)(({ theme, grade }) => {
  let color
  switch (grade) {
    case "PA":
      color = theme.palette.info.main
      break
    case "PH":
      color = theme.palette.success.main
      break
    case "PES":
      color = theme.palette.warning.main
      break
    default:
      color = theme.palette.primary.main
  }

  return {
    backgroundColor: alpha(color, 0.1),
    color: color,
    fontWeight: 600,
    "& .MuiChip-icon": {
      color: color,
    },
  }
})

const EchelonBadge = styled(Box)(({ theme, echelon }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 36,
  height: 36,
  borderRadius: "50%",
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  fontWeight: 700,
  fontSize: "1.1rem",
  marginRight: theme.spacing(1),
}))

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  marginBottom: theme.spacing(2),
}))

const InfoCard = styled(Card)(({ theme, type }) => {
  let color
  switch (type) {
    case "success":
      color = theme.palette.success.main
      break
    case "warning":
      color = theme.palette.warning.main
      break
    case "info":
      color = theme.palette.info.main
      break
    case "error":
      color = theme.palette.error.main
      break
    default:
      color = theme.palette.primary.main
  }

  return {
    position: "relative",
    overflow: "hidden",
    height: "100%",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "5px",
      background: `linear-gradient(90deg, ${color} 0%, ${alpha(color, 0.7)} 100%)`,
    },
  }
})

// Données fictives pour l'enseignant
const teacherData = {
  id: 1,
  nom: "Alami",
  prenom: "Mohammed",
  grade: "PA", // Professeur Assistant
  echelon: 3,
  dateEchelon: "2021-06-15", // Date d'accès à l'échelon actuel
  ancienneteEchelon: "2 ans", // Ancienneté dans l'échelon actuel
  specialite: "Informatique",
  departement: "Informatique",
  photo: "/placeholder.svg?height=100&width=100",
}

// Historique des demandes
const demandesHistory = [
  {
    id: 1,
    date: "2023-05-10",
    type: "Promotion de grade",
    status: "Acceptée",
    details: "Promotion de PA à PH",
    commentaire: "Dossier complet et excellent parcours académique",
  },
  {
    id: 2,
    date: "2021-06-20",
    type: "Promotion d'échelon",
    status: "Automatique",
    details: "Passage de l'échelon 2 à l'échelon 3",
    commentaire: "Promotion automatique après 2 ans à l'échelon 2",
  },
]

// Étapes du processus de promotion
const promotionSteps = ["Éligibilité", "Soumission de la demande", "Évaluation du dossier", "Décision"]

// Fonction pour calculer l'éligibilité
const calculateEligibility = (grade, echelon, anciennete) => {
  if (echelon === 3 && anciennete === "2 ans") {
    return {
      eligible: true,
      message: "Vous êtes éligible pour soumettre une demande de promotion de grade.",
      nextStep: "Soumettre une demande de promotion pour passer au grade supérieur.",
    }
  } else if (echelon === 4 && anciennete === "1 an") {
    return {
      eligible: true,
      message: "Vous êtes éligible pour soumettre une seconde demande de promotion de grade.",
      nextStep: "Soumettre une seconde demande de promotion pour passer au grade supérieur.",
    }
  } else if (echelon === 4 && anciennete === "2 ans") {
    return {
      eligible: true,
      message: "Vous êtes éligible pour une promotion automatique au grade supérieur.",
      nextStep: "La promotion sera appliquée automatiquement.",
    }
  } else {
    return {
      eligible: false,
      message: `Vous n'êtes pas encore éligible pour une promotion de grade.`,
      nextStep: `Vous devez atteindre l'échelon 3 et y rester 2 ans, ou être à l'échelon 4 depuis au moins 1 an.`,
    }
  }
}

// Fonction pour obtenir le grade supérieur
const getNextGrade = (currentGrade) => {
  switch (currentGrade) {
    case "PA":
      return "PH" // Professeur Habilité
    case "PH":
      return "PES" // Professeur de l'Enseignement Supérieur
    case "PES":
      return "PES" // Déjà au grade maximum
    default:
      return currentGrade
  }
}

// Fonction pour obtenir le libellé complet du grade
const getGradeLabel = (grade) => {
  switch (grade) {
    case "PA":
      return "Professeur Assistant"
    case "PH":
      return "Professeur Habilité"
    case "PES":
      return "Professeur de l'Enseignement Supérieur"
    default:
      return grade
  }
}

export default function PromotionPage() {
  return (
    <Routes>
      <Route path="/" element={<PromotionDashboard />} />
      <Route path="/nouvelle-demande" element={<NouvelleDemandePromotion />} />
      <Route path="/historique" element={<HistoriquePromotions />} />
      <Route path="/regles" element={<ReglesPromotion />} />
    </Routes>
  )
}

