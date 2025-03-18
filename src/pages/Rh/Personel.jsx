"use client"

import { useState } from "react"
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Menu,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Grid,
  Chip,
  Typography,
  Avatar,
  Divider,
  Tab,
  Tabs,
  ThemeProvider,
  createTheme,
  CssBaseline,
  InputAdornment,
  alpha,
  styled,
} from "@mui/material"
import {
  Add,
  MoreVert,
  Edit,
  Delete,
  Visibility,
  Search,
  FilterList,
  School,
  Work,
  CalendarMonth,
  Phone,
  Email,
  LocationOn,
  Badge,
  EventAvailable,
  Person,
  Assignment,
} from "@mui/icons-material"

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
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(primaryColor, 0.1),
          color: secondaryColor,
          padding: "16px 24px",
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
          backgroundColor: alpha("#2ECC71", 0.1),
          color: "#2ECC71",
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
  },
})

// Composants stylisés
const StyledSearchBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#fff",
  borderRadius: 30,
  padding: "4px 16px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  flex: 1,
}))

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 150,
  height: 150,
  border: `4px solid ${alpha(primaryColor, 0.2)}`,
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
}))

const InfoItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: 8,
  "& .MuiSvgIcon-root": {
    color: primaryColor,
    marginRight: 8,
  },
}))

