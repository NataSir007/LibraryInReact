import type { ThemeOptions } from "@mui/material/styles";

const LightTheme: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#EE4B2B",        // Deep orange-red
      light: "#ff7b5a",       // Lighter shade of main
      dark: "#b9381f",        // Darker shade of main
      contrastText: "#fff"
    },
    secondary: {
      main: "#b9381f",        // Deep orange-red (matches primary dark)
      light: "#ff7b5a",       // Lighter shade of orange-red
      dark: "#8a2412",        // Even deeper shade
      contrastText: "#fff"
    },
    error: {
      main: "#d32f2f",
      contrastText: "#fff"
    },
    warning: {
      main: "#ffa726",
      contrastText: "#212121"
    },
    info: {
      main: "#EE4B2B",        // Use main for info as well
      contrastText: "#fff"
    },
    success: {
      main: "#388e3c",
      contrastText: "#fff"
    },
    background: {
      default: "#f5f5f5",
      paper: "#fff"
    },
    text: {
      primary: "#212121",
      secondary: "#424242",
      disabled: "#bdbdbd"
    },
    divider: "#e0e0e0"
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
          color: "#EE4B2B",
          "&:hover": {
            color: "#b9381f",
            textDecoration: "underline"
          }
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          a: {
            color: "#EE4B2B",
            "&:hover": {
              color: "#b9381f",
              textDecoration: "underline"
            }
          }
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "#424242"
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        ul: { color: "#424242" },
        li: { color: "#424242" }
      }
    }
  }
};

export default LightTheme;