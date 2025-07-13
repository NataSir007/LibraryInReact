import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  CircularProgress, 
  Alert,
  Box 
} from '@mui/material';
import { useLibraries } from '../../hooks/useLibraries';
import type { Library } from '../../types/library/interfaces';

const LibraryCard: React.FC<{ library: Library }> = ({ library }) => (
  <Box sx={{ mb: 2 }}>
    <Card>
      <CardContent>
        <Typography variant="h6" component="h2">
          {library.name}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {library.address}
        </Typography>
        <Typography variant="body2">
          {library.notes}
        </Typography>
        <Box mt={2}>
          <Typography variant="caption">
            Contact Details: {library.libraryEmailContactDetails.length} email(s), 
            {library.libraryPhoneNumberContactDetails.length} phone(s)
          </Typography>
        </Box>
      </CardContent>
    </Card>
  </Box>
);

const LibrariesList: React.FC = () => {
  const { libraries, loading, error, refetch } = useLibraries();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

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
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Libraries
      </Typography>
      <Box>
        {libraries.map((library: Library) => (
          <LibraryCard key={library.id} library={library} />
        ))}
      </Box>
    </Box>
  );
};

export default LibrariesList;
