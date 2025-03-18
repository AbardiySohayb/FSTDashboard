"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ThemeProvider,
  createTheme,
  CssBaseline,
  alpha,
  styled,
  Divider,
  Chip,
  Card,
  CardContent,
  Tooltip,
} from "@mui/material"
import {
  Add as AddIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  EventNote as EventNoteIcon,
  CalendarMonth,
  AccessTime,
  Sick,
  BeachAccess,
  Work,
  Info as InfoIcon,
  ArrowUpward,
  ArrowDownward,
} from "@mui/icons-material"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider, DateCalendar, DatePicker } from "@mui/x-date-pickers"
import "dayjs/locale/fr"
import dayjs from "dayjs"

// Définition des couleurs principales selon la charte graphique
const primaryColor = "#B36B39" // Couleur bronze/cuivre du logo
const secondaryColor = "#2C3E50" // Bleu foncé pour le contraste
const backgroundColor = "#F5F5F5" // Gris clair pour le fond
const accentColor = "#E74C3C" // Rouge pour l'accent
const successColor = "#2ECC71" // Vert pour les succès

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
    h6: {
      fontSize: "1.1rem",
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
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
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
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
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
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
        colorPrimary: {
          backgroundColor: alpha(primaryColor, 0.1),
          color: primaryColor,
          fontWeight: 500,
        },
        colorSuccess: {
          backgroundColor: alpha(successColor, 0.1),
          color: successColor,
        },
        colorError: {
          backgroundColor: alpha(accentColor, 0.1),
          color: accentColor,
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
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: "transform 0.2s ease",
          "&:hover": {
            transform: "scale(1.1)",
          },
        },
        colorSuccess: {
          backgroundColor: alpha(successColor, 0.1),
          "&:hover": {
            backgroundColor: alpha(successColor, 0.2),
          },
        },
        colorError: {
          backgroundColor: alpha(accentColor, 0.1),
          "&:hover": {
            backgroundColor: alpha(accentColor, 0.2),
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

const LeaveTypeChip = styled(Chip)(({ theme, leavetype }) => {
  let color = primaryColor
  let bgColor = alpha(primaryColor, 0.1)

  if (leavetype === "sick") {
    color = accentColor
    bgColor = alpha(accentColor, 0.1)
  } else if (leavetype === "unpaid") {
    color = secondaryColor
    bgColor = alpha(secondaryColor, 0.1)
  } else if (leavetype === "annual") {
    color = successColor
    bgColor = alpha(successColor, 0.1)
  }

  return {
    backgroundColor: bgColor,
    color: color,
    fontWeight: 500,
    borderRadius: 16,
  }
})

const StatItem = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px 0",
  borderBottom: `1px solid ${alpha(secondaryColor, 0.1)}`,
  "&:last-child": {
    borderBottom: "none",
  },
}))

const LeaveProgressBar = styled(Box)(({ theme, value, max }) => ({
  position: "relative",
  height: 10,
  width: "100%",
  backgroundColor: alpha(secondaryColor, 0.1),
  borderRadius: 5,
  marginTop: 8,
  overflow: "hidden",
  "& .progress-fill": {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: `${(value / max) * 100}%`,
    backgroundImage: `linear-gradient(90deg, ${primaryColor} 0%, ${primaryColor}CC 100%)`,
    borderRadius: 5,
  },
}))

