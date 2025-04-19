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
  alpha,
  Divider,
  styled,
  LinearProgress,
} from "@mui/material"
// Supprimez ThemeProvider, createTheme, CssBaseline
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
  Badge as BadgeIcon,
  Person as PersonIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Assignment as AssignmentIcon,
} from "@mui/icons-material"

// Supprimez la définition des couleurs et du thème ici
// Utilisez plutôt les couleurs importées si nécessaire
import { primaryColor, secondaryColor, successColor, warningColor, infoColor } from "../../utils/theme"

// Composants stylisés
const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 150,
  height: 150,
  border: `8px solid ${theme.palette.background.paper}`,
  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
}))

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
  },
}))

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: "4px",
  borderRadius: 16,
  fontWeight: 600,
  "&:hover": {
    backgroundColor: alpha(primaryColor, 0.1),
  },
}))

const ProfileHeader = styled(Box)(({ theme }) => ({
  position: "relative",
  textAlign: "center",
  paddingTop: "32px",
  paddingBottom: "16px",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "40%",
    background: `linear-gradient(135deg, ${primaryColor} 0%, ${alpha(primaryColor, 0.7)} 100%)`,
    borderRadius: "16px 16px 50% 50% / 16px 16px 100% 100%",
    zIndex: 0,
  },
}))

const InfoItem = ({ icon, primary, secondary, isEditing, onChange, name }) => {
  return (
    <Box display="flex" alignItems="center" mb={2}>
      <Box mr={2} color={primaryColor}>
        {icon}
      </Box>
      <Box flexGrow={1}>
        {isEditing ? (
          <TextField fullWidth variant="outlined" size="small" value={primary} name={name} onChange={onChange} />
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
  return (
    <Box display="flex" alignItems="center">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          sx={{
            color: star <= level ? primaryColor : alpha(secondaryColor, 0.2),
            fontSize: 16,
          }}
        />
      ))}
    </Box>
  )
}

const SkillBar = ({ name, level }) => {
  const percentage = level * 20 // Convert 1-5 scale to percentage

  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
        <Typography variant="body2" fontWeight="medium">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {level}/5
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: alpha(secondaryColor, 0.1),
          "& .MuiLinearProgress-bar": {
            backgroundImage: `linear-gradient(90deg, ${primaryColor} 0%, ${primaryColor}CC 100%)`,
          },
        }}
      />
    </Box>
  )
}

