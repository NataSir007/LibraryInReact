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
import { useTranslation } from 'react-i18next';

const LibraryCard: React.FC<{ library: Library }> = ({ library }) => {
  const { t } = useTranslation();

  return (
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
              {t('librariesList.contactDetails')}"{library.libraryEmailContactDetails.length} {t('librariesList.emails')}
              {library.libraryPhoneNumberContactDetails.length} {t('librariesList.phones')}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};


const LibrariesList: React.FC = () => {
  const { libraries, loading, error, refetch } = useLibraries();
  const { t } = useTranslation();

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
        <button onClick={refetch}>{t('common.retry')}</button>
      }>
        {error}
      </Alert>
    );
  }

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        {(t('librariesList.title'))}
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
