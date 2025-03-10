import React, { useState } from "react";
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
} from "@mui/material";
import { Add, MoreVert } from "@mui/icons-material";

const employees = [
  { name: "Mohammed Alami", email: "m.alami@fstm.ac.ma", department: "Informatique", role: "Professeur" },
  { name: "Fatima Zohra", email: "f.zohra@fstm.ac.ma", department: "Mathématiques", role: "Maître de conférences" },
  { name: "Youssef Benali", email: "y.benali@fstm.ac.ma", department: "Physique", role: "Technicien de labo" },
  { name: "Amina Tazi", email: "a.tazi@fstm.ac.ma", department: "Chimie", role: "Assistante administrative" },
  { name: "Karim Idrissi", email: "k.idrissi@fstm.ac.ma", department: "Biologie", role: "Chercheur" },
];

const EmployeeTable = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleMenuOpen = (event, employee) => {
    setAnchorEl(event.currentTarget);
    setSelectedEmployee(employee);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedEmployee(null);
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Titre */}
      <h2>Gestion du Personnel</h2>

      {/* Barre de recherche + Sélecteur + Bouton Ajouter */}
      <Box display="flex" gap={2} sx={{ mb: 2 }}>
        <TextField variant="outlined" placeholder="Rechercher un employé..." />
        <Select defaultValue="" displayEmpty>
          <MenuItem value="">Département</MenuItem>
          <MenuItem value="Informatique">Informatique</MenuItem>
          <MenuItem value="Mathématiques">Mathématiques</MenuItem>
          <MenuItem value="Physique">Physique</MenuItem>
        </Select>
        <Button variant="contained" sx={{ bgcolor: "black", color: "white" }} startIcon={<Add />}>
          Ajouter un employé
        </Button>
      </Box>

      {/* Tableau des employés */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Nom</b></TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Département</TableCell>
              <TableCell>Poste</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((emp, index) => (
              <TableRow key={index}>
                <TableCell><b>{emp.name}</b></TableCell>
                <TableCell>{emp.email}</TableCell>
                <TableCell>{emp.department}</TableCell>
                <TableCell>{emp.role}</TableCell>
                <TableCell>
                  {/* Bouton des trois points */}
                  <IconButton onClick={(event) => handleMenuOpen(event, emp)}>
                    <MoreVert />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Menu déroulant pour actions CRUD */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => { alert(`Modifier ${selectedEmployee?.name}`); handleMenuClose(); }}>
          Modifier
        </MenuItem>
        <MenuItem onClick={() => { alert(`Supprimer ${selectedEmployee?.name}`); handleMenuClose(); }}>
          Supprimer
        </MenuItem>
        <MenuItem onClick={() => { alert(`Voir détails de ${selectedEmployee?.name}`); handleMenuClose(); }}>
          Détails
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default EmployeeTable;
