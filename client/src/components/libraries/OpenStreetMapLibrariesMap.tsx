import { useState, useEffect, type ReactElement } from 'react';
import {
  Box,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import OpenStreetMap from './OpenStreetMap';
import { 
  geocodeAddresses, 
  getDefaultMapCenter, 
  calculateBounds, 
  getCenterFromBounds,
  getZoomFromBounds,
  type GeocodeResult 
} from '../../utils/openStreetMapGeocoding';
import type { Library } from '../../types/library/interfaces';
import { useTranslation } from 'react-i18next';

interface LibraryMapProps {
  libraries: Library[];
  selectedLibraryId?: number | null; // null means show all, number means show specific library
  onLibrarySelect?: (library: Library) => void;
  height?: string | number;
}

interface LibraryWithCoordinates extends Library {
  coordinates?: GeocodeResult;
}

interface MarkerData {
  id: number;
  lat: number;
  lng: number;
  title: string;
  description?: string;
}

const OpenStreetMapLibrariesMap = ({ 
  libraries, 
  selectedLibraryId,
  onLibrarySelect,
  height = '500px'
}: LibraryMapProps): ReactElement => {
  const [librariesWithCoords, setLibrariesWithCoords] = useState<LibraryWithCoordinates[]>([]);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>(getDefaultMapCenter());
  const [mapZoom, setMapZoom] = useState(10);
  const { t } = useTranslation();

  // Geocode library addresses when libraries change
  useEffect(() => {
    if (libraries.length === 0) return;

    const geocodeLibraries = async () => {
      setIsGeocoding(true);
      setGeocodingError(null);

      try {
        const addresses = libraries.map(lib => lib.address);
        const geocodeResults = await geocodeAddresses(addresses);
        
        const librariesWithCoordinates: LibraryWithCoordinates[] = libraries.map((library, index) => ({
          ...library,
          coordinates: geocodeResults[index] || undefined,
        }));

        setLibrariesWithCoords(librariesWithCoordinates);

        // Set initial map center and zoom based on geocoded results
        const validCoordinates = geocodeResults.filter(Boolean) as GeocodeResult[];
        
        if (validCoordinates.length > 0) {
          if (validCoordinates.length === 1) {
            // Single library - center on it
            const { lat, lng } = validCoordinates[0];
            setMapCenter({ lat, lng });
            setMapZoom(15);
          } else {
            // Multiple libraries - calculate bounds
            const bounds = calculateBounds(validCoordinates);
            if (bounds) {
              const center = getCenterFromBounds(bounds);
              const zoom = getZoomFromBounds(bounds);
              setMapCenter(center);
              setMapZoom(zoom);
            }
          }
        }
      } catch (error) {
        console.error('Error geocoding libraries:', error);
        setGeocodingError(t('openStreetMap.librariesMap.geocodingError'));
      } finally {
        setIsGeocoding(false);
      }
    };

    geocodeLibraries();
  }, [libraries]);

  // Center map on selected library when selectedLibraryId changes
  useEffect(() => {
    if (selectedLibraryId && librariesWithCoords.length > 0) {
      const selectedLibrary = librariesWithCoords.find(lib => lib.id === selectedLibraryId);
      if (selectedLibrary?.coordinates) {
        const { lat, lng } = selectedLibrary.coordinates;
        if (isFinite(lat) && isFinite(lng)) {
          setMapCenter({ lat, lng });
          setMapZoom(15);
        }
      }
    } else if (selectedLibraryId === null) {
      // Show all libraries - calculate bounds
      const validCoordinates = librariesWithCoords
        .filter(lib => lib.coordinates)
        .map(lib => ({ lat: lib.coordinates!.lat, lng: lib.coordinates!.lng }));

      if (validCoordinates.length > 0) {
        if (validCoordinates.length === 1) {
          const { lat, lng } = validCoordinates[0];
          setMapCenter({ lat, lng });
          setMapZoom(15);
        } else {
          const bounds = calculateBounds(validCoordinates);
          if (bounds) {
            const center = getCenterFromBounds(bounds);
            const zoom = getZoomFromBounds(bounds);
            setMapCenter(center);
            setMapZoom(zoom);
          }
        }
      }
    }
  }, [selectedLibraryId, librariesWithCoords]);

  const handleMarkerClick = (markerId: number) => {
    const libraryWithCoords = librariesWithCoords.find(lib => lib.id === markerId);
    if (libraryWithCoords && onLibrarySelect) {
      onLibrarySelect(libraryWithCoords);
    }

    // Center map on clicked library
    if (libraryWithCoords?.coordinates) {
      const { lat, lng } = libraryWithCoords.coordinates;
      if (isFinite(lat) && isFinite(lng)) {
        setMapCenter({ lat, lng });
        setMapZoom(15);
      }
    }
  };

  // Filter libraries based on selectedLibraryId
  const librariesToShow = selectedLibraryId 
    ? librariesWithCoords.filter(lib => lib.id === selectedLibraryId)
    : librariesWithCoords;

  // Prepare markers for the map
  const markers: MarkerData[] = librariesToShow
    .filter(lib => lib.coordinates)
    .map(lib => ({
      id: lib.id,
      lat: lib.coordinates!.lat,
      lng: lib.coordinates!.lng,
      title: lib.name,
      description: lib.address,
    }));

  if (libraries.length === 0) {
    return (
      <Alert severity="info">
        <Typography>{t('openStreetMap.librariesMap.noLibraries')}</Typography>
      </Alert>
    );
  }

  return (
    <Box>
      {/* Reserve space for loading message to prevent layout jump */}
      <Box 
        display="flex" 
        alignItems="center" 
        gap={1} 
        mb={2} 
        minHeight="32px" // Reserve consistent height
      >
        {isGeocoding && (
          <>
            <CircularProgress size={20} />
            <Typography variant="body2">
              {t('openStreetMap.librariesMap.loading')}
            </Typography>
          </>
        )}
      </Box>

      {geocodingError && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {geocodingError}
        </Alert>
      )}

      {/* Map Only */}
      <OpenStreetMap
        center={mapCenter}
        zoom={mapZoom}
        markers={markers}
        onMarkerClick={handleMarkerClick}
        height={height}
      />
    </Box>
  );
};

export default OpenStreetMapLibrariesMap;
