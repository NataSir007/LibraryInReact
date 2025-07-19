import { useState, useEffect } from 'react';
import { LibraryService } from '../services/libraryService';
import type { LibraryOpeningHours } from '../types/library/interfaces';

interface UseLibraryScheduleResult {
  openingHours: LibraryOpeningHours | null;
  loading: boolean;
  error: string | null;
}

export const useLibrarySchedule = (weekOffset: number = 0): UseLibraryScheduleResult => {
  const [openingHours, setOpeningHours] = useState<LibraryOpeningHours | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        setLoading(true);
        setError(null);

        const openingHoursData = await LibraryService.getOpeningHours(weekOffset);

        setOpeningHours(openingHoursData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch library schedule');
      } finally {
        setLoading(false);
      }
    };

    fetchScheduleData();
  }, [weekOffset]); // Add weekOffset as a dependency

  return {
    openingHours,
    loading,
    error
  };
};