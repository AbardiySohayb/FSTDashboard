"use client"

import { useState } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Select,
  Typography,
  Grid,

  CssBaseline,
 
  Divider,
  Paper,
  FormControl,
  InputLabel,
  InputAdornment,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material"
import {
  Description,
  BarChart as BarChartIcon,
  FilterList,
  Download,
  PictureAsPdf,
  InsertDriveFile,
  CalendarMonth,
  Group,
  School,
  AccessTime,
  Add,
} from "@mui/icons-material"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

import { ThemeProvider } from '@mui/material/styles';


// Définition des couleurs principales selon la charte graphique
import theme, { primaryColor, secondaryColor, accentColor, backgroundColor} from "../../utils/theme"
import { styled, alpha } from "@mui/material/styles"
import  infoColor  from "../../utils/theme"
import { successColor } from "../../utils/theme"

// Composants stylisés
const StyledAvatar = styled(Avatar)(({ theme, bgcolor }) => ({
  width: 56,
  height: 56,
  backgroundColor: bgcolor ? bgcolor : alpha(primaryColor, 0.1),
  color: primaryColor,
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
}))

const ReportCard = styled(Card)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "16px",
  marginBottom: "16px",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
  },
}))

const ReportIcon = styled(Avatar)(({ theme, type }) => {
  let bgColor, color

  switch (type) {
    case "pdf":
      bgColor = alpha(accentColor, 0.1)
      color = accentColor
      break
    case "excel":
      bgColor = alpha(successColor, 0.1)
      color = successColor
      break
    case "doc":
      bgColor = alpha(infoColor, 0.1)
      color = infoColor
      break
    default:
      bgColor = alpha(secondaryColor, 0.1)
      color = secondaryColor
  }

  return {
    backgroundColor: bgColor,
    color: color,
    width: 40,
    height: 40,
  }
})

// Données pour le graphique
const data = [
  { mois: "Jan", congés: 18, absences: 5, formations: 9 },
  { mois: "Fév", congés: 14, absences: 6, formations: 10 },
  { mois: "Mar", congés: 25, absences: 2, formations: 13 },
  { mois: "Avr", congés: 27, absences: 7, formations: 8 },
  { mois: "Mai", congés: 22, absences: 5, formations: 15 },
  { mois: "Juin", congés: 30, absences: 6, formations: 14 },
]

// Liste des rapports récents
const reports = [
  {
    title: "Rapport des effectifs - Juin 2023",
    date: "28/06/2023",
    type: "pdf",
    size: "2.4 MB",
    icon: <PictureAsPdf />,
    category: "effectifs",
  },
  {
    title: "Bilan des congés - T2 2023",
    date: "15/06/2023",
    type: "excel",
    size: "1.8 MB",
    icon: <InsertDriveFile />,
    category: "conges",
  },
  {
    title: "Analyse des formations - S1 2023",
    date: "10/06/2023",
    type: "pdf",
    size: "3.2 MB",
    icon: <PictureAsPdf />,
    category: "formations",
  },
  {
    title: "Suivi des absences - Mai 2023",
    date: "05/06/2023",
    type: "excel",
    size: "1.5 MB",
    icon: <InsertDriveFile />,
    category: "absences",
  },
]

// Composant personnalisé pour la légende du graphique
const CustomLegend = (props) => {
  const { payload } = props

  return (
    <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
      {payload.map((entry, index) => (
        <Chip
          key={`item-${index}`}
          label={entry.value}
          sx={{
            backgroundColor: alpha(entry.color, 0.1),
            color: entry.color,
            fontWeight: 500,
          }}
          icon={
            entry.value === "Congés" ? (
              <CalendarMonth style={{ color: entry.color }} />
            ) : entry.value === "Absences" ? (
              <AccessTime style={{ color: entry.color }} />
            ) : (
              <School style={{ color: entry.color }} />
            )
          }
        />
      ))}
    </Box>
  )
}

// Composant personnalisé pour le tooltip du graphique
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Paper
        elevation={3}
        sx={{
          p: 2,
          backgroundColor: "white",
          border: `1px solid ${alpha(secondaryColor, 0.1)}`,
        }}
      >
        <Typography variant="subtitle2" sx={{ mb: 1, color: secondaryColor }}>
          {label}
        </Typography>
        {payload.map((entry, index) => (
          <Box key={`tooltip-${index}`} sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
            <Box
              component="span"
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: entry.color,
                display: "inline-block",
                mr: 1,
              }}
            />
            <Typography variant="body2" sx={{ color: secondaryColor }}>
              {entry.name}: <strong>{entry.value}</strong>
            </Typography>
          </Box>
        ))}
      </Paper>
    )
  }

  return null
}

