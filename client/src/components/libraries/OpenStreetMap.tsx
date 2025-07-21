import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Box, Typography, Alert } from '@mui/material';
import { useEffect, useState, type ReactElement } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTranslation } from 'react-i18next';

// Fix for default markers in React-Leaflet
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapPosition {
  lat: number;
  lng: number;
}

interface MarkerData extends MapPosition {
  id: number;
  title: string;
  description?: string;
}

interface OpenStreetMapProps {
  center: MapPosition;
  zoom?: number;
  markers?: MarkerData[];
  onMarkerClick?: (markerId: number) => void;
  height?: string | number;
  width?: string | number;
}

// Component to update map view when center changes
const MapUpdater = ({ center, zoom }: { center: MapPosition; zoom: number }) => {
  const map = useMap();
  
  useEffect(() => {
    try {
      if (map && center.lat && center.lng && zoom) {
        map.setView([center.lat, center.lng], zoom);
      }
    } catch (error) {
      console.error('Error updating map view:', error);
    }
  }, [map, center, zoom]);
  
  return null;
};

const OpenStreetMap = ({ 
  center, 
  zoom = 10, 
  markers = [], 
  onMarkerClick,
  height = '400px',
  width = '100%'
}: OpenStreetMapProps): ReactElement => {
  const { t } = useTranslation();

  const [mapReady, setMapReady] = useState(false);

  // Validate and sanitize props
  const safeCenter = {
    lat: isFinite(center.lat) ? center.lat : 60.1699,
    lng: isFinite(center.lng) ? center.lng : 24.9384
  };
  
  const safeZoom = isFinite(zoom) && zoom >= 1 && zoom <= 18 ? zoom : 10;

  const mapStyle = {
    height,
    width,
    borderRadius: '8px',
    overflow: 'hidden',
  };

  try {
    return (
      <Box sx={{ position: 'relative' }}>
        <MapContainer
          center={[safeCenter.lat, safeCenter.lng]}
          zoom={safeZoom}
          style={mapStyle}
          whenReady={() => setMapReady(true)}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <MapUpdater center={safeCenter} zoom={safeZoom} />
          
          {markers
            .filter(marker => 
              isFinite(marker.lat) && 
              isFinite(marker.lng) && 
              marker.lat >= -90 && 
              marker.lat <= 90 && 
              marker.lng >= -180 && 
              marker.lng <= 180
            )
            .map((marker) => (
            <Marker
              key={marker.id}
              position={[marker.lat, marker.lng]}
              eventHandlers={{
                click: () => onMarkerClick?.(marker.id),
              }}
            >
              <Popup>
                <div>
                  <Typography variant="subtitle2" gutterBottom>
                    {marker.title}
                  </Typography>
                  {marker.description && (
                    <Typography variant="body2">
                      {marker.description}
                    </Typography>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        
        {!mapReady && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '8px',
            }}
          >
            <Typography>{t('openStreetMap.loadingMap')}</Typography>
          </Box>
        )}
      </Box>
    );
  } catch (error) {
    console.error('Error rendering OpenStreetMap:', error);
    return (
      <Alert severity="error">
        <Typography variant="h6">{t('openStreetMap.error')}</Typography>
        <Typography>
          {t('openStreetMap.failedToLoad')}
        </Typography>
      </Alert>
    );
  }
};

export default OpenStreetMap;
