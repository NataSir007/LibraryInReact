import { Box, Typography, useMediaQuery, CircularProgress, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { type ReactElement } from 'react';
import { useLibraries } from '../../hooks/useLibraries';
import OpenStreetMapLibrariesMap from './OpenStreetMapLibrariesMap';
import SectionHeader from './SectionHeader';

const OpenStreetMapLibrariesMapPage = (): ReactElement => {
  const theme = useTheme();
  const isLargerThanXs = useMediaQuery(theme.breakpoints.up("sm"));
  const { libraries, loading, error, refetch } = useLibraries();

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
        <button onClick={refetch}>Retry</button>
      }>
        {error}
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
        Library Locations Map
      </Typography>
      <Box sx={{ mb: 3 }}>
        <SectionHeader title="OpenStreetMap Integration" />
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          This map uses OpenStreetMap, a free and open-source mapping service. 
          Locations are geocoded using the Nominatim service.
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
          • Click on markers to view library details
          • Use the controls to zoom and pan around the map
          • Map data © OpenStreetMap contributors
        </Typography>
      </Box>
    </Box>
  );
};

export default OpenStreetMapLibrariesMapPage;
