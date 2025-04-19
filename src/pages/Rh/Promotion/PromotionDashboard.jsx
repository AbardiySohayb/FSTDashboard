import { useNavigate } from "react-router-dom"
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Avatar,
  styled,
  alpha,
  useTheme,
  LinearProgress,
} from "@mui/material"
import {
  School as SchoolIcon,
  Timeline as TimelineIcon,
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon,
  AccessTime as AccessTimeIcon,
  CalendarMonth as CalendarMonthIcon,
  Person as PersonIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  HourglassEmpty as HourglassEmptyIcon,
  Add as AddIcon,
  History as HistoryIcon,
  MenuBook as MenuBookIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material"

// Composants stylisés
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
  height: "100%",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    boxShadow: "0 10px 28px rgba(0,0,0,0.1)",
  },
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

const EchelonBadge = styled(Box)(({ theme }) => ({
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
  width: 100,
  height: 100,
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
  marginBottom: theme.spacing(2),
  border: `4px solid ${alpha(theme.palette.background.paper, 0.8)}`,
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
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
    },
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

const ActionCard = styled(Card)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  height: "100%",
  cursor: "pointer",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 16px 32px rgba(0,0,0,0.12)",
  },
}))

const ProgressWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1),
}))

const ProgressLabel = styled(Typography)(({ theme }) => ({
  position: "absolute",
  right: 0,
  top: -20,
  fontSize: "0.75rem",
  fontWeight: "bold",
  color: theme.palette.primary.main,
}))

