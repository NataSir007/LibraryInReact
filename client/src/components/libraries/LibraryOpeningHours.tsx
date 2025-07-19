import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from 'react';
import { useLibrarySchedule } from '../../hooks/useLibrarySchedule';

export default function LibraryOpeningHours() {
  const theme = useTheme();
  const [weekOffset, setWeekOffset] = useState(0);

  // Pass weekOffset to the hook
  const { openingHours, loading, error } = useLibrarySchedule(weekOffset);

  // If loading, show a loading message
  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 3 }}>useLibrarySchedule
        <Typography variant="body1">Loading opening hours...</Typography>
      </Box>
    );
  }

  // If error, show error message
  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 3 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  // If no data, show a message
  if (!openingHours || !openingHours.days || openingHours.days.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 3 }}>
        <Typography variant="body1">No opening hours available.</Typography>
      </Box>
    );
  }

  // Handlers for week navigation
  const handlePreviousWeek = () => setWeekOffset((prev) => prev - 1);
  const handleNextWeek = () => setWeekOffset((prev) => prev + 1);

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <IconButton size="small" onClick={handlePreviousWeek}>
          <ArrowBackIosIcon fontSize="small" style={{ fontSize: 13 }} />
        </IconButton>
        <Typography variant="subtitle2" sx={{ mx: 1 }}>
          Week {openingHours.weekNumber}
        </Typography>
        <IconButton size="small" onClick={handleNextWeek}>
          <ArrowForwardIosIcon fontSize="small" style={{ fontSize: 13 }} />
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
            {openingHours.days.map((row: any) => (
              <TableRow 
                key={row.date}
              >
                <TableCell 
                  sx={{ 
                    minWidth: '85px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <Box 
                    component="span" 
                    sx={{ 
                      display: 'inline-block', 
                      minWidth: '35px',
                      textAlign: 'left'
                    }}
                  >
                    {row.date}
                  </Box>
                  <Box 
                    component="span" 
                    sx={{ 
                      display: 'inline-block', 
                      minWidth: '35px',
                      textAlign: 'left',
                      ml: 1
                    }}
                  >
                    {row.day}
                  </Box>
                </TableCell>
                <TableCell 
                  align="right"
                >
                  {row.openingTime || row.time}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}