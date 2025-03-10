
import { useState } from "react"
import {
  AppBar,
  Toolbar,
  
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
} from "@mui/material"
import {
  Add as AddIcon,
  AccessTime as AccessTimeIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material"

export default function HRDashboard() {
  const [selectedStatus, setSelectedStatus] = useState("")

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value)
  }

  return (
    <Box sx={{ display: "flex" }}>
      
      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "#f5f7fa", p: 3 }}>
        
            <Typography variant="h5" component="div"  sx={{ fontWeight: "bold" }}>
              Tâches et Missions
            </Typography>
            
          
       

        {/* Task statistics */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Typography variant="h6" color="text.secondary">
                    Tâches en cours
                  </Typography>
                  <AccessTimeIcon color="action" />
                </Box>
                <Typography variant="h3" component="div" sx={{ mb: 1, fontWeight: "bold" }}>
                  12
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  2 tâches ajoutées cette semaine
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Typography variant="h6" color="text.secondary">
                    Tâches terminées
                  </Typography>
                  <CheckCircleIcon color="action" />
                </Box>
                <Typography variant="h3" component="div" sx={{ mb: 1, fontWeight: "bold" }}>
                  28
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  5 tâches terminées cette semaine
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Typography variant="h6" color="text.secondary">
                    Tâches en retard
                  </Typography>
                  <WarningIcon color="action" />
                </Box>
                <Typography variant="h3" component="div" sx={{ mb: 1, fontWeight: "bold" }}>
                  3
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  1 nouvelle tâche en retard
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Task list */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
              Liste des tâches
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                backgroundColor: "#000",
                "&:hover": { backgroundColor: "#333" },
                borderRadius: "20px",
              }}
            >
              Nouvelle tâche
            </Button>
          </Box>

          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <TextField placeholder="Rechercher une tâche..." variant="outlined" size="small" sx={{ width: "300px" }} />
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel id="status-select-label">Statut</InputLabel>
              <Select
                labelId="status-select-label"
                id="status-select"
                value={selectedStatus}
                label="Statut"
                onChange={handleStatusChange}
              >
                <MenuItem value="">Tous</MenuItem>
                <MenuItem value="en_cours">En cours</MenuItem>
                <MenuItem value="en_attente">En attente</MenuItem>
                <MenuItem value="termine">Terminé</MenuItem>
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
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Préparation du rapport annuel</TableCell>
                  <TableCell>Mohammed Alami</TableCell>
                  <TableCell>2023-07-15</TableCell>
                  <TableCell>
                    <Chip
                      label="En cours"
                      size="small"
                      sx={{
                        backgroundColor: "#e3f2fd",
                        color: "#1976d2",
                        borderRadius: "4px",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={60}
                        sx={{
                          width: "100px",
                          height: 8,
                          borderRadius: 5,
                          backgroundColor: "#e0e0e0",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: "#000",
                          },
                        }}
                      />
                      <Typography variant="body2">60%</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Mise à jour du système de gestion des congés</TableCell>
                  <TableCell>Fatima Zohra</TableCell>
                  <TableCell>2023-07-30</TableCell>
                  <TableCell>
                    <Chip
                      label="En attente"
                      size="small"
                      sx={{
                        backgroundColor: "#fff8e1",
                        color: "#ff8f00",
                        borderRadius: "4px",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={0}
                        sx={{
                          width: "100px",
                          height: 8,
                          borderRadius: 5,
                          backgroundColor: "#e0e0e0",
                        }}
                      />
                      <Typography variant="body2">0%</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Organisation de la journée portes ouvertes</TableCell>
                  <TableCell>Youssef Benali</TableCell>
                  <TableCell>2023-08-10</TableCell>
                  <TableCell>
                    <Chip
                      label="Terminé"
                      size="small"
                      sx={{
                        backgroundColor: "#e8f5e9",
                        color: "#2e7d32",
                        borderRadius: "4px",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={100}
                        sx={{
                          width: "100px",
                          height: 8,
                          borderRadius: 5,
                          backgroundColor: "#e0e0e0",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: "#000",
                          },
                        }}
                      />
                      <Typography variant="body2">100%</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Révision des procédures de sécurité</TableCell>
                  <TableCell>Amina Tazi</TableCell>
                  <TableCell>2023-07-20</TableCell>
                  <TableCell>
                    <Chip
                      label="En cours"
                      size="small"
                      sx={{
                        backgroundColor: "#e3f2fd",
                        color: "#1976d2",
                        borderRadius: "4px",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={40}
                        sx={{
                          width: "100px",
                          height: 8,
                          borderRadius: 5,
                          backgroundColor: "#e0e0e0",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: "#000",
                          },
                        }}
                      />
                      <Typography variant="body2">40%</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Planification des entretiens annuels</TableCell>
                  <TableCell>Karim Idrissi</TableCell>
                  <TableCell>2023-08-05</TableCell>
                  <TableCell>
                    <Chip
                      label="En attente"
                      size="small"
                      sx={{
                        backgroundColor: "#fff8e1",
                        color: "#ff8f00",
                        borderRadius: "4px",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={0}
                        sx={{
                          width: "100px",
                          height: 8,
                          borderRadius: 5,
                          backgroundColor: "#e0e0e0",
                        }}
                      />
                      <Typography variant="body2">0%</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  )
}

