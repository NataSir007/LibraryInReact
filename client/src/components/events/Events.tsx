import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Chip,
  Grid,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  Paper,
  Divider,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import dayjs from 'dayjs';
import 'dayjs/locale/fi';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { Dayjs } from 'dayjs';
import EventService from '../../services/eventService';
import { useTranslation } from 'react-i18next';
import type { EventSummary } from '../../types/library/interfaces';
import EventDateTimeInfo from './EventDateTimeInfo';


export default function EventsPage() {
  const { i18n, t } = useTranslation();
  const languageCode = i18n.language;
  const [tags, setTags] = useState<string[]>([]);
  const [events, setEvents] = useState<EventSummary[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTagNames: Record<string, string> = {
    "Language Cafés and discussion groups" : "languageCafe",
    "Literature": "literature",
    "Music": "music",
    "Exhibitions": "exhibition",
    "Training and courses": "trainingCourses",
    "For senior citizens": "seniorCitizens",
    "For children and families": "childrenFamilies",
    "Other events": "other"
  };
  
  // Fetch tags on mount
  useEffect(() => {
    EventService.getAllEvents(languageCode).then(setEvents);
    EventService.getAllTags().then(setTags);
    fetchFilteredEvents();
    // eslint-disable-next-line
  }, [languageCode]);

  // Fetch events when filters change (optional: you can also only fetch on button click)
  // useEffect(() => {
  //   fetchFilteredEvents();
  // }, [search, startDate, endDate]);

  const fetchFilteredEvents = async () => {
  setLoading(true);
  try {
    const result = await EventService.getFilteredEvents(
      search,
      startDate ? startDate.format('YYYY-MM-DD') : undefined,
      endDate ? endDate.format('YYYY-MM-DD') : undefined,
      languageCode
    );
    
    setEvents(result);
    } finally {
      setLoading(false);
    }
  };

  // Filter events by selected tags (client-side)
  const filteredEvents = selectedTags.length === 0
    ? events
    : events.filter(event => event.tags && event.tags.some(tag => selectedTags.includes(tag)));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{
        justifyContent: "center",
        width: 1050,
        p: 2,
      }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
          {t('navbar.events')}
        </Typography>
        {/* tags */}
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mb: 2, rowGap: 1.5 }}>
          <Chip
            label={t('events.allEvents')}
            color={selectedTags.length === 0 ? 'primary' : 'default'}
            onClick={() => setSelectedTags([])}
            sx={selectedTags.length === 0 ? (theme => ({
              bgcolor: theme.palette.mode === 'dark' ? theme.palette.info.main : theme.palette.primary.main,
              color: 'white',
              fontWeight: 600
            })) : {}}
          />
          {tags.map(tag => {
            const selected = selectedTags.includes(tag);
            const translationKey = handleTagNames[tag]; // Get the translation key
            return (
              <Chip
                key={tag}
                label={t(`events.tags.${translationKey ?? tag}`, { defaultValue: tag })}// Use the mapped key
                color={selected ? 'primary' : 'default'}
                onClick={() => {
                  setSelectedTags(prev =>
                    prev.includes(tag)
                      ? prev.filter(t => t !== tag)
                      : [...prev, tag]
                  );
                }}
                sx={selected ? (theme => ({
                  bgcolor: theme.palette.mode === 'dark' ? theme.palette.info.main : theme.palette.primary.main,
                  color: 'white',
                  fontWeight: 600
                })) : {}}
              />
            );
          })}
        </Stack>

        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <TextField
            label={t('events.eventTitleOrLibrary')}
            value={search}
            onChange={e => setSearch(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 250, flex: 1 }}
          />

          <DatePicker
            label={t('events.startDate')}
            value={startDate}
            onChange={(newValue: Dayjs | null) => setStartDate(newValue)}
            shouldDisableDate={date => date.isBefore(dayjs().startOf('day'))}
          />
          <DatePicker
            label={t('events.endDate')}
            value={endDate}
            onChange={(newValue: Dayjs | null) => setEndDate(newValue)}
            shouldDisableDate={date => date.isBefore(dayjs().startOf('day'))}
            minDate={startDate || dayjs().startOf('day')}
          />
          <Button
            variant="outlined"
            color="inherit"
            onClick={fetchFilteredEvents}
            sx={{
              height: 56,
              borderColor: theme => theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[300],
              color: theme => theme.palette.text.primary,
              backgroundColor: theme => theme.palette.background.paper,
              '&:hover': {
                borderColor: theme => theme.palette.primary.main,
                backgroundColor: theme => theme.palette.action.hover,
              },
            }}
            disabled={loading}
          >
            {t('events.find')}
          </Button>
        </Stack>
        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2} alignItems="stretch">
          {filteredEvents.length === 0 ? (
            <Grid size={12} sx={{ width: '100%' }}>
              <Typography variant="body1" color="text.secondary" align="center">
                {t('events.noEventsFound')}
              </Typography>
            </Grid>
          ) : (
            filteredEvents.map(event => (
              <Grid size={4} key={event.id} sx={{ display: 'flex' }}>
                <Paper elevation={2} sx={{ p: 1.5, display: 'flex', gap: 1.5, minHeight: 120, height: '100%', width: '100%', bgcolor: 'transparent', boxShadow: 3 }}
                  onClick={() => navigate(`/events/${event.id}`)} style={{ cursor: 'pointer' }}>
                  <Box sx={{ width: 100, height: 150, flexShrink: 0, border: 1, borderColor: 'divider', borderRadius: 1, overflow: 'hidden', bgcolor: 'transparent' }}>
                    <img
                      src={event.fileName ? `/src/assets/images/${event.fileName}` : '/src/assets/images/placeholder.jpg'}
                      alt={event.altText || event.eventName}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', background: 'transparent', display: 'block' }}
                    />
                  </Box>
                  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      variant="subtitle2"
                      fontWeight={700}
                      sx={{
                        pb: 1.5,
                        color: theme => theme.palette.mode === 'dark' ? theme.palette.info.main : theme.palette.primary.main
                      }}
                    >
                      {event.eventName}
                    </Typography>
                    {/* Add empty row if title is short to equalize card height */}
                    {event.eventName.length < 30 && <Box sx={{ height: 24 }} />}
                    <EventDateTimeInfo
                      startTime={event.startTime}
                      endTime={event.endTime}
                      locale={i18n.language}
                      fontSize={13}
                      spacing={1}
                      mb={0}
                      mt={0.5}
                      flexGrow={0}
                    />
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5, flexGrow: 0 }}>
                      <LocationOnIcon sx={{ fontSize: 14 }} />
                      <Typography variant="caption">{event.libraryTitle}{event.libraryAddress ? `, ${event.libraryAddress}` : ''}</Typography>
                    </Stack>
                  </Box>
                </Paper>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </LocalizationProvider>
  );
}