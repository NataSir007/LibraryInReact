import type { OpeningHour, HolidayWeek, LibraryStatus } from '../types/library/interfaces';
import { OpeningHourType, WeekType } from '../types/library/enums';

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
 * Get day name from day of week number
 */
function getDayName(dayOfWeek: number): string {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days[dayOfWeek];
}

/**
 * Find next opening day and hours
 */
function findNextOpeningDay(
  openingHours: OpeningHour[], 
  holidayWeeks: HolidayWeek[], 
  currentDate: Date
): { nextOpenDay: string; nextOpenHours: string } | null {
  const maxDaysToCheck = 14; // Check up to 2 weeks ahead
  
  for (let daysAhead = 1; daysAhead <= maxDaysToCheck; daysAhead++) {
    const checkDate = new Date(currentDate);
    checkDate.setDate(checkDate.getDate() + daysAhead);
    
    const weekNumber = getWeekNumber(checkDate);
    const dayOfWeek = getDayOfWeek(checkDate);
    
    // Check if this date is in a holiday week
    const holidayWeek = holidayWeeks.find(hw => hw.weekNumber === weekNumber);
    
    let openingHourType: OpeningHourType;
    
    if (holidayWeek) {
      openingHourType = getOpeningHourTypeFromHolidayWeek(holidayWeek, dayOfWeek);
    } else {
      openingHourType = getRegularWeekOpeningHourType(dayOfWeek);
    }
    
    // Find the corresponding opening hour details
    const weekType = holidayWeek ? WeekType.PublicHolidayWeek : WeekType.RegularWeek;
    const openingHour = openingHours.find(
      oh => oh.openingHourType === openingHourType && oh.weekType === weekType
    );
    
    if (openingHour) {
      const openingTime = formatTime(openingHour.openingTime);
      const closingTime = formatTime(openingHour.closingTime);
      
      // Check if library is open on this day (not 00-00)
      if (!(openingTime === '00' && closingTime === '00')) {
        return {
          nextOpenDay: getDayName(dayOfWeek),
          nextOpenHours: `${openingTime}–${closingTime}`
        };
      }
    }
  }
  
  return null;
}

/**
 * Get the day of week as 0=Monday, 1=Tuesday, etc.
 */
function getDayOfWeek(date: Date): number {
  const day = date.getDay();
  return day === 0 ? 6 : day - 1; // Convert Sunday=0 to Sunday=6
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

/**
 * Parse time string to get hours only
 */
function parseTime(timeString: string): number {
  const hours = parseInt(timeString.substring(0, 2), 10);
  return hours;
}

/**
 * Check if current time is within opening hours
 */
function isCurrentTimeWithinHours(openingTime: string, closingTime: string, currentTime: Date): boolean {
  const openingHour = parseTime(openingTime);
  const closingHour = parseTime(closingTime);
  const currentHour = currentTime.getHours();
  
  // If closing time is 00, library is closed
  if (closingHour === 0) {
    return false;
  }
  
  return currentHour >= openingHour && currentHour < closingHour;
}

/**
 * Determine library status based on current date/time, opening hours, and holiday weeks
 */
export function getLibraryStatus(
  openingHours: OpeningHour[], 
  holidayWeeks: HolidayWeek[], 
  currentDate: Date = new Date()
): LibraryStatus {
  const weekNumber = getWeekNumber(currentDate);
  const dayOfWeek = getDayOfWeek(currentDate);
  
  // Check if current week is a holiday week
  const holidayWeek = holidayWeeks.find(hw => hw.weekNumber === weekNumber);
  
  let openingHourType: OpeningHourType;
  
  if (holidayWeek) {
    // Holiday week - get the specific opening hour type for this day
    openingHourType = getOpeningHourTypeFromHolidayWeek(holidayWeek, dayOfWeek);
  } else {
    // Regular week - get standard opening hour type
    openingHourType = getRegularWeekOpeningHourType(dayOfWeek);
  }
  
  // Find the corresponding opening hour details
  const weekType = holidayWeek ? WeekType.PublicHolidayWeek : WeekType.RegularWeek;
  const openingHour = openingHours.find(
    oh => oh.openingHourType === openingHourType && oh.weekType === weekType
  );
  
  if (!openingHour) {
    const nextOpening = findNextOpeningDay(openingHours, holidayWeeks, currentDate);
    const nextOpeningText = nextOpening 
      ? `Open ${nextOpening.nextOpenDay} ${nextOpening.nextOpenHours}`
      : 'Hours not available';
    
    return {
      isOpen: false,
      todayHours: 'Hours not available',
      statusText: nextOpeningText
    };
  }
  
  const openingTime = formatTime(openingHour.openingTime);
  const closingTime = formatTime(openingHour.closingTime);
  
  // Check if library is closed (00 - 00)
  if (openingTime === '00' && closingTime === '00') {
    const nextOpening = findNextOpeningDay(openingHours, holidayWeeks, currentDate);
    const nextOpeningText = nextOpening 
      ? `Open ${nextOpening.nextOpenDay} ${nextOpening.nextOpenHours}`
      : 'Closed';
    
    return {
      isOpen: false,
      todayHours: 'Closed',
      statusText: nextOpeningText
    };
  }
  
  const isWithinHours = isCurrentTimeWithinHours(
    openingHour.openingTime, 
    openingHour.closingTime, 
    currentDate
  );
  
  // If library is closed but has hours today, find next opening
  if (!isWithinHours) {
    const nextOpening = findNextOpeningDay(openingHours, holidayWeeks, currentDate);
    const nextOpeningText = nextOpening 
      ? `Open ${nextOpening.nextOpenDay} ${nextOpening.nextOpenHours}`
      : `Today ${openingTime} – ${closingTime}`;
    
    return {
      isOpen: false,
      todayHours: `${openingTime} – ${closingTime}`,
      statusText: nextOpeningText
    };
  }
  
  return {
    isOpen: isWithinHours,
    todayHours: `${openingTime} – ${closingTime}`,
    statusText: `Open today ${openingTime} – ${closingTime}`
  };
}
