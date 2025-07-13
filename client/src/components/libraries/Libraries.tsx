import { Box, Grid, Typography, useMediaQuery, CircularProgress, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import library from '../../assets/images/Library - Maunula.jpg';
import libraryMap from '../../assets/images/Library-map-Maunula.jpg';
import { useLibraries } from '../../hooks/useLibraries';
import LibrarySelector from './LibrarySelector';
import LibraryDetails from './LibraryDetails';
import OpeningHours from './OpeningHours';
import LibraryContactDetails from './LibraryContactDetails';
import SectionHeader from './SectionHeader';
import LibraryImage from './LibraryImage';

export default function Libraries() {
  const theme = useTheme();
  const isLargerThanXs = useMediaQuery(theme.breakpoints.up("sm"));
  const { libraries, loading, error, refetch } = useLibraries();
  const [selectedLibraryId, setSelectedLibraryId] = useState<number>(0);

  // Get the selected library or default to first library
  const selectedLibrary = libraries.length > 0 
    ? libraries.find(lib => lib.id === selectedLibraryId) || libraries[0]
    : null;

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

  // No libraries found
  if (!selectedLibrary) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6">No libraries found</Typography>
      </Box>
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
        Libraries and opening hours
      </Typography>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 4 }} columns={12}>
        <Grid size={12}>
          <SectionHeader title="Libraries" />
        </Grid>
        <Grid size={12}>
          <LibrarySelector 
            libraries={libraries}
            selectedLibraryId={selectedLibrary.id}
            onLibraryChange={setSelectedLibraryId}
          />
        </Grid>        
        <Grid size={5}>
          <LibraryDetails library={selectedLibrary} />
        </Grid>
        <Grid size={7}>
          <LibraryImage src={libraryMap} alt="Library Map" />
        </Grid>
        <Grid size={4}>
          <SectionHeader title="General" />
        </Grid>
        <Grid size={3}>
          <SectionHeader title="Opening hours" />
        </Grid>
        <Grid size={5}>
          <SectionHeader title="Contact details" />
        </Grid>
        <Grid size={4}>
          <LibraryImage src={library} alt="Library" />
        </Grid>
        <Grid size={3}>
          <OpeningHours />
        </Grid>
        <Grid size={5}>
          <LibraryContactDetails library={selectedLibrary} />
        </Grid>
      </Grid>
    </Box>
  );
}