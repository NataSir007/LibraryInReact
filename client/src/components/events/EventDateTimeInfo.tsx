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
  spacing = 1,
  mb = 0,
  mt = 0.5,
  flexGrow = 0,
}: EventDateTimeInfoProps) {
  const start = dayjs(startTime).locale(locale);
  const end = dayjs(endTime).locale(locale);

  if (start.isSame(end, 'day')) {
    return (
      <Stack
        direction="row"
        spacing={spacing}
        alignItems="center"
        sx={{ mt, mb, flexGrow }}
      >
        <EventIcon sx={{ fontSize, ml: 0.5 }} />
        <Typography variant="body2" sx={{ fontSize }}>{start.format('D.M.YYYY')}</Typography>
        <AccessTimeIcon sx={{ fontSize, ml: 0.5 }} />
        <Typography variant="body2" sx={{ fontSize }}>
          {start.format('HH:mm')} – {end.format('HH:mm')}
        </Typography>
      </Stack>
    );
  } else {
    return (
      <Stack
        direction="row"
        spacing={spacing}
        alignItems="center"
        sx={{ mt, mb, flexGrow }}
      >
        <EventIcon sx={{ fontSize, ml: 0.5 }} />
        <Typography variant="body2" sx={{ fontSize }}>
          {start.format('D.M.YYYY')} – {end.format('D.M.YYYY')}
        </Typography>
      </Stack>
    );
  }
}