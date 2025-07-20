import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "./Login";
import { MemoryRouter } from "react-router-dom";

// Mock de navigate y window.api.login
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  window.api = {
    login: jest.fn(),
  };
  mockNavigate.mockReset();
});

describe("Login component", () => {
  test("renderiza los campos del formulario", () => {
    render(<Login />, { wrapper: MemoryRouter });
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /LOGIN/i })).toBeInTheDocument();
  });

  test("permite llenar los campos y llama a window.api.login correctamente", async () => {
    const mockResponse = { status: "ok", user: { rol: "admin" } };
    window.api.login.mockResolvedValue(mockResponse);

    render(<Login />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "diego@mail.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /LOGIN/i }));

    await waitFor(() =>
      expect(window.api.login).toHaveBeenCalledWith({
        correo: "diego@mail.com",
        password: "123456",
      })
    );

    // Verifica redirección
    expect(mockNavigate).toHaveBeenCalledWith("/home");
  });

  test("muestra error si el login falla con status !== 'ok'", async () => {
    window.api.login.mockResolvedValue({ status: "error" });

    render(<Login />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "fallo@mail.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "mal" },
    });

    fireEvent.click(screen.getByRole("button", { name: /LOGIN/i }));

    await waitFor(() =>
      expect(screen.getByText(/Login incorrecto/i)).toBeInTheDocument()
    );
  });

  test("muestra error si hay excepción (error de red, etc)", async () => {
    window.api.login.mockRejectedValue(new Error("Network error"));

    render(<Login />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "error@mail.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "error" },
    });

    fireEvent.click(screen.getByRole("button", { name: /LOGIN/i }));

    await waitFor(() =>
      expect(screen.getByText(/Ocurrió un error/i)).toBeInTheDocument()
    );
  });

  test("no envía si faltan campos", async () => {
    render(<Login />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByRole("button", { name: /LOGIN/i }));

    expect(window.api.login).not.toHaveBeenCalled();
  });
});
