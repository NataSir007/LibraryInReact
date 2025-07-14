import { useState, useEffect } from 'react';
import { LibraryService } from '../services/libraryService';
import type { OpeningHour, HolidayWeek } from '../types/library/interfaces';

interface UseLibraryScheduleResult {
  openingHours: OpeningHour[];
  holidayWeeks: HolidayWeek[];
  loading: boolean;
  error: string | null;
}

export const useLibrarySchedule = (): UseLibraryScheduleResult => {
  const [openingHours, setOpeningHours] = useState<OpeningHour[]>([]);
  const [holidayWeeks, setHolidayWeeks] = useState<HolidayWeek[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [openingHoursData, holidayWeeksData] = await Promise.all([
          LibraryService.getOpeningHours(),
          LibraryService.getHolidayWeeks()
        ]);
        
        setOpeningHours(openingHoursData);
        setHolidayWeeks(holidayWeeksData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch library schedule');
      } finally {
        setLoading(false);
      }
    };

    fetchScheduleData();
  }, []);

  return {
    openingHours,
    holidayWeeks,
    loading,
    error
  };
};
