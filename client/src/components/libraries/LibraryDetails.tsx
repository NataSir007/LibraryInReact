import { Box, Container, Link, Stack, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsIcon from '@mui/icons-material/Directions';
import type { Library, LibraryNoteTranslation } from '../../types/library/interfaces';
import { useLibraryOpenStatus } from '../../hooks/useLibraryOpenStatus';
import { useTranslation } from 'react-i18next';
import i18n from '../../utils/i18n';

interface LibraryDetailsProps {
  library: Library;
}

export default function LibraryDetails({ library }: LibraryDetailsProps) {
const { libraryStatus } = useLibraryOpenStatus();
const { t } = useTranslation();

// Helper to get the note in the current language
  const getNoteForLanguage = (translations: LibraryNoteTranslation[], lang: string) => {
    return translations.find(tr => tr.language === lang)?.note || '';
  };

  const note = getNoteForLanguage(library.noteTranslations, i18n.language);

  return (    
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h6" gutterBottom>
        {library.name}
      </Typography>

      <Typography variant="body1" gutterBottom>
        {library.address}{' '}
        <Link href="#"></Link>{' '}
        <DirectionsIcon 
          sx={{ fontSize: 13, mr: 1, ml: 1, color: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.primary.main
              : theme.palette.secondary.main, }} />
      </Typography>
      
      <Stack direction="row" spacing={2} alignItems="center" sx={{ ml: 0 }}>
        <HomeIcon
          sx={{ fontSize: 16, mr: 1, ml: 1, color: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.primary.main
              : theme.palette.secondary.main, }} />
        <Link href={library.homepage} target="_blank" rel="noopener noreferrer">
          {t('libraryDetails.homepage')}
        </Link>
      </Stack>
      
      {library.libraryEmailContactDetails.length > 0 && (
        <Stack direction="row" spacing={2} alignItems="center" >
          <EmailIcon sx={{ fontSize: 13, mr: 1, ml: 1, color: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.primary.main
                : theme.palette.secondary.main, }} />
          <Link href={`mailto:${library.libraryEmailContactDetails[0].contactEmail}`}>
            {library.libraryEmailContactDetails[0].contactEmail}
          </Link>        
        </Stack>
      )}

      {library.facebookUrl && (
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
          <FacebookIcon sx={{ fontSize: 13, mr: 1, ml: 1, color: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.primary.main
                : theme.palette.secondary.main, }} />
          <Link href={library.facebookUrl} target="_blank" rel="noopener noreferrer">
            {(t('libraryDetails.facebook'))}
          </Link>
        </Stack>
      )}

      <Box sx={{ mt: 3 }}>
        <Typography 
          variant="subtitle1" 
          sx={{
            color: libraryStatus && libraryStatus.isOpen 
              ? (theme) => theme.palette.success.main 
              : (theme) => theme.palette.error.dark
          }}
        >
          {libraryStatus && libraryStatus.isOpen ? t('libraryDetails.open') : t('libraryDetails.closed')}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <AccessTimeIcon sx={{ fontSize: 16, mr: 1, ml: 1, color: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.primary.main
              : theme.palette.secondary.main, }} />
          <Typography variant="body1">
            {libraryStatus?.isOpen ? libraryStatus.statusText : ''}
          </Typography>
        </Stack>
      </Box>

      {note && (
        <Typography variant="body2" sx={{ mt: 4 }}>
          {note}
        </Typography>
      )}
    </Container>
  );
}
