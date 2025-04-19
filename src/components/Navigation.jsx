"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  Box,
  Typography,
  alpha,
  styled,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Tooltip,
} from "@mui/material"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import DescriptionIcon from "@mui/icons-material/Description"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import WorkIcon from "@mui/icons-material/Work"
import AssignmentIcon from "@mui/icons-material/Assignment"
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket"
import PeopleIcon from "@mui/icons-material/People"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService"
import DashboardIcon from "@mui/icons-material/Dashboard"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"

// Définition des couleurs principales selon la charte graphique
const primaryColor = "#B36B39" // Couleur bronze/cuivre du logo
const secondaryColor = "#2C3E50" // Bleu foncé pour le contraste
const backgroundColor = "#F5F5F5" // Gris clair pour le fond
const accentColor = "#E74C3C" // Rouge pour l'accent

// Création du thème
const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
      contrastText: "#ffffff",
    },
    secondary: {
      main: secondaryColor,
      contrastText: "#ffffff",
    },
    background: {
      default: backgroundColor,
      paper: "#ffffff",
    },
    error: {
      main: accentColor,
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      color: secondaryColor,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      color: primaryColor,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      color: secondaryColor,
    },
    h5: {
      fontSize: "1.2rem",
      fontWeight: 600,
      color: secondaryColor,
    },
    body1: {
      fontSize: "1rem",
      color: "#333",
    },
    subtitle1: {
      color: primaryColor,
      fontWeight: 500,
    },
    subtitle2: {
      color: secondaryColor,
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      marginTop: "16px",
    },
  },
})

// Composants stylisés
const StyledNavList = styled(List)(({ theme }) => ({
  width: "100%",
  padding: "8px 0",
}))

const StyledNavItem = styled(ListItem)(({ theme, active }) => ({
  borderRadius: 8,
  margin: "4px 8px",
  padding: "8px 16px",
  transition: "all 0.3s ease",
  position: "relative",
  overflow: "hidden",
  "&::before": active && {
    content: '""',
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: primaryColor,
    borderRadius: "0 4px 4px 0",
  },
  "&:hover": {
    backgroundColor: alpha(primaryColor, 0.08),
    transform: "translateX(4px)",
  },
  ...(active && {
    backgroundColor: alpha(primaryColor, 0.1),
    "& .MuiListItemIcon-root": {
      color: primaryColor,
    },
    "& .MuiListItemText-primary": {
      color: primaryColor,
      fontWeight: 600,
    },
  }),
}))

const StyledNavSubItem = styled(ListItem)(({ theme, active }) => ({
  borderRadius: 8,
  margin: "2px 8px 2px 16px",
  padding: "6px 16px",
  transition: "all 0.3s ease",
  position: "relative",
  overflow: "hidden",
  "&::before": active && {
    content: '""',
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: primaryColor,
    borderRadius: "0 4px 4px 0",
  },
  "&:hover": {
    backgroundColor: alpha(primaryColor, 0.05),
    transform: "translateX(4px)",
  },
  ...(active && {
    backgroundColor: alpha(primaryColor, 0.08),
    "& .MuiListItemIcon-root": {
      color: primaryColor,
    },
    "& .MuiListItemText-primary": {
      color: primaryColor,
      fontWeight: 500,
    },
  }),
}))

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: 40,
  color: alpha(secondaryColor, 0.7),
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
}))

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  "& .MuiListItemText-primary": {
    fontSize: "0.95rem",
    fontWeight: 500,
    color: secondaryColor,
  },
}))

const StyledCategoryHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "16px 16px 8px 16px",
}))

const StyledCategoryText = styled(Typography)(({ theme }) => ({
  fontSize: "0.75rem",
  fontWeight: 700,
  color: alpha(secondaryColor, 0.6),
  textTransform: "uppercase",
  letterSpacing: "0.5px",
}))

