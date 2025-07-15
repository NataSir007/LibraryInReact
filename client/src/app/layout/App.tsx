import { useState, useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Navbar from './Navbar'
import LightTheme from "../shared/components/themes/LightTheme";
import DarkTheme from "../shared/components/themes/DarkTheme";
import CustomTheme from "../shared/components/themes/CustomTheme";
import Dashboard from "./Dashboard";
import CollapsibleFooter from "./CollapsibleFooter";

const themeMap: Record<string, unknown> = {
  light: LightTheme,
  dark: DarkTheme,
  custom: CustomTheme,
};

function App() {
  const [themeName, setThemeName] = useState("dark");

  const theme = useMemo(
    () => createTheme(themeMap[themeName] || DarkTheme),
    [themeName]
  );

 const handleThemeChange = (newTheme: string) => {
    setThemeName(newTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar value={themeName} handleChange={handleThemeChange} />
      {/* The routed content will be rendered by RouterProvider in main.tsx */}
      <Dashboard />
      <CollapsibleFooter />
    </ThemeProvider>
  );
}

export default App;