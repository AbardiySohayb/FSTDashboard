"use client"

import { useState, useEffect, useMemo } from "react"
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
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Avatar,
  Chip,
  alpha,
  ThemeProvider,
  CssBaseline,
  Tooltip,
  Zoom,
  Fade,
  useMediaQuery,
  createTheme,
  Card,
  CardContent,
  Grid,
  Pagination,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  Snackbar,
  Checkbox,
} from "@mui/material"

import {
  MoreVert,
  Edit,
  Delete,
  Visibility,
  FilterAlt,
  PersonAdd,
  Print,
  KeyboardArrowUp,
  KeyboardArrowDown,
} from "@mui/icons-material"

import { FixedSizeList as List } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"
import { filterEmployees } from "../../utils/employeeUtils"
import EmployeeDetailsDialog from "../../components/dialogs/EmployeeDetailsDialog"
import EmployeeFormDialog from "../../components/dialogs/EmployeeFormDialog"
import FilterPanel from "./FilterPanel"
import EmployeeService from "../../../services/RH/employeService"
import ProfPromotion from "../../../services/RH/ProfPromotionService"

// Définition des couleurs selon la charte graphique UCA
const primaryColor = "#B36B39" // Couleur primaire (marron/orange)
const secondaryColor = "#2C3E50" // Couleur secondaire (bleu foncé)
const accentColor = "#E74C3C" // Couleur d'accent (rouge)
const backgroundColor = "#F5F5F5" // Couleur de fond (gris clair)

// Création du thème personnalisé
const ucaTheme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
    error: {
      main: accentColor,
    },
    background: {
      default: backgroundColor,
      paper: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
      color: secondaryColor,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
      color: primaryColor,
    },
    body1: {
      fontSize: "1rem",
      color: secondaryColor,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "2rem",
          textTransform: "none",
          fontWeight: 500,
        },
        containedPrimary: {
          backgroundColor: primaryColor,
          "&:hover": {
            backgroundColor: alpha(primaryColor, 0.8),
          },
        },
        containedSecondary: {
          backgroundColor: secondaryColor,
          "&:hover": {
            backgroundColor: alpha(secondaryColor, 0.8),
          },
        },
        outlined: {
          borderColor: primaryColor,
          color: primaryColor,
          "&:hover": {
            borderColor: primaryColor,
            backgroundColor: alpha(primaryColor, 0.1),
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: alpha(secondaryColor, 0.1),
          color: secondaryColor,
          fontWeight: 600,
        },
        root: {
          padding: "16px",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "1rem",
        },
      },
    },
  },
})

// Fonction pour obtenir la couleur du grade
const getGradeColor = (grade) => {
  if (!grade) return primaryColor

  const gradeMap = {
    A: accentColor,
    B: primaryColor,
    C: secondaryColor,
    D: "#6c757d",
  }

  return gradeMap[grade] || primaryColor
}

