import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import "./MapComponent.scss"
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';

const locations: Record<string, LatLngExpression> = {
  'New York': [40.7128, -74.006],
  "London": [51.5074, -0.1278],
  "Tokyo": [35.6895, 139.6917],
};

const LocationSelector: React.FC<{ onSelect: (position: LatLngExpression) => void }> = ({ onSelect }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = locations[event.target.value];
    if (selected) {
      onSelect(selected);
    }
  };

  return (
    <select onChange={handleChange}>
      <option value="">Select a location</option>
      {Object.keys(locations).map((city) => (
        <option key={city} value={city}>
          {city}
        </option>
      ))}
    </select>
  );
};

export const MapComponent: React.FC = () => {
  const [markers, setMarkers] = useState<LatLngExpression[]>([]);
  const [polyline, setPolyline] = useState<LatLngExpression[]>([]);
  const currentCountry = useSelector(
		(state: RootState) => state.dashboard.currentCountry
	);

  const handleAddMarker = (mapCenter: LatLngExpression) => {
    setMarkers((prev) => [...prev, mapCenter]);
    setPolyline((prev) => [...prev, mapCenter]);
  };

  useEffect(() => {
    console.log("map", currentCountry)
  }, [currentCountry])

  const MapControls: React.FC = () => {
    const map = useMap();

    const handleLocationSelect = (position: LatLngExpression) => {
      map.flyTo(position, 10, {
        duration: 1.5
      });
    };

    const handleAddPin = () => {
      const center = map.getCenter();
      handleAddMarker([center.lat, center.lng]);
    };

    return (
      <div
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          zIndex: 1000,
          background: 'white',
          padding: '10px',
          borderRadius: '5px',
        }}
      >
        <LocationSelector onSelect={handleLocationSelect} />
        <button onClick={handleAddPin} style={{ marginLeft: '10px' }}>
          Add Pin
        </button>
      </div>
    );
  };

  return (
    <div id="map">
      <MapContainer center={[20, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <MapControls />
        {markers.map((position, idx) => (
          <Marker key={idx} position={position}>
            <Popup>Marker {idx + 1}</Popup>
          </Marker>
        ))}
        {polyline.length > 1 && <Polyline positions={polyline} color='blue' />}
      </MapContainer>
    </div>
  );
};