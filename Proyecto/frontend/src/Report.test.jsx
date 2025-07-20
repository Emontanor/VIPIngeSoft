import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Report from "./Report";
import { MemoryRouter } from "react-router-dom";
import L from "leaflet";

// Mock de Leaflet para evitar errores de mapa en test
jest.mock("react-leaflet", () => {
  const original = jest.requireActual("react-leaflet");
  return {
    ...original,
    MapContainer: ({ children }) => <div>{children}</div>,
    TileLayer: () => <div>Mapa</div>,
    Marker: () => <div>Marcador</div>,
    useMapEvents: () => ({}),
  };
});

// Mock de navigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  window.api = {
    report: jest.fn(),
  };
  mockNavigate.mockReset();
});

describe("Report component", () => {
  test("renderiza correctamente los campos", () => {
    render(<Report />, { wrapper: MemoryRouter });

    expect(screen.getByLabelText(/Título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descripción/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tipo de violencia/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Reportar/i })).toBeInTheDocument();
  });

  test("envía el formulario correctamente con todos los campos", async () => {
    window.api.report.mockResolvedValue({ status: "ok" });

    render(<Report />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/Título/i), {
      target: { value: "Violencia psicológica" },
    });
    fireEvent.change(screen.getByLabelText(/Descripción/i), {
      target: { value: "Test de incidente grave" },
    });
    fireEvent.change(screen.getByLabelText(/Tipo de violencia/i), {
      target: { value: "Psicológica" },
    });

    // Simulamos una ubicación seleccionada
    fireEvent.click(screen.getByRole("button", { name: /Reportar/i }));

    await waitFor(() =>
      expect(window.api.report).toHaveBeenCalledWith({
        titulo: "Violencia psicológica",
        descripcion: "Test de incidente grave",
        tipo: "Psicológica",
        latitud: expect.any(Number),
        longitud: expect.any(Number),
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/home");
  });

  test("muestra mensaje de error si el envío falla", async () => {
    window.api.report.mockRejectedValue(new Error("Error interno"));

    render(<Report />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/Título/i), {
      target: { value: "Error de prueba" },
    });
    fireEvent.change(screen.getByLabelText(/Descripción/i), {
      target: { value: "Descripción fallida" },
    });
    fireEvent.change(screen.getByLabelText(/Tipo de violencia/i), {
      target: { value: "Física" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Reportar/i }));

    await waitFor(() =>
      expect(screen.getByText(/Ocurrió un error/i)).toBeInTheDocument()
    );
  });

  test("no envía si faltan campos", async () => {
    render(<Report />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/Título/i), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByLabelText(/Descripción/i), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Reportar/i }));

    expect(window.api.report).not.toHaveBeenCalled();
  });
});
