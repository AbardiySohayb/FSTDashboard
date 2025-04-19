
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Card,
  CardContent,
  Alert,
  AlertTitle,
  styled,
  alpha,
  useTheme,
  Divider,
} from "@mui/material"
import {
  School as SchoolIcon,
  AccessTime as AccessTimeIcon,
  Grading as GradingIcon,
  Upload as UploadIcon,
  Description as DescriptionIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material"

// Composants stylisés
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
  height: "100%",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    boxShadow: "0 10px 28px rgba(0,0,0,0.1)",
  },
}))

const GradeChip = styled(Chip)(({ theme, grade }) => {
  let color
  switch (grade) {
    case "PA":
      color = theme.palette.info.main
      break
    case "PH":
      color = theme.palette.success.main
      break
    case "PES":
      color = theme.palette.warning.main
      break
    default:
      color = theme.palette.primary.main
  }

  return {
    backgroundColor: alpha(color, 0.1),
    color: color,
    fontWeight: 600,
    "& .MuiChip-icon": {
      color: color,
    },
  }
})

const UploadBox = styled(Box)(({ theme }) => ({
  border: `2px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  textAlign: "center",
  backgroundColor: alpha(theme.palette.primary.main, 0.03),
  transition: "all 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.05),
    borderColor: alpha(theme.palette.primary.main, 0.5),
  },
}))

const DocumentChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  "& .MuiChip-deleteIcon": {
    color: theme.palette.primary.main,
    "&:hover": {
      color: theme.palette.primary.dark,
    },
  },
}))

// Données fictives pour l'enseignant
const teacherData = {
  id: 1,
  nom: "Alami",
  prenom: "Mohammed",
  grade: "PA", // Professeur Assistant
  echelon: 3,
  dateEchelon: "2021-06-15", // Date d'accès à l'échelon actuel
  ancienneteEchelon: "2 ans", // Ancienneté dans l'échelon actuel
  specialite: "Informatique",
  departement: "Informatique",
}

// Fonction pour obtenir le grade supérieur
const getNextGrade = (currentGrade) => {
  switch (currentGrade) {
    case "PA":
      return "PH" // Professeur Habilité
    case "PH":
      return "PES" // Professeur de l'Enseignement Supérieur
    case "PES":
      return "PES" // Déjà au grade maximum
    default:
      return currentGrade
  }
}

// Fonction pour obtenir le libellé complet du grade
const getGradeLabel = (grade) => {
  switch (grade) {
    case "PA":
      return "Professeur Assistant"
    case "PH":
      return "Professeur Habilité"
    case "PES":
      return "Professeur de l'Enseignement Supérieur"
    default:
      return grade
  }
}

export default function NouvelleDemandePromotion() {
  const theme = useTheme()
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    typePromotion: `${teacherData.grade} → ${getNextGrade(teacherData.grade)}`,
    justification: "",
    documents: [],
  })
  const [uploadedFiles, setUploadedFiles] = useState([{ id: 1, name: "CV_Alami_Mohammed.pdf", size: "2.4 MB" }])

  const nextGrade = getNextGrade(teacherData.grade)

  // Gérer les changements dans le formulaire
  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault()
    // Ici, vous implémenteriez la logique pour soumettre la demande
    handleNext()
  }

  // Simuler l'ajout d'un fichier
  const handleFileUpload = () => {
    const newFile = {
      id: uploadedFiles.length + 1,
      name: `Document_${uploadedFiles.length + 1}.pdf`,
      size: `${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 9)}MB`,
    }
    setUploadedFiles([...uploadedFiles, newFile])
  }

  // Supprimer un fichier
  const handleDeleteFile = (id) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.id !== id))
  }

  // Avancer dans le stepper
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1)
  }

  // Reculer dans le stepper
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  // Retourner au tableau de bord
  const handleReturn = () => {
    navigate("/rh/promotion")
  }

  // Étapes du processus de demande
  const steps = [
    {
      label: "Informations de base",
      description: "Vérifiez vos informations et le type de promotion",
      content: (
        <Box>
          <Typography variant="body1" paragraph>
            Veuillez vérifier que les informations ci-dessous sont correctes avant de continuer.
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">
                    Nom complet
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "medium", mb: 2 }}>
                    {teacherData.prenom} {teacherData.nom}
                  </Typography>

                  <Typography variant="subtitle2" color="text.secondary">
                    Département
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "medium", mb: 2 }}>
                    {teacherData.departement}
                  </Typography>

                  <Typography variant="subtitle2" color="text.secondary">
                    Spécialité
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                    {teacherData.specialite}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">
                    Grade actuel
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    <GradeChip
                      label={getGradeLabel(teacherData.grade)}
                      grade={teacherData.grade}
                      icon={<SchoolIcon />}
                      size="small"
                    />
                  </Typography>

                  <Typography variant="subtitle2" color="text.secondary">
                    Échelon actuel
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "medium", mb: 2 }}>
                    Échelon {teacherData.echelon} (depuis {teacherData.ancienneteEchelon})
                  </Typography>

                  <Typography variant="subtitle2" color="text.secondary">
                    Date d'accès à l'échelon
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                    {new Date(teacherData.dateEchelon).toLocaleDateString("fr-FR")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="type-promotion-label">Type de promotion</InputLabel>
            <Select
              labelId="type-promotion-label"
              id="type-promotion"
              name="typePromotion"
              value={formData.typePromotion}
              onChange={handleFormChange}
              label="Type de promotion"
            >
              <MenuItem value={`${teacherData.grade} → ${nextGrade}`}>
                Promotion de grade ({teacherData.grade} → {nextGrade})
              </MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button onClick={handleReturn} sx={{ mr: 1 }}>
              Annuler
            </Button>
            <Button variant="contained" color="primary" onClick={handleNext}>
              Continuer
            </Button>
          </Box>
        </Box>
      ),
    },
    {
      label: "Justification",
      description: "Expliquez les raisons de votre demande",
      content: (
        <Box>
          <Typography variant="body1" paragraph>
            Veuillez fournir une justification détaillée pour votre demande de promotion. Mettez en avant vos
            réalisations, contributions et raisons pour lesquelles vous méritez cette promotion.
          </Typography>

          <TextField
            id="justification"
            name="justification"
            label="Justification de la demande"
            multiline
            rows={6}
            value={formData.justification}
            onChange={handleFormChange}
            fullWidth
            required
            placeholder="Décrivez vos réalisations académiques, vos contributions à l'enseignement, vos publications récentes, etc."
            helperText="Soyez précis et concis. Mettez en avant vos points forts et vos réalisations depuis votre dernière promotion."
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button onClick={handleBack}>Retour</Button>
            <Button variant="contained" color="primary" onClick={handleNext}>
              Continuer
            </Button>
          </Box>
        </Box>
      ),
    },
    {
      label: "Documents",
      description: "Joignez les documents requis",
      content: (
        <Box>
          <Typography variant="body1" paragraph>
            Veuillez joindre les documents suivants pour compléter votre demande de promotion.
          </Typography>

          <List>
            <ListItem>
              <ListItemIcon>
                <GradingIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="CV actualisé"
                secondary="Format PDF, incluant toutes vos publications et activités académiques"
              />
              <Chip label="Obligatoire" size="small" color="primary" variant="outlined" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <GradingIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Liste des publications scientifiques"
                secondary="Publications des 5 dernières années avec facteurs d'impact"
              />
              <Chip label="Obligatoire" size="small" color="primary" variant="outlined" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <GradingIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Rapport d'activités pédagogiques"
                secondary="Détail des cours enseignés et innovations pédagogiques"
              />
              <Chip label="Obligatoire" size="small" color="primary" variant="outlined" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <GradingIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Attestation d'ancienneté"
                secondary="Document officiel confirmant votre ancienneté dans l'échelon actuel"
              />
              <Chip label="Obligatoire" size="small" color="primary" variant="outlined" />
            </ListItem>
          </List>

          <Divider sx={{ my: 3 }} />

          <Typography variant="subtitle1" gutterBottom>
            Documents téléchargés
          </Typography>

          <Box sx={{ mb: 3 }}>
            {uploadedFiles.length > 0 ? (
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                {uploadedFiles.map((file) => (
                  <DocumentChip
                    key={file.id}
                    label={file.name}
                    onDelete={() => handleDeleteFile(file.id)}
                    icon={<DescriptionIcon />}
                  />
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Aucun document téléchargé
              </Typography>
            )}
          </Box>

          <UploadBox onClick={handleFileUpload}>
            <UploadIcon sx={{ fontSize: 40, color: theme.palette.primary.main, opacity: 0.7, mb: 1 }} />
            <Typography variant="subtitle1" gutterBottom>
              Déposer des fichiers ici
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ou cliquez pour parcourir vos fichiers
            </Typography>
          </UploadBox>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button onClick={handleBack}>Retour</Button>
            <Button variant="contained" color="primary" onClick={handleSubmit} disabled={uploadedFiles.length < 1}>
              Soumettre la demande
            </Button>
          </Box>
        </Box>
      ),
    },
    {
      label: "Confirmation",
      description: "Demande soumise avec succès",
      content: (
        <Box>
          <Alert severity="success" sx={{ mb: 3 }}>
            <AlertTitle>Demande soumise avec succès!</AlertTitle>
            Votre demande de promotion a été enregistrée et sera examinée par la commission compétente.
          </Alert>

          <Typography variant="h6" gutterBottom>
            Récapitulatif de votre demande
          </Typography>

          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Type de promotion
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {formData.typePromotion}
                  </Typography>

                  <Typography variant="subtitle2" color="text.secondary">
                    Date de soumission
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {new Date().toLocaleDateString("fr-FR")}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Statut
                  </Typography>
                  <Chip label="En attente d'examen" color="warning" size="small" icon={<AccessTimeIcon />} />

                  <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
                    Documents joints
                  </Typography>
                  <Typography variant="body1">{uploadedFiles.length} document(s)</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Typography variant="body1" paragraph>
            Votre demande sera examinée dans un délai de 4 à 6 semaines. Vous recevrez une notification dès qu'une
            décision aura été prise.
          </Typography>

          <Typography variant="body2" color="text.secondary" paragraph>
            Numéro de référence: PRO-{new Date().getFullYear()}-{Math.floor(Math.random() * 10000)}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button variant="contained" color="primary" onClick={handleReturn} startIcon={<ArrowBackIcon />}>
              Retour au tableau de bord
            </Button>
          </Box>
        </Box>
      ),
    },
  ]

  return (
    <Box sx={{ bgcolor: (theme) => theme.palette.background.default, minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Button startIcon={<ArrowBackIcon />} onClick={handleReturn} sx={{ mr: 2 }}>
            Retour
          </Button>
          <Typography variant="h1">Nouvelle Demande de Promotion</Typography>
        </Box>

        <StyledPaper>
          <Stepper activeStep={activeStep} orientation="vertical" sx={{ mb: 4 }}>
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  optional={
                    <Typography variant="caption" color="text.secondary">
                      {step.description}
                    </Typography>
                  }
                >
                  <Typography variant="subtitle1">{step.label}</Typography>
                </StepLabel>
                <StepContent>{step.content}</StepContent>
              </Step>
            ))}
          </Stepper>
        </StyledPaper>
      </Container>
    </Box>
  )
}

