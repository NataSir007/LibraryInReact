import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EventService from '../../services/eventService';
import type { EventSummary } from '../../services/eventService';
import { Box, Typography, CircularProgress, Button, Chip, useTheme } from '@mui/material';

export default function EventDetails() {
  const theme = useTheme();
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    // You may want to implement a getEventById in EventService
    EventService.getAllEvents('fi')
      .then(events => {
        const found = events.find(e => e.id === Number(id));
        if (found) setEvent(found);
        else setError('Event not found');
      })
      .catch(() => setError('Failed to fetch event'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Box sx={{ p: 4 }}><CircularProgress /></Box>;
  if (error) return <Box sx={{ p: 4 }}><Typography color="error">{error}</Typography></Box>;
  if (!event) return null;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>{event.eventName}</Typography>
      <img
        src={event.fileName ? `/src/assets/images/${event.fileName}` : '/src/assets/images/placeholder.jpg'}
        alt={event.altText || event.eventName}
        style={{ width: 300, height: 200, objectFit: 'cover', borderRadius: 8, marginBottom: 16 }}
      />
      <Typography variant="subtitle1" gutterBottom>
        {event.startTime} – {event.endTime}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {event.libraryTitle}{event.libraryAddress ? `, ${event.libraryAddress}` : ''}
      </Typography>
      {/* Tags */}
      {event.tags && event.tags.length > 0 && (
        <Box sx={{ mt: 2, mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {event.tags.map(tag => (
            <Chip
              key={tag}
              label={tag}
              sx={theme.palette.mode === 'dark' ? {
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                fontWeight: 600
              } : {}}
            />
          ))}
        </Box>
      )}
      <Button variant="outlined" href="/events" sx={{ mt: 2 }}>Back to Events</Button>
    </Box>
  );
}