const StatCard = ({ icon, value, label, color }) => {
  return (
    <StyledCard>
      <CardContent sx={{ textAlign: "center", p: 3 }}>
        <Avatar
          sx={{
            width: 56,
            height: 56,
            bgcolor: alpha(color, 0.1),
            color: color,
            margin: "0 auto 16px auto",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          {icon}
        </Avatar>
        <Typography variant="h4" fontWeight="bold" color={color}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </CardContent>
    </StyledCard>
  )
}

const ProjectCard = ({ title, description, status }) => {
  let statusColor = "default"
  let statusIcon = null

  switch (status) {
    case "En cours":
      statusColor = "primary"
      statusIcon = <ScheduleIcon fontSize="small" />
      break
    case "Terminé":
      statusColor = "success"
      statusIcon = <CheckCircleIcon fontSize="small" />
      break
    case "Planifié":
      statusColor = "info"
      statusIcon = <AssignmentIcon fontSize="small" />
      break
  }

  return (
    <StyledCard>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold" color={secondaryColor}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, height: 40 }}>
          {description}
        </Typography>
        <Chip icon={statusIcon} label={status} color={statusColor} size="small" />
      </CardContent>
    </StyledCard>
  )
}

export default function ProfilePage() {
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

  const skills = [
    { name: "React", level: 5 },
    { name: "Node.js", level: 4 },
    { name: "TypeScript", level: 4 },
    { name: "GraphQL", level: 3 },
    { name: "Docker", level: 3 },
    { name: "AWS", level: 4 },
  ]

  const projects = [
    {
      title: "Refonte du site e-commerce",
      description: "Modernisation complète de l'interface utilisateur et optimisation des performances.",
      status: "En cours",
    },
    {
      title: "Optimisation de l'API",
      description: "Amélioration des temps de réponse et réduction de la consommation des ressources.",
      status: "Terminé",
    },
    {
      title: "Intégration IA",
      description: "Implémentation d'un système de recommandation basé sur l'intelligence artificielle.",
      status: "Planifié",
    },
  ]

  return (
    // Supprimez ThemeProvider et CssBaseline ici
    <Box sx={{ bgcolor: (theme) => theme.palette.background.default, minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h1" sx={{ mb: 4 }}>
          Profil Utilisateur
        </Typography>

        {/* ... le reste de votre JSX ... */}
        <Grid container spacing={4}>
          {/* Colonne de gauche */}
          <Grid item xs={12} md={4}>
            <Paper elevation={0}>
              <ProfileHeader>
                <Box sx={{ position: "relative", zIndex: 1 }}>
                  <StyledAvatar src="/placeholder.svg?height=150&width=150" alt={userInfo.name} />
                  <Typography variant="h4" sx={{ mt: 2, color: "white", fontWeight: "bold" }}>
                    {userInfo.name}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: "white", opacity: 0.9 }}>
                    {userInfo.role}
                  </Typography>
                </Box>
              </ProfileHeader>

              <CardContent sx={{ pt: 4 }}>
                <InfoItem
                  icon={<EmailIcon />}
                  primary={userInfo.email}
                  secondary="Email"
                  isEditing={isEditing}
                  name="email"
                  onChange={handleChange}
                />
                <InfoItem
                  icon={<PhoneIcon />}
                  primary={userInfo.phone}
                  secondary="Téléphone"
                  isEditing={isEditing}
                  name="phone"
                  onChange={handleChange}
                />
                <InfoItem
                  icon={<LocationIcon />}
                  primary={userInfo.location}
                  secondary="Localisation"
                  isEditing={isEditing}
                  name="location"
                  onChange={handleChange}
                />
                <InfoItem
                  icon={<WorkIcon />}
                  primary={userInfo.department}
                  secondary="Département"
                  isEditing={isEditing}
                  name="department"
                  onChange={handleChange}
                />
                <InfoItem
                  icon={<DateRangeIcon />}
                  primary={userInfo.joinDate}
                  secondary="Date d'embauche"
                  isEditing={isEditing}
                  name="joinDate"
                  onChange={handleChange}
                />
                <InfoItem
                  icon={<SchoolIcon />}
                  primary={userInfo.education}
                  secondary="Formation"
                  isEditing={isEditing}
                  name="education"
                  onChange={handleChange}
                />

                <Divider sx={{ my: 3, borderColor: alpha(primaryColor, 0.1) }} />

                <Box mt={3} display="flex" justifyContent="center">
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
                    onClick={isEditing ? handleSave : handleEdit}
                  >
                    {isEditing ? "Enregistrer" : "Modifier le profil"}
                  </Button>
                </Box>
              </CardContent>
            </Paper>

            {/* Liens professionnels */}
            <Paper elevation={0} sx={{ mt: 3, p: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Liens professionnels
              </Typography>
              <Divider sx={{ mb: 3, borderColor: alpha(primaryColor, 0.1) }} />
              <Box display="flex" gap={2} justifyContent="center">
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

          {/* Colonne de droite */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              {/* Statistiques */}
              <Grid item xs={12}>
                <Paper elevation={0} sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Avatar
                      sx={{
                        bgcolor: alpha(primaryColor, 0.1),
                        color: primaryColor,
                        mr: 2,
                      }}
                    >
                      <BadgeIcon />
                    </Avatar>
                    <Typography variant="h5">Statistiques</Typography>
                  </Box>

                  <Divider sx={{ mb: 3, borderColor: alpha(primaryColor, 0.1) }} />

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                      <StatCard icon={<TrendingUpIcon />} value="95%" label="Taux de présence" color={successColor} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <StatCard icon={<WorkIcon />} value="12" label="Projets complétés" color={infoColor} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <StatCard
                        icon={<EmojiEventsIcon />}
                        value="4.8"
                        label="Évaluation moyenne"
                        color={warningColor}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              {/* Compétences */}
              <Grid item xs={12}>
                <Paper elevation={0} sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Avatar
                      sx={{
                        bgcolor: alpha(secondaryColor, 0.1),
                        color: secondaryColor,
                        mr: 2,
                      }}
                    >
                      <PersonIcon />
                    </Avatar>
                    <Typography variant="h5">Compétences</Typography>
                  </Box>

                  <Divider sx={{ mb: 3, borderColor: alpha(secondaryColor, 0.1) }} />

                  <Grid container spacing={2}>
                    {skills.map((skill) => (
                      <Grid item xs={12} sm={6} key={skill.name}>
                        <SkillBar name={skill.name} level={skill.level} />
                      </Grid>
                    ))}
                  </Grid>

                  <Box sx={{ display: "flex", flexWrap: "wrap", mt: 3 }}>
                    {skills.map((skill) => (
                      <StyledChip
                        key={skill.name}
                        label={skill.name}
                        color="primary"
                        icon={<StarIcon sx={{ fontSize: "0.8rem !important" }} />}
                      />
                    ))}
                  </Box>
                </Paper>
              </Grid>

              {/* Projets récents */}
              <Grid item xs={12}>
                <Paper elevation={0} sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Avatar
                      sx={{
                        bgcolor: alpha(infoColor, 0.1),
                        color: infoColor,
                        mr: 2,
                      }}
                    >
                      <AssignmentIcon />
                    </Avatar>
                    <Typography variant="h5">Projets récents</Typography>
                  </Box>

                  <Divider sx={{ mb: 3, borderColor: alpha(infoColor, 0.1) }} />

                  <Grid container spacing={3}>
                    {projects.map((project, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <ProjectCard title={project.title} description={project.description} status={project.status} />
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

