import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Select,
  Typography,
  Grid,
} from "@mui/material";
import { FileDownload, Description } from "@mui/icons-material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Données pour le graphique
const data = [
  { mois: "Jan", congés: 18, absences: 5, formations: 9 },
  { mois: "Fév", congés: 14, absences: 6, formations: 10 },
  { mois: "Mar", congés: 25, absences: 2, formations: 13 },
  { mois: "Avr", congés: 27, absences: 7, formations: 8 },
  { mois: "Mai", congés: 22, absences: 5, formations: 15 },
  { mois: "Juin", congés: 30, absences: 6, formations: 14 },
];

// Liste des rapports récents
const reports = [
  { title: "Rapport des effectifs - Juin 2023" },
  { title: "Bilan des congés - T2 2023" },
];

const Rapport = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
        Rapports et Analyses
      </Typography>

      <Grid container spacing={3}>
        {/* Bloc Générer un Rapport */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Générer un rapport
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Sélectionnez le type de rapport à générer
              </Typography>
              <Box display="flex" gap={2} sx={{ mb: 3 }}>
                <Select defaultValue="" displayEmpty sx={{ flexGrow: 1 }}>
                  <MenuItem value="">Type de rapport</MenuItem>
                  <MenuItem value="effectifs">Effectifs</MenuItem>
                  <MenuItem value="absences">Absences</MenuItem>
                  <MenuItem value="formations">Formations</MenuItem>
                </Select>
                <Button variant="contained" sx={{ bgcolor: "black", color: "white" }} startIcon={<Description />}>
                  Générer
                </Button>
              </Box>

              {/* Liste des rapports récents */}
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                Rapports récents
              </Typography>
              {reports.map((report, index) => (
                <Box key={index} display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                  <Typography variant="body1">{report.title}</Typography>
                  <Button variant="outlined" startIcon={<FileDownload />}>
                    Télécharger
                  </Button>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Bloc Aperçu des Statistiques */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Aperçu des statistiques
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Congés, absences et formations sur les 6 derniers mois
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                  <XAxis dataKey="mois" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="congés" fill="#8884d8" name="Congés" />
                  <Bar dataKey="absences" fill="#82ca9d" name="Absences" />
                  <Bar dataKey="formations" fill="#f1c40f" name="Formations" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Rapport;
