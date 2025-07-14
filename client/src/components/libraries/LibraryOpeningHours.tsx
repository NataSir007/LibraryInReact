import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState, useMemo } from 'react';
import { useLibrarySchedule } from '../../hooks/useLibrarySchedule';
import { OpeningHourType, WeekType } from '../../types/library/enums';
import type { HolidayWeek } from '../../types/library/interfaces';

interface WeekDay {
  date: string;
  day: string;
  time: string;
  isToday: boolean;
}

/**
 * Get the ISO week number for a given date
 */
function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

/**
 * Get the day of week as 0=Monday, 1=Tuesday, etc.
 */
function getDayOfWeek(date: Date): number {
  const day = date.getDay();
  return day === 0 ? 6 : day - 1; // Convert Sunday=0 to Sunday=6
}

/**
 * Get day abbreviation
 */
function getDayAbbreviation(dayOfWeek: number): string {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days[dayOfWeek];
}

/**
 * Get the opening hour type for a specific day in a holiday week
 */
function getOpeningHourTypeFromHolidayWeek(holidayWeek: HolidayWeek, dayOfWeek: number): OpeningHourType {
  const days = [
    holidayWeek.monday,
    holidayWeek.tuesday, 
    holidayWeek.wednesday,
    holidayWeek.thursday,
    holidayWeek.friday,
    holidayWeek.saturday,
    holidayWeek.sunday
  ];
  return days[dayOfWeek];
}

/**
 * Get the opening hour type for a regular week day
 */
function getRegularWeekOpeningHourType(dayOfWeek: number): OpeningHourType {
  switch (dayOfWeek) {
    case 0: case 1: case 2: case 3: // Monday to Thursday
      return OpeningHourType.Workday;
    case 4: // Friday
      return OpeningHourType.Friday;
    case 5: // Saturday
      return OpeningHourType.Saturday;
    case 6: // Sunday
      return OpeningHourType.Sunday;
    default:
      return OpeningHourType.Sunday;
  }
}

/**
 * Format time string from "HH:mm:ss" to "HH"
 */
function formatTime(timeString: string): string {
  const hours = timeString.substring(0, 2);
  return hours;
}

export default function LibraryOpeningHours() {
  const theme = useTheme();
  const { openingHours, holidayWeeks, loading } = useLibrarySchedule();
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);

  const weekData = useMemo(() => {
    if (loading || !openingHours.length) return null;

    // Debug: Log available data
    console.log('Available opening hours:', openingHours);
    console.log('Available holiday weeks:', holidayWeeks);

    const today = new Date();
    const currentWeek = new Date(today);
    currentWeek.setDate(today.getDate() + (currentWeekOffset * 7));
    
    const weekNumber = getWeekNumber(currentWeek);
    console.log('Calculated week number:', weekNumber, 'for date:', currentWeek.toISOString());
    
    // Find the start of the week (Monday)
    const startOfWeek = new Date(currentWeek);
    const dayOfWeek = getDayOfWeek(currentWeek);
    startOfWeek.setDate(currentWeek.getDate() - dayOfWeek);

    // Check if this week is a holiday week
    const holidayWeek = holidayWeeks.find(hw => hw.weekNumber === weekNumber);
    console.log('Found holiday week:', holidayWeek);

    const weekDays: WeekDay[] = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      
      const dayOfWeekNum = i; // 0=Monday, 1=Tuesday, etc.
      const isToday = date.toDateString() === today.toDateString();
      
      let openingHourType: OpeningHourType;
      
      if (holidayWeek) {
        openingHourType = getOpeningHourTypeFromHolidayWeek(holidayWeek, dayOfWeekNum);
      } else {
        openingHourType = getRegularWeekOpeningHourType(dayOfWeekNum);
      }
      
      // Find the corresponding opening hour details
      const weekType = holidayWeek ? WeekType.PublicHolidayWeek : WeekType.RegularWeek;
      const openingHour = openingHours.find(
        oh => oh.openingHourType === openingHourType && oh.weekType === weekType
      );
      
      let timeDisplay = 'N/A';
      if (openingHour) {
        const openingTime = formatTime(openingHour.openingTime);
        const closingTime = formatTime(openingHour.closingTime);
        
        if (openingTime === '00' && closingTime === '00') {
          timeDisplay = 'Closed';
        } else {
          timeDisplay = `${openingTime}–${closingTime}`;
        }
      } else {
        // Debug: Log when we can't find opening hours
        console.log(`Missing opening hour for type: ${openingHourType}, weekType: ${weekType}, date: ${date.toISOString()}`);
        console.log('Available opening hour types:', openingHours.map(oh => `${oh.openingHourType} (${oh.weekType})`));
        
        // If we can't find holiday week hours, try to fall back to regular week
        if (weekType === WeekType.PublicHolidayWeek) {
          const regularOpeningHour = openingHours.find(
            oh => oh.openingHourType === openingHourType && oh.weekType === WeekType.RegularWeek
          );
          if (regularOpeningHour) {
            console.log('Found fallback regular hour:', regularOpeningHour);
            const openingTime = formatTime(regularOpeningHour.openingTime);
            const closingTime = formatTime(regularOpeningHour.closingTime);
            
            if (openingTime === '00' && closingTime === '00') {
              timeDisplay = 'Closed';
            } else {
              timeDisplay = `${openingTime}–${closingTime}`;
            }
          } else {
            console.log('No fallback regular hour found either');
          }
        }
      }
      
      weekDays.push({
        date: `${date.getDate()}.${date.getMonth() + 1}.`,
        day: getDayAbbreviation(dayOfWeekNum),
        time: timeDisplay,
        isToday
      });
    }

    return {
      weekNumber,
      days: weekDays
    };
  }, [openingHours, holidayWeeks, loading, currentWeekOffset]);

  const handlePreviousWeek = () => {
    setCurrentWeekOffset(currentWeekOffset - 1);
  };

  const handleNextWeek = () => {
    setCurrentWeekOffset(currentWeekOffset + 1);
  };

  if (loading) {
    return (
      <Box>
        <Typography variant="subtitle2" sx={{ textAlign: 'center', mb: 2 }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  if (!weekData) {
    return (
      <Box>
        <Typography variant="subtitle2" sx={{ textAlign: 'center', mb: 2 }}>
          No schedule available
        </Typography>
      </Box>
    );
  }

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
          Week {weekData.weekNumber}
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
            {weekData.days.map((row) => (
              <TableRow 
                key={row.date}
                sx={{
                  backgroundColor: row.isToday 
                    ? theme.palette.action.selected 
                    : 'inherit'
                }}
              >
                <TableCell 
                  sx={{ 
                    fontWeight: row.isToday ? 'bold' : 'normal',
                    minWidth: '85px', // Ensure consistent width
                    whiteSpace: 'nowrap' // Prevent text wrapping
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
                  sx={{ 
                    fontWeight: row.isToday ? 'bold' : 'normal'
                  }}
                >
                  {row.time}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