const EmployeeTable = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [filters, setFilters] = useState({
    searchTerm: "",
    department: "",
    categorie: "",
    grade: "",
    echelon: "",
    poste: "",
    statut: "",
  })
  const [openDialog, setOpenDialog] = useState(false)
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const muiTheme = ucaTheme
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(muiTheme.breakpoints.down("md"))

  // Pagination state
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [viewMode, setViewMode] = useState("pagination") // "pagination" or "virtualization"
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" })

  // API data state
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [notification, setNotification] = useState({ open: false, message: "", severity: "info" })

  // Promotion state
  const [selectedForPromotion, setSelectedForPromotion] = useState([])
  const [generatingDoc, setGeneratingDoc] = useState(false)
  const [docUrl, setDocUrl] = useState(null)

  const { useProfPromotion } = ProfPromotion
  const {
    loading: promotionLoading,
    error: promotionError,
    fetchEmployeesNeedingUpdate,
    generateUpdateDocument,
    updateEmployeeEchelons,
  } = useProfPromotion()

  // Vérifier si tous les filtres hiérarchiques sont appliqués
  const areHierarchicalFiltersApplied = useMemo(() => {
    return filters.categorie && filters.grade && filters.echelon
  }, [filters.categorie, filters.grade, filters.echelon])

  // Fetch employees from API
  const fetchEmployees = async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await EmployeeService.getAllEmployees()
      // Map backend data to frontend format
      const mappedEmployees = Array.isArray(data) ? data.map((emp) => EmployeeService.mapEmployeeData(emp)) : []

      setEmployees(mappedEmployees)
    } catch (err) {
      console.error("Error fetching employees:", err)
      setError("Erreur lors de la récupération des employés")
    } finally {
      setLoading(false)
    }
  }

  // Initial data fetch
  useEffect(() => {
    fetchEmployees()
  }, [])

  // Check for employees needing update
  useEffect(() => {
    const checkEmployeesNeedingUpdate = async () => {
      try {
        const employeesNeedingUpdate = await fetchEmployeesNeedingUpdate()
        if (employeesNeedingUpdate && employeesNeedingUpdate.length > 0) {
          setNotification({
            open: true,
            message: `${employeesNeedingUpdate.length} employés nécessitent une mise à jour. Utilisez le filtre "Employés à promouvoir" pour les afficher.`,
            severity: "info",
          })
        }
      } catch (err) {
        console.error("Erreur lors de la vérification des employés nécessitant une mise à jour:", err)
      }
    }

    checkEmployeesNeedingUpdate()
  }, [])

  const handleMenuOpen = (event, employee) => {
    setAnchorEl(event.currentTarget)
    setSelectedEmployee(employee)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleOpenAddDialog = () => {
    setSelectedEmployee(null)
    setOpenDialog(true)
  }

  const handleOpenEditDialog = () => {
    setOpenDialog(true)
    handleMenuClose()
  }

  const handleCloseDialog = (refreshData = false) => {
    setOpenDialog(false)
    if (refreshData) {
      fetchEmployees()
    }
  }

  const handleOpenDetailsDialog = () => {
    setOpenDetailsDialog(true)
    handleMenuClose()
  }

  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false)
  }

  const handleDelete = async () => {
    if (!selectedEmployee) return

    try {
      await EmployeeService.deleteEmployee(selectedEmployee.id)
      setNotification({
        open: true,
        message: `L'employé ${selectedEmployee.prenom} ${selectedEmployee.nom} a été supprimé avec succès`,
        severity: "success",
      })
      fetchEmployees() // Refresh data
    } catch (err) {
      setNotification({
        open: true,
        message: `Erreur lors de la suppression de l'employé: ${err.message}`,
        severity: "error",
      })
    }

    handleMenuClose()
  }

  const handleFilterChange = async (newFilters) => {
    setFilters(newFilters)
    setPage(0) // Reset to first page when filters change

    // If we have backend filtering criteria, use the API
    if (newFilters.categorie || newFilters.grade || newFilters.echelon) {
      setLoading(true)
      try {
        const filterCriteria = {
          category: newFilters.categorie || null,
          grade: newFilters.grade || null,
          echelon: newFilters.echelon || null,
        }

        const filteredData = await EmployeeService.filterEmployees(filterCriteria)
        // Map backend data to frontend format
        const mappedEmployees = filteredData.map((emp) => EmployeeService.mapEmployeeData(emp))
        setEmployees(mappedEmployees)

        // Check if we need to enable the promotion button
        if (newFilters.categorie && newFilters.grade && newFilters.echelon) {
          // All hierarchical filters are applied, we can enable the promotion button
          setNotification({
            open: true,
            message: "Vous pouvez maintenant sélectionner des employés pour la promotion",
            severity: "success",
          })
        }
      } catch (err) {
        console.error("Error filtering employees:", err)
        setError("Erreur lors du filtrage des employés")
      } finally {
        setLoading(false)
      }
    } else {
      // If no backend filtering criteria, fetch all and filter client-side
      fetchEmployees()
    }
  }

  const handleClearFilters = () => {
    setFilters({
      searchTerm: "",
      department: "",
      categorie: "",
      grade: "",
      echelon: "",
      poste: "",
      statut: "",
    })
    setPage(0) // Reset to first page when filters are cleared
    fetchEmployees() // Refresh data with no filters
  }

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleViewModeChange = (event) => {
    setViewMode(event.target.value)
  }

  // Sorting handler
  const requestSort = (key) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  // Handle notification close
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false })
  }

  // Filter and sort employees
  const filteredEmployees = useMemo(() => {
    // Apply client-side filtering for fields not handled by the backend
    let result = employees

    if (filters.searchTerm || filters.department || filters.poste || filters.statut) {
      result = filterEmployees(result, filters)
    }

    // Apply sorting
    if (sortConfig.key) {
      result = [...result].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1
        }
        return 0
      })
    }

    return result
  }, [employees, filters, sortConfig])

  // Get current page data for pagination
  const paginatedEmployees = useMemo(() => {
    return filteredEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  }, [filteredEmployees, page, rowsPerPage])

  // Virtualized row renderer
  const RowRenderer = ({ index, style }) => {
    const emp = filteredEmployees[index]
    return (
      <TableRow
        key={emp.id}
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          width: "100%",
          boxSizing: "border-box",
        }}
        sx={{
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: alpha(primaryColor, 0.05),
          },
        }}
      >
        <TableCell style={{ flex: "0 0 50px" }}>{emp.id}</TableCell>
        <TableCell style={{ flex: "0 0 200px" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={emp.photo}
              alt={`${emp.prenom} ${emp.nom}`}
              sx={{
                mr: 2,
                border: `2px solid ${alpha(primaryColor, 0.2)}`,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                  boxShadow: `0 4px 8px ${alpha(primaryColor, 0.3)}`,
                },
              }}
            />
            <Typography variant="subtitle1">
              {emp.prenom} {emp.nom}
            </Typography>
          </Box>
        </TableCell>
        <TableCell style={{ flex: "0 0 200px" }}>{emp.email}</TableCell>
        <TableCell style={{ flex: "0 0 150px", display: isTablet ? "none" : "table-cell" }}>{emp.telephone}</TableCell>
        <TableCell style={{ flex: "0 0 150px", display: isTablet ? "none" : "table-cell" }}>
          {emp.departement}
        </TableCell>
        <TableCell style={{ flex: "0 0 150px", display: isTablet ? "none" : "table-cell" }}>{emp.poste}</TableCell>
        <TableCell style={{ flex: "0 0 150px" }}>
          <Chip
            label={emp.niveauGrade}
            sx={{
              backgroundColor: alpha(getGradeColor(emp.niveauGrade), 0.1),
              color: getGradeColor(emp.niveauGrade),
            }}
            size="small"
          />
        </TableCell>
        <TableCell style={{ flex: "0 0 100px" }}>
          <Chip label={`Échelon ${emp.echelon}`} color="primary" size="small" />
        </TableCell>
        <TableCell style={{ flex: "0 0 100px" }}>
          <Chip label={emp.statut} color={emp.statut === "Actif" ? "success" : "default"} size="small" />
        </TableCell>
        <TableCell style={{ flex: "0 0 80px" }} align="center">
          <Tooltip title="Actions" arrow TransitionComponent={Zoom}>
            <IconButton
              onClick={(event) => handleMenuOpen(event, emp)}
              sx={{
                color: secondaryColor,
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: alpha(secondaryColor, 0.1),
                  transform: "scale(1.1)",
                },
              }}
            >
              <MoreVert />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    )
  }

  // Ajouter cette fonction pour gérer la sélection des employés pour la promotion
  const handleSelectForPromotion = (employeeId) => {
    setSelectedForPromotion((prev) => {
      if (prev.includes(employeeId)) {
        return prev.filter((id) => id !== employeeId)
      } else {
        return [...prev, employeeId]
      }
    })
  }

  // Fonction pour générer le document et mettre à jour les échelons
  const handleGeneratePromotionDoc = async () => {
    if (selectedForPromotion.length === 0) {
      setNotification({
        open: true,
        message: "Veuillez sélectionner au moins un employé pour la promotion",
        severity: "warning",
      })
      return
    }

    if (!areHierarchicalFiltersApplied) {
      setNotification({
        open: true,
        message:
          "Veuillez appliquer tous les filtres hiérarchiques (Catégorie → Grade → Échelon) avant de générer le document",
        severity: "warning",
      })
      return
    }

    setGeneratingDoc(true)
    try {
      // 1. Générer le document PDF
      const docUrl = await generateUpdateDocument(selectedForPromotion)

      if (!docUrl) {
        throw new Error("Impossible de générer le document")
      }

      setDocUrl(docUrl)
      // Ouvrir le document dans un nouvel onglet
      window.open(docUrl, "_blank")

      // 2. Mettre à jour les échelons
      setLoading(true)
      const updateResult = await updateEmployeeEchelons(selectedForPromotion)

      if (!updateResult.success) {
        throw new Error(updateResult.message || "Erreur lors de la mise à jour des échelons")
      }

      // 3. Afficher un message de succès combiné
      setNotification({
        open: true,
        message: `Document généré avec succès et ${updateResult.updatedCount} employés ont été promus`,
        severity: "success",
      })

      // 4. Rafraîchir la liste des employés
      await fetchEmployees()

      // 5. Réinitialiser la sélection
      setSelectedForPromotion([])
    } catch (err) {
      console.error("Erreur lors du processus de promotion:", err)
      setNotification({
        open: true,
        message: `Erreur: ${err.message}`,
        severity: "error",
      })
    } finally {
      setGeneratingDoc(false)
      setLoading(false)
    }
  }

  // Fonction pour mettre à jour les échelons des employés sélectionnés
  const handleUpdateEchelons = async () => {
    if (selectedForPromotion.length === 0) {
      setNotification({
        open: true,
        message: "Veuillez sélectionner au moins un employé pour la mise à jour",
        severity: "warning",
      })
      return
    }

    if (!areHierarchicalFiltersApplied) {
      setNotification({
        open: true,
        message:
          "Veuillez appliquer tous les filtres hiérarchiques (Catégorie → Grade → Échelon) avant de mettre à jour les échelons",
        severity: "warning",
      })
      return
    }

    setLoading(true)
    try {
      // Appel à la fonction de mise à jour des échelons
      const result = await updateEmployeeEchelons(selectedForPromotion)

      if (result.success) {
        setNotification({
          open: true,
          message: `${result.updatedCount} employés ont été promus avec succès`,
          severity: "success",
        })

        // Rafraîchir la liste des employés
        await fetchEmployees()

        // Réinitialiser la sélection
        setSelectedForPromotion([])
      } else {
        throw new Error(result.message || "Erreur lors de la mise à jour des échelons")
      }
    } catch (err) {
      console.error("Erreur lors de la mise à jour des échelons:", err)
      setNotification({
        open: true,
        message: `Erreur lors de la mise à jour des échelons: ${err.message}`,
        severity: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  // Fonction pour filtrer les employés nécessitant une mise à jour
  const handleFilterEmployeesNeedingUpdate = async () => {
    if (!areHierarchicalFiltersApplied) {
      setNotification({
        open: true,
        message:
          "Veuillez appliquer tous les filtres hiérarchiques (Catégorie → Grade → Échelon) avant de filtrer les employés à promouvoir",
        severity: "warning",
      })
      return
    }

    setLoading(true)
    try {
      const employeesNeedingUpdate = await fetchEmployeesNeedingUpdate()
      if (employeesNeedingUpdate && employeesNeedingUpdate.length > 0) {
        const mappedEmployees = employeesNeedingUpdate.map((emp) => EmployeeService.mapEmployeeData(emp))
        setEmployees(mappedEmployees)
        setNotification({
          open: true,
          message: `${mappedEmployees.length} employés nécessitant une mise à jour trouvés`,
          severity: "info",
        })
      } else {
        setNotification({
          open: true,
          message: "Aucun employé nécessitant une mise à jour trouvé",
          severity: "info",
        })
      }
    } catch (err) {
      setError("Erreur lors de la récupération des employés nécessitant une mise à jour")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Table header with sorting
  const SortableTableHead = ({ columns }) => {
    return (
      <TableHead>
        <TableRow>
          {/* Ajouter un élément dans SortableTableHead pour la colonne de sélection */}
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={selectedForPromotion.length > 0 && selectedForPromotion.length < filteredEmployees.length}
              checked={filteredEmployees.length > 0 && selectedForPromotion.length === filteredEmployees.length}
              onChange={() => {
                if (selectedForPromotion.length === filteredEmployees.length) {
                  setSelectedForPromotion([])
                } else {
                  setSelectedForPromotion(filteredEmployees.map((e) => e.id))
                }
              }}
              color="primary"
            />
          </TableCell>
          {columns.map((column) => (
            <TableCell
              key={column.id}
              sx={{
                ...column.sx,
                cursor: column.sortable ? "pointer" : "default",
                "&:hover": column.sortable ? { backgroundColor: alpha(primaryColor, 0.1) } : {},
              }}
              onClick={() => column.sortable && requestSort(column.id)}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {column.label}
                {column.sortable &&
                  sortConfig.key === column.id &&
                  (sortConfig.direction === "asc" ? (
                    <KeyboardArrowUp fontSize="small" />
                  ) : (
                    <KeyboardArrowDown fontSize="small" />
                  ))}
              </Box>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    )
  }

  // Define table columns
  const tableColumns = [
    { id: "id", label: "ID", sortable: true },
    { id: "nom", label: "Nom complet", sortable: true },
    { id: "email", label: "Email", sortable: true },
    { id: "telephone", label: "Téléphone", sortable: true, sx: { display: { xs: "none", md: "table-cell" } } },
    { id: "departement", label: "Département", sortable: true, sx: { display: { xs: "none", md: "table-cell" } } },
    { id: "poste", label: "Poste", sortable: true, sx: { display: { xs: "none", lg: "table-cell" } } },
    { id: "categorie", label: "Catégorie", sortable: true, sx: { display: { xs: "none", lg: "table-cell" } } },
    { id: "niveauGrade", label: "Niveau de Grade", sortable: true },
    { id: "echelon", label: "Échelon", sortable: true },
    { id: "statut", label: "Statut", sortable: true },
    { id: "actions", label: "Actions", sortable: false, align: "center" },
  ]

  return (
    <ThemeProvider theme={ucaTheme}>
      <CssBaseline />
      <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: "background.default", minHeight: "100vh" }}>
        {/* Notification snackbar */}
        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: "100%" }}>
            {notification.message}
          </Alert>
        </Snackbar>

        {/* En-tête avec titre et actions */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            mb: 4,
            gap: 2,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              position: "relative",
              "&:after": {
                content: '""',
                position: "absolute",
                bottom: -8,
                left: 0,
                width: "60px",
                height: "4px",
                backgroundColor: primaryColor,
                borderRadius: "2px",
              },
            }}
          >
            Gestion du Personnel
          </Typography>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Tooltip title="Ajouter un nouvel employé" arrow TransitionComponent={Zoom}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<PersonAdd />}
                onClick={handleOpenAddDialog}
                sx={{
                  borderRadius: "20px",
                  transition: "all 0.2s ease",
                  boxShadow: `0 4px 12px ${alpha(primaryColor, 0.3)}`,
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: `0 6px 16px ${alpha(primaryColor, 0.4)}`,
                  },
                }}
              >
                Ajouter
              </Button>
            </Tooltip>
          </Box>
        </Box>

        {/* Statistiques rapides */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                background: `linear-gradient(135deg, ${alpha(primaryColor, 0.1)} 0%, ${alpha(primaryColor, 0.2)} 100%)`,
                border: `1px solid ${alpha(primaryColor, 0.2)}`,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: `0 8px 20px ${alpha(primaryColor, 0.2)}`,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h4" component="div" sx={{ mb: 1, color: primaryColor }}>
                  {employees.length}
                </Typography>
                <Typography variant="body2" sx={{ color: alpha(secondaryColor, 0.8) }}>
                  Employés au total
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                background: `linear-gradient(135deg, ${alpha(secondaryColor, 0.1)} 0%, ${alpha(
                  secondaryColor,
                  0.2,
                )} 100%)`,
                border: `1px solid ${alpha(secondaryColor, 0.2)}`,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: `0 8px 20px ${alpha(secondaryColor, 0.2)}`,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h4" component="div" sx={{ mb: 1, color: secondaryColor }}>
                  {employees.filter((e) => e.statut === "Actif").length}
                </Typography>
                <Typography variant="body2" sx={{ color: alpha(secondaryColor, 0.8) }}>
                  Employés actifs
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                background: `linear-gradient(135deg, ${alpha(accentColor, 0.1)} 0%, ${alpha(accentColor, 0.2)} 100%)`,
                border: `1px solid ${alpha(accentColor, 0.2)}`,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: `0 8px 20px ${alpha(accentColor, 0.2)}`,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h4" component="div" sx={{ mb: 1, color: accentColor }}>
                  {employees.filter((e) => e.categorie === "Enseignant-Chercheur").length}
                </Typography>
                <Typography variant="body2" sx={{ color: alpha(secondaryColor, 0.8) }}>
                  Enseignants-Chercheurs
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                background: `linear-gradient(135deg, ${alpha(secondaryColor, 0.1)} 0%, ${alpha(
                  secondaryColor,
                  0.2,
                )} 100%)`,
                border: `1px solid ${alpha(secondaryColor, 0.2)}`,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: `0 8px 20px ${alpha(secondaryColor, 0.2)}`,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h4" component="div" sx={{ mb: 1, color: secondaryColor }}>
                  {employees.filter((e) => e.statut !== "Actif").length}
                </Typography>
                <Typography variant="body2" sx={{ color: alpha(secondaryColor, 0.8) }}>
                  Employés en congé/suspendus
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Panneau de filtres */}
        <FilterPanel onFilterChange={handleFilterChange} filters={filters} onClearFilters={handleClearFilters} />

        {/* Tableau des employés */}
        <Paper
          elevation={3}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            mb: 4,
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: `0 8px 24px ${alpha(primaryColor, 0.15)}`,
            },
          }}
        >
          {/* Loading indicator */}
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
              <CircularProgress color="primary" />
            </Box>
          )}

          {/* Error message */}
          {error && (
            <Alert severity="error" sx={{ m: 2 }}>
              {error}
            </Alert>
          )}

          <Box
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: `1px solid ${alpha(primaryColor, 0.1)}`,
              backgroundColor: alpha(primaryColor, 0.05),
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <FilterAlt color="primary" fontSize="small" />
              <Typography variant="subtitle1" color="primary" fontWeight="600">
                {filteredEmployees.length} employés trouvés
              </Typography>
              {selectedForPromotion.length > 0 && (
                <Typography variant="subtitle1" color="secondary" fontWeight="600" sx={{ ml: 2 }}>
                  {selectedForPromotion.length} employés sélectionnés
                </Typography>
              )}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Tooltip title="Filtrer les employés nécessitant une mise à jour" arrow TransitionComponent={Zoom}>
                <span>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<FilterAlt />}
                    onClick={handleFilterEmployeesNeedingUpdate}
                    disabled={!areHierarchicalFiltersApplied}
                    sx={{
                      borderRadius: "20px",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: `0 4px 8px ${alpha(primaryColor, 0.2)}`,
                      },
                    }}
                  >
                    Employés à promouvoir
                  </Button>
                </span>
              </Tooltip>

              <Tooltip title="Générer document et mettre à jour les échelons" arrow TransitionComponent={Zoom}>
                <span>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={generatingDoc || loading ? <CircularProgress size={24} color="inherit" /> : <Print />}
                    onClick={handleGeneratePromotionDoc}
                    disabled={
                      generatingDoc || loading || selectedForPromotion.length === 0 || !areHierarchicalFiltersApplied
                    }
                    sx={{
                      borderRadius: "20px",
                      transition: "all 0.2s ease",
                      boxShadow: `0 4px 12px ${alpha(secondaryColor, 0.3)}`,
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: `0 6px 16px ${alpha(secondaryColor, 0.4)}`,
                      },
                    }}
                  >
                    {generatingDoc || loading ? "Traitement..." : "Promotion & Mise à jour"}
                  </Button>
                </span>
              </Tooltip>

              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel id="view-mode-label">Mode d'affichage</InputLabel>
                <Select
                  labelId="view-mode-label"
                  id="view-mode-select"
                  value={viewMode}
                  label="Mode d'affichage"
                  onChange={handleViewModeChange}
                >
                  <MenuItem value="pagination">Pagination</MenuItem>
                  <MenuItem value="virtualization">Virtualisation</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          {!loading &&
            !error &&
            (viewMode === "pagination" ? (
              // Pagination mode
              <>
                <TableContainer>
                  <Table>
                    <SortableTableHead columns={tableColumns} />
                    <TableBody>
                      {paginatedEmployees.length > 0 ? (
                        paginatedEmployees.map((emp) => (
                          <TableRow
                            key={emp.id}
                            sx={{
                              transition: "all 0.2s ease",
                              "&:hover": {
                                backgroundColor: alpha(primaryColor, 0.05),
                                transform: "scale(1.005)",
                              },
                            }}
                          >
                            {/* Case à cocher pour sélectionner l'employé */}
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={selectedForPromotion.includes(emp.id)}
                                onChange={() => handleSelectForPromotion(emp.id)}
                                color="primary"
                              />
                            </TableCell>
                            <TableCell>{emp.id}</TableCell>
                            <TableCell>
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Avatar
                                  src={emp.photo}
                                  alt={`${emp.prenom} ${emp.nom}`}
                                  sx={{
                                    mr: 2,
                                    border: `2px solid ${alpha(primaryColor, 0.2)}`,
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                      transform: "scale(1.1)",
                                      boxShadow: `0 4px 8px ${alpha(primaryColor, 0.3)}`,
                                    },
                                  }}
                                />
                                <Typography variant="subtitle1">
                                  {emp.prenom} {emp.nom}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>{emp.email}</TableCell>
                            <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>{emp.telephone}</TableCell>
                            <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>{emp.departement}</TableCell>
                            <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>{emp.poste}</TableCell>
                            <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>
                              <Chip
                                label={emp.categorie}
                                color="secondary"
                                size="small"
                                sx={{
                                  transition: "all 0.2s ease",
                                  "&:hover": {
                                    transform: "translateY(-2px)",
                                    boxShadow: `0 2px 4px ${alpha(secondaryColor, 0.3)}`,
                                  },
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={emp.niveauGrade}
                                sx={{
                                  backgroundColor: alpha(getGradeColor(emp.niveauGrade), 0.1),
                                  color: getGradeColor(emp.niveauGrade),
                                  transition: "all 0.2s ease",
                                  "&:hover": {
                                    transform: "translateY(-2px)",
                                    boxShadow: `0 2px 4px ${alpha(getGradeColor(emp.niveauGrade), 0.3)}`,
                                  },
                                }}
                                size="small"
                              />
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={`Échelon ${emp.echelon}`}
                                color="primary"
                                size="small"
                                sx={{
                                  transition: "all 0.2s ease",
                                  "&:hover": {
                                    transform: "translateY(-2px)",
                                    boxShadow: `0 2px 4px ${alpha(primaryColor, 0.3)}`,
                                  },
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={emp.statut}
                                color={emp.statut === "Actif" ? "success" : "default"}
                                size="small"
                                sx={{
                                  transition: "all 0.2s ease",
                                  "&:hover": {
                                    transform: "translateY(-2px)",
                                    boxShadow: `0 2px 4px ${alpha(
                                      emp.statut === "Actif" ? "#4caf50" : "#9e9e9e",
                                      0.3,
                                    )}`,
                                  },
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <Tooltip title="Actions" arrow TransitionComponent={Zoom}>
                                <IconButton
                                  onClick={(event) => handleMenuOpen(event, emp)}
                                  sx={{
                                    color: secondaryColor,
                                    transition: "all 0.2s ease",
                                    "&:hover": {
                                      backgroundColor: alpha(secondaryColor, 0.1),
                                      transform: "scale(1.1)",
                                    },
                                  }}
                                >
                                  <MoreVert />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={12} align="center" sx={{ py: 4 }}>
                            <Typography variant="subtitle1" color="text.secondary">
                              Aucun employé ne correspond aux critères de recherche
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Pagination controls */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    borderTop: `1px solid ${alpha(primaryColor, 0.1)}`,
                    backgroundColor: alpha(primaryColor, 0.02),
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                      Lignes par page:
                    </Typography>
                    <Select value={rowsPerPage} onChange={handleChangeRowsPerPage} size="small" sx={{ minWidth: 80 }}>
                      {[5, 10, 25, 50].map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                      {page * rowsPerPage + 1}-{Math.min((page + 1) * rowsPerPage, filteredEmployees.length)} sur{" "}
                      {filteredEmployees.length}
                    </Typography>
                    <Pagination
                      count={Math.ceil(filteredEmployees.length / rowsPerPage)}
                      page={page + 1}
                      onChange={(e, p) => handleChangePage(e, p - 1)}
                      color="primary"
                      shape="rounded"
                      showFirstButton
                      showLastButton
                      size={isMobile ? "small" : "medium"}
                    />
                  </Box>
                </Box>
              </>
            ) : (
              // Virtualization mode
              <Box sx={{ height: 500, width: "100%" }}>
                <Box sx={{ display: "flex", width: "100%" }}>
                  <Table>
                    <SortableTableHead columns={tableColumns} />
                  </Table>
                </Box>
                <AutoSizer disableHeight>
                  {({ width }) => (
                    <List
                      height={450}
                      width={width}
                      itemCount={filteredEmployees.length}
                      itemSize={72} // Adjust based on your row height
                    >
                      {RowRenderer}
                    </List>
                  )}
                </AutoSizer>
              </Box>
            ))}
        </Paper>

        {/* Menu déroulant pour actions CRUD */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          TransitionComponent={Fade}
          PaperProps={{
            elevation: 3,
            sx: {
              borderRadius: 2,
              minWidth: 180,
              overflow: "hidden",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            },
          }}
        >
          <MenuItem
            onClick={handleOpenDetailsDialog}
            sx={{
              color: secondaryColor,
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: alpha(secondaryColor, 0.1),
                paddingLeft: "16px",
              },
            }}
          >
            <Visibility fontSize="small" sx={{ mr: 1, color: primaryColor }} /> Détails
          </MenuItem>
          <MenuItem
            onClick={handleOpenEditDialog}
            sx={{
              color: secondaryColor,
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: alpha(secondaryColor, 0.1),
                paddingLeft: "16px",
              },
            }}
          >
            <Edit fontSize="small" sx={{ mr: 1, color: primaryColor }} /> Modifier
          </MenuItem>
          <MenuItem
            onClick={handleDelete}
            sx={{
              color: accentColor,
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: alpha(accentColor, 0.1),
                paddingLeft: "16px",
              },
            }}
          >
            <Delete fontSize="small" sx={{ mr: 1 }} /> Supprimer
          </MenuItem>
        </Menu>

        {/* Dialogue pour ajouter/modifier un employé */}
        <EmployeeFormDialog
          open={openDialog}
          onClose={handleCloseDialog}
          employee={selectedEmployee}
          onSave={fetchEmployees}
        />

        {/* Dialogue pour afficher les détails d'un employé */}
        <EmployeeDetailsDialog
          open={openDetailsDialog}
          onClose={handleCloseDetailsDialog}
          employee={selectedEmployee}
          onEdit={handleOpenEditDialog}
        />
      </Box>
    </ThemeProvider>
  )
}

export default EmployeeTable
