import { Box, Grid, Typography, useMediaQuery, CircularProgress, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { useLibraries } from '../../hooks/useLibraries';
import LibrarySelector from './LibrarySelector';
import LibraryDetails from './LibraryDetails';
import LibraryOpeningHours from './LibraryOpeningHours';
import LibraryContactDetails from './LibraryContactDetails';
import SectionHeader from './SectionHeader';
import LibraryImage from './LibraryImage';
import OpenStreetMapLibrariesMap from './OpenStreetMapLibrariesMap';

export default function Libraries() {
  const theme = useTheme();
  const isLargerThanXs = useMediaQuery(theme.breakpoints.up("sm"));
  const { libraries, loading, error, refetch } = useLibraries();
  const [selectedLibraryId, setSelectedLibraryId] = useState<number | null>(null); // null means "All libraries"

  // Get the selected library when a specific library is chosen
  const selectedLibrary = selectedLibraryId 
    ? libraries.find(lib => lib.id === selectedLibraryId) 
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
  if (libraries.length === 0) {
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
            selectedLibraryId={selectedLibraryId}
            onLibraryChange={setSelectedLibraryId}
          />
        </Grid>        
        
        {/* Show library details only when a specific library is selected */}
        {selectedLibrary ? (
          <>
            {/* When specific library selected: show details on left, map on right */}
            <Grid size={5}>
              <LibraryDetails library={selectedLibrary} />
            </Grid>
            <Grid size={7}>
              <OpenStreetMapLibrariesMap 
                libraries={libraries}
                selectedLibraryId={selectedLibraryId}
                height="300px"
              />
            </Grid>
            <Grid size={3}>
              <SectionHeader title="General" />
            </Grid>
            <Grid size={3}>
              <SectionHeader title="Opening hours" />
            </Grid>
            <Grid size={6}>
              <SectionHeader title="Contact details" />
            </Grid>
            <Grid size={3}>
              {selectedLibrary?.libraryImages && selectedLibrary.libraryImages.length > 0 ? (
                (() => {
                  const mainImage = selectedLibrary.libraryImages.find(img => img.imageType === 1); // 1 = Main
                  return mainImage ? (
                    <LibraryImage
                      src={`/src/assets/images/${mainImage.fileName}`}
                      alt={mainImage.altText}
                    />
                  ) : (
                    <LibraryImage src="/src/assets/images/malmi-library-interior.jpg" alt="Library" />
                  );
                })()
              ) : (
                <LibraryImage src="/src/assets/images/rikhardinkatu-library-main.jpg" alt="Library" />
              )}
            </Grid>
            <Grid size={3}>
              <LibraryOpeningHours />
            </Grid>
            <Grid size={6}>
              <LibraryContactDetails library={selectedLibrary} />
            </Grid>
          </>
        ) : (
          /* When "All libraries" selected: show only full-width map */
          <Grid size={12}>
            <OpenStreetMapLibrariesMap 
              libraries={libraries}
              selectedLibraryId={selectedLibraryId}
              height="400px"
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}