const Rapport = () => {
  const [reportType, setReportType] = useState("")
  const [timeRange, setTimeRange] = useState("6mois")

  const handleReportTypeChange = (event) => {
    setReportType(event.target.value)
  }

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value)
  }

  // Filtrer les rapports par type
  const filteredReports = reportType ? reports.filter((report) => report.category === reportType) : reports

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ bgcolor: backgroundColor, minHeight: "100vh", p: 4 }}>
        <Typography variant="h1" sx={{ mb: 4 }}>
          Rapports et Analyses
        </Typography>

        <Grid container spacing={3}>
          {/* Bloc Générer un Rapport */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <StyledAvatar>
                    <Description />
                  </StyledAvatar>
                  <Typography variant="h5" sx={{ ml: 2 }}>
                    Générer un rapport
                  </Typography>
                </Box>

                <Divider sx={{ mb: 3, borderColor: alpha(primaryColor, 0.1) }} />

                <Typography variant="body1" sx={{ mb: 2 }}>
                  Sélectionnez le type de rapport à générer et la période souhaitée
                </Typography>

                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id="report-type-label">Type de rapport</InputLabel>
                      <Select
                        labelId="report-type-label"
                        value={reportType}
                        label="Type de rapport"
                        onChange={handleReportTypeChange}
                        startAdornment={
                          <InputAdornment position="start">
                            <FilterList sx={{ color: alpha(secondaryColor, 0.5) }} />
                          </InputAdornment>
                        }
                      >
                        <MenuItem value="">Tous les types</MenuItem>
                        <MenuItem value="effectifs">
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Group sx={{ mr: 1, color: primaryColor }} fontSize="small" />
                            Effectifs
                          </Box>
                        </MenuItem>
                        <MenuItem value="conges">
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <CalendarMonth sx={{ mr: 1, color: infoColor }} fontSize="small" />
                            Congés
                          </Box>
                        </MenuItem>
                        <MenuItem value="absences">
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <AccessTime sx={{ mr: 1, color: accentColor }} fontSize="small" />
                            Absences
                          </Box>
                        </MenuItem>
                        <MenuItem value="formations">
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <School sx={{ mr: 1, color: successColor }} fontSize="small" />
                            Formations
                          </Box>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id="time-range-label">Période</InputLabel>
                      <Select
                        labelId="time-range-label"
                        value={timeRange}
                        label="Période"
                        onChange={handleTimeRangeChange}
                        startAdornment={
                          <InputAdornment position="start">
                            <CalendarMonth sx={{ color: alpha(secondaryColor, 0.5) }} />
                          </InputAdornment>
                        }
                      >
                        <MenuItem value="1mois">Dernier mois</MenuItem>
                        <MenuItem value="3mois">Dernier trimestre</MenuItem>
                        <MenuItem value="6mois">Dernier semestre</MenuItem>
                        <MenuItem value="12mois">Dernière année</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <Button variant="contained" color="primary" startIcon={<Add />} fullWidth>
                  Générer un nouveau rapport
                </Button>

                {/* Liste des rapports récents */}
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Rapports récents
                  </Typography>

                  {filteredReports.length === 0 ? (
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        textAlign: "center",
                        bgcolor: alpha(secondaryColor, 0.05),
                        borderRadius: 2,
                      }}
                    >
                      <Typography variant="body1" color="text.secondary">
                        Aucun rapport disponible pour ce type
                      </Typography>
                    </Paper>
                  ) : (
                    filteredReports.map((report, index) => (
                      <ReportCard key={index}>
                        <ReportIcon type={report.type}>{report.icon}</ReportIcon>
                        <Box sx={{ ml: 2, flex: 1 }}>
                          <Typography variant="subtitle1">{report.title}</Typography>
                          <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                            <CalendarMonth sx={{ fontSize: 14, color: alpha(secondaryColor, 0.6), mr: 0.5 }} />
                            <Typography variant="caption" color="text.secondary">
                              {report.date} • {report.size}
                            </Typography>
                          </Box>
                        </Box>
                        <Tooltip title="Télécharger">
                          <IconButton
                            color="primary"
                            sx={{
                              bgcolor: alpha(primaryColor, 0.1),
                              "&:hover": {
                                bgcolor: alpha(primaryColor, 0.2),
                              },
                            }}
                          >
                            <Download />
                          </IconButton>
                        </Tooltip>
                      </ReportCard>
                    ))
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Bloc Aperçu des Statistiques */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <StyledAvatar bgcolor={alpha(infoColor, 0.1)}>
                    <BarChartIcon sx={{ color: infoColor }} />
                  </StyledAvatar>
                  <Typography variant="h5" sx={{ ml: 2 }}>
                    Aperçu des statistiques
                  </Typography>
                </Box>

                <Divider sx={{ mb: 3, borderColor: alpha(infoColor, 0.1) }} />

                <Typography variant="body1" sx={{ mb: 3 }}>
                  Congés, absences et formations sur les 6 derniers mois
                </Typography>

                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    bgcolor: alpha(secondaryColor, 0.02),
                    borderRadius: 2,
                    mb: 3,
                  }}
                >
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={alpha(secondaryColor, 0.1)} />
                      <XAxis
                        dataKey="mois"
                        tick={{ fill: secondaryColor }}
                        axisLine={{ stroke: alpha(secondaryColor, 0.2) }}
                      />
                      <YAxis tick={{ fill: secondaryColor }} axisLine={{ stroke: alpha(secondaryColor, 0.2) }} />
                      <RechartsTooltip content={<CustomTooltip />} />
                      <Legend content={<CustomLegend />} />
                      <Bar dataKey="congés" name="Congés" fill={infoColor} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="absences" name="Absences" fill={accentColor} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="formations" name="Formations" fill={successColor} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Paper>

                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: alpha(infoColor, 0.1),
                        borderRadius: 2,
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="h4" sx={{ color: infoColor, fontWeight: "bold" }}>
                        136
                      </Typography>
                      <Typography variant="body2">Congés</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: alpha(accentColor, 0.1),
                        borderRadius: 2,
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="h4" sx={{ color: accentColor, fontWeight: "bold" }}>
                        31
                      </Typography>
                      <Typography variant="body2">Absences</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: alpha(successColor, 0.1),
                        borderRadius: 2,
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="h4" sx={{ color: successColor, fontWeight: "bold" }}>
                        69
                      </Typography>
                      <Typography variant="body2">Formations</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  )
}

export default Rapport

