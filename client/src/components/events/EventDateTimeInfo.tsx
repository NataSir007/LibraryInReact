import { Stack, Typography } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import dayjs from 'dayjs';

interface EventDateTimeInfoProps {
  startTime: string | Date;
  endTime: string | Date;
  locale?: string;
  fontSize?: number | string;
  spacing?: number;
  mb?: number;
  mt?: number;
  flexGrow?: number;

}

export default function EventDateTimeInfo({
  startTime,
  endTime,
  locale = 'fi',
  fontSize = 18,
  spacing,
  mb ,
  mt,
  flexGrow = 0,


}: EventDateTimeInfoProps) {
  const start = dayjs(startTime).locale(locale);
  const end = dayjs(endTime).locale(locale);

  if (start.isSame(end, 'day')) {
    return (
      <Stack direction="row" spacing={spacing} alignItems="center" sx={{ mt: {mt}, mb: {mb}, flexGrow: {flexGrow} }}>
        <EventIcon sx={{ fontSize }} />
        <Typography variant="body2" sx={{ fontSize }}>{start.format('D.M.YYYY')}</Typography>
        <AccessTimeIcon sx={{ fontSize }} />
        <Typography variant="body2" sx={{ fontSize }}>
          {start.format('HH:mm')} – {end.format('HH:mm')}
        </Typography>
      </Stack>
    );
  } else {
    return (
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5, flexGrow: 0 }}>
        <EventIcon sx={{ fontSize }} />
        <Typography variant="body2" sx={{ fontSize }}>
          {start.format('D.M.YYYY')} – {end.format('D.M.YYYY')}
        </Typography>
      </Stack>
    );
  }
}