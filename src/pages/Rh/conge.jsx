"use client"

import { useState } from "react"
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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
  Toolbar,
  AppBar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material"
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  EventNote as EventNoteIcon,
  Assignment as AssignmentIcon,
  Assessment as AssessmentIcon,
  Add as AddIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider, DateCalendar, DatePicker } from "@mui/x-date-pickers"
import "dayjs/locale/fr"

export default function LeaveManagement() {
  const [selectedLeaveType, setSelectedLeaveType] = useState("")
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  return (
    <Box sx={{ display: "flex" }}>
      

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "#f5f7fa", p: 3 }}>
        
        
            <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
              Congés et Absences
            </Typography>
            

        {/* Top section */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* My Leaves */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: "100%" }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Mes congés
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography>Congés annuels</Typography>
                  <Typography>15 jours restants</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                  <Typography>Congés maladie</Typography>
                  <Typography>3 jours pris</Typography>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<AddIcon />}
                  sx={{
                    backgroundColor: "#000",
                    "&:hover": { backgroundColor: "#333" },
                    mt: 2,
                  }}
                >
                  Demander un congé
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Leave Calendar */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: "100%" }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Calendrier des congés
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
                <DateCalendar />
              </LocalizationProvider>
            </Paper>
          </Grid>

          {/* Statistics */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: "100%" }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Statistiques
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography>Taux d'absentéisme</Typography>
                  <Typography>3.2%</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography>Congés approuvés ce mois</Typography>
                  <Typography>24</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography>Demandes en attente</Typography>
                  <Typography>7</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Pending Leave Requests */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
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
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Mohammed Alami</TableCell>
                  <TableCell>Congé annuel</TableCell>
                  <TableCell>2023-07-01</TableCell>
                  <TableCell>2023-07-10</TableCell>
                  <TableCell>
                    <IconButton color="success">
                      <CheckIcon />
                    </IconButton>
                    <IconButton color="error">
                      <CloseIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Fatima Zohra</TableCell>
                  <TableCell>Maladie</TableCell>
                  <TableCell>2023-06-28</TableCell>
                  <TableCell>2023-06-30</TableCell>
                  <TableCell>
                    <IconButton color="success">
                      <CheckIcon />
                    </IconButton>
                    <IconButton color="error">
                      <CloseIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Youssef Benali</TableCell>
                  <TableCell>Congé sans solde</TableCell>
                  <TableCell>2023-08-15</TableCell>
                  <TableCell>2023-08-20</TableCell>
                  <TableCell>
                    <IconButton color="success">
                      <CheckIcon />
                    </IconButton>
                    <IconButton color="error">
                      <CloseIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* New Leave Request */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Nouvelle demande de congé
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="leave-type-label">Type de congé</InputLabel>
                <Select
                  labelId="leave-type-label"
                  value={selectedLeaveType}
                  label="Type de congé"
                  onChange={(e) => setSelectedLeaveType(e.target.value)}
                >
                  <MenuItem value="annual">Congé annuel</MenuItem>
                  <MenuItem value="sick">Congé maladie</MenuItem>
                  <MenuItem value="unpaid">Congé sans solde</MenuItem>
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
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth multiline rows={4} label="Motif (optionnel)" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#000",
                  "&:hover": { backgroundColor: "#333" },
                }}
              >
                Soumettre la demande
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  )
}

