import { Box, Container, Link, Stack, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsIcon from '@mui/icons-material/Directions';
import type { Library } from '../../types/library/interfaces';
import { useLibrarySchedule } from '../../hooks/useLibrarySchedule';
import { getLibraryStatus } from '../../utils/libraryStatus';

interface LibraryDetailsProps {
  library: Library;
}

export default function LibraryDetails({ library }: LibraryDetailsProps) {
  const { openingHours, holidayWeeks, loading: scheduleLoading } = useLibrarySchedule();
  
  // Calculate library status
  const libraryStatus = scheduleLoading 
    ? { isOpen: false, todayHours: 'Loading...', statusText: 'Loading...' }
    : getLibraryStatus(openingHours, holidayWeeks);

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
          Homepage
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
            Facebook
          </Link>
        </Stack>
      )}

      <Box sx={{ mt: 3 }}>
        <Typography 
          variant="subtitle1" 
          sx={{
            color: libraryStatus.isOpen 
              ? (theme) => theme.palette.success.main 
              : (theme) => theme.palette.error.dark
          }}
        >
          {libraryStatus.isOpen ? 'Open' : 'Closed'}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <AccessTimeIcon sx={{ fontSize: 16, mr: 1, ml: 1, color: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.primary.main
              : theme.palette.secondary.main, }} />
          <Typography variant="body1">
            {libraryStatus.statusText}
          </Typography>
        </Stack>
      </Box>

      {library.notes && (
        <Typography variant="body2" sx={{ mt: 4 }}>
          {library.notes}
        </Typography>
      )}
    </Container>
  );
}
