"use client"

import { useState } from "react"
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Card,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  AlertTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Avatar,
  styled,
  alpha,
  useTheme,
} from "@mui/material"
import {
  School as SchoolIcon,
  Timeline as TimelineIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Info as InfoIcon,
  ArrowUpward as ArrowUpwardIcon,
  AccessTime as AccessTimeIcon,
  CalendarMonth as CalendarMonthIcon,
  Person as PersonIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  HourglassEmpty as HourglassEmptyIcon,
  Grading as GradingIcon,
} from "@mui/icons-material"

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
  const theme = useTheme()
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    typePromotion: "grade",
    justification: "",
    documents: [],
  })

  // Calculer l'éligibilité de l'enseignant
  const eligibility = calculateEligibility(teacherData.grade, teacherData.echelon, teacherData.ancienneteEchelon)
  const nextGrade = getNextGrade(teacherData.grade)

  // Gérer les changements dans le formulaire
  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault()
    // Ici, vous implémenteriez la logique pour soumettre la demande
    alert("Demande soumise avec succès!")
  }

  // Avancer dans le stepper
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1)
  }

  // Reculer dans le stepper
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  return (
    <Box sx={{ bgcolor: (theme) => theme.palette.background.default, minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h1" sx={{ mb: 4 }}>
          Demande de Promotion
        </Typography>

        <Grid container spacing={4}>
          {/* Informations de l'enseignant */}
          <Grid item xs={12} md={4}>
            <StyledPaper>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
                <StyledAvatar src={teacherData.photo} alt={`${teacherData.prenom} ${teacherData.nom}`}>
                  <PersonIcon fontSize="large" />
                </StyledAvatar>
                <Typography variant="h5" sx={{ mb: 1 }}>
                  {teacherData.prenom} {teacherData.nom}
                </Typography>
                <GradeChip label={getGradeLabel(teacherData.grade)} grade={teacherData.grade} icon={<SchoolIcon />} />
              </Box>

              <Divider sx={{ my: 2, borderColor: alpha(theme.palette.primary.main, 0.1) }} />

              <List disablePadding>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <StarIcon sx={{ color: theme.palette.primary.main }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Grade actuel"
                    secondary={getGradeLabel(teacherData.grade)}
                    primaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
                    secondaryTypographyProps={{ variant: "body1", fontWeight: "medium" }}
                  />
                </ListItem>

                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <StarBorderIcon sx={{ color: theme.palette.primary.main }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Prochain grade"
                    secondary={getGradeLabel(nextGrade)}
                    primaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
                    secondaryTypographyProps={{ variant: "body1", fontWeight: "medium" }}
                  />
                </ListItem>

                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <TimelineIcon sx={{ color: theme.palette.primary.main }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Échelon actuel"
                    secondary={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <EchelonBadge echelon={teacherData.echelon}>{teacherData.echelon}</EchelonBadge>
                        <Typography variant="body1" fontWeight="medium">
                          Échelon {teacherData.echelon}
                        </Typography>
                      </Box>
                    }
                    primaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
                  />
                </ListItem>

                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <HourglassEmptyIcon sx={{ color: theme.palette.primary.main }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Ancienneté dans l'échelon"
                    secondary={teacherData.ancienneteEchelon}
                    primaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
                    secondaryTypographyProps={{ variant: "body1", fontWeight: "medium" }}
                  />
                </ListItem>

                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <CalendarMonthIcon sx={{ color: theme.palette.primary.main }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Date d'accès à l'échelon"
                    secondary={new Date(teacherData.dateEchelon).toLocaleDateString("fr-FR")}
                    primaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
                    secondaryTypographyProps={{ variant: "body1", fontWeight: "medium" }}
                  />
                </ListItem>

                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <AssignmentIcon sx={{ color: theme.palette.primary.main }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Département"
                    secondary={teacherData.departement}
                    primaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
                    secondaryTypographyProps={{ variant: "body1", fontWeight: "medium" }}
                  />
                </ListItem>
              </List>
            </StyledPaper>
          </Grid>

          {/* Contenu principal */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              {/* Statut d'éligibilité */}
              <Grid item xs={12}>
                <InfoCard type={eligibility.eligible ? "success" : "warning"}>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      {eligibility.eligible ? (
                        <CheckCircleIcon sx={{ color: theme.palette.success.main, fontSize: 28, mr: 1 }} />
                      ) : (
                        <InfoIcon sx={{ color: theme.palette.warning.main, fontSize: 28, mr: 1 }} />
                      )}
                      <Typography variant="h5">
                        {eligibility.eligible
                          ? "Vous êtes éligible pour une promotion"
                          : "Vous n'êtes pas encore éligible"}
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      {eligibility.message}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {eligibility.nextStep}
                    </Typography>
                  </CardContent>
                </InfoCard>
              </Grid>

              {/* Processus de promotion */}
              <Grid item xs={12}>
                <StyledPaper>
                  <Typography variant="h5" sx={{ mb: 3 }}>
                    Processus de promotion
                  </Typography>
                  <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                    {promotionSteps.map((label, index) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>

                  {activeStep === 0 && (
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Vérification de l'éligibilité
                      </Typography>
                      <Typography variant="body1" paragraph>
                        Pour être éligible à une promotion de grade, vous devez remplir l'une des conditions suivantes :
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <CheckCircleIcon color="success" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Être à l'échelon 3 depuis au moins 2 ans"
                            secondary="Vous pouvez soumettre une première demande de promotion"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <CheckCircleIcon color="success" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Être à l'échelon 4 depuis au moins 1 an"
                            secondary="Vous pouvez soumettre une seconde demande de promotion"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <CheckCircleIcon color="success" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Être à l'échelon 4 depuis au moins 2 ans"
                            secondary="Vous êtes éligible pour une promotion automatique"
                          />
                        </ListItem>
                      </List>
                      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleNext}
                          disabled={!eligibility.eligible}
                        >
                          Continuer
                        </Button>
                      </Box>
                    </Box>
                  )}

                  {activeStep === 1 && (
                    <Box component="form" onSubmit={handleSubmit}>
                      <Typography variant="h6" gutterBottom>
                        Formulaire de demande
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <FormControl fullWidth>
                            <InputLabel id="type-promotion-label">Type de promotion</InputLabel>
                            <Select
                              labelId="type-promotion-label"
                              id="type-promotion"
                              name="typePromotion"
                              value={formData.typePromotion}
                              onChange={handleFormChange}
                              label="Type de promotion"
                            >
                              <MenuItem value="grade">
                                Promotion de grade ({teacherData.grade} → {nextGrade})
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            id="justification"
                            name="justification"
                            label="Justification de la demande"
                            multiline
                            rows={4}
                            value={formData.justification}
                            onChange={handleFormChange}
                            fullWidth
                            required
                            placeholder="Décrivez les raisons pour lesquelles vous méritez cette promotion..."
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="subtitle1" gutterBottom>
                            Documents à fournir :
                          </Typography>
                          <List dense>
                            <ListItem>
                              <ListItemIcon>
                                <GradingIcon color="primary" fontSize="small" />
                              </ListItemIcon>
                              <ListItemText primary="CV actualisé" />
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>
                                <GradingIcon color="primary" fontSize="small" />
                              </ListItemIcon>
                              <ListItemText primary="Liste des publications scientifiques" />
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>
                                <GradingIcon color="primary" fontSize="small" />
                              </ListItemIcon>
                              <ListItemText primary="Rapport d'activités pédagogiques" />
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>
                                <GradingIcon color="primary" fontSize="small" />
                              </ListItemIcon>
                              <ListItemText primary="Attestation d'ancienneté" />
                            </ListItem>
                          </List>
                          <Button variant="outlined" color="primary" sx={{ mt: 1 }} startIcon={<AssignmentIcon />}>
                            Joindre des documents
                          </Button>
                        </Grid>
                      </Grid>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                        <Button onClick={handleBack} color="inherit">
                          Retour
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleNext}>
                          Soumettre la demande
                        </Button>
                      </Box>
                    </Box>
                  )}

                  {activeStep === 2 && (
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Évaluation du dossier
                      </Typography>
                      <Alert severity="info" sx={{ mb: 3 }}>
                        <AlertTitle>Demande en cours d'évaluation</AlertTitle>
                        Votre demande a été soumise et est en cours d'évaluation par la commission compétente. Ce
                        processus peut prendre jusqu'à 4 semaines.
                      </Alert>
                      <Typography variant="body1" paragraph>
                        Votre dossier sera évalué selon les critères suivants :
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <StarIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Qualité des publications scientifiques"
                            secondary="Impact et pertinence des travaux de recherche"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <StarIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Activités pédagogiques"
                            secondary="Qualité de l'enseignement et innovation pédagogique"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <StarIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Responsabilités administratives"
                            secondary="Implication dans la vie de l'établissement"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <StarIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Rayonnement national et international"
                            secondary="Participation à des conférences, collaborations internationales"
                          />
                        </ListItem>
                      </List>
                      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                        <Button onClick={handleBack} color="inherit" sx={{ mr: 1 }}>
                          Retour
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleNext}>
                          Simuler la décision
                        </Button>
                      </Box>
                    </Box>
                  )}

                  {activeStep === 3 && (
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Décision
                      </Typography>
                      <Alert severity="success" sx={{ mb: 3 }}>
                        <AlertTitle>Félicitations !</AlertTitle>
                        Votre demande de promotion a été acceptée. Vous serez promu au grade de{" "}
                        {getGradeLabel(nextGrade)} à partir du 1er du mois prochain.
                      </Alert>
                      <Typography variant="body1" paragraph>
                        Détails de la décision :
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <ArrowUpwardIcon color="success" />
                          </ListItemIcon>
                          <ListItemText
                            primary={`Promotion de ${getGradeLabel(teacherData.grade)} à ${getGradeLabel(nextGrade)}`}
                            secondary="Effective à partir du 01/08/2023"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <AccessTimeIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Nouvel échelon"
                            secondary="Vous serez placé à l'échelon 1 du nouveau grade"
                          />
                        </ListItem>
                      </List>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                        <Button onClick={handleBack} color="inherit">
                          Retour
                        </Button>
                        <Button variant="contained" color="primary">
                          Terminer
                        </Button>
                      </Box>
                    </Box>
                  )}
                </StyledPaper>
              </Grid>

              {/* Historique des demandes */}
              <Grid item xs={12}>
                <StyledPaper>
                  <Typography variant="h5" sx={{ mb: 3 }}>
                    Historique des demandes
                  </Typography>
                  {demandesHistory.length > 0 ? (
                    <List>
                      {demandesHistory.map((demande) => (
                        <ListItem
                          key={demande.id}
                          sx={{
                            mb: 2,
                            p: 2,
                            borderRadius: 2,
                            bgcolor: alpha(theme.palette.background.default, 0.5),
                            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                          }}
                        >
                          <ListItemIcon>
                            {demande.status === "Acceptée" ? (
                              <CheckCircleIcon color="success" />
                            ) : demande.status === "Refusée" ? (
                              <CancelIcon color="error" />
                            ) : (
                              <AccessTimeIcon color="primary" />
                            )}
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Typography variant="subtitle1">{demande.type}</Typography>
                                <Chip
                                  label={demande.status}
                                  size="small"
                                  color={
                                    demande.status === "Acceptée"
                                      ? "success"
                                      : demande.status === "Refusée"
                                        ? "error"
                                        : "default"
                                  }
                                />
                              </Box>
                            }
                            secondary={
                              <>
                                <Typography variant="body2" color="text.secondary">
                                  {new Date(demande.date).toLocaleDateString("fr-FR")}
                                </Typography>
                                <Typography variant="body2">{demande.details}</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                  {demande.commentaire}
                                </Typography>
                              </>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography variant="body1" color="text.secondary">
                      Aucune demande de promotion n'a été soumise jusqu'à présent.
                    </Typography>
                  )}
                </StyledPaper>
              </Grid>
            </Grid>
          </Grid>

          {/* Règles de promotion */}
          <Grid item xs={12}>
            <StyledPaper>
              <Typography variant="h5" sx={{ mb: 3 }}>
                Règles de promotion
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <InfoCard type="info">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Conditions d'éligibilité
                      </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemIcon>
                            <CheckCircleIcon color="info" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Atteindre le 3ème échelon de votre grade actuel" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <CheckCircleIcon color="info" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Passer 2 ans à l'échelon 3 pour la première demande" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <CheckCircleIcon color="info" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Passer 1 an à l'échelon 4 pour la seconde demande" />
                        </ListItem>
                      </List>
                    </CardContent>
                  </InfoCard>
                </Grid>
                <Grid item xs={12} md={4}>
                  <InfoCard type="success">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        En cas d'acceptation
                      </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemIcon>
                            <CheckCircleIcon color="success" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Promotion immédiate au grade supérieur" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <CheckCircleIcon color="success" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Placement à l'échelon 1 du nouveau grade" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <CheckCircleIcon color="success" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Nouvelle ancienneté à compter de la date de promotion" />
                        </ListItem>
                      </List>
                    </CardContent>
                  </InfoCard>
                </Grid>
                <Grid item xs={12} md={4}>
                  <InfoCard type="warning">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        En cas de refus
                      </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemIcon>
                            <InfoIcon color="warning" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Passage automatique à l'échelon 4 après le premier refus" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <InfoIcon color="warning" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Possibilité de soumettre une seconde demande après 1 an à l'échelon 4" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <InfoIcon color="warning" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Promotion automatique après 2 ans à l'échelon 4 en cas de second refus" />
                        </ListItem>
                      </List>
                    </CardContent>
                  </InfoCard>
                </Grid>
              </Grid>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

