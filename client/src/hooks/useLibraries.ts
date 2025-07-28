import { useState, useEffect } from 'react';
import LibraryService from '../services/libraryService';
import type { Library, LibraryNameAddress } from '../types/library/interfaces';

// Custom hook for managing libraries
export const useLibraries = () => {
  const [libraries, setLibraries] = useState<LibraryNameAddress[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all libraries
  const fetchLibraries = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await LibraryService.getAllLibraries();
      setLibraries(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch libraries');
    } finally {
      setLoading(false);
    }
  };

  // Fetch libraries on component mount
  useEffect(() => {
    fetchLibraries();
  }, []);

  return {
    libraries,
    loading,
    error,
    refetch: fetchLibraries
  };
};

// Custom hook for single library
export const useLibrary = (id: number) => {
  const [library, setLibrary] = useState<Library | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await LibraryService.getLibrary(id);
        setLibrary(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch library');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchLibrary();
    }
  }, [id]);

  return {
    library,
    loading,
    error
  };
};
