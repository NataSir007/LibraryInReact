import { Box, Alert, Typography, Chip } from '@mui/material';
import { CheckCircle, Map, Public, Security } from '@mui/icons-material';
import { type ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

const OpenStreetMapBenefitsAlert = (): ReactElement => {
  const { t } = useTranslation();
  return (
    <Box sx={{ mb: 2 }}>
      <Alert 
        severity="success" 
        icon={<Map />}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography variant="h6" gutterBottom>
          {t("openStreetMap.benefitsAlerts.title")}
        </Typography>
        
        <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
          <Chip 
            icon={<CheckCircle />} 
            label={t("openStreetMap.benefitsAlerts.noApiKeysRequired")} 
            color="success" 
            size="small" 
          />
          <Chip 
            icon={<Public />} 
            label={t("openStreetMap.benefitsAlerts.openSource")} 
            color="success" 
            size="small" 
          />
          <Chip 
            icon={<Security />} 
            label={t("openStreetMap.benefitsAlerts.privacyFriendly")} 
            color="success" 
            size="small" 
          />
          <Chip 
            label={t("openStreetMap.benefitsAlerts.zeroCost")} 
            color="success" 
            size="small" 
          />
        </Box>
        
        <Typography variant="body2" sx={{ mt: 1 }}>
          {t("openStreetMap.benefitsAlerts.description")}
        </Typography>
      </Alert>
    </Box>
  );
  return (
    <Alert 
      severity="success" 
      icon={<Map />}
      sx={{ mb: 2 }}
    >
      <Typography variant="h6" gutterBottom>
        🌍 Powered by OpenStreetMap - Completely Free!
      </Typography>
      
      <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
        <Chip 
          icon={<CheckCircle />} 
          label="No API Keys Required" 
          color="success" 
          size="small" 
        />
        <Chip 
          icon={<Public />} 
          label="Open Source" 
          color="success" 
          size="small" 
        />
        <Chip 
          icon={<Security />} 
          label="Privacy Friendly" 
          color="success" 
          size="small" 
        />
        <Chip 
          label="Zero Cost" 
          color="success" 
          size="small" 
        />
      </Box>
      
      <Typography variant="body2" sx={{ mt: 1 }}>
        This interactive map uses free and open-source mapping services. 
        No registration, setup, or costs required!
      </Typography>
    </Alert>
  );
};

export default OpenStreetMapBenefitsAlert;
