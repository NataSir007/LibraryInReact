import type { ThemeOptions } from "@mui/material/styles";
/*
60% - Primary Violet (#6A0DAD) - Dominates the UI: buttons, key elements, logo
30% - Deep Violet (#4B0082) - Navigation bar, headers, sidebars
10% - Bright Accent (#9B30FF) - CTAs, highlights, visual pops

Supporting Colors:
Soft Lavender (#D8BFD8) - Drop-downs, hover states — gentle contrast
Background Light (#F8F6FA) - Page background — keeps UI clean and readable
Neutral Gray (#333333) - Text color — ensures accessibility and contrast
Highlight Pinkish Violet (#C71585) - Search-bar focus or alerts — adds warmth and dynamism
*/

const CustomTheme: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#6A0DAD",        // Primary Violet (60% - dominates UI)
      light: "#9B30FF",       // Bright Accent
      dark: "#4B0082",        // Deep Violet
      contrastText: "#ffffff" // White
    },
    secondary: {
      main: "#4B0082",        // Deep Violet (30% - navigation, headers)
      light: "#6A0DAD",       // Primary Violet
      dark: "#2E0854",        // Darker Deep Violet
      contrastText: "#ffffff" // White
    },
    error: {
      main: "#C71585",        // Highlight Pinkish Violet (alerts)
      light: "#E91E8C",       // Lighter Pink Violet
      dark: "#8B0A50",        // Darker Pink Violet
      contrastText: "#ffffff" // White
    },
    warning: {
      main: "#9B30FF",        // Bright Accent (10% - CTAs, warnings)
      light: "#B565FF",       // Lighter Bright Accent
      dark: "#7A26CC",        // Darker Bright Accent
      contrastText: "#ffffff" // White
    },
    info: {
      main: "#D8BFD8",        // Soft Lavender (info, hover states)
      light: "#E6D5E6",       // Lighter Lavender
      dark: "#B8A0B8",        // Darker Lavender
      contrastText: "#333333" // Neutral Gray
    },
    success: {
      main: "#6A0DAD",        // Primary Violet (success using brand color)
      light: "#9B30FF",       // Bright Accent
      dark: "#4B0082",        // Deep Violet
      contrastText: "#ffffff" // White
    },
    background: {
      default: "#F8F6FA",     // Background Light (page background)
      paper: "#ffffff"        // White (cards, dialogs)
    },
    text: {
      primary: "#333333",     // Neutral Gray (main text)
      secondary: "#6A0DAD",   // Primary Violet (secondary text, links)
      disabled: "#9E9E9E"     // Light gray (disabled state)
    },
    divider: "#D8BFD8"        // Soft Lavender (dividers)
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: { fontWeight: 700, fontSize: "2.5rem", color: "#4B0082" },
    h2: { fontWeight: 700, fontSize: "2rem", color: "#4B0082" },
    h3: { fontWeight: 700, fontSize: "1.75rem", color: "#4B0082" },
    h4: { fontWeight: 600, fontSize: "1.5rem", color: "#6A0DAD" },
    h5: { fontWeight: 600, fontSize: "1.25rem", color: "#6A0DAD" },
    h6: { fontWeight: 600, fontSize: "1rem", color: "#6A0DAD" },
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
          color: "#F8F6FA",
          "&:hover": {
            color: "#D8BFD8",
            textDecoration: "underline"
          }
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          a: {
            color: "#F8F6FA",
            "&:hover": {
              color: "#D8BFD8",
              textDecoration: "underline"
            }
          }
        },
        h6: {
          color: "#ffffff" // background.paper color for h6 in navbar
        }
      }
    }
  }
};

export default CustomTheme;