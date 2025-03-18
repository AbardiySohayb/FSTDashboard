"use client"

import * as React from "react"
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Grid,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Paper,
  Avatar,
  alpha,
  styled,
  Divider,
} from "@mui/material"
import GroupIcon from "@mui/icons-material/Group"
import EventIcon from "@mui/icons-material/Event"
import AssignmentIcon from "@mui/icons-material/Assignment"
import DescriptionIcon from "@mui/icons-material/Description"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"

// Définition des couleurs principales selon la charte graphique
const primaryColor = "#B36B39" // Couleur bronze/cuivre du logo
const secondaryColor = "#2C3E50" // Bleu foncé pour le contraste
const backgroundColor = "#F5F5F5" // Gris clair pour le fond
const accentColor = "#E74C3C" // Rouge pour l'accent

// Création du thème
const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
      contrastText: "#ffffff",
    },
    secondary: {
      main: secondaryColor,
      contrastText: "#ffffff",
    },
    background: {
      default: backgroundColor,
      paper: "#ffffff",
    },
    error: {
      main: accentColor,
    },
    success: {
      main: "#2ECC71",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      color: secondaryColor,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      color: primaryColor,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      color: secondaryColor,
    },
    h5: {
      fontSize: "1.2rem",
      fontWeight: 600,
      color: secondaryColor,
    },
    body1: {
      fontSize: "1rem",
      color: "#333",
    },
    subtitle1: {
      color: primaryColor,
      fontWeight: 500,
    },
    subtitle2: {
      color: secondaryColor,
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      marginTop: "16px",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          textTransform: "none",
          padding: "10px 20px",
          transition: "all 0.3s ease",
          fontWeight: 600,
          boxShadow: "none",
          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          },
        },
        containedPrimary: {
          background: `linear-gradient(45deg, ${primaryColor} 30%, ${primaryColor}CC 90%)`,
          "&:hover": {
            background: `linear-gradient(45deg, ${primaryColor}CC 30%, ${primaryColor} 90%)`,
          },
        },
        containedSecondary: {
          background: `linear-gradient(45deg, ${secondaryColor} 30%, ${secondaryColor}CC 90%)`,
          "&:hover": {
            background: `linear-gradient(45deg, ${secondaryColor}CC 30%, ${secondaryColor} 90%)`,
          },
        },
        outlined: {
          borderWidth: 2,
          "&:hover": {
            borderWidth: 2,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 10,
          borderRadius: 5,
          backgroundColor: alpha(secondaryColor, 0.1),
        },
        barColorPrimary: {
          backgroundImage: `linear-gradient(90deg, ${primaryColor} 0%, ${primaryColor}CC 100%)`,
        },
      },
    },
  },
})

// Composants stylisés
const StyledAvatar = styled(Avatar)(({ theme, bgcolor }) => ({
  width: 56,
  height: 56,
  backgroundColor: bgcolor ? bgcolor : alpha(primaryColor, 0.1),
  color: primaryColor,
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
}))

const StyledCard = styled(Card)(({ theme, gradient }) => ({
  height: "100%",
  position: "relative",
  overflow: "hidden",
  "&::before": gradient
    ? {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "5px",
        background: gradient,
      }
    : {},
}))

const cardsData = [
  {
    title: "Total Employés",
    value: "245",
    change: "+4% depuis le mois dernier",
    icon: <GroupIcon sx={{ fontSize: 30 }} />,
    color: primaryColor,
    gradient: `linear-gradient(90deg, ${primaryColor} 0%, ${primaryColor}CC 100%)`,
    changeIcon: <TrendingUpIcon sx={{ fontSize: 16, color: "#2ECC71", mr: 0.5 }} />,
    positive: true,
  },
  {
    title: "Demandes de Congés",
    value: "12",
    change: "En attente d'approbation",
    icon: <EventIcon sx={{ fontSize: 30 }} />,
    color: accentColor,
    gradient: `linear-gradient(90deg, ${accentColor} 0%, ${accentColor}CC 100%)`,
    changeIcon: <AccessTimeIcon sx={{ fontSize: 16, color: accentColor, mr: 0.5 }} />,
  },
  {
    title: "Tâches en Cours",
    value: "38",
    progress: 50, // Pourcentage de progression
    icon: <AssignmentIcon sx={{ fontSize: 30 }} />,
    color: "#3498DB", // Bleu
    gradient: "linear-gradient(90deg, #3498DB 0%, #3498DBCC 100%)",
    progressLabel: "50% complété",
  },
  {
    title: "Rapports Mensuels",
    value: "4",
    change: "Générés ce mois-ci",
    icon: <DescriptionIcon sx={{ fontSize: 30 }} />,
    color: "#2ECC71", // Vert
    gradient: "linear-gradient(90deg, #2ECC71 0%, #2ECC71CC 100%)",
    changeIcon: <CheckCircleIcon sx={{ fontSize: 16, color: "#2ECC71", mr: 0.5 }} />,
    positive: true,
  },
]

export default function Dashboard() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ backgroundColor: backgroundColor, minHeight: "100vh", p: 4 }}>
        <Typography variant="h1" sx={{ mb: 4 }}>
          Tableau de bord
        </Typography>

        <Grid container spacing={3}>
          {cardsData.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <StyledCard gradient={card.gradient}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: alpha(secondaryColor, 0.7),
                          textTransform: "none",
                          letterSpacing: 0,
                          fontSize: "0.875rem",
                          fontWeight: 500,
                        }}
                      >
                        {card.title}
                      </Typography>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: "bold",
                          mt: 0.5,
                          color: card.color,
                        }}
                      >
                        {card.value}
                      </Typography>
                    </Box>
                    <StyledAvatar bgcolor={alpha(card.color, 0.1)}>
                      {React.cloneElement(card.icon, { sx: { fontSize: 30, color: card.color } })}
                    </StyledAvatar>
                  </Box>

                  <Divider sx={{ my: 1.5, borderColor: alpha(card.color, 0.1) }} />

                  {/* Affichage conditionnel : texte ou barre de progression */}
                  {card.progress !== undefined ? (
                    <Box sx={{ mt: 2 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography variant="body2" sx={{ color: alpha(secondaryColor, 0.7) }}>
                          Progression
                        </Typography>
                        <Typography variant="body2" sx={{ color: card.color, fontWeight: "bold" }}>
                          {card.progressLabel}
                        </Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={card.progress} color="primary" />
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 2,
                        color: card.positive ? "#2ECC71" : alpha(secondaryColor, 0.7),
                      }}
                    >
                      {card.changeIcon}
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: card.positive ? "bold" : "normal",
                          color: "inherit",
                        }}
                      >
                        {card.change}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        {/* Contenu supplémentaire du tableau de bord */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={8}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 4,
                height: "100%",
                boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
              }}
            >
              <Typography variant="h5" sx={{ mb: 2 }}>
                Activité récente
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Aucune activité récente à afficher pour le moment.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 4,
                height: "100%",
                boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
              }}
            >
              <Typography variant="h5" sx={{ mb: 2 }}>
                Notifications
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Aucune notification à afficher pour le moment.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  )
}

