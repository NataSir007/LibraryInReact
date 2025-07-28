
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EventService from '../../services/eventService';
import type { EventSummary } from '../../services/eventService';
import { Box, Grid, Typography, Stack, CircularProgress, Chip } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/fi';
import OpenStreetMap from '../libraries/OpenStreetMap';
import { geocodeAddress } from '../../utils/openStreetMapGeocoding';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function EventsDetails() {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<EventSummary | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!eventId) return;
    setLoading(true);
    setError(null);
    EventService.getAllEvents('fi')
      .then(events => {
        const found = events.find(e => e.id === Number(eventId));
        if (found) setEvent(found);
        else setError('Event not found');
      })
      .catch(() => setError('Failed to fetch event'))
      .finally(() => setLoading(false));
  }, [eventId]);

  useEffect(() => {
    if (event && event.libraryAddress) {
      geocodeAddress(event.libraryAddress).then(result => {
        if (result) setCoords({ lat: result.lat, lng: result.lng });
      });
    }
  }, [event]);

  if (loading) return <Box sx={{ p: 4 }}><CircularProgress /></Box>;
  if (error) return <Box sx={{ p: 4 }}><Typography color="error">{error}</Typography></Box>;
  if (!event) return null;

  return (
    <Box sx={{ justifyContent: 'center', width: 1050, p: 2 }}>
      <Grid container spacing={4}>
        <Grid size={7} sx={{ mb: 2 }}>
          <Typography
            variant="h5"
            fontWeight={700}
            gutterBottom
            sx={{ color: theme => theme.palette.mode === 'dark' ? theme.palette.info.main : theme.palette.primary.main }}
          >
            {event.eventName}
          </Typography>
          {/* Tags as blue chips, aligned right */}
          {event.tags && event.tags.length > 0 && (
            <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              {event.tags.map(tag => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{ bgcolor: theme => theme.palette.mode === 'dark' ? theme.palette.info.main : theme.palette.primary.main, color: 'white', fontWeight: 600 }}
                />
              ))}
            </Stack>
          )}
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            {(() => {
              const start = dayjs(event.startTime).locale('fi');
              const end = dayjs(event.endTime).locale('fi');
              if (start.isSame(end, 'day')) {
                return <>
                  <EventIcon sx={{ fontSize: 18 }} />
                  <Typography variant="body2">{start.format('D.M.YYYY')}</Typography>
                  <AccessTimeIcon sx={{ fontSize: 18 }} />
                  <Typography variant="body2">{start.format('HH:mm')} – {end.format('HH:mm')}</Typography>
                </>;
              } else {
                return <>
                  <EventIcon sx={{ fontSize: 18 }} />
                  <Typography variant="body2">{start.format('D.M.YYYY')} – {end.format('D.M.YYYY')}</Typography>
                </>;
              }
            })()}
          </Stack>
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'start' }}>
            <img
              src={event.fileName ? `/src/assets/images/${event.fileName}` : '/src/assets/images/placeholder.jpg'}
              alt={event.altText || event.eventName}
              style={{
                width: '100%',
                maxWidth: 400,
                height: 'auto',
                maxHeight: 300,
                objectFit: 'cover',
                borderRadius: 12,
                boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
                background: 'transparent',
                display: 'block',
              }}
            />
          </Box>
          {/* You can add event.description or other fields here if available 
          <Typography variant="body1" sx={{ mb: 2 }}>            
            {event.libraryTitle}{event.libraryAddress ? `, ${event.libraryAddress}` : ''}
          </Typography>
          */}
        </Grid>
        <Grid size={4}>
          {coords && (
            <Box sx={{ mt: 2 }}>
              <OpenStreetMap
                center={coords}
                zoom={15}
                markers={[{
                  id: event.id,
                  lat: coords.lat,
                  lng: coords.lng,
                  title: event.libraryTitle,
                  description: event.libraryAddress
                }]}
                height={200}
              />
            </Box>
          )}
          
          <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
            {event.libraryTitle}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <LocationOnIcon sx={{ fontSize: 18 }} />
            <Typography variant="body2">{event.libraryAddress}</Typography>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
