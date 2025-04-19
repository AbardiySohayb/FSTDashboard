"use client"

import { useState, useMemo } from "react"
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
  useTheme,
  Card,
  CardContent,
  Grid,
  Pagination,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material"

import {
  MoreVert,
  Edit,
  Delete,
  Visibility,
  FilterAlt,
  PersonAdd,
  Download,
  Upload,
  Print,
  KeyboardArrowUp,
  KeyboardArrowDown,
} from "@mui/icons-material"

import { FixedSizeList as List } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"

import { StyledSearchBox } from "../../components/styled/StyledComponents"
import theme, { primaryColor, secondaryColor } from "../../utils/theme"
import { employees, departments, echelons } from "../../data/mockData"
import { filterEmployees, getGradeColor } from "../../utils/employeeUtils"
import EmployeeDetailsDialog from "../../components/dialogs/EmployeeDetailsDialog"
import EmployeeFormDialog from "../../components/dialogs/EmployeeFormDialog"
import FilterPanel from "./FilterPanel"


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
  const muiTheme = useTheme()
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(muiTheme.breakpoints.down("md"))

  // Pagination state
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [viewMode, setViewMode] = useState("pagination") // "pagination" or "virtualization"
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" })

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

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleOpenDetailsDialog = () => {
    setOpenDetailsDialog(true)
    handleMenuClose()
  }

  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false)
  }

  const handleDelete = () => {
    alert(`Supprimer l'employé: ${selectedEmployee?.prenom} ${selectedEmployee?.nom}`)
    handleMenuClose()
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    setPage(0) // Reset to first page when filters change
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

  // Filter and sort employees
  const filteredEmployees = useMemo(() => {
    let result = filterEmployees(employees, filters)

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
  }, [filters, sortConfig])

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

  // Table header with sorting
  const SortableTableHead = ({ columns }) => {
    return (
      <TableHead>
        <TableRow>
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: "background.default", minHeight: "100vh" }}>
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
            <Tooltip title="Exporter les données" arrow TransitionComponent={Zoom}>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<Download />}
                sx={{
                  borderRadius: "20px",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: `0 4px 8px ${alpha(secondaryColor, 0.2)}`,
                  },
                }}
              >
                Exporter
              </Button>
            </Tooltip>

            <Tooltip title="Importer des données" arrow TransitionComponent={Zoom}>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<Upload />}
                sx={{
                  borderRadius: "20px",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: `0 4px 8px ${alpha(secondaryColor, 0.2)}`,
                  },
                }}
              >
                Importer
              </Button>
            </Tooltip>

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
                background: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.1)} 0%, ${alpha(
                  theme.palette.success.main,
                  0.2,
                )} 100%)`,
                border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: `0 8px 20px ${alpha(theme.palette.success.main, 0.2)}`,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h4" component="div" sx={{ mb: 1, color: theme.palette.success.main }}>
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
                background: `linear-gradient(135deg, ${alpha(theme.palette.error.main, 0.1)} 0%, ${alpha(
                  theme.palette.error.main,
                  0.2,
                )} 100%)`,
                border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: `0 8px 20px ${alpha(theme.palette.error.main, 0.2)}`,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h4" component="div" sx={{ mb: 1, color: theme.palette.error.main }}>
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
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
              <Tooltip title="Imprimer la liste" arrow TransitionComponent={Zoom}>
                <IconButton
                  color="primary"
                  sx={{
                    "&:hover": {
                      backgroundColor: alpha(primaryColor, 0.1),
                    },
                  }}
                >
                  <Print />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {viewMode === "pagination" ? (
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
                                    emp.statut === "Actif" ? theme.palette.success.main : "#888",
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
                        <TableCell colSpan={11} align="center" sx={{ py: 4 }}>
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
          )}
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
              color: "error.main",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: alpha(theme.palette.error.main, 0.1),
                paddingLeft: "16px",
              },
            }}
          >
            <Delete fontSize="small" sx={{ mr: 1 }} /> Supprimer
          </MenuItem>
        </Menu>

        {/* Dialogue pour ajouter/modifier un employé */}
        <EmployeeFormDialog open={openDialog} onClose={handleCloseDialog} employee={selectedEmployee} />

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


