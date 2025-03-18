"use client"

import { useState } from "react"
import {
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  IconButton,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Typography,
  ThemeProvider,
  createTheme,
  CssBaseline,
  alpha,
  styled,
  Divider,
  InputAdornment,
  Tooltip,
} from "@mui/material"
import {
  Add as AddIcon,
  AccessTime as AccessTimeIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Assignment as AssignmentIcon,
  CalendarMonth as CalendarMonthIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material"

// Définition des couleurs principales selon la charte graphique
const primaryColor = "#B36B39" // Couleur bronze/cuivre du logo
const secondaryColor = "#2C3E50" // Bleu foncé pour le contraste
const backgroundColor = "#F5F5F5" // Gris clair pour le fond
const accentColor = "#E74C3C" // Rouge pour l'accent
const successColor = "#2ECC71" // Vert pour les succès
const warningColor = "#F39C12" // Orange pour les avertissements
const infoColor = "#3498DB" // Bleu pour les informations

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
      main: successColor,
    },
    warning: {
      main: warningColor,
    },
    info: {
      main: infoColor,
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
    h3: {
      fontSize: "2.5rem",
      fontWeight: 700,
      color: secondaryColor,
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
    h6: {
      fontSize: "1.1rem",
      fontWeight: 600,
      color: secondaryColor,
    },
    body1: {
      fontSize: "1rem",
      color: "#333",
    },
    body2: {
      fontSize: "0.875rem",
      color: alpha("#333", 0.7),
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
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(secondaryColor, 0.05),
          "& .MuiTableCell-head": {
            color: secondaryColor,
            fontWeight: 600,
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: alpha(primaryColor, 0.05),
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
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontWeight: 500,
        },
        colorPrimary: {
          backgroundColor: alpha(primaryColor, 0.1),
          color: primaryColor,
        },
        colorSecondary: {
          backgroundColor: alpha(secondaryColor, 0.1),
          color: secondaryColor,
        },
        colorSuccess: {
          backgroundColor: alpha(successColor, 0.1),
          color: successColor,
        },
        colorError: {
          backgroundColor: alpha(accentColor, 0.1),
          color: accentColor,
        },
        colorWarning: {
          backgroundColor: alpha(warningColor, 0.1),
          color: warningColor,
        },
        colorInfo: {
          backgroundColor: alpha(infoColor, 0.1),
          color: infoColor,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 30,
            "&:hover fieldset": {
              borderColor: primaryColor,
            },
            "&.Mui-focused fieldset": {
              borderColor: primaryColor,
            },
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: primaryColor,
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 30,
            "&:hover fieldset": {
              borderColor: primaryColor,
            },
            "&.Mui-focused fieldset": {
              borderColor: primaryColor,
            },
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: primaryColor,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: "transform 0.2s ease",
          "&:hover": {
            transform: "scale(1.1)",
          },
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

const StyledSearchBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#fff",
  borderRadius: 30,
  padding: "4px 16px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  flex: 1,
}))

const StatusChip = styled(Chip)(({ theme, status }) => {
  let color, bgColor

  switch (status) {
    case "en_cours":
      color = infoColor
      bgColor = alpha(infoColor, 0.1)
      break
    case "en_attente":
      color = warningColor
      bgColor = alpha(warningColor, 0.1)
      break
    case "termine":
      color = successColor
      bgColor = alpha(successColor, 0.1)
      break
    case "en_retard":
      color = accentColor
      bgColor = alpha(accentColor, 0.1)
      break
    default:
      color = secondaryColor
      bgColor = alpha(secondaryColor, 0.1)
  }

  return {
    backgroundColor: bgColor,
    color: color,
    fontWeight: 500,
    borderRadius: 16,
  }
})

const ProgressBar = styled(LinearProgress)(({ theme, value }) => {
  let color

  if (value < 30) {
    color = accentColor
  } else if (value < 70) {
    color = warningColor
  } else {
    color = successColor
  }

  return {
    height: 10,
    borderRadius: 5,
    backgroundColor: alpha(secondaryColor, 0.1),
    "& .MuiLinearProgress-bar": {
      backgroundImage: `linear-gradient(90deg, ${color} 0%, ${color}CC 100%)`,
    },
  }
})

const StatCard = styled(Card)(({ theme, color }) => ({
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "5px",
    background: color ? color : primaryColor,
  },
}))

