import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "react-toastify/dist/ReactToastify.css";
import "leaflet/dist/leaflet.css";
import "./Report.css";

// Icono rojo personalizado
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

function Report() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    link: "",
    date: "",
    type: "",
    description: "",
  });

  const [position, setPosition] = useState(null); // Coordenadas del clic
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validarFormulario = (e) => {
    e.preventDefault();
    const emailRegex = /^[^@]+@[^@]+$/;

    if (
      !form.name ||
      !form.email ||
      !form.age ||
      !form.link ||
      !form.date ||
      !form.type
    ) {
      setError("All fields are required (except description)");
      return;
    }
    if (isNaN(form.age) || Number(form.age) <= 0) {
      setError("Age must be a positive number");
      return;
    }

    if (!emailRegex.test(form.email)) {
      setError('Email must contain exactly one "@"');
      return;
    }

    if (!position) {
      setError("Please select a location on the map");
      return;
    }

    setError("");

    console.log("📌 Coordenadas seleccionadas:", position); // Para pruebas
    // Aquí puedes incluir `position.lat` y `position.lng` en el objeto a guardar

    toast.success("Report sent successfully", {
      position: "top-center",
      autoClose: 2000,
    });

    setForm({
      name: "",
      email: "",
      age: "",
      link: "",
      date: "",
      type: "",
      description: "",
    });
    setPosition(null); // Limpia el marcador
  };

  // Componente interno para manejar clics en el mapa
  const ClickMarker = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
      },
    });

    return position ? (
      <Marker position={position} icon={customIcon}>
        <Popup>Selected location</Popup>
      </Marker>
    ) : null;
  };

  return (
    <div className="report-container">
      <div className="report-header">
        <div className="header-buttons">
          <Link to="/statistics">
            <button className="header-btn">SEE THE STATISTICS</button>
          </Link>
          <Link to="/map">
            <button className="header-btn">SEE THE MAP</button>
          </Link>
          <button className="header-btn" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
        <div className="logo-wrapper">
          <span className="logo">CACVi-UN</span>
        </div>
      </div>

      <div className="report-content">
        <div className="form-header-text">
          <h1 className="form-title">Make your Report</h1>
          <p className="form-subtitle">Please complete the survey</p>
        </div>

        <form
          onSubmit={validarFormulario}
          className="report-form-single-column"
        >
          <div className="form-group">
            <label htmlFor="name">NAME AND LAST NAME</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Please put your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">EMAIL</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Do not forget put an @"
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">AGE</label>
            <input
              type="number"
              id="age"
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="Please put your age"
            />
          </div>

          <div className="form-group">
            <label htmlFor="link">LINK WITH THE UNIVERSITY</label>
            <select
              id="link"
              name="link"
              value={form.link}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Undergraduate student">
                Undergraduate student
              </option>
              <option value="Graduate student">Graduate student</option>
              <option value="Teacher">Teacher</option>
              <option value="Administrator">Administrator</option>
              <option value="Worker">Worker</option>
              <option value="External">External</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">DATE OF EVENT</label>
            <input
              type="date"
              id="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">
              TYPE OF VIOLENCE YOU HAVE BEEN A VICTIM OF
            </label>
            <select
              id="type"
              name="type"
              value={form.type}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Physical Violence">Physical Violence</option>
              <option value="Psychological Violence">
                Psychological Violence
              </option>
              <option value="Sexual Violence">Sexual Violence</option>
              <option value="Workplace Violence">Workplace Violence</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">PLEASE DESCRIBE THE EVENT</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the event (optional)"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="map-area">
              PLEASE SELECT THE AREA ON THE MAP WHERE THE EVENTS OCCURRED.
            </label>
            <div style={{ height: "400px", width: "100%", marginTop: "1rem" }}>
              <MapContainer
                center={[4.638193, -74.084046]}
                zoom={17}
                minZoom={16}
                maxZoom={20}
                maxBounds={[
                  [4.6315, -74.0935],
                  [4.6445, -74.069],
                ]}
                maxBoundsViscosity={1.0}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution="&copy; OpenStreetMap"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ClickMarker />
              </MapContainer>
            </div>
          </div>

          {error && <p className="error-msg">{error}</p>}
          <button type="submit" className="submit-btn">
            SEND THE REPORT
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Report;
