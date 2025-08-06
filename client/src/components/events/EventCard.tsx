import { Paper, Box, Typography, Stack } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventDateTimeInfo from './EventDateTimeInfo';
import { useNavigate } from 'react-router-dom';
import type { EventSummary } from '../../types/library/interfaces';

interface EventCardProps {
  event: EventSummary;
  locale: string;
}

export default function EventCard({ event, locale }: EventCardProps) {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={2}
      sx={{
        p: 1.5,
        display: 'flex',
        gap: 1.5,
        minHeight: 120,
        height: '100%',
        width: '100%',
        bgcolor: 'transparent',
        boxShadow: 3,
        cursor: 'pointer',
      }}
      onClick={() => navigate(`/events/${event.id}`)}
    >
      <Box
        sx={{
          width: 100,
          height: 150,
          flexShrink: 0,
          border: 1,
          borderColor: 'divider',
          borderRadius: 1,
          overflow: 'hidden',
          bgcolor: 'transparent',
        }}
      >
        <img
          src={event.fileName ? `/src/assets/images/${event.fileName}` : '/src/assets/images/placeholder.jpg'}
          alt={event.altText || event.eventName}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            background: 'transparent',
            display: 'block',
          }}
        />
      </Box>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="subtitle2"
          fontWeight={700}
          sx={{
            pb: 1.5,
            color: theme => theme.palette.mode === 'dark' ? theme.palette.info.main : theme.palette.primary.main,
          }}
        >
          {event.eventName}
        </Typography>
        {/* Add empty row if title is short to equalize card height */}
        {event.eventName.length < 30 && <Box sx={{ height: 24 }} />}
        <EventDateTimeInfo startTime={event.startTime} endTime={event.endTime} locale={locale} fontSize={13} />
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
          <LocationOnIcon sx={{ fontSize: 14 }} />
          <Typography variant="caption">
            {event.libraryTitle}
            {event.libraryAddress ? `, ${event.libraryAddress}` : ''}
          </Typography>
        </Stack>
      </Box>
    </Paper>
  );
}