export default function HRDashboard() {
  const [selectedStatus, setSelectedStatus] = useState("")

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value)
  }

  // Données des tâches
  const tasks = [
    {
      id: 1,
      title: "Préparation du rapport annuel",
      assignee: "Mohammed Alami",
      dueDate: "2023-07-15",
      status: "en_cours",
      progress: 60,
    },
    {
      id: 2,
      title: "Mise à jour du système de gestion des congés",
      assignee: "Fatima Zohra",
      dueDate: "2023-07-30",
      status: "en_attente",
      progress: 0,
    },
    {
      id: 3,
      title: "Organisation de la journée portes ouvertes",
      assignee: "Youssef Benali",
      dueDate: "2023-08-10",
      status: "termine",
      progress: 100,
    },
    {
      id: 4,
      title: "Révision des procédures de sécurité",
      assignee: "Amina Tazi",
      dueDate: "2023-07-20",
      status: "en_cours",
      progress: 40,
    },
    {
      id: 5,
      title: "Planification des entretiens annuels",
      assignee: "Karim Idrissi",
      dueDate: "2023-08-05",
      status: "en_attente",
      progress: 0,
    },
  ]

  // Fonction pour obtenir le libellé du statut
  const getStatusLabel = (status) => {
    switch (status) {
      case "en_cours":
        return "En cours"
      case "en_attente":
        return "En attente"
      case "termine":
        return "Terminé"
      case "en_retard":
        return "En retard"
      default:
        return status
    }
  }

  // Fonction pour obtenir l'icône du statut
  const getStatusIcon = (status) => {
    switch (status) {
      case "en_cours":
        return <AccessTimeIcon fontSize="small" />
      case "en_attente":
        return <WarningIcon fontSize="small" />
      case "termine":
        return <CheckCircleIcon fontSize="small" />
      case "en_retard":
        return <WarningIcon fontSize="small" />
      default:
        return null
    }
  }

  // Filtrer les tâches selon le statut sélectionné
  const filteredTasks = selectedStatus ? tasks.filter((task) => task.status === selectedStatus) : tasks

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", bgcolor: backgroundColor, minHeight: "100vh" }}>
        {/* Main content */}
        <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
          <Typography variant="h1" gutterBottom>
            Tâches et Missions
          </Typography>

          {/* Task statistics */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <StatCard color={infoColor}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                    <Box>
                      <Typography variant="h6" color="text.secondary">
                        Tâches en cours
                      </Typography>
                      <Typography variant="h3" component="div" sx={{ mt: 1, fontWeight: "bold", color: infoColor }}>
                        12
                      </Typography>
                    </Box>
                    <StyledAvatar bgcolor={alpha(infoColor, 0.1)}>
                      <AccessTimeIcon sx={{ color: infoColor }} />
                    </StyledAvatar>
                  </Box>

                  <Divider sx={{ my: 2, borderColor: alpha(infoColor, 0.1) }} />

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Chip
                      label="+2 cette semaine"
                      size="small"
                      color="info"
                      icon={<ArrowUpIcon sx={{ fontSize: 16 }} />}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      depuis la semaine dernière
                    </Typography>
                  </Box>
                </CardContent>
              </StatCard>
            </Grid>

            <Grid item xs={12} md={4}>
              <StatCard color={successColor}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                    <Box>
                      <Typography variant="h6" color="text.secondary">
                        Tâches terminées
                      </Typography>
                      <Typography variant="h3" component="div" sx={{ mt: 1, fontWeight: "bold", color: successColor }}>
                        28
                      </Typography>
                    </Box>
                    <StyledAvatar bgcolor={alpha(successColor, 0.1)}>
                      <CheckCircleIcon sx={{ color: successColor }} />
                    </StyledAvatar>
                  </Box>

                  <Divider sx={{ my: 2, borderColor: alpha(successColor, 0.1) }} />

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Chip
                      label="+5 cette semaine"
                      size="small"
                      color="success"
                      icon={<ArrowUpIcon sx={{ fontSize: 16 }} />}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      depuis la semaine dernière
                    </Typography>
                  </Box>
                </CardContent>
              </StatCard>
            </Grid>

            <Grid item xs={12} md={4}>
              <StatCard color={accentColor}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                    <Box>
                      <Typography variant="h6" color="text.secondary">
                        Tâches en retard
                      </Typography>
                      <Typography variant="h3" component="div" sx={{ mt: 1, fontWeight: "bold", color: accentColor }}>
                        3
                      </Typography>
                    </Box>
                    <StyledAvatar bgcolor={alpha(accentColor, 0.1)}>
                      <WarningIcon sx={{ color: accentColor }} />
                    </StyledAvatar>
                  </Box>

                  <Divider sx={{ my: 2, borderColor: alpha(accentColor, 0.1) }} />

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Chip
                      label="+1 cette semaine"
                      size="small"
                      color="error"
                      icon={<ArrowUpIcon sx={{ fontSize: 16 }} />}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      depuis la semaine dernière
                    </Typography>
                  </Box>
                </CardContent>
              </StatCard>
            </Grid>
          </Grid>

          {/* Task list */}
          <Paper sx={{ p: 3, mb: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: 2, sm: 0 },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <StyledAvatar>
                  <AssignmentIcon />
                </StyledAvatar>
                <Typography variant="h5" sx={{ ml: 2 }}>
                  Liste des tâches
                </Typography>
              </Box>
              <Button variant="contained" color="primary" startIcon={<AddIcon />}>
                Nouvelle tâche
              </Button>
            </Box>

            <Divider sx={{ mb: 3, borderColor: alpha(primaryColor, 0.1) }} />

            <Box
              sx={{
                display: "flex",
                gap: 2,
                mb: 3,
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "stretch", sm: "center" },
              }}
            >
              <StyledSearchBox sx={{ flex: { xs: 1, sm: "auto" }, width: { xs: "100%", sm: 300 } }}>
                <SearchIcon sx={{ color: alpha(secondaryColor, 0.5), mr: 1 }} />
                <TextField
                  placeholder="Rechercher une tâche..."
                  variant="standard"
                  fullWidth
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
              </StyledSearchBox>

              <FormControl sx={{ minWidth: { xs: "100%", sm: 200 } }}>
                <InputLabel id="status-select-label">Statut</InputLabel>
                <Select
                  labelId="status-select-label"
                  id="status-select"
                  value={selectedStatus}
                  label="Statut"
                  onChange={handleStatusChange}
                  startAdornment={
                    <InputAdornment position="start">
                      <FilterListIcon sx={{ color: alpha(secondaryColor, 0.5) }} />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="">Tous</MenuItem>
                  <MenuItem value="en_cours">
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <AccessTimeIcon sx={{ mr: 1, color: infoColor }} fontSize="small" />
                      En cours
                    </Box>
                  </MenuItem>
                  <MenuItem value="en_attente">
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <WarningIcon sx={{ mr: 1, color: warningColor }} fontSize="small" />
                      En attente
                    </Box>
                  </MenuItem>
                  <MenuItem value="termine">
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CheckCircleIcon sx={{ mr: 1, color: successColor }} fontSize="small" />
                      Terminé
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Titre</TableCell>
                    <TableCell>Assigné à</TableCell>
                    <TableCell>Date d'échéance</TableCell>
                    <TableCell>Statut</TableCell>
                    <TableCell>Progression</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>
                        <Typography variant="subtitle1">{task.title}</Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            sx={{
                              mr: 2,
                              bgcolor: alpha(primaryColor, 0.1),
                              color: primaryColor,
                            }}
                          >
                            {task.assignee.charAt(0)}
                          </Avatar>
                          <Typography>{task.assignee}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <CalendarMonthIcon sx={{ mr: 1, color: primaryColor }} fontSize="small" />
                          {task.dueDate}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <StatusChip
                          icon={getStatusIcon(task.status)}
                          label={getStatusLabel(task.status)}
                          // @ts-ignore
                          status={task.status}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <ProgressBar variant="determinate" value={task.progress} sx={{ width: "100px" }} />
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: "bold",
                              color:
                                task.progress < 30 ? accentColor : task.progress < 70 ? warningColor : successColor,
                            }}
                          >
                            {task.progress}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                          <Tooltip title="Modifier">
                            <IconButton
                              size="small"
                              sx={{
                                color: primaryColor,
                                bgcolor: alpha(primaryColor, 0.1),
                                mr: 1,
                                "&:hover": {
                                  bgcolor: alpha(primaryColor, 0.2),
                                },
                              }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Supprimer">
                            <IconButton
                              size="small"
                              sx={{
                                color: accentColor,
                                bgcolor: alpha(accentColor, 0.1),
                                "&:hover": {
                                  bgcolor: alpha(accentColor, 0.2),
                                },
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

// Composant d'icône de flèche vers le haut
const ArrowUpIcon = ({ sx }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={sx}>
    <path d="M7 14l5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

