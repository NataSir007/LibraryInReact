import React, { useState } from 'react';
import { Menu, MenuItem, Button } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useTranslation } from 'react-i18next';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const languages = [
    { code: 'fi', label: 'Suomi' },
    { code: 'en', label: 'English' },
    { code: 'sv', label: 'Svenska' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    handleClose();
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        startIcon={<LanguageIcon />}
        endIcon={<ArrowDropDownIcon />}
      >
        {currentLanguage.label}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            selected={lang.code === i18n.language}
            onClick={() => handleChangeLanguage(lang.code)}
          >
            {lang.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default LanguageSelector;
