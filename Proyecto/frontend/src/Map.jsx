import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Report.css";
import Header from "./Header";
import { useAuth } from "./context/context.jsx";

function Map() {
  const navigate = useNavigate();
  const { rol } = useAuth();

  const [ubicaciones, setUbicaciones] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await window.api.map();
        setUbicaciones(response.data);
        console.log("Coordenadas recuperadas: ", response.data);
      } catch (error) {
        console.error("Error fetching ubicaciones:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="report-container">
      <Header rol={rol} view="map" />

      <div className="report-content">
        <h1
          className="form-title"
          style={{ textAlign: "center", padding: "0.1rem" }}
        >
          MAP
        </h1>
        <p
          className="form-subtitle"
          style={{ textAlign: "center", fontSize: "0.8rem", padding: "0.3rem" }}
        >
          ON THIS MAP YOU CAN VIEW THE AREAS WITH THE MOST RECORDED CASES
        </p>

        <div style={{ height: "400px", width: "100%" }}>
          <MapContainer
            center={[4.638193, -74.084046]}
            zoom={17}
            minZoom={16}
            maxZoom={18}
            maxBounds={[
              [4.6315, -74.0935], // suroeste[Abajo, Izquierda]
              [4.6445, -74.077], // noreste[Arriba, Derecha]
            ]}
            maxBoundsViscosity={1.0}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[4.638193, -74.084046]}>
              <Popup>Universidad Nacional de Colombia - Sede Bogotá</Popup>
            </Marker>
          </MapContainer>
        </div>
        {/* <p
          className="form-subtitle"
          style={{ textAlign: "center", fontSize: "0.6rem" }}
        >
          NOTE: THIS MAP IS UPDATED EVERY 10 SECONDS
        </p> */}
        <p
          className="form-subtitle"
          style={{ textAlign: "center", fontSize: "0.6rem" }}
        >
          This color symbolizes our dedication to eliminating all forms of
          violence.
        </p>
      </div>
    </div>
  );
}

export default Map;
