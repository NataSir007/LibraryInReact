import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import LanguageSelector from '../../components/navbar/LanguageSelector';
import ThemeSelector from '../../components/navbar/ThemeSelector';
import MenuItemLink from '../shared/components/MenuItemLink';
import { useTranslation } from 'react-i18next';
import MenuItemInfo from './MenuItemInfo';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import UserLogin from '../../components/user/UserLogin';

interface NavbarProps {
  value: string;
  handleChange: (theme: string) => void;
}

const Navbar = ({ value, handleChange }: NavbarProps) => {
  const { t } = useTranslation();
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          {/* Header Part */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {t("navbar.title")}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', flexGrow: 1 }}>
              <MenuItemLink to='/libraries'>
                  {t("navbar.libraries")}
              </MenuItemLink>
              <MenuItemLink to='/events'>
                  {t("navbar.events")}
              </MenuItemLink>
              <MenuItemInfo />
          </Box>
          <LanguageSelector />
          <Box sx={{ mx: 0.5 }} />
          <ThemeSelector value={value} handleChange={handleChange} />
          <Box sx={{ mx: 0.5 }} />
          <Button
            onClick={() => setLoginOpen(true)}
            variant="contained"
            color="primary"
            startIcon={<PersonIcon />}
          >
            {t("navbar.login")}
          </Button>
        </Toolbar>
      </AppBar>
      <UserLogin open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
};

export default Navbar;