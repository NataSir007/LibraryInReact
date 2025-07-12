import type { ThemeOptions } from "@mui/material/styles";

const CustomTheme: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#8e24aa",        // Violet 700
      light: "#d05ce3",       // Violet 300
      dark: "#5c007a",        // Violet 900
      contrastText: "#ffffff" // White
    },
    secondary: {
      main: "#ff9800",        // Orange 500
      light: "#ffc947",       // Orange 300
      dark: "#c66900",        // Orange 900
      contrastText: "#212121" // Dark grey
    },
    error: {
      main: "#d32f2f",        // Red 700
      contrastText: "#fff"    // White
    },
    warning: {
      main: "#ffa000",        // Amber 700
      contrastText: "#212121" // Dark grey
    },
    info: {
      main: "#f361fb",        // Pink 500
      contrastText: "#fff"    // White
    },
    success: {
      main: "#388e3c",        // Green 700
      contrastText: "#fff"    // White
    },
    background: {
      default: "#f5f5f5",     // Grey 100
      paper: "#ffffff"        // White
    },
    text: {
      primary: "#212121",     // Almost black
      secondary: "#616161",   // Dark grey
      disabled: "#bdbdbd"     // Light grey
    },
    divider: "#e0e0e0"        // Light grey
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
    }
  }
};

export default CustomTheme;