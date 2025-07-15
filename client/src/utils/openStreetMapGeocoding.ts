// Free geocoding utilities using OpenStreetMap's Nominatim API
// No API key required - completely free!

export interface GeocodeResult {
  lat: number;
  lng: number;
  formatted_address?: string;
}

export interface GeocodeCache {
  [address: string]: GeocodeResult;
}

// Simple in-memory cache for geocoded addresses
let geocodeCache: GeocodeCache = {};

/**
 * Geocode an address using OpenStreetMap's free Nominatim API
 * No API key required!
 */
export const geocodeAddress = async (address: string): Promise<GeocodeResult | null> => {
  // Check cache first
  if (geocodeCache[address]) {
    return geocodeCache[address];
  }

  try {
    // Use Nominatim API (free geocoding service by OpenStreetMap)
    const encodedAddress = encodeURIComponent(address);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'LibraryInReact/1.0', // Required by Nominatim
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.length > 0) {
      const result = data[0];
      const geocodeResult: GeocodeResult = {
        lat: parseFloat(result.lat),
        lng: parseFloat(result.lon),
        formatted_address: result.display_name,
      };

      // Cache the result
      geocodeCache[address] = geocodeResult;

      return geocodeResult;
    }
  } catch (error) {
    console.error('Error geocoding address:', address, error);
  }

  return null;
};

/**
 * Geocode multiple addresses in batch with delay to respect Nominatim rate limits
 * Nominatim has a usage policy of max 1 request per second
 */
export const geocodeAddresses = async (addresses: string[]): Promise<(GeocodeResult | null)[]> => {
  const results: (GeocodeResult | null)[] = [];
  
  for (let i = 0; i < addresses.length; i++) {
    const result = await geocodeAddress(addresses[i]);
    results.push(result);
    
    // Add delay between requests to respect Nominatim usage policy
    if (i < addresses.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1100)); // 1.1 second delay
    }
  }
  
  return results;
};

/**
 * Get default map center (Finland coordinates as fallback)
 */
export const getDefaultMapCenter = (): { lat: number; lng: number } => {
  return { lat: 60.1699, lng: 24.9384 }; // Helsinki, Finland
};

/**
 * Calculate bounds for multiple coordinates
 */
export const calculateBounds = (coordinates: { lat: number; lng: number }[]): {
  north: number;
  south: number;
  east: number;
  west: number;
} | null => {
  if (coordinates.length === 0) {
    return null;
  }

  let north = coordinates[0].lat;
  let south = coordinates[0].lat;
  let east = coordinates[0].lng;
  let west = coordinates[0].lng;

  coordinates.forEach(coord => {
    north = Math.max(north, coord.lat);
    south = Math.min(south, coord.lat);
    east = Math.max(east, coord.lng);
    west = Math.min(west, coord.lng);
  });

  return { north, south, east, west };
};

/**
 * Calculate center point from bounds
 */
export const getCenterFromBounds = (bounds: {
  north: number;
  south: number;
  east: number;
  west: number;
}): { lat: number; lng: number } => {
  return {
    lat: (bounds.north + bounds.south) / 2,
    lng: (bounds.east + bounds.west) / 2,
  };
};

/**
 * Calculate appropriate zoom level based on bounds
 */
export const getZoomFromBounds = (bounds: {
  north: number;
  south: number;
  east: number;
  west: number;
}): number => {
  const latDiff = bounds.north - bounds.south;
  const lngDiff = bounds.east - bounds.west;
  const maxDiff = Math.max(latDiff, lngDiff);

  // Simple zoom calculation based on coordinate span
  if (maxDiff > 10) return 5;
  if (maxDiff > 5) return 6;
  if (maxDiff > 2) return 7;
  if (maxDiff > 1) return 8;
  if (maxDiff > 0.5) return 9;
  if (maxDiff > 0.1) return 10;
  if (maxDiff > 0.05) return 11;
  if (maxDiff > 0.01) return 12;
  return 13;
};

/**
 * Clear the geocode cache (useful for testing or memory management)
 */
export const clearGeocodeCache = (): void => {
  geocodeCache = {};
};
