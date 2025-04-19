"use client"

import { useState } from "react"
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
import { departments, niveauxGrade, echelons } from "../../data/mockData"

const EmployeeFormDialog = ({ open, onClose, employee }) => {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
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
                    defaultValue={employee?.nom || ""}
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
                    defaultValue={employee?.prenom || ""}
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
                    defaultValue={employee?.dateNaissance || ""}
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
                    defaultValue={employee?.email || ""}
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
                    defaultValue={employee?.telephone || ""}
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
                    defaultValue={employee?.adresse || ""}
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
                  defaultValue={employee?.departement || ""}
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
                defaultValue={employee?.poste || ""}
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
                defaultValue={employee?.dateDeRecrutement || ""}
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
                defaultValue={employee?.dateDeGrade || ""}
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
                defaultValue={employee?.AncienneteEchelon || ""}
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
                <InputLabel>Niveau de Grade</InputLabel>
                <Select
                  defaultValue={employee?.niveauGrade || ""}
                  label="Niveau de Grade"
                  startAdornment={
                    <InputAdornment position="start">
                      <Grade sx={{ color: alpha(primaryColor, 0.6) }} />
                    </InputAdornment>
                  }
                >
                  {niveauxGrade.map((grade) => (
                    <MenuItem key={grade} value={grade}>
                      {grade}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Échelon</InputLabel>
                <Select
                  defaultValue={employee?.echelon || ""}
                  label="Échelon"
                  startAdornment={
                    <InputAdornment position="start">
                      <Stairs sx={{ color: alpha(primaryColor, 0.6) }} />
                    </InputAdornment>
                  }
                >
                  {echelons.map((echelon) => (
                    <MenuItem key={echelon} value={echelon}>
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
                  defaultValue={employee?.statut || ""}
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
                defaultValue={employee?.diplomes?.join(", ") || ""}
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

              {employee?.diplomes && employee.diplomes.length > 0 && (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
                  {employee.diplomes.map((diplome, index) => (
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
                defaultValue={employee?.competences?.join(", ") || ""}
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

              {employee?.competences && employee.competences.length > 0 && (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
                  {employee.competences.map((competence, index) => (
                    <Chip key={index} label={competence} color="secondary" onDelete={() => {}} />
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
        <Button onClick={onClose} variant="outlined" color="secondary">
          Annuler
        </Button>
        <Button variant="contained" color="primary" onClick={onClose}>
          {employee ? "Mettre à jour" : "Ajouter"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EmployeeFormDialog
