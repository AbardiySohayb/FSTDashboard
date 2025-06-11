"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Chip,
  Tabs,
  Tab,
  InputAdornment,
  alpha,
  CircularProgress,
  Alert,
} from "@mui/material"
import {
  Person,
  Work,
  School,
  History,
  Badge,
  CalendarMonth,
  Email,
  Phone,
  LocationOn,
  EventAvailable,
  Grade,
  Stairs,
  Assignment,
} from "@mui/icons-material"
import { StyledAvatar, TabPanel } from "../styled/StyledComponents"
import { primaryColor } from "../../utils/theme"
import EmployeeService from "../../../services/RH/employeService"

const EmployeeFormDialog = ({ open, onClose, employee, onSave }) => {
  const [tabValue, setTabValue] = useState(0)
  const [formData, setFormData] = useState({
    id: "",
    nom: "",
    prenom: "",
    dateNaissance: "",
    adresse: "",
    telephone: "",
    email: "",
    departement: "",
    poste: "",
    dateDeRecrutement: "",
    dateDeGrade: "",
    AncienneteEchelon: "",
    typeContrat: "CDI", // Default value
    statut: "Actif", // Default value
    categorie: "",
    niveauGrade: "",
    echelon: "",
    diplomes: [],
    competences: [],
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [departments, setDepartments] = useState([])
  const [categories, setCategories] = useState([])
  const [availableGrades, setAvailableGrades] = useState([])
  const [availableEchelons, setAvailableEchelons] = useState([])
  const [newDiplome, setNewDiplome] = useState("")
  const [newCompetence, setNewCompetence] = useState("")

  // Initialize form data when employee changes
  useEffect(() => {
    if (employee) {
      setFormData({
        id: employee.id || "",
        nom: employee.nom || "",
        prenom: employee.prenom || "",
        dateNaissance: employee.dateNaissance || "",
        adresse: employee.adresse || "",
        telephone: employee.telephone || "",
        email: employee.email || "",
        departement: employee.departement || "",
        poste: employee.poste || "",
        dateDeRecrutement: employee.dateDeRecrutement || "",
        dateDeGrade: employee.dateDeGrade || "",
        AncienneteEchelon: employee.AncienneteEchelon || "",
        typeContrat: employee.typeContrat || "CDI",
        statut: employee.statut || "Actif",
        categorie: employee.categorie || "",
        niveauGrade: employee.niveauGrade || "",
        echelon: employee.echelon || "",
        diplomes: employee.diplomes || [],
        competences: employee.competences || [],
      })
    } else {
      // Reset form for new employee
      setFormData({
        id: "",
        nom: "",
        prenom: "",
        dateNaissance: "",
        adresse: "",
        telephone: "",
        email: "",
        departement: "",
        poste: "",
        dateDeRecrutement: "",
        dateDeGrade: "",
        AncienneteEchelon: "",
        typeContrat: "CDI",
        statut: "Actif",
        categorie: "",
        niveauGrade: "",
        echelon: "",
        diplomes: [],
        competences: [],
      })
    }
  }, [employee, open])

  // Fetch reference data on component mount
  useEffect(() => {
    fetchReferenceData()
  }, [])

  // Fonction pour récupérer les données de référence depuis l'API
  const fetchReferenceData = async () => {
    setLoading(true)
    setError(null)

    try {
      // Dans un cas réel, ces appels seraient remplacés par des appels API spécifiques
      // Exemple: const departmentsResponse = await apiService.get(API_ENDPOINTS.REFERENCE.DEPARTMENTS)

      // Pour l'instant, simulons ces appels avec des données statiques
      // Mais dans une implémentation réelle, vous remplaceriez cela par des appels API

      // Simuler un délai de chargement
      await new Promise((resolve) => setTimeout(resolve, 500))

      setDepartments(["Informatique", "Ressources Humaines", "Finance", "Marketing", "Recherche"])
      // Utiliser les catégories spécifiques demandées
      setCategories(["Professeur Enseignement Supérieur", "Maitre de conférence", "Maitre de conférence qualifié"])
    } catch (err) {
      console.error("Erreur lors de la récupération des données de référence:", err)
      setError("Impossible de charger les données de référence")
    } finally {
      setLoading(false)
    }
  }

  // Update available grades when category changes
  useEffect(() => {
    if (formData.categorie) {
      fetchGradesForCategory(formData.categorie)
    } else {
      setAvailableGrades([])
    }
  }, [formData.categorie])

  // Update available echelons when grade changes
  useEffect(() => {
    if (formData.categorie && formData.niveauGrade) {
      fetchEchelonsForGrade(formData.categorie, formData.niveauGrade)
    } else {
      setAvailableEchelons([])
    }
  }, [formData.categorie, formData.niveauGrade])

  // Fonction pour récupérer les grades pour une catégorie depuis l'API
  const fetchGradesForCategory = async (category) => {
    setLoading(true)
    try {
      // Dans une implémentation réelle, vous utiliseriez un endpoint API spécifique
      // Exemple: const response = await apiService.get(API_ENDPOINTS.REFERENCE.GRADES_BY_CATEGORY(category))

      // Pour l'instant, simulons cet appel avec la fonction utilitaire existante
      // Mais dans une implémentation réelle, vous remplaceriez cela par un appel API

      // Simuler un délai de chargement
      await new Promise((resolve) => setTimeout(resolve, 300))

      // Utiliser les grades spécifiques demandés (A, B, C, D) pour toutes les catégories
      const grades = ["A", "B", "C", "D"]
      setAvailableGrades(grades)

      // Si le grade actuel n'est pas dans la liste des grades disponibles, le réinitialiser
      if (formData.niveauGrade && !grades.includes(formData.niveauGrade)) {
        setFormData({
          ...formData,
          niveauGrade: "",
          echelon: "",
        })
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des grades:", err)
      setError("Impossible de charger les grades")
      setAvailableGrades([])
    } finally {
      setLoading(false)
    }
  }

  // Fonction pour récupérer les échelons pour un grade depuis l'API
  const fetchEchelonsForGrade = async (category, grade) => {
    setLoading(true)
    try {
      // Dans une implémentation réelle, vous utiliseriez un endpoint API spécifique
      // Exemple: const response = await apiService.get(API_ENDPOINTS.REFERENCE.ECHELONS_BY_GRADE(category, grade))

      // Pour l'instant, simulons cet appel avec la fonction utilitaire existante
      // Mais dans une implémentation réelle, vous remplaceriez cela par un appel API

      // Simuler un délai de chargement
      await new Promise((resolve) => setTimeout(resolve, 300))

      // Simuler une réponse API
      let echelons = []
      if (category === "Enseignant-Chercheur") {
        if (grade === "Professeur") {
          echelons = [1, 2, 3, 4, 5]
        } else if (grade === "Maître de conférences") {
          echelons = [1, 2, 3, 4]
        } else if (grade === "Assistant") {
          echelons = [1, 2, 3]
        }
      } else if (category === "Administratif") {
        if (grade === "Administrateur") {
          echelons = [1, 2, 3, 4]
        } else if (grade === "Secrétaire") {
          echelons = [1, 2, 3]
        } else if (grade === "Agent") {
          echelons = [1, 2]
        }
      } else {
        echelons = [1, 2, 3]
      }

      setAvailableEchelons(echelons)

      // Si l'échelon actuel n'est pas dans la liste des échelons disponibles, le réinitialiser
      if (formData.echelon && !echelons.includes(Number.parseInt(formData.echelon))) {
        setFormData({
          ...formData,
          echelon: "",
        })
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des échelons:", err)
      setError("Impossible de charger les échelons")
      setAvailableEchelons([])
    } finally {
      setLoading(false)
    }
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleAddDiplome = () => {
    if (newDiplome.trim()) {
      setFormData({
        ...formData,
        diplomes: [...formData.diplomes, newDiplome.trim()],
      })
      setNewDiplome("")
    }
  }

  const handleRemoveDiplome = (index) => {
    const updatedDiplomes = [...formData.diplomes]
    updatedDiplomes.splice(index, 1)
    setFormData({
      ...formData,
      diplomes: updatedDiplomes,
    })
  }

  const handleAddCompetence = () => {
    if (newCompetence.trim()) {
      setFormData({
        ...formData,
        competences: [...formData.competences, newCompetence.trim()],
      })
      setNewCompetence("")
    }
  }

  const handleRemoveCompetence = (index) => {
    const updatedCompetences = [...formData.competences]
    updatedCompetences.splice(index, 1)
    setFormData({
      ...formData,
      competences: updatedCompetences,
    })
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Map form data to backend format
      const employeeData = EmployeeService.mapEmployeeDataForBackend(formData)

      if (employee) {
        // Update existing employee
        await EmployeeService.updateEmployee(employeeData)
        setSuccess("Employé mis à jour avec succès")
      } else {
        // Add new employee
        await EmployeeService.addEmployee(employeeData)
        setSuccess("Employé ajouté avec succès")
      }

      // Call onSave callback to refresh data in parent component
      if (onSave) {
        onSave()
      }

      // Close dialog after a short delay to show success message
      setTimeout(() => {
        onClose(true)
      }, 1500)
    } catch (err) {
      console.error("Error saving employee:", err)
      setError(err.message || "Une erreur s'est produite lors de l'enregistrement de l'employé")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={() => onClose(false)} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${alpha(primaryColor, 0.2)}`,
        }}
      >
        <Typography variant="h5">{employee ? "Modifier un employé" : "Ajouter un employé"}</Typography>
        {employee && (
          <Chip label={employee.statut} color={employee.statut === "Actif" ? "success" : "default"} size="small" />
        )}
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        {/* Error and success messages */}
        {error && (
          <Alert severity="error" sx={{ m: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ m: 2 }}>
            {success}
          </Alert>
        )}

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            borderBottom: `1px solid ${alpha(primaryColor, 0.1)}`,
            "& .MuiTab-root": {
              color: alpha("#2C3E50", 0.7),
              "&.Mui-selected": { color: primaryColor },
            },
            "& .MuiTabs-indicator": { backgroundColor: primaryColor },
          }}
        >
          <Tab label="Informations personnelles" icon={<Person />} iconPosition="start" />
          <Tab label="Informations professionnelles" icon={<Work />} iconPosition="start" />
          <Tab label="Diplômes & Compétences" icon={<School />} iconPosition="start" />
          <Tab label="Historique des promotions" icon={<History />} iconPosition="start" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4} display="flex" flexDirection="column" alignItems="center">
              <StyledAvatar src={employee?.photo || "/placeholder.svg?height=150&width=150"} alt="Photo de profil" />
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
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
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
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleInputChange}
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
                    name="dateNaissance"
                    type="date"
                    value={formData.dateNaissance}
                    onChange={handleInputChange}
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
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
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
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleInputChange}
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
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleInputChange}
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
                  name="departement"
                  value={formData.departement}
                  onChange={handleInputChange}
                  label="Département"
                  startAdornment={
                    <InputAdornment position="start">
                      <Work sx={{ color: alpha(primaryColor, 0.6) }} />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="">Sélectionner un département</MenuItem>
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
                name="poste"
                value={formData.poste}
                onChange={handleInputChange}
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
                name="dateDeRecrutement"
                type="date"
                value={formData.dateDeRecrutement}
                onChange={handleInputChange}
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
                name="dateDeGrade"
                type="date"
                value={formData.dateDeGrade}
                onChange={handleInputChange}
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
                name="AncienneteEchelon"
                type="date"
                value={formData.AncienneteEchelon}
                onChange={handleInputChange}
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
                <InputLabel>Catégorie</InputLabel>
                <Select
                  name="categorie"
                  value={formData.categorie}
                  onChange={handleInputChange}
                  label="Catégorie"
                  startAdornment={
                    <InputAdornment position="start">
                      <School sx={{ color: alpha(primaryColor, 0.6) }} />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="">Sélectionner une catégorie</MenuItem>
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth disabled={!formData.categorie}>
                <InputLabel>Niveau de Grade</InputLabel>
                <Select
                  name="niveauGrade"
                  value={formData.niveauGrade}
                  onChange={handleInputChange}
                  label="Niveau de Grade"
                  startAdornment={
                    <InputAdornment position="start">
                      <Grade sx={{ color: alpha(primaryColor, 0.6) }} />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="">Sélectionner un grade</MenuItem>
                  {availableGrades.map((grade) => (
                    <MenuItem key={grade} value={grade}>
                      {grade}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth disabled={!formData.niveauGrade}>
                <InputLabel>Échelon</InputLabel>
                <Select
                  name="echelon"
                  value={formData.echelon}
                  onChange={handleInputChange}
                  label="Échelon"
                  startAdornment={
                    <InputAdornment position="start">
                      <Stairs sx={{ color: alpha(primaryColor, 0.6) }} />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="">Sélectionner un échelon</MenuItem>
                  {availableEchelons.map((echelon) => (
                    <MenuItem key={echelon} value={echelon.toString()}>
                      Échelon {echelon}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Statut</InputLabel>
                <Select
                  name="statut"
                  value={formData.statut}
                  onChange={handleInputChange}
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
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Type de Contrat</InputLabel>
                <Select
                  name="typeContrat"
                  value={formData.typeContrat}
                  onChange={handleInputChange}
                  label="Type de Contrat"
                  startAdornment={
                    <InputAdornment position="start">
                      <Assignment sx={{ color: alpha(primaryColor, 0.6) }} />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="CDI">CDI</MenuItem>
                  <MenuItem value="CDD">CDD</MenuItem>
                  <MenuItem value="Vacataire">Vacataire</MenuItem>
                  <MenuItem value="Stage">Stage</MenuItem>
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
              <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                <TextField
                  fullWidth
                  label="Ajouter un diplôme"
                  value={newDiplome}
                  onChange={(e) => setNewDiplome(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <School sx={{ color: alpha(primaryColor, 0.6) }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button variant="contained" color="primary" onClick={handleAddDiplome}>
                  Ajouter
                </Button>
              </Box>

              {formData.diplomes.length > 0 && (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
                  {formData.diplomes.map((diplome, index) => (
                    <Chip key={index} label={diplome} color="primary" onDelete={() => handleRemoveDiplome(index)} />
                  ))}
                </Box>
              )}
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Compétences
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                <TextField
                  fullWidth
                  label="Ajouter une compétence"
                  value={newCompetence}
                  onChange={(e) => setNewCompetence(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Work sx={{ color: alpha(primaryColor, 0.6) }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button variant="contained" color="primary" onClick={handleAddCompetence}>
                  Ajouter
                </Button>
              </Box>

              {formData.competences.length > 0 && (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
                  {formData.competences.map((competence, index) => (
                    <Chip
                      key={index}
                      label={competence}
                      color="secondary"
                      onDelete={() => handleRemoveCompetence(index)}
                    />
                  ))}
                </Box>
              )}
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Typography variant="body1" sx={{ textAlign: "center", py: 4, color: "text.secondary" }}>
            L'historique des promotions sera affiché ici
          </Typography>
        </TabPanel>
      </DialogContent>
      <DialogActions sx={{ p: 3, borderTop: `1px solid ${alpha(primaryColor, 0.1)}` }}>
        <Button onClick={() => onClose(false)} variant="outlined" color="secondary" disabled={loading}>
          Annuler
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {employee ? "Mettre à jour" : "Ajouter"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EmployeeFormDialog
