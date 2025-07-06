import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <MapContainer center={[4.638, -74.084]} zoom={16} style={{ height: "100vh" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[4.638, -74.084]}>
        <Popup>
          Universidad Nacional de Colombia
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default App;