export default function LeaveManagement() {
  const [selectedLeaveType, setSelectedLeaveType] = useState("")
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  // Données pour les congés
  const leaveData = {
    annual: { used: 5, total: 20 },
    sick: { used: 3, total: 15 },
    unpaid: { used: 0, total: 10 },
  }

  // Données pour les demandes en attente
  const pendingRequests = [
    {
      id: 1,
      employee: "Mohammed Alami",
      type: "annual",
      startDate: "2023-07-01",
      endDate: "2023-07-10",
      status: "pending",
    },
    {
      id: 2,
      employee: "Fatima Zohra",
      type: "sick",
      startDate: "2023-06-28",
      endDate: "2023-06-30",
      status: "pending",
    },
    {
      id: 3,
      employee: "Youssef Benali",
      type: "unpaid",
      startDate: "2023-08-15",
      endDate: "2023-08-20",
      status: "pending",
    },
  ]

  // Fonction pour obtenir l'icône selon le type de congé
  const getLeaveTypeIcon = (type) => {
    switch (type) {
      case "annual":
        return <BeachAccess fontSize="small" />
      case "sick":
        return <Sick fontSize="small" />
      case "unpaid":
        return <Work fontSize="small" />
      default:
        return <EventNoteIcon fontSize="small" />
    }
  }

  // Fonction pour obtenir le libellé selon le type de congé
  const getLeaveTypeLabel = (type) => {
    switch (type) {
      case "annual":
        return "Congé annuel"
      case "sick":
        return "Congé maladie"
      case "unpaid":
        return "Congé sans solde"
      default:
        return "Congé"
    }
  }

  // Calcul du nombre de jours entre deux dates
  const calculateDays = (start, end) => {
    if (!start || !end) return 0
    const startDate = dayjs(start)
    const endDate = dayjs(end)
    return endDate.diff(startDate, "day") + 1
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", bgcolor: backgroundColor, minHeight: "100vh" }}>
        {/* Main content */}
        <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
          <Typography variant="h1" gutterBottom>
            Congés et Absences
          </Typography>

          {/* Top section */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {/* My Leaves */}
            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%" }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <StyledAvatar>
                      <EventNoteIcon />
                    </StyledAvatar>
                    <Typography variant="h6" sx={{ ml: 2 }}>
                      Mes congés
                    </Typography>
                  </Box>

                  <Divider sx={{ mb: 3, borderColor: alpha(primaryColor, 0.1) }} />

                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <BeachAccess sx={{ color: successColor, mr: 1 }} fontSize="small" />
                        <Typography>Congés annuels</Typography>
                      </Box>
                      <Typography sx={{ fontWeight: "bold", color: successColor }}>
                        {leaveData.annual.total - leaveData.annual.used} jours restants
                      </Typography>
                    </Box>
                    <LeaveProgressBar value={leaveData.annual.used} max={leaveData.annual.total}>
                      <Box className="progress-fill" />
                    </LeaveProgressBar>
                    <Typography variant="caption" sx={{ display: "block", textAlign: "right", mt: 0.5 }}>
                      {leaveData.annual.used} utilisés sur {leaveData.annual.total}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Sick sx={{ color: accentColor, mr: 1 }} fontSize="small" />
                        <Typography>Congés maladie</Typography>
                      </Box>
                      <Typography sx={{ fontWeight: "bold", color: accentColor }}>
                        {leaveData.sick.used} jours pris
                      </Typography>
                    </Box>
                    <LeaveProgressBar value={leaveData.sick.used} max={leaveData.sick.total}>
                      <Box
                        className="progress-fill"
                        sx={{
                          backgroundImage: `linear-gradient(90deg, ${accentColor} 0%, ${accentColor}CC 100%)`,
                        }}
                      />
                    </LeaveProgressBar>
                    <Typography variant="caption" sx={{ display: "block", textAlign: "right", mt: 0.5 }}>
                      {leaveData.sick.used} utilisés sur {leaveData.sick.total}
                    </Typography>
                  </Box>

                  <Button variant="contained" fullWidth startIcon={<AddIcon />} color="primary">
                    Demander un congé
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            {/* Leave Calendar */}
            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%" }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <StyledAvatar bgcolor={alpha(secondaryColor, 0.1)}>
                      <CalendarMonth sx={{ color: secondaryColor }} />
                    </StyledAvatar>
                    <Typography variant="h6" sx={{ ml: 2 }}>
                      Calendrier des congés
                    </Typography>
                  </Box>

                  <Divider sx={{ mb: 3, borderColor: alpha(secondaryColor, 0.1) }} />

                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
                    <DateCalendar
                      sx={{
                        "& .MuiPickersDay-root.Mui-selected": {
                          backgroundColor: primaryColor,
                        },
                        "& .MuiPickersDay-root:hover": {
                          backgroundColor: alpha(primaryColor, 0.1),
                        },
                      }}
                    />
                  </LocalizationProvider>
                </CardContent>
              </Card>
            </Grid>

            {/* Statistics */}
            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%" }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <StyledAvatar bgcolor={alpha(accentColor, 0.1)}>
                      <InfoIcon sx={{ color: accentColor }} />
                    </StyledAvatar>
                    <Typography variant="h6" sx={{ ml: 2 }}>
                      Statistiques
                    </Typography>
                  </Box>

                  <Divider sx={{ mb: 3, borderColor: alpha(accentColor, 0.1) }} />

                  <Box sx={{ mb: 2 }}>
                    <StatItem>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <ArrowDownward sx={{ color: accentColor, mr: 1 }} fontSize="small" />
                        <Typography>Taux d'absentéisme</Typography>
                      </Box>
                      <Chip label="3.2%" color="error" size="small" />
                    </StatItem>

                    <StatItem>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CheckIcon sx={{ color: successColor, mr: 1 }} fontSize="small" />
                        <Typography>Congés approuvés ce mois</Typography>
                      </Box>
                      <Chip label="24" color="success" size="small" />
                    </StatItem>

                    <StatItem>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <AccessTime sx={{ color: primaryColor, mr: 1 }} fontSize="small" />
                        <Typography>Demandes en attente</Typography>
                      </Box>
                      <Chip label="7" color="primary" size="small" />
                    </StatItem>

                    <StatItem>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <ArrowUpward sx={{ color: successColor, mr: 1 }} fontSize="small" />
                        <Typography>Taux de satisfaction</Typography>
                      </Box>
                      <Chip label="92%" color="success" size="small" />
                    </StatItem>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Pending Leave Requests */}
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>
              Demandes de congés en attente
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Employé</TableCell>
                    <TableCell>Type de congé</TableCell>
                    <TableCell>Date de début</TableCell>
                    <TableCell>Date de fin</TableCell>
                    <TableCell>Durée</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pendingRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            sx={{
                              mr: 2,
                              bgcolor: alpha(primaryColor, 0.1),
                              color: primaryColor,
                            }}
                          >
                            {request.employee.charAt(0)}
                          </Avatar>
                          <Typography>{request.employee}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <LeaveTypeChip
                          icon={getLeaveTypeIcon(request.type)}
                          label={getLeaveTypeLabel(request.type)}
                          leavetype={request.type}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{request.startDate}</TableCell>
                      <TableCell>{request.endDate}</TableCell>
                      <TableCell>{calculateDays(request.startDate, request.endDate)} jours</TableCell>
                      <TableCell align="center">
                        <Tooltip title="Approuver">
                          <IconButton color="success" sx={{ mr: 1 }}>
                            <CheckIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Refuser">
                          <IconButton color="error">
                            <CloseIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* New Leave Request */}
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <StyledAvatar>
                <AddIcon />
              </StyledAvatar>
              <Typography variant="h5" sx={{ ml: 2 }}>
                Nouvelle demande de congé
              </Typography>
            </Box>

            <Divider sx={{ mb: 3, borderColor: alpha(primaryColor, 0.1) }} />

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="leave-type-label">Type de congé</InputLabel>
                  <Select
                    labelId="leave-type-label"
                    value={selectedLeaveType}
                    label="Type de congé"
                    onChange={(e) => setSelectedLeaveType(e.target.value)}
                    startAdornment={
                      selectedLeaveType ? (
                        <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
                          {getLeaveTypeIcon(selectedLeaveType)}
                        </Box>
                      ) : null
                    }
                  >
                    <MenuItem value="annual">
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <BeachAccess sx={{ mr: 1, color: successColor }} fontSize="small" />
                        Congé annuel
                      </Box>
                    </MenuItem>
                    <MenuItem value="sick">
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Sick sx={{ mr: 1, color: accentColor }} fontSize="small" />
                        Congé maladie
                      </Box>
                    </MenuItem>
                    <MenuItem value="unpaid">
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Work sx={{ mr: 1, color: secondaryColor }} fontSize="small" />
                        Congé sans solde
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
                  <DatePicker
                    label="Date de début"
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                    sx={{ width: "100%" }}
                    slotProps={{
                      textField: {
                        helperText: "Sélectionnez la date de début du congé",
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
                  <DatePicker
                    label="Date de fin"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                    sx={{ width: "100%" }}
                    slotProps={{
                      textField: {
                        helperText: "Sélectionnez la date de fin du congé",
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>

              {startDate && endDate && (
                <Grid item xs={12}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: alpha(primaryColor, 0.05),
                      borderRadius: 2,
                      border: `1px solid ${alpha(primaryColor, 0.1)}`,
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: "bold", color: primaryColor }}>
                      Durée du congé: {calculateDays(startDate, endDate)} jours
                    </Typography>
                  </Paper>
                </Grid>
              )}

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Motif (optionnel)"
                  variant="outlined"
                  placeholder="Veuillez préciser le motif de votre demande de congé..."
                  helperText="Cette information sera visible par votre responsable"
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" size="large" startIcon={<AddIcon />} sx={{ mt: 2 }}>
                  Soumettre la demande
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