export const NAVIGATION = [
  {
    segment: "Profile",
    title: "Profile",
    icon: <AccountCircleIcon />,
    path: "/profile",
  },
  {
    segment: "Securite",
    title: "Sécurité",
    icon: <AdminPanelSettingsIcon />,
    path: "/securite",
  },
  {
    segment: "ExamPlaning",
    title: "Exam & Planning",
    icon: <AccessTimeIcon />,
    path: "/examplaning",
  },
  {
    segment: "Stage",
    title: "Stage",
    icon: <WorkIcon />,
    path: "/stage",
  },
  {
    segment: "Concours",
    title: "Concours",
    icon: <AssignmentIcon />,
    path: "/concours",
  },
  {
    segment: "Achats",
    title: "Achats",
    icon: <ShoppingBasketIcon />,
    path: "/achats",
  },
  {
    segment: "RH",
    title: "RH",
    icon: <PeopleIcon />,
    children: [
      {
        segment: "Dashboard",
        title: "Dashboard",
        icon: <DashboardIcon />,
        path: "/rh/dashboard",
      },
      {
        segment: "Personel",
        title: "Personnel",
        icon: <AccountCircleIcon />,
        path: "/rh/Personel",
      },
      {
        segment: "Conges",
        title: "Congés et Absences",
        icon: <CalendarMonthIcon />,
        path: "/rh/conges",
      },
      {
        segment: "Taches",
        title: "Tâches et Missions",
        icon: <HomeRepairServiceIcon />,
        path: "/rh/taches",
      },
      {
        segment: "Promotion",
        title: "Demande de Promotion",
        icon: <ArrowUpwardIcon />,
        path: "/rh/promotion",
      },
      {
        segment: "Rapports",
        title: "Rapports",
        icon: <DescriptionIcon />,
        path: "/rh/Rapport",
      },
    ],
  },
  {
    segment: "charte_graphique",
    title: "Charte Graphique",
    icon: <AssignmentIcon />,
    path: "/charte_graphique",
  },
]

export default function Navigation() {
  const location = useLocation()
  const [openItems, setOpenItems] = useState({
    RH: true, // Par défaut, le menu RH est ouvert
  })

  const handleToggle = (segment) => {
    setOpenItems((prev) => ({
      ...prev,
      [segment]: !prev[segment],
    }))
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  const isParentActive = (children) => {
    return children && children.some((child) => isActive(child.path))
  }

  // Grouper les éléments de navigation par catégorie
  const groupedNavigation = NAVIGATION.reduce(
    (acc, item) => {
      if (item.category) {
        if (!acc[item.category]) {
          acc[item.category] = []
        }
        acc[item.category].push(item)
      } else {
        acc.default.push(item)
      }
      return acc
    },
    { default: [] },
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: "#fff",
          height: "100%",
          boxShadow: "0 0 20px rgba(0,0,0,0.05)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <StyledNavList component="nav" disablePadding>
          <StyledCategoryHeader>
            <StyledCategoryText>Navigation principale</StyledCategoryText>
          </StyledCategoryHeader>

          {NAVIGATION.map((item) => (
            <Box key={item.segment}>
              {item.children ? (
                // Élément avec sous-menu
                <>
                  <StyledNavItem
                    button
                    active={isParentActive(item.children) ? 1 : 0}
                    onClick={() => handleToggle(item.segment)}
                  >
                    <StyledListItemIcon>{item.icon}</StyledListItemIcon>
                    <StyledListItemText primary={item.title} />
                    {openItems[item.segment] ? <ExpandLess /> : <ExpandMore />}
                  </StyledNavItem>

                  <Collapse in={openItems[item.segment]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.children.map((child) => (
                        <Tooltip title={child.title} placement="right" key={child.segment}>
                          <StyledNavSubItem
                            button
                            component={Link}
                            to={child.path}
                            active={isActive(child.path) ? 1 : 0}
                          >
                            <StyledListItemIcon>{child.icon}</StyledListItemIcon>
                            <StyledListItemText primary={child.title} />
                          </StyledNavSubItem>
                        </Tooltip>
                      ))}
                    </List>
                  </Collapse>
                </>
              ) : (
                // Élément simple
                <Tooltip title={item.title} placement="right">
                  <StyledNavItem button component={Link} to={item.path} active={isActive(item.path) ? 1 : 0}>
                    <StyledListItemIcon>{item.icon}</StyledListItemIcon>
                    <StyledListItemText primary={item.title} />
                  </StyledNavItem>
                </Tooltip>
              )}
            </Box>
          ))}
        </StyledNavList>
      </Box>
    </ThemeProvider>
  )
}

