"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Card,
  CardContent,
  Divider,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  styled,
  alpha,
  useTheme,
  IconButton,
  Tooltip,
} from "@mui/material"
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  AccessTime as AccessTimeIcon,
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  CalendarMonth as CalendarMonthIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
  History as HistoryIcon,
} from "@mui/icons-material"

// Composants stylisés
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
  height: "100%",
}))

const SearchBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: theme.palette.background.paper,
  borderRadius: 30,
  padding: "4px 16px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
}))

// Données fictives pour l'historique des demandes
const demandesHistory = [
  {
    id: 1,
    date: "2023-05-10",
    type: "Promotion de grade",
    status: "Acceptée",
    details: "Promotion de PA à PH",
    commentaire: "Dossier complet et excellent parcours académique",
    documents: ["Dossier_Promotion_2023.pdf", "CV_2023.pdf", "Publications.pdf"],
  },
  {
    id: 2,
    date: "2021-06-20",
    type: "Promotion d'échelon",
    status: "Automatique",
    details: "Passage de l'échelon 2 à l'échelon 3",
    commentaire: "Promotion automatique après 2 ans à l'échelon 2",
    documents: ["Attestation_Echelon.pdf"],
  },
  {
    id: 3,
    date: "2020-03-15",
    type: "Promotion de grade",
    status: "Refusée",
    details: "Demande de promotion de PA à PH",
    commentaire: "Nombre insuffisant de publications scientifiques",
    documents: ["Dossier_Promotion_2020.pdf", "CV_2020.pdf"],
  },
  {
    id: 4,
    date: "2019-09-01",
    type: "Promotion d'échelon",
    status: "Automatique",
    details: "Passage de l'échelon 1 à l'échelon 2",
    commentaire: "Promotion automatique après 2 ans à l'échelon 1",
    documents: ["Attestation_Echelon_2019.pdf"],
  },
  {
    id: 5,
    date: "2018-01-10",
    type: "Recrutement",
    status: "Acceptée",
    details: "Recrutement en tant que PA",
    commentaire: "Recrutement suite au concours du 15/12/2017",
    documents: ["Contrat_Recrutement.pdf", "PV_Concours.pdf"],
  },
]

