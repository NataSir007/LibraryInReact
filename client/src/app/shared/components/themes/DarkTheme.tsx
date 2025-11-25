/*
This is the only dark theme. The logic should be changed, I guess

*/

import type { ThemeOptions } from "@mui/material/styles";

const DarkTheme: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#000000",        // Black for main
      light: "#333333",       // Dark grey for light
      dark: "#000000",        // Black for dark
      contrastText: "#ffffff" // White for text contrast
    },
    secondary: {
      main: "#00bcd4",        // Cyan 500
      light: "#e0f7fa",       // Cyan 0
      dark: "#008ba3",        // Cyan 700
      contrastText: "#212121" // Dark grey for text contrast
    },
    error: {
      main: "#f44336",        // Red 500
      light: "#e57373",       // Red 300
      dark: "#d32f2f",        // Red 700
      contrastText: "#fff"    // White for text contrast
    },
    warning: {
      main: "#ff9800",        // Orange 500
      light: "#ffb74d",       // Orange 300
      dark: "#f57c00",        // Orange 700
      contrastText: "#212121" // Dark grey for text contrast
    },
    success: {
      main: "#4caf50",        // Green 500
      light: "#81c784",       // Green 300
      dark: "#388e3c",        // Green 700
      contrastText: "#fff"    // White for text contrast        
    },
    background: {
      default: "#121212",     // Standard dark background
      paper: "#1e1e1e"        // Dark grey for paper background
    },
    text: {
      primary: "#ffffff",     // White for primary text
      secondary: "#b0b0b0",   // Light grey for secondary text
      disabled: "#757575"     // Medium grey for disabled text
    },
    divider: "#333333"
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: { fontWeight: 700, fontSize: "2.5rem", color: "#FFFFFF" },
    h2: { fontWeight: 700, fontSize: "2rem", color: "#FFFFFF" },
    h3: { fontWeight: 700, fontSize: "1.75rem", color: "#FFFFFF" },
    h4: { fontWeight: 600, fontSize: "1.5rem", color: "#DDDDDD" },
    h5: { fontWeight: 600, fontSize: "1.25rem", color: "#DDDDDD" },
    h6: { fontWeight: 600, fontSize: "1rem", color: "#DDDDDD" },
    body1: { fontSize: "1rem", color: "#CCCCCC" },
    body2: { fontSize: "0.875rem", color: "#CCCCCC" }
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
          color: "#00bcd4",
          "&:hover": {
            color: "#4dd0e1",
            textDecoration: "underline"
          }
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          a: {
            color: "#00bcd4",
            "&:hover": {
              color: "#4dd0e1",
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