const TabPanel = (props) => {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`employee-tabpanel-${index}`}
      aria-labelledby={`employee-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

// Données d'exemple basées sur la structure UML
const employees = [
  {
    id: 1,
    nom: "Alami",
    prenom: "Mohammed",
    dateNaissance: "1975-05-15",
    adresse: "123 Rue Hassan II, Casablanca",
    telephone: "0661234567",
    email: "m.alami@fstm.ac.ma",
    departement: "Informatique",
    poste: "Professeur",
    dateDeRecrutement: "2010-09-01",
    dateDeGrade: "2018-01-15",
    AncienneteEchelon: "2018-01-15",
    typeContrat: "Permanent",
    statut: "Actif",
    photo: "/placeholder.svg?height=100&width=100",
    diplomes: ["Doctorat en Informatique", "Master en Réseaux"],
    competences: ["Java", "Réseaux", "Sécurité informatique"],
    soldeConges: { annuel: 30, maladie: 15 },
    historiqueConges: [],
  },
  {
    id: 2,
    nom: "Zohra",
    prenom: "Fatima",
    dateNaissance: "1980-03-22",
    adresse: "45 Avenue Mohammed V, Rabat",
    telephone: "0662345678",
    email: "f.zohra@fstm.ac.ma",
    departement: "Mathématiques",
    poste: "Maître de conférences",
    dateDeRecrutement: "2012-09-01",
    dateDeGrade: "2017-06-10",
    AncienneteEchelon: "2017-06-10",
    typeContrat: "Permanent",
    statut: "Actif",
    photo: "/placeholder.svg?height=100&width=100",
    diplomes: ["Doctorat en Mathématiques", "Master en Algèbre"],
    competences: ["Analyse", "Algèbre", "Statistiques"],
    soldeConges: { annuel: 30, maladie: 15 },
    historiqueConges: [],
  },
  {
    id: 3,
    nom: "Benali",
    prenom: "Youssef",
    dateNaissance: "1985-11-10",
    adresse: "78 Boulevard Anfa, Casablanca",
    telephone: "0663456789",
    email: "y.benali@fstm.ac.ma",
    departement: "Physique",
    poste: "Technicien de labo",
    dateDeRecrutement: "2015-02-15",
    dateDeGrade: "2019-02-15",
    AncienneteEchelon: "2019-02-15",
    typeContrat: "CDD",
    statut: "Actif",
    photo: "/placeholder.svg?height=100&width=100",
    diplomes: ["Licence en Physique", "DUT en Instrumentation"],
    competences: ["Instrumentation", "Maintenance", "Électronique"],
    soldeConges: { annuel: 25, maladie: 10 },
    historiqueConges: [],
  },
  {
    id: 4,
    nom: "Tazi",
    prenom: "Amina",
    dateNaissance: "1990-07-25",
    adresse: "12 Rue Ibn Sina, Marrakech",
    telephone: "0664567890",
    email: "a.tazi@fstm.ac.ma",
    departement: "Chimie",
    poste: "Assistante administrative",
    dateDeRecrutement: "2018-05-01",
    dateDeGrade: "2021-05-01",
    AncienneteEchelon: "2021-05-01",
    typeContrat: "Permanent",
    statut: "Actif",
    photo: "/placeholder.svg?height=100&width=100",
    diplomes: ["Licence en Administration", "BTS Secrétariat"],
    competences: ["Word", "Excel", "Gestion administrative"],
    soldeConges: { annuel: 30, maladie: 15 },
    historiqueConges: [],
  },
  {
    id: 5,
    nom: "Idrissi",
    prenom: "Karim",
    dateNaissance: "1982-12-03",
    adresse: "56 Avenue des FAR, Tanger",
    telephone: "0665678901",
    email: "k.idrissi@fstm.ac.ma",
    departement: "Biologie",
    poste: "Chercheur",
    dateDeRecrutement: "2014-10-01",
    dateDeGrade: "2020-01-15",
    AncienneteEchelon: "2020-01-15",
    typeContrat: "Permanent",
    statut: "Actif",
    photo: "/placeholder.svg?height=100&width=100",
    diplomes: ["Doctorat en Biologie", "Master en Microbiologie"],
    competences: ["Microbiologie", "Biochimie", "PCR"],
    soldeConges: { annuel: 30, maladie: 15 },
    historiqueConges: [],
  },
]

// Liste des départements pour le filtre
const departments = ["Informatique", "Mathématiques", "Physique", "Chimie", "Biologie"]

const EmployeeTable = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const [tabValue, setTabValue] = useState(0)

  const handleMenuOpen = (event, employee) => {
    setAnchorEl(event.currentTarget)
    setSelectedEmployee(employee)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleOpenAddDialog = () => {
    setSelectedEmployee(null)
    setOpenDialog(true)
  }

  const handleOpenEditDialog = () => {
    setOpenDialog(true)
    handleMenuClose()
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleOpenDetailsDialog = () => {
    setOpenDetailsDialog(true)
    handleMenuClose()
  }

  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false)
  }

  const handleDelete = () => {
    alert(`Supprimer l'employé: ${selectedEmployee?.prenom} ${selectedEmployee?.nom}`)
    handleMenuClose()
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleDepartmentChange = (event) => {
    setDepartmentFilter(event.target.value)
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  // Filtrer les employés en fonction de la recherche et du département
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = departmentFilter === "" || emp.departement === departmentFilter

    return matchesSearch && matchesDepartment
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 4, backgroundColor: backgroundColor, minHeight: "100vh" }}>
        {/* Titre */}
        <Typography variant="h1" gutterBottom>
          Gestion du Personnel
        </Typography>

        {/* Barre de recherche + Sélecteur + Bouton Ajouter */}
        <Box
          display="flex"
          gap={2}
          sx={{
            mb: 4,
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "stretch", md: "center" },
          }}
        >
          <StyledSearchBox>
            <Search sx={{ color: alpha(secondaryColor, 0.5), mr: 1 }} />
            <TextField
              variant="standard"
              placeholder="Rechercher un employé..."
              value={searchTerm}
              onChange={handleSearchChange}
              fullWidth
              InputProps={{
                disableUnderline: true,
              }}
            />
          </StyledSearchBox>

          <FormControl sx={{ minWidth: { xs: "100%", md: 200 } }}>
            <InputLabel id="department-select-label">Département</InputLabel>
            <Select
              labelId="department-select-label"
              value={departmentFilter}
              onChange={handleDepartmentChange}
              displayEmpty
              label="Département"
              startAdornment={
                <InputAdornment position="start">
                  <FilterList sx={{ color: alpha(secondaryColor, 0.5) }} />
                </InputAdornment>
              }
            >
              <MenuItem value="">Tous les départements</MenuItem>
              {departments.map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleOpenAddDialog}
            sx={{ minWidth: { xs: "100%", md: "auto" } }}
          >
            Ajouter un employé
          </Button>
        </Box>

        {/* Tableau des employés */}
        <Paper elevation={2} sx={{ borderRadius: 4, overflow: "hidden", mb: 4 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nom complet</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Téléphone</TableCell>
                  <TableCell>Département</TableCell>
                  <TableCell>Poste</TableCell>
                  <TableCell>Type de contrat</TableCell>
                  <TableCell>Statut</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredEmployees.map((emp) => (
                  <TableRow key={emp.id}>
                    <TableCell>{emp.id}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          src={emp.photo}
                          alt={`${emp.prenom} ${emp.nom}`}
                          sx={{ mr: 2, border: `2px solid ${alpha(primaryColor, 0.2)}` }}
                        />
                        <Typography variant="subtitle1">
                          {emp.prenom} {emp.nom}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{emp.email}</TableCell>
                    <TableCell>{emp.telephone}</TableCell>
                    <TableCell>{emp.departement}</TableCell>
                    <TableCell>{emp.poste}</TableCell>
                    <TableCell>
                      <Chip
                        label={emp.typeContrat}
                        color={emp.typeContrat === "Permanent" ? "primary" : "default"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip label={emp.statut} color={emp.statut === "Actif" ? "success" : "default"} size="small" />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={(event) => handleMenuOpen(event, emp)}
                        sx={{
                          color: secondaryColor,
                          "&:hover": {
                            backgroundColor: alpha(secondaryColor, 0.1),
                            transform: "scale(1.1)",
                          },
                        }}
                      >
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Menu déroulant pour actions CRUD */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 3,
            sx: {
              borderRadius: 2,
              minWidth: 180,
            },
          }}
        >
          <MenuItem onClick={handleOpenDetailsDialog} sx={{ color: secondaryColor }}>
            <Visibility fontSize="small" sx={{ mr: 1, color: primaryColor }} /> Détails
          </MenuItem>
          <MenuItem onClick={handleOpenEditDialog} sx={{ color: secondaryColor }}>
            <Edit fontSize="small" sx={{ mr: 1, color: primaryColor }} /> Modifier
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: accentColor }}>
            <Delete fontSize="small" sx={{ mr: 1 }} /> Supprimer
          </MenuItem>
        </Menu>

        {/* Dialogue pour ajouter/modifier un employé */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: `1px solid ${alpha(primaryColor, 0.2)}`,
            }}
          >
            <Typography variant="h5">{selectedEmployee ? "Modifier un employé" : "Ajouter un employé"}</Typography>
            {selectedEmployee && (
              <Chip
                label={selectedEmployee.statut}
                color={selectedEmployee.statut === "Actif" ? "success" : "default"}
                size="small"
              />
            )}
          </DialogTitle>
          <DialogContent sx={{ p: 0 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                borderBottom: `1px solid ${alpha(primaryColor, 0.1)}`,
                "& .MuiTab-root": {
                  color: alpha(secondaryColor, 0.7),
                  "&.Mui-selected": { color: primaryColor },
                },
                "& .MuiTabs-indicator": { backgroundColor: primaryColor },
              }}
            >
              <Tab label="Informations personnelles" icon={<Person />} iconPosition="start" />
              <Tab label="Informations professionnelles" icon={<Work />} iconPosition="start" />
              <Tab label="Diplômes & Compétences" icon={<School />} iconPosition="start" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4} display="flex" flexDirection="column" alignItems="center">
                  <StyledAvatar
                    src={selectedEmployee?.photo || "/placeholder.svg?height=150&width=150"}
                    alt="Photo de profil"
                  />
                  <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
                    Changer la photo
                  </Button>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Nom"
                        defaultValue={selectedEmployee?.nom || ""}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Badge sx={{ color: alpha(primaryColor, 0.6) }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Prénom"
                        defaultValue={selectedEmployee?.prenom || ""}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person sx={{ color: alpha(primaryColor, 0.6) }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Date de naissance"
                        type="date"
                        defaultValue={selectedEmployee?.dateNaissance || ""}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarMonth sx={{ color: alpha(primaryColor, 0.6) }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        defaultValue={selectedEmployee?.email || ""}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email sx={{ color: alpha(primaryColor, 0.6) }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Téléphone"
                        defaultValue={selectedEmployee?.telephone || ""}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Phone sx={{ color: alpha(primaryColor, 0.6) }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Adresse"
                        defaultValue={selectedEmployee?.adresse || ""}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationOn sx={{ color: alpha(primaryColor, 0.6) }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Département</InputLabel>
                    <Select
                      defaultValue={selectedEmployee?.departement || ""}
                      label="Département"
                      startAdornment={
                        <InputAdornment position="start">
                          <Work sx={{ color: alpha(primaryColor, 0.6) }} />
                        </InputAdornment>
                      }
                    >
                      {departments.map((dept) => (
                        <MenuItem key={dept} value={dept}>
                          {dept}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Poste"
                    defaultValue={selectedEmployee?.poste || ""}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Assignment sx={{ color: alpha(primaryColor, 0.6) }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Date de recrutement"
                    type="date"
                    defaultValue={selectedEmployee?.dateDeRecrutement || ""}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarMonth sx={{ color: alpha(primaryColor, 0.6) }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Date de grade"
                    type="date"
                    defaultValue={selectedEmployee?.dateDeGrade || ""}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarMonth sx={{ color: alpha(primaryColor, 0.6) }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Ancienneté échelon"
                    type="date"
                    defaultValue={selectedEmployee?.AncienneteEchelon || ""}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EventAvailable sx={{ color: alpha(primaryColor, 0.6) }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Type de contrat</InputLabel>
                    <Select
                      defaultValue={selectedEmployee?.typeContrat || ""}
                      label="Type de contrat"
                      startAdornment={
                        <InputAdornment position="start">
                          <Work sx={{ color: alpha(primaryColor, 0.6) }} />
                        </InputAdornment>
                      }
                    >
                      <MenuItem value="Permanent">Permanent</MenuItem>
                      <MenuItem value="CDD">CDD</MenuItem>
                      <MenuItem value="Vacataire">Vacataire</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Statut</InputLabel>
                    <Select
                      defaultValue={selectedEmployee?.statut || ""}
                      label="Statut"
                      startAdornment={
                        <InputAdornment position="start">
                          <Person sx={{ color: alpha(primaryColor, 0.6) }} />
                        </InputAdornment>
                      }
                    >
                      <MenuItem value="Actif">Actif</MenuItem>
                      <MenuItem value="En congé">En congé</MenuItem>
                      <MenuItem value="Suspendu">Suspendu</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Diplômes
                  </Typography>
                  <TextField
                    fullWidth
                    label="Diplômes (séparés par des virgules)"
                    defaultValue={selectedEmployee?.diplomes?.join(", ") || ""}
                    multiline
                    rows={2}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <School sx={{ color: alpha(primaryColor, 0.6) }} />
                        </InputAdornment>
                      ),
                    }}
                  />

                  {selectedEmployee?.diplomes && selectedEmployee.diplomes.length > 0 && (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
                      {selectedEmployee.diplomes.map((diplome, index) => (
                        <Chip key={index} label={diplome} color="primary" onDelete={() => {}} />
                      ))}
                    </Box>
                  )}
                </Grid>

                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Compétences
                  </Typography>
                  <TextField
                    fullWidth
                    label="Compétences (séparées par des virgules)"
                    defaultValue={selectedEmployee?.competences?.join(", ") || ""}
                    multiline
                    rows={2}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Work sx={{ color: alpha(primaryColor, 0.6) }} />
                        </InputAdornment>
                      ),
                    }}
                  />

                  {selectedEmployee?.competences && selectedEmployee.competences.length > 0 && (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
                      {selectedEmployee.competences.map((competence, index) => (
                        <Chip key={index} label={competence} color="secondary" onDelete={() => {}} />
                      ))}
                    </Box>
                  )}
                </Grid>
              </Grid>
            </TabPanel>
          </DialogContent>
          <DialogActions sx={{ p: 3, borderTop: `1px solid ${alpha(primaryColor, 0.1)}` }}>
            <Button onClick={handleCloseDialog} variant="outlined" color="secondary">
              Annuler
            </Button>
            <Button variant="contained" color="primary" onClick={handleCloseDialog}>
              {selectedEmployee ? "Mettre à jour" : "Ajouter"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialogue pour afficher les détails d'un employé */}
        <Dialog open={openDetailsDialog} onClose={handleCloseDetailsDialog} maxWidth="md" fullWidth>
          <DialogTitle
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: `1px solid ${alpha(primaryColor, 0.2)}`,
            }}
          >
            <Typography variant="h5">Détails de l'employé</Typography>
            {selectedEmployee && (
              <Chip
                label={selectedEmployee.statut}
                color={selectedEmployee.statut === "Actif" ? "success" : "default"}
                size="small"
              />
            )}
          </DialogTitle>
          <DialogContent>
            {selectedEmployee && (
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={4} display="flex" flexDirection="column" alignItems="center">
                  <StyledAvatar
                    src={selectedEmployee.photo}
                    alt={`${selectedEmployee.prenom} ${selectedEmployee.nom}`}
                  />
                  <Typography variant="h5" sx={{ mt: 2, textAlign: "center" }}>
                    {selectedEmployee.prenom} {selectedEmployee.nom}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" sx={{ textAlign: "center" }}>
                    {selectedEmployee.poste}
                  </Typography>
                  <Chip label={selectedEmployee.departement} color="primary" sx={{ mt: 1 }} />
                </Grid>

                <Grid item xs={12} sm={8}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2">Informations personnelles</Typography>
                    <Divider sx={{ mb: 2, borderColor: alpha(primaryColor, 0.2) }} />

                    <InfoItem>
                      <Email fontSize="small" />
                      <Typography variant="body1">{selectedEmployee.email}</Typography>
                    </InfoItem>
                    <InfoItem>
                      <Phone fontSize="small" />
                      <Typography variant="body1">{selectedEmployee.telephone}</Typography>
                    </InfoItem>
                    <InfoItem>
                      <LocationOn fontSize="small" />
                      <Typography variant="body1">{selectedEmployee.adresse}</Typography>
                    </InfoItem>
                    <InfoItem>
                      <CalendarMonth fontSize="small" />
                      <Typography variant="body1">Né(e) le {selectedEmployee.dateNaissance}</Typography>
                    </InfoItem>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2">Informations professionnelles</Typography>
                    <Divider sx={{ mb: 2, borderColor: alpha(primaryColor, 0.2) }} />

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <InfoItem>
                          <Work fontSize="small" />
                          <Typography variant="body1">
                            <b>Type de contrat:</b> {selectedEmployee.typeContrat}
                          </Typography>
                        </InfoItem>
                        <InfoItem>
                          <CalendarMonth fontSize="small" />
                          <Typography variant="body1">
                            <b>Date de recrutement:</b> {selectedEmployee.dateDeRecrutement}
                          </Typography>
                        </InfoItem>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InfoItem>
                          <CalendarMonth fontSize="small" />
                          <Typography variant="body1">
                            <b>Date de grade:</b> {selectedEmployee.dateDeGrade}
                          </Typography>
                        </InfoItem>
                        <InfoItem>
                          <EventAvailable fontSize="small" />
                          <Typography variant="body1">
                            <b>Ancienneté échelon:</b> {selectedEmployee.AncienneteEchelon}
                          </Typography>
                        </InfoItem>
                      </Grid>
                    </Grid>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2">Solde de congés</Typography>
                    <Divider sx={{ mb: 2, borderColor: alpha(primaryColor, 0.2) }} />

                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Box
                          sx={{
                            p: 2,
                            bgcolor: alpha(primaryColor, 0.1),
                            borderRadius: 2,
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="h5" color="primary">
                            {selectedEmployee.soldeConges.annuel}
                          </Typography>
                          <Typography variant="body2">Congés annuels</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box
                          sx={{
                            p: 2,
                            bgcolor: alpha(secondaryColor, 0.1),
                            borderRadius: 2,
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="h5" color="secondary">
                            {selectedEmployee.soldeConges.maladie}
                          </Typography>
                          <Typography variant="body2">Congés maladie</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle2">Diplômes</Typography>
                  <Divider sx={{ mb: 2, borderColor: alpha(primaryColor, 0.2) }} />

                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
                    {selectedEmployee.diplomes.map((diplome, index) => (
                      <Chip key={index} label={diplome} color="primary" icon={<School />} />
                    ))}
                  </Box>

                  <Typography variant="subtitle2">Compétences</Typography>
                  <Divider sx={{ mb: 2, borderColor: alpha(primaryColor, 0.2) }} />

                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {selectedEmployee.competences.map((competence, index) => (
                      <Chip key={index} label={competence} color="secondary" />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 3, borderTop: `1px solid ${alpha(primaryColor, 0.1)}` }}>
            <Button onClick={handleCloseDetailsDialog} variant="outlined" color="secondary">
              Fermer
            </Button>
            <Button variant="contained" color="primary" onClick={handleOpenEditDialog} startIcon={<Edit />}>
              Modifier
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  )
}

export default EmployeeTable

