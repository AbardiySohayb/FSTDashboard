"use client"

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
  styled,
  alpha,
  useTheme,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from "@mui/material"
import {
  ArrowBack as ArrowBackIcon,
  MenuBook as MenuBookIcon,
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon,
  ArrowUpward as ArrowUpwardIcon,
  AccessTime as AccessTimeIcon,
  School as SchoolIcon,
  Timeline as TimelineIcon,
  HourglassEmpty as HourglassEmptyIcon,
  Star as StarIcon,
} from "@mui/icons-material"

// Composants stylisés
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
  height: "100%",
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

const GradeCard = styled(Card)(({ theme, grade }) => {
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

// Étapes du processus de promotion
const promotionSteps = [
  {
    label: "Échelon 3 - 2 ans",
    description: "Après 2 ans à l'échelon 3, vous pouvez soumettre une première demande de promotion de grade.",
  },
  {
    label: "Évaluation de la demande",
    description: "Votre dossier est évalué par la commission compétente.",
  },
  {
    label: "Décision",
    description: "Si acceptée, promotion immédiate. Si refusée, passage automatique à l'échelon 4.",
  },
  {
    label: "Échelon 4 - 1 an",
    description: "Après 1 an à l'échelon 4, vous pouvez soumettre une seconde demande.",
  },
  {
    label: "Seconde évaluation",
    description: "Votre dossier est à nouveau évalué par la commission.",
  },
  {
    label: "Décision finale",
    description: "Si acceptée, promotion immédiate. Si refusée, promotion automatique après 2 ans à l'échelon 4.",
  },
]

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

export default function ReglesPromotion() {
  const theme = useTheme()
  const navigate = useNavigate()

  // Retourner au tableau de bord
  const handleReturn = () => {
    navigate("/rh/promotion")
  }

  return (
    <Box sx={{ bgcolor: (theme) => theme.palette.background.default, minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Button startIcon={<ArrowBackIcon />} onClick={handleReturn} sx={{ mr: 2 }}>
            Retour
          </Button>
          <Typography variant="h1">Règles de Promotion</Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Processus de promotion */}
          <Grid item xs={12} md={7}>
            <StyledPaper>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <TimelineIcon sx={{ fontSize: 28, color: theme.palette.primary.main, mr: 1 }} />
                <Typography variant="h5">Processus de promotion</Typography>
              </Box>

              <Divider sx={{ mb: 3, borderColor: alpha(theme.palette.primary.main, 0.1) }} />

              <Typography variant="body1" paragraph>
                Le processus de promotion des enseignants suit un parcours bien défini, basé sur l'ancienneté dans les
                échelons et l'évaluation des dossiers de candidature.
              </Typography>

              <Stepper orientation="vertical" sx={{ mb: 3 }}>
                {promotionSteps.map((step, index) => (
                  <Step key={index} active={true}>
                    <StepLabel>
                      <Typography variant="subtitle1">{step.label}</Typography>
                    </StepLabel>
                    <StepContent>
                      <Typography variant="body2" color="text.secondary">
                        {step.description}
                      </Typography>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>

              <Typography variant="body2" color="text.secondary">
                Ce processus garantit que tous les enseignants ont l'opportunité d'avancer dans leur carrière, tout en
                valorisant l'excellence académique et pédagogique.
              </Typography>
            </StyledPaper>
          </Grid>

          {/* Grades et échelons */}
          <Grid item xs={12} md={5}>
            <StyledPaper>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <SchoolIcon sx={{ fontSize: 28, color: theme.palette.primary.main, mr: 1 }} />
                <Typography variant="h5">Grades et échelons</Typography>
              </Box>

              <Divider sx={{ mb: 3, borderColor: alpha(theme.palette.primary.main, 0.1) }} />

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <GradeCard grade="PA">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Professeur Assistant (PA)
                      </Typography>
                      <Typography variant="body2" paragraph>
                        Grade initial pour les enseignants-chercheurs. Comprend 4 échelons, avec une durée minimale de 2
                        ans par échelon.
                      </Typography>
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        {[1, 2, 3, 4].map((echelon) => (
                          <Box
                            key={echelon}
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              bgcolor: alpha(theme.palette.info.main, 0.1),
                              color: theme.palette.info.main,
                              fontWeight: "bold",
                            }}
                          >
                            {echelon}
                          </Box>
                        ))}
                      </Box>
                    </CardContent>
                  </GradeCard>
                </Grid>

                <Grid item xs={12}>
                  <GradeCard grade="PH">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Professeur Habilité (PH)
                      </Typography>
                      <Typography variant="body2" paragraph>
                        Grade intermédiaire accessible après promotion. Comprend 4 échelons, avec une durée minimale de
                        2 ans par échelon.
                      </Typography>
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        {[1, 2, 3, 4].map((echelon) => (
                          <Box
                            key={echelon}
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              bgcolor: alpha(theme.palette.success.main, 0.1),
                              color: theme.palette.success.main,
                              fontWeight: "bold",
                            }}
                          >
                            {echelon}
                          </Box>
                        ))}
                      </Box>
                    </CardContent>
                  </GradeCard>
                </Grid>

                <Grid item xs={12}>
                  <GradeCard grade="PES">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Professeur de l'Enseignement Supérieur (PES)
                      </Typography>
                      <Typography variant="body2" paragraph>
                        Grade le plus élevé. Comprend 4 échelons, avec une durée minimale de 2 ans par échelon.
                      </Typography>
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        {[1, 2, 3, 4].map((echelon) => (
                          <Box
                            key={echelon}
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              bgcolor: alpha(theme.palette.warning.main, 0.1),
                              color: theme.palette.warning.main,
                              fontWeight: "bold",
                            }}
                          >
                            {echelon}
                          </Box>
                        ))}
                      </Box>
                    </CardContent>
                  </GradeCard>
                </Grid>
              </Grid>
            </StyledPaper>
          </Grid>

          {/* Conditions et critères */}
          <Grid item xs={12}>
            <StyledPaper>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <MenuBookIcon sx={{ fontSize: 28, color: theme.palette.primary.main, mr: 1 }} />
                <Typography variant="h5">Conditions et critères d'évaluation</Typography>
              </Box>

              <Divider sx={{ mb: 3, borderColor: alpha(theme.palette.primary.main, 0.1) }} />

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
                        <ListItem>
                          <ListItemIcon>
                            <CheckCircleIcon color="info" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Avoir un dossier académique et pédagogique complet" />
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
                            <ArrowUpwardIcon color="success" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Promotion immédiate au grade supérieur" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <StarIcon color="success" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Placement à l'échelon 1 du nouveau grade" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <HourglassEmptyIcon color="success" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Nouvelle ancienneté à compter de la date de promotion" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <CheckCircleIcon color="success" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Revalorisation salariale selon la grille indiciaire" />
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
                            <AccessTimeIcon color="warning" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Possibilité de soumettre une seconde demande après 1 an à l'échelon 4" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <ArrowUpwardIcon color="warning" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Promotion automatique après 2 ans à l'échelon 4 en cas de second refus" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <InfoIcon color="warning" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Feedback détaillé sur les points à améliorer" />
                        </ListItem>
                      </List>
                    </CardContent>
                  </InfoCard>
                </Grid>
              </Grid>

              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Critères d'évaluation
                </Typography>
                <Typography variant="body1" paragraph>
                  La commission d'évaluation examine les dossiers de promotion selon les critères suivants :
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Card variant="outlined" sx={{ height: "100%" }}>
                      <CardContent>
                        <Typography variant="subtitle1" color="primary" gutterBottom>
                          Production scientifique
                        </Typography>
                        <Typography variant="body2">
                          Publications dans des revues indexées, ouvrages, brevets, communications dans des conférences
                          internationales.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Card variant="outlined" sx={{ height: "100%" }}>
                      <CardContent>
                        <Typography variant="subtitle1" color="primary" gutterBottom>
                          Activités pédagogiques
                        </Typography>
                        <Typography variant="body2">
                          Qualité de l'enseignement, encadrement d'étudiants, création de cours, innovations
                          pédagogiques.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Card variant="outlined" sx={{ height: "100%" }}>
                      <CardContent>
                        <Typography variant="subtitle1" color="primary" gutterBottom>
                          Responsabilités administratives
                        </Typography>
                        <Typography variant="body2">
                          Participation aux instances de l'université, coordination de filières, organisation
                          d'événements scientifiques.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Card variant="outlined" sx={{ height: "100%" }}>
                      <CardContent>
                        <Typography variant="subtitle1" color="primary" gutterBottom>
                          Rayonnement
                        </Typography>
                        <Typography variant="body2">
                          Collaborations nationales et internationales, participation à des comités scientifiques,
                          expertise.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

