import { useState } from 'react';
import { Button, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useTranslation } from 'react-i18next';

interface ThemeSelectorProps {
  value: string;
  handleChange: (theme: string) => void;
}

const themes = [
  { value: 'dark', icon: <DarkModeIcon /> },
  { value: 'light', icon: <LightModeIcon /> },
  { value: 'custom', icon: <ColorLensIcon /> }
];

const ThemeSelector = ({ value, handleChange }: ThemeSelectorProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { t } = useTranslation();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeSelect = (theme: string) => {
    handleChange(theme);
    handleClose();
  };

  const currentTheme = themes.find(theme => theme.value === value);

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        startIcon={currentTheme?.icon}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {t(`navbar.theme${value.charAt(0).toUpperCase() + value.slice(1)}`)}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {themes.map((theme) => (
          <MenuItem
            key={theme.value}
            onClick={() => handleThemeSelect(theme.value)}
            selected={value === theme.value}
          >
            <ListItemIcon>
              {theme.icon}
            </ListItemIcon>
            <ListItemText>
              {t(`navbar.theme${theme.value.charAt(0).toUpperCase() + theme.value.slice(1)}`)}
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ThemeSelector;
