import { Menu, MenuItem, Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function MenuItemInfo() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleMenuClick = (path: string) => {
    navigate(path);
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        color="inherit"
        sx={{ fontSize: '1.25rem', textTransform: 'none', fontWeight: 500 }}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        {t('navbar.info')}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => handleMenuClick('/library-card-and-loans')}>
          {t('navbar.libraryCardAndLoans')}
        </MenuItem>
        <MenuItem onClick={() => handleMenuClick('/loan-periods-and-fees')}>
          {t('navbar.loanPeriodsAndFees')}
        </MenuItem>
      </Menu>
    </>
  );
}