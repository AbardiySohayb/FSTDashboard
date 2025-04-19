import { createTheme, alpha } from "@mui/material"

// Définition des couleurs principales selon la charte graphique
export const primaryColor = "#B36B39" // Couleur bronze/cuivre du logo
export const secondaryColor = "#2C3E50" // Bleu foncé pour le contraste
export const backgroundColor = "#F5F5F5" // Gris clair pour le fond
export const accentColor = "#E74C3C" // Rouge pour l'accent
export const successColor = "#2ECC71" // Vert pour les succès
export const warningColor = "#F39C12" // Orange pour les avertissements
export const infoColor = "#3498DB" // Bleu pour les informations

// Création du thème personnalisé
const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
      light: alpha(primaryColor, 0.8),
      dark: "#8A5229",
      contrastText: "#ffffff",
    },
    secondary: {
      main: secondaryColor,
      light: alpha(secondaryColor, 0.8),
      dark: "#1a2530",
      contrastText: "#ffffff",
    },
    background: {
      default: backgroundColor,
      paper: "#ffffff",
    },
    error: {
      main: accentColor,
      light: alpha(accentColor, 0.8),
      dark: "#c0392b",
    },
    success: {
      main: successColor,
      light: alpha(successColor, 0.8),
      dark: "#27ae60",
    },
    warning: {
      main: warningColor,
      light: alpha(warningColor, 0.8),
      dark: "#d35400",
    },
    info: {
      main: infoColor,
      light: alpha(infoColor, 0.8),
      dark: "#2980b9",
    },
    grey: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      color: secondaryColor,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      color: primaryColor,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
      color: secondaryColor,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      color: secondaryColor,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
      color: secondaryColor,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: "1.1rem",
      fontWeight: 600,
      color: secondaryColor,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: "1rem",
      color: "#333",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      color: alpha("#333", 0.7),
      lineHeight: 1.5,
    },
    subtitle1: {
      color: primaryColor,
      fontWeight: 500,
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    subtitle2: {
      color: secondaryColor,
      fontWeight: 600,
      fontSize: "0.875rem",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      lineHeight: 1.5,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    "none",
    "0px 2px 4px rgba(0, 0, 0, 0.05)",
    "0px 4px 8px rgba(0, 0, 0, 0.05)",
    "0px 6px 12px rgba(0, 0, 0, 0.05)",
    "0px 8px 16px rgba(0, 0, 0, 0.05)",
    "0px 10px 20px rgba(0, 0, 0, 0.05)",
    "0px 12px 24px rgba(0, 0, 0, 0.05)",
    "0px 14px 28px rgba(0, 0, 0, 0.05)",
    "0px 16px 32px rgba(0, 0, 0, 0.05)",
    "0px 18px 36px rgba(0, 0, 0, 0.05)",
    "0px 20px 40px rgba(0, 0, 0, 0.05)",
    "0px 22px 44px rgba(0, 0, 0, 0.05)",
    "0px 24px 48px rgba(0, 0, 0, 0.05)",
    "0px 26px 52px rgba(0, 0, 0, 0.05)",
    "0px 28px 56px rgba(0, 0, 0, 0.05)",
    "0px 30px 60px rgba(0, 0, 0, 0.05)",
    "0px 32px 64px rgba(0, 0, 0, 0.05)",
    "0px 34px 68px rgba(0, 0, 0, 0.05)",
    "0px 36px 72px rgba(0, 0, 0, 0.05)",
    "0px 38px 76px rgba(0, 0, 0, 0.05)",
    "0px 40px 80px rgba(0, 0, 0, 0.05)",
    "0px 42px 84px rgba(0, 0, 0, 0.05)",
    "0px 44px 88px rgba(0, 0, 0, 0.05)",
    "0px 46px 92px rgba(0, 0, 0, 0.05)",
    "0px 48px 96px rgba(0, 0, 0, 0.05)",
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          textTransform: "none",
          padding: "10px 20px",
          transition: "all 0.3s ease",
          fontWeight: 600,
          boxShadow: "none",
          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          },
        },
        containedPrimary: {
          background: `linear-gradient(45deg, ${primaryColor} 30%, ${primaryColor}CC 90%)`,
          "&:hover": {
            background: `linear-gradient(45deg, ${primaryColor}CC 30%, ${primaryColor} 90%)`,
          },
        },
        containedSecondary: {
          background: `linear-gradient(45deg, ${secondaryColor} 30%, ${secondaryColor}CC 90%)`,
          "&:hover": {
            background: `linear-gradient(45deg, ${secondaryColor}CC 30%, ${secondaryColor} 90%)`,
          },
        },
        outlined: {
          borderWidth: 2,
          "&:hover": {
            borderWidth: 2,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          backgroundColor: "#ffffff",
          color: secondaryColor,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#ffffff",
          borderRight: "none",
          boxShadow: "0 0 20px rgba(0,0,0,0.05)",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: "4px 8px",
          "&.Mui-selected": {
            backgroundColor: alpha(primaryColor, 0.1),
            color: primaryColor,
            "&:hover": {
              backgroundColor: alpha(primaryColor, 0.15),
            },
            "& .MuiListItemIcon-root": {
              color: primaryColor,
            },
          },
          "&:hover": {
            backgroundColor: alpha(primaryColor, 0.05),
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 40,
          color: alpha(secondaryColor, 0.7),
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: "0.95rem",
          fontWeight: 500,
          color: secondaryColor,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: alpha(secondaryColor, 0.1),
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontWeight: 500,
        },
        colorPrimary: {
          backgroundColor: alpha(primaryColor, 0.1),
          color: primaryColor,
        },
        colorSecondary: {
          backgroundColor: alpha(secondaryColor, 0.1),
          color: secondaryColor,
        },
        colorSuccess: {
          backgroundColor: alpha(successColor, 0.1),
          color: successColor,
        },
        colorError: {
          backgroundColor: alpha(accentColor, 0.1),
          color: accentColor,
        },
        colorWarning: {
          backgroundColor: alpha(warningColor, 0.1),
          color: warningColor,
        },
        colorInfo: {
          backgroundColor: alpha(infoColor, 0.1),
          color: infoColor,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            "&:hover fieldset": {
              borderColor: primaryColor,
            },
            "&.Mui-focused fieldset": {
              borderColor: primaryColor,
            },
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: primaryColor,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: "transform 0.2s ease, background-color 0.2s ease",
          "&:hover": {
            transform: "scale(1.1)",
          },
        },
        colorPrimary: {
          backgroundColor: alpha(primaryColor, 0.1),
          "&:hover": {
            backgroundColor: alpha(primaryColor, 0.2),
          },
        },
        colorSecondary: {
          backgroundColor: alpha(secondaryColor, 0.1),
          "&:hover": {
            backgroundColor: alpha(secondaryColor, 0.2),
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 10,
          borderRadius: 5,
          backgroundColor: alpha(secondaryColor, 0.1),
        },
        barColorPrimary: {
          backgroundImage: `linear-gradient(90deg, ${primaryColor} 0%, ${primaryColor}CC 100%)`,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(secondaryColor, 0.05),
          "& .MuiTableCell-head": {
            color: secondaryColor,
            fontWeight: 600,
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: alpha(primaryColor, 0.05),
          },
        },
      },
    },
  },
})

export default theme

