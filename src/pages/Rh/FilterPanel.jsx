"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Button,
  TextField,
  InputAdornment,
  alpha,
  Fade,
  Card,
  CardContent,
  Stack,
  IconButton,
  Tooltip,
  Badge,
  Collapse,
  useTheme,
} from "@mui/material"
import {
  FilterList,
  Search,
  Grade as GradeIcon,
  Stairs,
  Person,
  Category,
  KeyboardArrowDown,
  Business,
  Assignment,
  FilterAlt,
  FilterAltOff,
} from "@mui/icons-material"
import { departments, categories, postes, statuts } from "../../data/mockData"
import { primaryColor, secondaryColor } from "../../utils/theme"
import { getGradesForCategorie, getEchelonsForGrade } from "../../utils/employeeUtils"

const FilterPanel = ({ onFilterChange, filters, onClearFilters }) => {
  const [expanded, setExpanded] = useState(true)
  const [availableGrades, setAvailableGrades] = useState([])
  const [availableEchelons, setAvailableEchelons] = useState([])
  const theme = useTheme()

  // Mettre à jour les grades disponibles lorsque la catégorie change
  useEffect(() => {
    if (filters.categorie) {
      const grades = getGradesForCategorie(filters.categorie)
      setAvailableGrades(grades)

      // Si le grade actuel n'est pas dans la liste des grades disponibles, le réinitialiser
      if (filters.grade && !grades.includes(filters.grade)) {
        onFilterChange({ ...filters, grade: "", echelon: "" })
      }
    } else {
      setAvailableGrades([])
      // Réinitialiser le grade et l'échelon si aucune catégorie n'est sélectionnée
      if (filters.grade || filters.echelon) {
        onFilterChange({ ...filters, grade: "", echelon: "" })
      }
    }
  }, [filters.categorie, onFilterChange, filters])

  // Mettre à jour les échelons disponibles lorsque le grade change
  useEffect(() => {
    if (filters.categorie && filters.grade) {
      const echelons = getEchelonsForGrade(filters.categorie, filters.grade)
      setAvailableEchelons(echelons)

      // Si l'échelon actuel n'est pas dans la liste des échelons disponibles, le réinitialiser
      if (filters.echelon && !echelons.includes(Number.parseInt(filters.echelon))) {
        onFilterChange({ ...filters, echelon: "" })
      }
    } else {
      setAvailableEchelons([])
      // Réinitialiser l'échelon si aucun grade n'est sélectionné
      if (filters.echelon) {
        onFilterChange({ ...filters, echelon: "" })
      }
    }
  }, [filters.categorie, filters.grade, onFilterChange, filters])

  const handleChange = (event) => {
    const { name, value } = event.target
    onFilterChange({ ...filters, [name]: value })
  }

  const handleSearchChange = (event) => {
    onFilterChange({ ...filters, searchTerm: event.target.value })
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.department) count++
    if (filters.categorie) count++
    if (filters.grade) count++
    if (filters.echelon) count++
    if (filters.poste) count++
    if (filters.statut) count++
    return count
  }

  const activeFiltersCount = getActiveFiltersCount()

  // Fonction pour générer un gradient basé sur la couleur primaire
  const generateGradient = (color, opacity = 0.05) => {
    return `linear-gradient(135deg, ${alpha(color, opacity)} 0%, ${alpha(color, opacity + 0.05)} 100%)`
  }

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        mb: 4,
        transition: "all 0.3s ease",
        background: generateGradient(primaryColor, 0.02),
      }}
    >
      {/* Barre de recherche toujours visible */}
      <Box
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
          borderBottom: expanded ? `1px solid ${alpha(primaryColor, 0.1)}` : "none",
        }}
      >
        <TextField
          placeholder="Rechercher un employé..."
          value={filters.searchTerm || ""}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: alpha(secondaryColor, 0.5) }} />
              </InputAdornment>
            ),
          }}
          sx={{
            flex: { xs: "1 1 100%", md: "1 1 auto" },
            maxWidth: { xs: "100%", md: "400px" },
            "& .MuiOutlinedInput-root": {
              borderRadius: "30px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              },
              "&.Mui-focused": {
                boxShadow: `0 4px 12px ${alpha(primaryColor, 0.15)}`,
              },
            },
          }}
        />

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {activeFiltersCount > 0 && (
            <Fade in={activeFiltersCount > 0}>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<FilterAltOff />}
                onClick={onClearFilters}
                size="small"
                sx={{
                  borderRadius: "20px",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Effacer ({activeFiltersCount})
              </Button>
            </Fade>
          )}

          <Badge badgeContent={activeFiltersCount} color="primary" overlap="circular">
            <Tooltip title={expanded ? "Masquer les filtres" : "Afficher les filtres"}>
              <IconButton
                onClick={() => setExpanded(!expanded)}
                color="primary"
                sx={{
                  backgroundColor: alpha(primaryColor, 0.1),
                  "&:hover": {
                    backgroundColor: alpha(primaryColor, 0.2),
                  },
                  transition: "transform 0.3s ease",
                  transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                <FilterList />
              </IconButton>
            </Tooltip>
          </Badge>
        </Box>
      </Box>

      {/* Contenu des filtres avancés */}
      <Collapse in={expanded}>
        <Box sx={{ p: 3 }}>
          {/* Filtres actifs */}
          {activeFiltersCount > 0 && (
            <Fade in={activeFiltersCount > 0}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <FilterAlt fontSize="small" color="primary" />
                  Filtres actifs
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
                  {filters.department && (
                    <Chip
                      label={`Département: ${filters.department}`}
                      onDelete={() => onFilterChange({ ...filters, department: "" })}
                      color="primary"
                      variant="outlined"
                      size="small"
                      icon={<Business fontSize="small" />}
                    />
                  )}
                  {filters.poste && (
                    <Chip
                      label={`Poste: ${filters.poste}`}
                      onDelete={() => onFilterChange({ ...filters, poste: "" })}
                      color="primary"
                      variant="outlined"
                      size="small"
                      icon={<Assignment fontSize="small" />}
                    />
                  )}
                  {filters.categorie && (
                    <Chip
                      label={`Catégorie: ${filters.categorie}`}
                      onDelete={() => onFilterChange({ ...filters, categorie: "", grade: "", echelon: "" })}
                      color="primary"
                      variant="outlined"
                      size="small"
                      icon={<Category fontSize="small" />}
                    />
                  )}
                  {filters.grade && (
                    <Chip
                      label={`Grade: ${filters.grade}`}
                      onDelete={() => onFilterChange({ ...filters, grade: "", echelon: "" })}
                      color="primary"
                      variant="outlined"
                      size="small"
                      icon={<GradeIcon fontSize="small" />}
                    />
                  )}
                  {filters.echelon && (
                    <Chip
                      label={`Échelon: ${filters.echelon}`}
                      onDelete={() => onFilterChange({ ...filters, echelon: "" })}
                      color="primary"
                      variant="outlined"
                      size="small"
                      icon={<Stairs fontSize="small" />}
                    />
                  )}
                  {filters.statut && (
                    <Chip
                      label={`Statut: ${filters.statut}`}
                      onDelete={() => onFilterChange({ ...filters, statut: "" })}
                      color="primary"
                      variant="outlined"
                      size="small"
                      icon={<Person fontSize="small" />}
                    />
                  )}
                </Stack>
              </Box>
            </Fade>
          )}

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
              gap: 3,
            }}
          >
            {/* Carte pour les filtres de département et poste */}
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: `1px solid ${alpha(primaryColor, 0.1)}`,
                background: generateGradient(primaryColor, 0.02),
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: `0 4px 20px ${alpha(primaryColor, 0.1)}`,
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: primaryColor,
                    fontWeight: 600,
                  }}
                >
                  <Business />
                  Département et Poste
                </Typography>

                <Stack spacing={2} sx={{ mt: 2 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="department-select-label">Département</InputLabel>
                    <Select
                      labelId="department-select-label"
                      name="department"
                      value={filters.department || ""}
                      onChange={handleChange}
                      label="Département"
                      startAdornment={
                        <InputAdornment position="start">
                          <Business sx={{ color: alpha(secondaryColor, 0.5), fontSize: "1.2rem" }} />
                        </InputAdornment>
                      }
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            borderRadius: 2,
                            boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                          },
                        },
                      }}
                    >
                      <MenuItem value="">Tous les départements</MenuItem>
                      {departments.map((dept) => (
                        <MenuItem key={dept} value={dept}>
                          {dept}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth size="small">
                    <InputLabel id="poste-select-label">Poste</InputLabel>
                    <Select
                      labelId="poste-select-label"
                      name="poste"
                      value={filters.poste || ""}
                      onChange={handleChange}
                      label="Poste"
                      startAdornment={
                        <InputAdornment position="start">
                          <Assignment sx={{ color: alpha(secondaryColor, 0.5), fontSize: "1.2rem" }} />
                        </InputAdornment>
                      }
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            borderRadius: 2,
                            boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                          },
                        },
                      }}
                    >
                      <MenuItem value="">Tous les postes</MenuItem>
                      {postes.map((poste) => (
                        <MenuItem key={poste} value={poste}>
                          {poste}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
              </CardContent>
            </Card>

            {/* Carte pour le statut */}
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: `1px solid ${alpha(secondaryColor, 0.1)}`,
                background: generateGradient(secondaryColor, 0.02),
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: `0 4px 20px ${alpha(secondaryColor, 0.1)}`,
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: secondaryColor,
                    fontWeight: 600,
                  }}
                >
                  <Person />
                  Statut
                </Typography>

                <Stack spacing={2} sx={{ mt: 2 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="statut-select-label">Statut</InputLabel>
                    <Select
                      labelId="statut-select-label"
                      name="statut"
                      value={filters.statut || ""}
                      onChange={handleChange}
                      label="Statut"
                      startAdornment={
                        <InputAdornment position="start">
                          <Person sx={{ color: alpha(secondaryColor, 0.5), fontSize: "1.2rem" }} />
                        </InputAdornment>
                      }
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            borderRadius: 2,
                            boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                          },
                        },
                      }}
                    >
                      <MenuItem value="">Tous les statuts</MenuItem>
                      {statuts.map((statut) => (
                        <MenuItem key={statut} value={statut}>
                          {statut}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
              </CardContent>
            </Card>

            {/* Carte pour la hiérarchie (catégorie, grade, échelon) */}
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                background: generateGradient(theme.palette.success.main, 0.02),
                gridColumn: { xs: "1", md: "span 2" },
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: `0 4px 20px ${alpha(theme.palette.success.main, 0.1)}`,
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: theme.palette.success.main,
                    fontWeight: 600,
                  }}
                >
                  <Category />
                  Hiérarchie (Catégorie → Grade → Échelon)
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                    mt: 2,
                    alignItems: "center",
                  }}
                >
                  <FormControl fullWidth size="small">
                    <InputLabel id="categorie-select-label">Catégorie</InputLabel>
                    <Select
                      labelId="categorie-select-label"
                      name="categorie"
                      value={filters.categorie || ""}
                      onChange={handleChange}
                      label="Catégorie"
                      startAdornment={
                        <InputAdornment position="start">
                          <Category sx={{ color: alpha(theme.palette.success.main, 0.7), fontSize: "1.2rem" }} />
                        </InputAdornment>
                      }
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            borderRadius: 2,
                            boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                          },
                        },
                      }}
                    >
                      <MenuItem value="">Toutes les catégories</MenuItem>
                      {categories.map((categorie) => (
                        <MenuItem key={categorie} value={categorie}>
                          {categorie}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <KeyboardArrowRight sx={{ display: { xs: "none", sm: "block" }, color: alpha("#000", 0.3) }} />

                  <FormControl fullWidth size="small" disabled={!filters.categorie}>
                    <InputLabel id="grade-select-label">Niveau de Grade</InputLabel>
                    <Select
                      labelId="grade-select-label"
                      name="grade"
                      value={filters.grade || ""}
                      onChange={handleChange}
                      label="Niveau de Grade"
                      startAdornment={
                        <InputAdornment position="start">
                          <GradeIcon sx={{ color: alpha(theme.palette.success.main, 0.7), fontSize: "1.2rem" }} />
                        </InputAdornment>
                      }
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            borderRadius: 2,
                            boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                          },
                        },
                      }}
                    >
                      <MenuItem value="">Tous les grades</MenuItem>
                      {availableGrades.map((grade) => (
                        <MenuItem key={grade} value={grade}>
                          {grade}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <KeyboardArrowRight sx={{ display: { xs: "none", sm: "block" }, color: alpha("#000", 0.3) }} />

                  <FormControl fullWidth size="small" disabled={!filters.grade}>
                    <InputLabel id="echelon-select-label">Échelon</InputLabel>
                    <Select
                      labelId="echelon-select-label"
                      name="echelon"
                      value={filters.echelon || ""}
                      onChange={handleChange}
                      label="Échelon"
                      startAdornment={
                        <InputAdornment position="start">
                          <Stairs sx={{ color: alpha(theme.palette.success.main, 0.7), fontSize: "1.2rem" }} />
                        </InputAdornment>
                      }
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            borderRadius: 2,
                            boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                          },
                        },
                      }}
                    >
                      <MenuItem value="">Tous les échelons</MenuItem>
                      {availableEchelons.map((echelon) => (
                        <MenuItem key={echelon} value={echelon.toString()}>
                          Échelon {echelon}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Collapse>
    </Paper>
  )
}

// Composant pour la flèche droite
const KeyboardArrowRight = ({ sx }) => {
  return <KeyboardArrowDown sx={{ ...sx, transform: "rotate(-90deg)" }} />
}

export default FilterPanel
