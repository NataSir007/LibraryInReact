import type { ThemeOptions } from "@mui/material/styles";
/*
60% - Primary Orange-Red (#EE4B2B) - Dominates the UI: buttons, key elements, logo
30% - Deep Orange-Red (#B9381F) - Navigation bar, headers, sidebars
10% - Bright Accent (#FF7B5A) - CTAs, highlights, visual pops

Supporting Colors:
Soft Peach (#FFB3A0) - Drop-downs, hover states — gentle contrast
Background Light (#FFF5F0) - Page background — keeps UI clean and readable
Neutral Charcoal (#333333) - Text color — ensures accessibility and contrast
Warm Dark Red (#8A2412) - Search-bar focus or alerts — adds warmth and dynamism
*/

const LightTheme: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#EE4B2B",        // Primary Orange-Red (60% - dominates UI)
      light: "#FF7B5A",       // Bright Accent
      dark: "#B9381F",        // Deep Orange-Red
      contrastText: "#FFFFFF"
    },
    secondary: {
      main: "#B9381F",        // Deep Orange-Red (30% - navigation, headers)
      light: "#EE4B2B",       // Primary Orange-Red
      dark: "#8A2412",        // Warm Dark Red
      contrastText: "#FFFFFF"
    },
    error: {
      main: "#D32F2F",        // Error Red
      light: "#FF6659",       // Lighter error red
      dark: "#B71C1C",        // Darker error red
      contrastText: "#FFFFFF"
    },
    warning: {
      main: "#FF7B5A",        // Bright Accent (10% - CTAs, warnings)
      light: "#FFB3A0",       // Soft Peach
      dark: "#EE4B2B",        // Primary Orange-Red
      contrastText: "#333333"
    },
    info: {
      main: "#FFB3A0",        // Soft Peach (info, hover states)
      light: "#FFD4C4",       // Lighter peach
      dark: "#FF7B5A",        // Bright Accent
      contrastText: "#333333"
    },
    success: {
      main: "#388E3C",        // Green (success)
      light: "#66BB6A",       // Lighter green
      dark: "#2E7D32",        // Darker green
      contrastText: "#FFFFFF"
    },
    background: {
      default: "#FFF5F0",     // Background Light (page background)
      paper: "#FFFFFF"        // White (cards, dialogs)
    },
    text: {
      primary: "#333333",     // Neutral Charcoal (main text)
      secondary: "#EE4B2B",   // Primary Orange-Red (secondary text, links)
      disabled: "#BDBDBD"     // Light gray (disabled state)
    },
    divider: "#FFB3A0"        // Soft Peach (dividers)
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: { fontWeight: 700, fontSize: "2.5rem", color: "#b9381f" },
    h2: { fontWeight: 700, fontSize: "2rem", color: "#b9381f" },
    h3: { fontWeight: 700, fontSize: "1.75rem", color: "#b9381f" },
    h4: { fontWeight: 600, fontSize: "1.5rem", color: "#FF7F11" },
    h5: { fontWeight: 600, fontSize: "1.25rem", color: "#FF7F11" },
    h6: { fontWeight: 600, fontSize: "1rem", color: "#FF7F11" },
    body1: { fontSize: "1rem", color: "#333333" },
    body2: { fontSize: "0.875rem", color: "#333333" }
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
          color: "#FFF5F0",
          "&:hover": {
            color: "#FFB3A0",
            textDecoration: "underline"
          }
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          a: {
            color: "#FFF5F0",
            "&:hover": {
              color: "#FFB3A0",
              textDecoration: "underline"
            }
          }
        },
        h6: {
          color: "#FFFFFF"
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "#666666"
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        ul: { color: "#666666" },
        li: { color: "#666666" }
      }
    }
  }
};

export default LightTheme;