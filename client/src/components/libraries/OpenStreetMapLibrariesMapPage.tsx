import { Box, Typography, useMediaQuery, CircularProgress, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { type ReactElement } from 'react';
import { useLibraries } from '../../hooks/useLibraries';
import OpenStreetMapLibrariesMap from './OpenStreetMapLibrariesMap';
import SectionHeader from './SectionHeader';
import { useTranslation } from 'react-i18next';

const OpenStreetMapLibrariesMapPage = (): ReactElement => {
  const theme = useTheme();
  const isLargerThanXs = useMediaQuery(theme.breakpoints.up("sm"));
  const { libraries, loading, error, refetch } = useLibraries();
  const { t } = useTranslation();
  // Loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Alert severity="error" action={
        <button onClick={refetch}>{t('common.retry')}</button>
      }>
        {t('openStreetMap.LibrariesMapPage.error')}
      </Alert>
    );
  }

  return (
    <Box sx={{ 
      justifyContent: "center", 
      width: 1050,
      p: 2,
      pl: isLargerThanXs ? 20 : 1}}
    >
      <Typography variant="h4" gutterBottom>
        {t('openStreetMap.LibrariesMapPage.title')}
      </Typography>
      <Box sx={{ mb: 3 }}>
        <SectionHeader title={t('openStreetMap.LibrariesMapPage.subtitle')} />
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {t('openStreetMap.LibrariesMapPage.subtitleDescription')}
        </Typography>
      </Box>
      
      <Box sx={{ height: '600px', width: '100%' }}>
        <OpenStreetMapLibrariesMap 
          libraries={libraries}
          height="100%"
        />
      </Box>
      
      <Box sx={{ mt: 3 }}>
        <Typography variant="body2" color="text.secondary">
          {t('openStreetMap.LibrariesMapPage.instructions')}
        </Typography>
      </Box>
    </Box>
  );
};

export default OpenStreetMapLibrariesMapPage;
