import { useState, useEffect } from 'react';
import { LibraryService } from '../services/libraryService';
import type { LibraryStatus } from '../types/library/interfaces';

interface UseLibraryOpenStatusResult {
  libraryStatus: LibraryStatus | null;
  loading: boolean;
  error: string | null;
}

export const useLibraryOpenStatus = (): UseLibraryOpenStatusResult => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [libraryStatus, setLibraryStatus] = useState<LibraryStatus | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        setLoading(true);
        setError(null);
        const { isOpen, statusText } = await LibraryService.getLibraryOpenStatus();
        setLibraryStatus({ isOpen, statusText });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch library status');
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  return { libraryStatus, loading, error };
};