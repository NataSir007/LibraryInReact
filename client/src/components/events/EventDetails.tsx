import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EventService from '../../services/eventService';
import { Box, Grid, Typography, Stack, CircularProgress, Chip, Divider } from '@mui/material';
import 'dayjs/locale/fi';
import OpenStreetMap from '../libraries/OpenStreetMap';
import { geocodeAddress } from '../../utils/openStreetMapGeocoding';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useTranslation } from 'react-i18next';
import type { DetailedEvent, EventSummary } from '../../types/library/interfaces';
import EventDateTimeInfo from './EventDateTimeInfo';
import EventCard from './EventCard';

export default function EventDetails() {
  const { i18n, t } = useTranslation();
  const languageCode = i18n.language;
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<DetailedEvent | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [seriesEvents, setSeriesEvents] = useState<EventSummary[]>([]);

  const handleTagNames: Record<string, string> = {
    "Language Cafés and discussion groups": "languageCafe",
    "Literature": "literature",
    "Music": "music",
    "Exhibitions": "exhibition",
    "Training and courses": "trainingCourses",
    "For senior citizens": "seniorCitizens",
    "For children and families": "childrenFamilies",
    "Other events": "other"
  };

  useEffect(() => {
    if (!eventId) return;
    setLoading(true);
    setError(null);
    EventService.getEvent(languageCode, eventId)
      .then(event => {
        if (event) setEvent(event);
        else setError('Event not found');
      })
      .catch(() => setError('Failed to fetch event'))
      .finally(() => setLoading(false));
  }, [eventId, languageCode]);

  // Fetch future events in the same series
  useEffect(() => {
    if (!eventId) return;

    EventService.getEventSeries(languageCode, eventId)
      .then(events => setSeriesEvents(events || []))
      .catch(() => setSeriesEvents([]));
  }, [eventId, languageCode]);

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
                  label={t(`events.tags.${handleTagNames[tag] ?? tag}`, { defaultValue: tag })}
                  size="small"
                  sx={{ 
                    bgcolor: theme => theme.palette.mode === 'dark' ? theme.palette.info.main : theme.palette.primary.main, 
                    color: 'white', 
                    fontWeight: 600 
                  }}
                />
              ))}
            </Stack>
          )}
          
          <EventDateTimeInfo
            startTime={event.startTime}
            endTime={event.endTime}
            locale={i18n.language}
            fontSize={18}
            spacing={2}
            mb={2}
            mt={0}
            flexGrow={0}
          />
          
          <Box sx={{ mb: 2, mt: 2, display: 'flex', justifyContent: 'start' }}>
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
          
          <Typography variant="body1" sx={{ mb: 2 }}>
            {event.description}
          </Typography>
          
          {/* Custom info rows */}
          <Box sx={{ mb: 2 }}>
            <Stack spacing={1}>
              {/* When */}
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 600,
                    color: theme => theme.palette.mode === 'dark' ? theme.palette.info.main : theme.palette.primary.main
                  }}>
                  {t('events.questions.when', 'When?')}
                </Typography>
                <EventDateTimeInfo
                  startTime={event.startTime}
                  endTime={event.endTime}
                  locale={i18n.language}
                  fontSize={14}
                  spacing={1}
                  mb={0}
                  mt={0.5}
                  flexGrow={0}
                />
              </Stack>
              
              {/* Where */}
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 600,
                    color: theme => theme.palette.mode === 'dark' ? theme.palette.info.main : theme.palette.primary.main
                  }}>
                  {t('events.questions.where', 'Where?')}
                </Typography>
                <Typography variant="body2">
                  {event.libraryTitle}
                </Typography>
              </Stack>
              
              {/* Admission */}
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 600,
                    color: theme => theme.palette.mode === 'dark' ? theme.palette.info.main : theme.palette.primary.main
                  }}>
                  {t('events.questions.admission', 'Admission')}
                </Typography>
                <Typography variant="body2">
                  {event.admission || t('events.questions.unknown', 'See details')}
                </Typography>
              </Stack>
            </Stack>
          </Box>
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
          
          <Divider sx={{ my: 2 }} />

          {/* Upcoming events in this series */}
          {seriesEvents.length > 0 && (
            <>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                {t('events.upcomingInSeries', 'Upcoming in this series')}
              </Typography>
              <Stack spacing={2}>
                {seriesEvents.map(ev => (
                  <EventCard key={ev.id} event={ev} locale={languageCode} />
                ))}
              </Stack>
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