export default function HistoriquePromotions() {
  const theme = useTheme()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [expandedItem, setExpandedItem] = useState(null)

  const filteredDemandes = demandesHistory.filter((demande) => {
    const matchesSearch =
      demande.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      demande.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      demande.commentaire.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter ? demande.status === statusFilter : true
    const matchesType = typeFilter ? demande.type === typeFilter : true

    return matchesSearch && matchesStatus && matchesType
  })

  const handleExpandItem = (id) => {
    setExpandedItem(expandedItem === id ? null : id)
  }

  const handleReturn = () => {
    navigate("/rh/promotion")
  }

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Button startIcon={<ArrowBackIcon />} onClick={handleReturn} sx={{ mr: 2 }}>
            Retour
          </Button>
          <Typography variant="h4" fontWeight="bold">
            Historique des Promotions
          </Typography>
        </Box>

        <StyledPaper>
          <Divider sx={{ mb: 3, borderColor: alpha(theme.palette.primary.main, 0.1) }} />

          {/* Filtres */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <SearchBox>
                <SearchIcon sx={{ color: alpha(theme.palette.secondary.main, 0.5), mr: 1 }} />
                <TextField
                  variant="standard"
                  placeholder="Rechercher une demande..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  fullWidth
                  InputProps={{ disableUnderline: true }}
                />
              </SearchBox>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel id="status-filter-label">Statut</InputLabel>
                <Select
                  labelId="status-filter-label"
                  value={statusFilter}
                  label="Statut"
                  onChange={(e) => setStatusFilter(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      <FilterListIcon sx={{ color: alpha(theme.palette.secondary.main, 0.5) }} />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="">Tous les statuts</MenuItem>
                  <MenuItem value="Acceptée">Acceptée</MenuItem>
                  <MenuItem value="Refusée">Refusée</MenuItem>
                  <MenuItem value="Automatique">Automatique</MenuItem>
                  <MenuItem value="En attente">En attente</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel id="type-filter-label">Type</InputLabel>
                <Select
                  labelId="type-filter-label"
                  value={typeFilter}
                  label="Type"
                  onChange={(e) => setTypeFilter(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      <FilterListIcon sx={{ color: alpha(theme.palette.secondary.main, 0.5) }} />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="">Tous les types</MenuItem>
                  <MenuItem value="Promotion de grade">Promotion de grade</MenuItem>
                  <MenuItem value="Promotion d'échelon">Promotion d'échelon</MenuItem>
                  <MenuItem value="Recrutement">Recrutement</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Liste des demandes */}
          {filteredDemandes.length > 0 ? (
            <List>
              {filteredDemandes.map((demande) => (
                <Card
                  key={demande.id}
                  sx={{
                    mb: 3,
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    boxShadow:
                      expandedItem === demande.id
                        ? "0 8px 24px rgba(0,0,0,0.12)"
                        : "0 2px 8px rgba(0,0,0,0.05)",
                    transform: expandedItem === demande.id ? "scale(1.01)" : "scale(1)",
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <ListItem
                      button
                      onClick={() => handleExpandItem(demande.id)}
                      sx={{
                        p: 2,
                        borderLeft: `4px solid ${
                          demande.status === "Acceptée"
                            ? theme.palette.success.main
                            : demande.status === "Refusée"
                            ? theme.palette.error.main
                            : demande.status === "En attente"
                            ? theme.palette.warning.main
                            : theme.palette.info.main
                        }`,
                      }}
                    >
                      <ListItemIcon>
                        {demande.status === "Acceptée" ? (
                          <CheckCircleIcon color="success" />
                        ) : demande.status === "Refusée" ? (
                          <CancelIcon color="error" />
                        ) : demande.status === "En attente" ? (
                          <AccessTimeIcon color="warning" />
                        ) : (
                          <CalendarMonthIcon color="info" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography variant="subtitle1" fontWeight="medium">
                              {demande.type}
                            </Typography>
                            <Chip
                              label={demande.status}
                              size="small"
                              color={
                                demande.status === "Acceptée"
                                  ? "success"
                                  : demande.status === "Refusée"
                                  ? "error"
                                  : demande.status === "En attente"
                                  ? "warning"
                                  : "info"
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

                    {expandedItem === demande.id && (
                      <Box sx={{ p: 2, bgcolor: alpha(theme.palette.background.default, 0.5) }}>
                        <Divider sx={{ mb: 2 }} />
                        <Typography variant="subtitle2" gutterBottom>
                          Commentaire
                        </Typography>
                        <Typography variant="body2" paragraph>
                          {demande.commentaire}
                        </Typography>

                        <Typography variant="subtitle2" gutterBottom>
                          Documents associés
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                          {demande.documents.map((doc, index) => (
                            <Chip
                              key={index}
                              label={doc}
                              size="small"
                              icon={<DownloadIcon />}
                              onClick={() => {}}
                              clickable
                            />
                          ))}
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                          <Tooltip title="Voir les détails complets">
                            <IconButton
                              color="primary"
                              sx={{
                                mr: 1,
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                "&:hover": {
                                  bgcolor: alpha(theme.palette.primary.main, 0.2),
                                },
                              }}
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Télécharger tous les documents">
                            <IconButton
                              color="secondary"
                              sx={{
                                bgcolor: alpha(theme.palette.secondary.main, 0.1),
                                "&:hover": {
                                  bgcolor: alpha(theme.palette.secondary.main, 0.2),
                                },
                              }}
                            >
                              <DownloadIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              ))}
            </List>
          ) : (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <HistoryIcon sx={{ fontSize: 60, color: alpha(theme.palette.secondary.main, 0.2), mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Aucune demande trouvée
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Modifiez vos critères de recherche ou créez une nouvelle demande
              </Typography>
            </Box>
          )}
        </StyledPaper>
      </Container>
    </Box>
  )
}