const ProfileHeader = styled(Box)(({ theme }) => ({
  position: "relative",
  textAlign: "center",
  paddingTop: "32px",
  paddingBottom: "16px",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "40%",
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${alpha(
      theme.palette.primary.main,
      0.7,
    )} 100%)`,
    borderRadius: "16px 16px 50% 50% / 16px 16px 100% 100%",
    zIndex: 0,
  },
}))

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

// Fonction pour calculer l'éligibilité
const calculateEligibility = (grade, echelon, anciennete) => {
  if (echelon === 3 && anciennete === "2 ans") {
    return {
      eligible: true,
      message: "Vous êtes éligible pour soumettre une demande de promotion de grade.",
      nextStep: "Soumettre une demande de promotion pour passer au grade supérieur.",
      progress: 100,
    }
  } else if (echelon === 4 && anciennete === "1 an") {
    return {
      eligible: true,
      message: "Vous êtes éligible pour soumettre une seconde demande de promotion de grade.",
      nextStep: "Soumettre une seconde demande de promotion pour passer au grade supérieur.",
      progress: 100,
    }
  } else if (echelon === 4 && anciennete === "2 ans") {
    return {
      eligible: true,
      message: "Vous êtes éligible pour une promotion automatique au grade supérieur.",
      nextStep: "La promotion sera appliquée automatiquement.",
      progress: 100,
    }
  } else if (echelon === 3 && anciennete === "1 an") {
    return {
      eligible: false,
      message: `Vous n'êtes pas encore éligible pour une promotion de grade.`,
      nextStep: `Il vous reste 1 an avant de pouvoir soumettre une demande.`,
      progress: 50,
    }
  } else {
    return {
      eligible: false,
      message: `Vous n'êtes pas encore éligible pour une promotion de grade.`,
      nextStep: `Vous devez atteindre l'échelon 3 et y rester 2 ans, ou être à l'échelon 4 depuis au moins 1 an.`,
      progress: 25,
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

export default function PromotionDashboard() {
  const theme = useTheme()
  const navigate = useNavigate()

  // Calculer l'éligibilité de l'enseignant
  const eligibility = calculateEligibility(teacherData.grade, teacherData.echelon, teacherData.ancienneteEchelon)
  const nextGrade = getNextGrade(teacherData.grade)

  // Gérer la navigation
  const handleNavigate = (path) => {
    navigate(path)
  }

  return (
    <Box sx={{ bgcolor: (theme) => theme.palette.background.default, minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h1" sx={{ mb: 4 }}>
          Tableau de Bord des Promotions
        </Typography>

        <Grid container spacing={4}>
          {/* Informations de l'enseignant */}
          <Grid item xs={12} md={4}>
            <StyledPaper>
              <ProfileHeader>
                <Box sx={{ position: "relative", zIndex: 1 }}>
                  <StyledAvatar src={teacherData.photo} alt={`${teacherData.prenom} ${teacherData.nom}`}>
                    <PersonIcon fontSize="large" />
                  </StyledAvatar>
                  <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
                    {teacherData.prenom} {teacherData.nom}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: "white", opacity: 0.9, mb: 1 }}>
                    {teacherData.departement}
                  </Typography>
                  <GradeChip label={getGradeLabel(teacherData.grade)} grade={teacherData.grade} icon={<SchoolIcon />} />
                </Box>
              </ProfileHeader>

              <Box sx={{ mt: 3 }}>
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
                </List>
              </Box>
            </StyledPaper>
          </Grid>

          {/* Contenu principal */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              {/* Statut d'éligibilité */}
              <Grid item xs={12}>
                <InfoCard type={eligibility.eligible ? "success" : "warning"}>
                  <CardContent sx={{ p: 3 }}>
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
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {eligibility.nextStep}
                    </Typography>

                    <ProgressWrapper>
                      <ProgressLabel>{eligibility.progress}% complété</ProgressLabel>
                      <LinearProgress
                        variant="determinate"
                        value={eligibility.progress}
                        sx={{
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                          "& .MuiLinearProgress-bar": {
                            backgroundImage: `linear-gradient(90deg, ${
                              eligibility.eligible ? theme.palette.success.main : theme.palette.warning.main
                            } 0%, ${
                              eligibility.eligible ? theme.palette.success.light : theme.palette.warning.light
                            } 100%)`,
                          },
                        }}
                      />
                    </ProgressWrapper>
                  </CardContent>
                </InfoCard>
              </Grid>

              {/* Actions rapides */}
              <Grid item xs={12}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Actions rapides
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <ActionCard onClick={() => handleNavigate("/Rh/promotion/nouvelle-demande")}>
                      <CardContent sx={{ p: 3, textAlign: "center" }}>
                        <Avatar
                          sx={{
                            width: 60,
                            height: 60,
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                            color: theme.palette.primary.main,
                            margin: "0 auto 16px auto",
                          }}
                        >
                          <AddIcon fontSize="large" />
                        </Avatar>
                        <Typography variant="h6" gutterBottom>
                          Nouvelle demande
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Soumettre une demande de promotion de grade
                        </Typography>
                      </CardContent>
                    </ActionCard>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <ActionCard onClick={() => handleNavigate("/Rh/promotion/historique")}>
                      <CardContent sx={{ p: 3, textAlign: "center" }}>
                        <Avatar
                          sx={{
                            width: 60,
                            height: 60,
                            backgroundColor: alpha(theme.palette.info.main, 0.1),
                            color: theme.palette.info.main,
                            margin: "0 auto 16px auto",
                          }}
                        >
                          <HistoryIcon fontSize="large" />
                        </Avatar>
                        <Typography variant="h6" gutterBottom>
                          Historique
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Consulter vos demandes précédentes
                        </Typography>
                      </CardContent>
                    </ActionCard>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <ActionCard onClick={() => handleNavigate("/Rh/promotion/regles")}>
                      <CardContent sx={{ p: 3, textAlign: "center" }}>
                        <Avatar
                          sx={{
                            width: 60,
                            height: 60,
                            backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                            color: theme.palette.secondary.main,
                            margin: "0 auto 16px auto",
                          }}
                        >
                          <MenuBookIcon fontSize="large" />
                        </Avatar>
                        <Typography variant="h6" gutterBottom>
                          Règles
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Comprendre les conditions de promotion
                        </Typography>
                      </CardContent>
                    </ActionCard>
                  </Grid>
                </Grid>
              </Grid>

              {/* Dernières demandes */}
              <Grid item xs={12}>
                <StyledPaper>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Typography variant="h5">Dernières demandes</Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      endIcon={<HistoryIcon />}
                      onClick={() => handleNavigate("/Rh/promotion/historique")}
                    >
                      Voir tout
                    </Button>
                  </Box>
                  <Divider sx={{ mb: 3, borderColor: alpha(theme.palette.primary.main, 0.1) }} />

                  {demandesHistory.length > 0 ? (
                    <List>
                      {demandesHistory.slice(0, 2).map((demande) => (
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
        </Grid>
      </Container>
    </Box>
  )
}

