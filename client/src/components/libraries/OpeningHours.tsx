import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const openingHours = [
  { date: '30.6.', day: 'Mon', time: '09–20' },
  { date: '1.7.', day: 'Tue', time: '09–20' },
  { date: '2.7.', day: 'Wed', time: '09–20' },
  { date: '3.7.', day: 'Thu', time: '09–20' },
  { date: '4.7.', day: 'Fri', time: '09–16' },
  { date: '5.7.', day: 'Sat', time: 'Closed' },
  { date: '6.7.', day: 'Sun', time: 'Closed' },
];

export default function OpeningHours() {
  const theme = useTheme();

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <IconButton size="small">
          <ArrowBackIosIcon fontSize="small" style={{ fontSize: 13 }}  />
        </IconButton>
        <Typography variant="subtitle2" sx={{ mx: 1 }}>
          Week 27
        </Typography>
        <IconButton size="small">
          <ArrowForwardIosIcon fontSize="small" style={{ fontSize: 13 }}  />
        </IconButton>
      </Box>
      <TableContainer component={Paper}>
        <Table
          size="small"
          sx={{
            '& .MuiTableCell-root, & .MuiTableRow-root': {
              borderLeft: 'none',
              borderRight: 'none',
              backgroundColor: theme.palette.background.default
            },
            '& .MuiTableCell-root': {
              borderBottom: '1px solid rgba(224, 224, 224, 1)', 
            },
            '& .MuiTableRow-root:last-child .MuiTableCell-root': {
              borderBottom: 0,
            }
          }}
        >
          <TableBody>
            {openingHours.map((row) => (
              <TableRow key={row.date}>
                <TableCell>{`${row.date} ${row.day}`}</TableCell>
                <TableCell align="right">{row.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
