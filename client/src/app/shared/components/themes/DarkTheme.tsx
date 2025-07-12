import type { ThemeOptions } from "@mui/material/styles";

const DarkTheme: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#000000",        // Black
      light: "#333333",       // Dark grey for hover/active
      dark: "#000000",        // Black for dark mode
      contrastText: "#ffffff" // White for text contrast
    },
    secondary: {
      main: "#26c6da",        // Cyan 400
      light: "#6ff9ff",       // Cyan A100
      dark: "#0095a8",        // Cyan 900
      contrastText: "#212121" // Dark grey for text contrast
    },
    error: {
      main: "#ef5350",        // Red 400
      contrastText: "#fff"    // White for text contrast
    },
    warning: {
      main: "#ffa726",        // Orange 400
      contrastText: "#212121"  // Dark grey for text contrast
    },
    info: {
      main: "#29b6f6",        // Light Blue 400
      contrastText: "#fff"    // White for text contrast
    },
    success: {
      main: "#66bb6a",        // Green 400
      contrastText: "#fff"    // White for text contrast        
    },
    background: {
      default: "#121212",     // Standard dark background
      paper: "#1e1e1e"        // Dark grey for paper background
    },
    text: {
      primary: "#ffffff",   // White for primary text
      secondary: "#b0b0b0", // Light grey for secondary text
      disabled: "#757575"   // Medium grey for disabled text
    },
    divider: "#333333"
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: { fontWeight: 700, fontSize: "2.5rem" },
    h2: { fontWeight: 700, fontSize: "2rem" },
    h3: { fontWeight: 700, fontSize: "1.75rem" },
    h4: { fontWeight: 600, fontSize: "1.5rem" },
    h5: { fontWeight: 600, fontSize: "1.25rem" },
    h6: { fontWeight: 600, fontSize: "1rem" },
    body1: { fontSize: "1rem" },
    body2: { fontSize: "0.875rem" }
  },
  shape: {
    borderRadius: 8
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#26c6da",
          "&:hover": {
            color: "#6ff9ff",
            textDecoration: "underline"
          }
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          a: {
            color: "#26c6da",
            "&:hover": {
              color: "#6ff9ff",
              textDecoration: "underline"
            }
          }
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "#b0b0b0"
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        ul: { color: "#b0b0b0" },
        li: { color: "#b0b0b0" }
      }
    }
  }
};

export default DarkTheme;