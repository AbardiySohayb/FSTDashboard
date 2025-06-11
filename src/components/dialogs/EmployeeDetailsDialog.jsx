"use client"
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Box,
  Chip,
  Divider,
  alpha,
  CircularProgress,
} from "@mui/material"
import {
  Edit,
  Email,
  Phone,
  LocationOn,
  CalendarMonth,
  Grade,
  Stairs,
  EventAvailable,
  School,
} from "@mui/icons-material"
import { StyledAvatar, InfoItem } from "../styled/StyledComponents"
import { primaryColor, secondaryColor } from "../../utils/theme"
import EmployeeService from "../../../services/RH/employeService"
import { API_ENDPOINTS, apiService } from "../../../config/appconfig"

const EmployeeDetailsDialog = ({ open, onClose, employee, onEdit }) => {
  const [loading, setLoading] = useState(false)
  const [employeeIndice, setEmployeeIndice] = useState(null)
  const [error, setError] = useState(null)

  // Fetch employee indice when dialog opens
  useEffect(() => {
    if (open && employee?.id) {
      fetchEmployeeIndice(employee.id)
    }
  }, [open, employee])

  const fetchEmployeeIndice = async (employeeId) => {
    setLoading(true)
    try {
      const indice = await apiService.get(API_ENDPOINTS.EMPLOYEES.GET_INDICE(employeeId))
      setEmployeeIndice(indice)
    } catch (err) {
      console.error("Error fetching employee indice:", err)
      setError("Impossible de récupérer l'indice de l'employé")
    } finally {
      setLoading(false)
    }
  }

  if (!employee) return null

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Non spécifié"
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch (e) {
      return dateString
    }
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
        <Typography variant="h5">Détails de l'employé</Typography>
        <Chip label={employee.statut} color={employee.statut === "Actif" ? "success" : "default"} size="small" />
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={4} display="flex" flexDirection="column" alignItems="center">
            <StyledAvatar src={employee.photo} alt={`${employee.prenom} ${employee.nom}`} />
            <Typography variant="h5" sx={{ mt: 2, textAlign: "center" }}>
              {employee.prenom} {employee.nom}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ textAlign: "center" }}>
              {employee.poste}
            </Typography>
            <Chip label={employee.departement} color="primary" sx={{ mt: 1 }} />
          </Grid>

          <Grid item xs={12} sm={8}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2">Informations personnelles</Typography>
              <Divider sx={{ mb: 2, borderColor: alpha(primaryColor, 0.2) }} />

              <InfoItem>
                <Email fontSize="small" />
                <Typography variant="body1">{employee.email}</Typography>
              </InfoItem>
              <InfoItem>
                <Phone fontSize="small" />
                <Typography variant="body1">{employee.telephone}</Typography>
              </InfoItem>
              <InfoItem>
                <LocationOn fontSize="small" />
                <Typography variant="body1">{employee.adresse}</Typography>
              </InfoItem>
              <InfoItem>
                <CalendarMonth fontSize="small" />
                <Typography variant="body1">Né(e) le {formatDate(employee.dateNaissance)}</Typography>
              </InfoItem>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2">Informations professionnelles</Typography>
              <Divider sx={{ mb: 2, borderColor: alpha(primaryColor, 0.2) }} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <InfoItem>
                    <Grade fontSize="small" />
                    <Typography variant="body1">
                      <b>Niveau de Grade:</b> {employee.niveauGrade}
                    </Typography>
                  </InfoItem>
                  <InfoItem>
                    <Stairs fontSize="small" />
                    <Typography variant="body1">
                      <b>Échelon:</b> {employee.echelon}
                    </Typography>
                  </InfoItem>
                  <InfoItem>
                    <CalendarMonth fontSize="small" />
                    <Typography variant="body1">
                      <b>Date de recrutement:</b> {formatDate(employee.dateDeRecrutement)}
                    </Typography>
                  </InfoItem>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InfoItem>
                    <CalendarMonth fontSize="small" />
                    <Typography variant="body1">
                      <b>Date de grade:</b> {formatDate(employee.dateDeGrade)}
                    </Typography>
                  </InfoItem>
                  <InfoItem>
                    <EventAvailable fontSize="small" />
                    <Typography variant="body1">
                      <b>Ancienneté échelon:</b> {formatDate(employee.AncienneteEchelon)}
                    </Typography>
                  </InfoItem>
                </Grid>
              </Grid>
            </Box>

            {/* Indice section */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2">Indice</Typography>
              <Divider sx={{ mb: 2, borderColor: alpha(primaryColor, 0.2) }} />

              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                  <CircularProgress size={24} />
                </Box>
              ) : error ? (
                <Typography color="error">{error}</Typography>
              ) : (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: alpha(primaryColor, 0.1),
                        borderRadius: 2,
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="h5" color="primary">
                        {employeeIndice?.valeur || "Non disponible"}
                      </Typography>
                      <Typography variant="body2">Indice</Typography>
                    </Box>
                  </Grid>
                </Grid>
              )}
            </Box>

            {/* Conditionally render solde congés if available */}
            {employee.soldeConges && (
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
                        {employee.soldeConges.annuel}
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
                        {employee.soldeConges.maladie}
                      </Typography>
                      <Typography variant="body2">Congés maladie</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Grid>

          {/* Conditionally render diplomes and competences if available */}
          {(employee.diplomes || employee.competences) && (
            <Grid item xs={12}>
              {employee.diplomes && (
                <>
                  <Typography variant="subtitle2">Diplômes</Typography>
                  <Divider sx={{ mb: 2, borderColor: alpha(primaryColor, 0.2) }} />

                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
                    {employee.diplomes.map((diplome, index) => (
                      <Chip key={index} label={diplome} color="primary" icon={<School />} />
                    ))}
                  </Box>
                </>
              )}

              {employee.competences && (
                <>
                  <Typography variant="subtitle2">Compétences</Typography>
                  <Divider sx={{ mb: 2, borderColor: alpha(primaryColor, 0.2) }} />

                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
                    {employee.competences.map((competence, index) => (
                      <Chip key={index} label={competence} color="secondary" />
                    ))}
                  </Box>
                </>
              )}
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 3, borderTop: `1px solid ${alpha(primaryColor, 0.1)}` }}>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Fermer
        </Button>
        <Button variant="contained" color="primary" onClick={onEdit} startIcon={<Edit />}>
          Modifier
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EmployeeDetailsDialog
