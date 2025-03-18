"use client"

import { useState } from "react"
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
  Button,
  TextField,
  IconButton,
  Chip,
  Card,
  CardContent,
  Tooltip,
  useTheme,
  alpha,
} from "@mui/material"
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  DateRange as DateRangeIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  EmojiEvents as EmojiEventsIcon,
} from "@mui/icons-material"
import { styled } from "@mui/material/styles"

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 150,
  height: 150,
  border: `8px solid ${theme.palette.background.paper}`,
  boxShadow: theme.shadows[3],
}))

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[8],
  },
}))

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  borderRadius: 4,
  fontWeight: 600,
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
}))

const InfoItem = ({ icon, primary, secondary, isEditing, onChange }) => {
  return (
    <Box display="flex" alignItems="center" mb={2}>
      <Box mr={2} color="text.secondary">
        {icon}
      </Box>
      <Box flexGrow={1}>
        {isEditing ? (
          <TextField fullWidth variant="outlined" size="small" value={primary} onChange={onChange} />
        ) : (
          <>
            <Typography variant="body1" fontWeight="medium">
              {primary}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {secondary}
            </Typography>
          </>
        )}
      </Box>
    </Box>
  )
}

const SkillLevel = ({ level }) => {
  const theme = useTheme()
  return (
    <Box display="flex" alignItems="center">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          sx={{
            color: star <= level ? theme.palette.primary.main : theme.palette.grey[300],
            fontSize: 16,
          }}
        />
      ))}
    </Box>
  )
}

export default function ProfilePage() {
  const theme = useTheme()
  const [isEditing, setIsEditing] = useState(false)
  const [userInfo, setUserInfo] = useState({
    name: "Mohammed Alami",
    role: "Ingénieur Logiciel Senior",
    email: "mohammed.alami@example.com",
    phone: "+212 6 12 34 56 78",
    location: "Casablanca, Maroc",
    department: "Développement",
    joinDate: "15 Mars 2018",
    education: "Master en Informatique, Université Mohammed V",
  })

  const handleEdit = () => setIsEditing(!isEditing)
  const handleSave = () => setIsEditing(false)
  const handleChange = (e) => setUserInfo({ ...userInfo, [e.target.name]: e.target.value })

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4}>
        {/* Colonne de gauche */}
        <Grid item xs={12} md={4}>
          
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              position: "relative",
              height: "100%",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "30%",
                
                background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.light} 100%)`,
                borderRadius: "16px 16px 50% 50% / 16px 16px 100% 100%",
              },
            }}
          >
            <Box sx={{ position: "relative", textAlign: "center", pt: 4, pb: 2 }}>
              <StyledAvatar src="/placeholder.svg?height=150&width=150" alt={userInfo.name} />
              <Typography variant="h4" sx={{ mt: 2, color: "black", fontWeight: "bold" }}>
                {userInfo.name}&
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "black" }}>
                {userInfo.role}
              </Typography>
            </Box>
            <CardContent sx={{ pt: 4 }}>
              <InfoItem
                icon={<EmailIcon />}
                primary={userInfo.email}
                secondary="Email"
                isEditing={isEditing}
                onChange={(e) => handleChange({ target: { name: "email", value: e.target.value } })}
              />
              <InfoItem
                icon={<PhoneIcon />}
                primary={userInfo.phone}
                secondary="Téléphone"
                isEditing={isEditing}
                onChange={(e) => handleChange({ target: { name: "phone", value: e.target.value } })}
              />
              <InfoItem
                icon={<LocationIcon />}
                primary={userInfo.location}
                secondary="Localisation"
                isEditing={isEditing}
                onChange={(e) => handleChange({ target: { name: "location", value: e.target.value } })}
              />
              <InfoItem
                icon={<WorkIcon />}
                primary={userInfo.department}
                secondary="Département"
                isEditing={isEditing}
                onChange={(e) => handleChange({ target: { name: "department", value: e.target.value } })}
              />
              <InfoItem
                icon={<DateRangeIcon />}
                primary={userInfo.joinDate}
                secondary="Date d'embauche"
                isEditing={isEditing}
                onChange={(e) => handleChange({ target: { name: "joinDate", value: e.target.value } })}
              />
              <InfoItem
                icon={<SchoolIcon />}
                primary={userInfo.education}
                secondary="Formation"
                isEditing={isEditing}
                onChange={(e) => handleChange({ target: { name: "education", value: e.target.value } })}
              />
              <Box mt={3} display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
                  onClick={isEditing ? handleSave : handleEdit}
                  sx={{
                    borderRadius: 20,
                    px: 3,
                  }}
                >
                  {isEditing ? "Enregistrer" : "Modifier le profil"}
                </Button>
              </Box>
            </CardContent>
          </Paper>
        </Grid>

        {/* Colonne de droite */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {/* Statistiques */}
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ borderRadius: 4, p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Statistiques
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <StyledCard>
                      <CardContent sx={{ textAlign: "center" }}>
                        <TrendingUpIcon sx={{ fontSize: 40, color: theme.palette.success.main, mb: 2 }} />
                        <Typography variant="h4" fontWeight="bold">
                          95%
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Taux de présence
                        </Typography>
                      </CardContent>
                    </StyledCard>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <StyledCard>
                      <CardContent sx={{ textAlign: "center" }}>
                        <WorkIcon sx={{ fontSize: 40, color: theme.palette.info.main, mb: 2 }} />
                        <Typography variant="h4" fontWeight="bold">
                          12
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Projets complétés
                        </Typography>
                      </CardContent>
                    </StyledCard>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <StyledCard>
                      <CardContent sx={{ textAlign: "center" }}>
                        <EmojiEventsIcon sx={{ fontSize: 40, color: theme.palette.warning.main, mb: 2 }} />
                        <Typography variant="h4" fontWeight="bold">
                          4.8
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Évaluation moyenne
                        </Typography>
                      </CardContent>
                    </StyledCard>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Compétences */}
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ borderRadius: 4, p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Compétences
                </Typography>
                <Grid container spacing={2}>
                  {[
                    { name: "React", level: 5 },
                    { name: "Node.js", level: 4 },
                    { name: "TypeScript", level: 4 },
                    { name: "GraphQL", level: 3 },
                    { name: "Docker", level: 3 },
                    { name: "AWS", level: 4 },
                  ].map((skill) => (
                    <Grid item xs={12} sm={6} key={skill.name}>
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="body1" fontWeight="medium">
                          {skill.name}
                        </Typography>
                        <SkillLevel level={skill.level} />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>

            {/* Projets récents */}
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ borderRadius: 4, p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Projets récents
                </Typography>
                <Grid container spacing={2}>
                  {["Refonte du site e-commerce", "Optimisation de l'API", "Intégration IA"].map((project, index) => (
                    <Grid item xs={12} sm={6} md={4} key={project}>
                      <StyledCard>
                        <CardContent>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {project}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          </Typography>
                          <Chip
                            label={index === 0 ? "En cours" : index === 1 ? "Terminé" : "Planifié"}
                            color={index === 0 ? "primary" : index === 1 ? "success" : "default"}
                            size="small"
                          />
                        </CardContent>
                      </StyledCard>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>

            {/* Liens professionnels */}
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ borderRadius: 4, p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Liens professionnels
                </Typography>
                <Box display="flex" gap={2}>
                  <Tooltip title="LinkedIn">
                    <IconButton color="primary" size="large">
                      <LinkedInIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="GitHub">
                    <IconButton color="primary" size="large">
                      <GitHubIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Twitter">
                    <IconButton color="primary" size="large">
                      <TwitterIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

