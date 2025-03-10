import * as React from 'react';
import { Box, Card, CardContent, Typography,  LinearProgress, Grid } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import EventIcon from '@mui/icons-material/Event';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';
const cardsData = [
  {
    title: "Total Employés",
    value: "245",
    change: "+4% depuis le mois dernier",
    icon: <GroupIcon sx={{ fontSize: 25, color: 'gray' }} />,
  },
  {
    title: "Demandes de Congés",
    value: "12",
    change: "En attente d'approbation",
    icon: <EventIcon sx={{ fontSize: 25, color: 'gray' }} />,
  },
  {
    title: "Tâches en Cours",
    value: "38",
    progress: 50, // Pourcentage de progression
    icon: <AssignmentIcon sx={{ fontSize: 25, color: 'gray' }} />,
  },
  {
    title: "Rapports Mensuels",
    value: "4",
    change: "Générés ce mois-ci",
    icon: <DescriptionIcon sx={{ fontSize: 25, color: 'gray' }} />,
  }
];

export default function Dashboard() {
  return (
    <Box sx={{ backgroundColor: '#f6f8fa', minHeight: '100vh', p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        Tableau de bord
      </Typography>
      
      <Grid container spacing={2}>
        {cardsData.map((card, index) => (
          
          <Grid item xs={12} sm={6} md={6} key={index} >
            <Card sx={{ p: 2, borderRadius: 2, boxShadow: 1 }}>
              <CardContent sx={{ position: 'relative' }}>
                {/* Icône en haut à droite */}
                <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
                  {card.icon}
                </Box>

                <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                  {card.title}
                </Typography>

                <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 1 }}>
                  {card.value}
                </Typography>

                {/* Affichage conditionnel : texte ou barre de progression */}
                {card.progress !== undefined ? (
                  <Box sx={{ mt: 3, backgroundColor: 'lightgray', borderRadius: 5 }}>
                  <LinearProgress
                    variant="determinate"
                    value={card.progress}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: 'gray', // Couleur du remplissage
                      },
                      
                    }}
                    
                  />
                  
                </Box>
                ) : (
                  <Typography sx={{ color: 'text.secondary', mt: 1 }}>
                    {card.change}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

