import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Register from "./Register";

// Mock de window.api.register
beforeEach(() => {
  window.api = {
    register: jest.fn(),
  };
});

describe("Register component", () => {
  test("renderiza los campos del formulario", () => {
    render(<Register />);
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /REGISTER/i })).toBeInTheDocument();
  });

  test("permite llenar el formulario y llama a la API al enviar", async () => {
    const mockRegister = jest.fn().mockResolvedValue({ status: "ok" });
    window.api.register = mockRegister;

    render(<Register />);

    // Llenar campos
    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "test_register" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test_register@mail.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: "123456" },
    });

    // Enviar formulario
    fireEvent.click(screen.getByRole("button", { name: /REGISTER/i }));

    await waitFor(() =>
      expect(mockRegister).toHaveBeenCalledWith({
        nombre: "test_register",
        correo: "test_register@mail.com",
        password: "123456",
        rol: "student",
      })
    );
  });

  test("muestra error si las contraseñas no coinciden", async () => {
    render(<Register />);

    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: "654321" },
    });

    fireEvent.click(screen.getByRole("button", { name: /REGISTER/i }));

    await waitFor(() =>
      expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument()
    );
  });

  test("muestra error si falla el registro", async () => {
    window.api.register.mockRejectedValue(new Error("Error de red"));

    render(<Register />);

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "Test" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@mail.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "abc123" },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: "abc123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /REGISTER/i }));

    await waitFor(() =>
      expect(screen.getByText(/Error al registrar/i)).toBeInTheDocument()
    );
  });
});
