import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import LanguageSelector from '../../components/navbar/LanguageSelector';
import MenuItemLink from '../shared/components/MenuItemLink';
const themes = ["dark", "light", "custom"];

interface NavbarProps {
  value: string;
  handleChange: (theme: string) => void;
}

const Navbar = ({ value, handleChange }: NavbarProps) => {

  const handleThemeClick = (theme: string) => {
    handleChange(theme);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          {/* Header Part */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            LibraryInReact
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', flexGrow: 1 }}>
              <MenuItemLink to='/libraries'>
                  Libraries
              </MenuItemLink>
              <MenuItemLink to='/events'>
                  Event
              </MenuItemLink>
              <MenuItemLink to='/info'>
                  Info
              </MenuItemLink>
              <MenuItemLink to='/content'>
                  Content
              </MenuItemLink>
          </Box>
          <LanguageSelector />
          {themes.map((theme) => (
            <Button
              key={theme}
              color="inherit"
              onClick={() => handleThemeClick(theme)}
              variant={value === theme ? "outlined" : "text"}
              sx={{ mx: 0.5 }}
            >
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;