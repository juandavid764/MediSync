import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { RegistroForm } from "./RegistroForm";
import { createPaciente } from "../../supabase/crudFunctions/pacienteTable";
import { getAllCiudades } from "../../supabase/crudFunctions/cuidadTable";

// Mock de las funciones externas
jest.mock("../../supabase/crudFunctions/pacienteTable");
jest.mock("../../supabase/crudFunctions/cuidadTable");

describe("RegistroForm", () => {
  const mockCambiarModo = jest.fn();
  const mockCiudades = [
    { id_cuidad: 1, nombre: "Bogotá" },
    { id_cuidad: 2, nombre: "Medellín" },
  ];

  beforeEach(() => {
    getAllCiudades.mockResolvedValue(mockCiudades);
    createPaciente.mockResolvedValue({ error: null });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renderiza correctamente el formulario", async () => {
    render(<RegistroForm cambiarModo={mockCambiarModo} />);

    // Espera a que se carguen las ciudades
    await waitFor(() => {
      expect(getAllCiudades).toHaveBeenCalledTimes(1);
    });

    // Verifica que todos los campos estén presentes
    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
    expect(screen.getByLabelText("Dirección")).toBeInTheDocument();
    expect(screen.getByLabelText("Teléfono")).toBeInTheDocument();
    expect(screen.getByLabelText("Fecha de nacimiento")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
    expect(screen.getByLabelText("Ciudad")).toBeInTheDocument();
    expect(screen.getByLabelText("Tipo de Documento")).toBeInTheDocument();
    expect(screen.getByLabelText("Número de Documento")).toBeInTheDocument();
    expect(screen.getByLabelText("Usuario")).toBeInTheDocument();
    expect(screen.getByText("Registrarse")).toBeInTheDocument();
  });

  test("maneja cambios en los campos del formulario", async () => {
    render(<RegistroForm cambiarModo={mockCambiarModo} />);

    await waitFor(() => {
      expect(getAllCiudades).toHaveBeenCalled();
    });

    const nombreInput = screen.getByLabelText("Nombre");
    const telefonoInput = screen.getByLabelText("Teléfono");

    fireEvent.change(nombreInput, {
      target: { name: "nombre", value: "Juan" },
    });
    fireEvent.change(telefonoInput, {
      target: { name: "telefono", value: "1234567890" },
    });

    expect(nombreInput.value).toBe("Juan");
    expect(telefonoInput.value).toBe("1234567890");
  });

  test("valida el campo teléfono (menos de 10 dígitos)", async () => {
    render(<RegistroForm cambiarModo={mockCambiarModo} />);

    await waitFor(() => {
      expect(getAllCiudades).toHaveBeenCalled();
    });

    const telefonoInput = screen.getByLabelText("Teléfono");

    // Ingresa menos de 10 dígitos
    fireEvent.change(telefonoInput, {
      target: { name: "telefono", value: "123" },
    });

    // Verifica que se muestre el mensaje de error
    expect(screen.getByText("Debes digitar 10 dígitos")).toBeInTheDocument();
    expect(telefonoInput.value).toBe("123");

    // Intenta enviar el formulario
    fireEvent.click(screen.getByText("Registrarse"));

    // Verifica que no se llame a createPaciente
    expect(createPaciente).not.toHaveBeenCalled();
  });

  test("valida el campo teléfono (más de 10 dígitos)", async () => {
    render(<RegistroForm cambiarModo={mockCambiarModo} />);

    await waitFor(() => {
      expect(getAllCiudades).toHaveBeenCalled();
    });

    const telefonoInput = screen.getByLabelText("Teléfono");

    // Intenta ingresar más de 10 dígitos
    fireEvent.change(telefonoInput, {
      target: { name: "telefono", value: "1234567890123" },
    });

    // Verifica que solo se permitan 10 dígitos
    expect(telefonoInput.value).toBe("");
  });

  test("envía el formulario correctamente", async () => {
    render(<RegistroForm cambiarModo={mockCambiarModo} />);

    await waitFor(() => {
      expect(getAllCiudades).toHaveBeenCalled();
    });

    // Llena todos los campos requeridos
    fireEvent.change(screen.getByLabelText("Nombre"), {
      target: { name: "nombre", value: "Juan" },
    });
    fireEvent.change(screen.getByLabelText("Dirección"), {
      target: { name: "direccion", value: "Calle 123" },
    });
    fireEvent.change(screen.getByLabelText("Teléfono"), {
      target: { name: "telefono", value: "1234567890" },
    });
    fireEvent.change(screen.getByLabelText("Fecha de nacimiento"), {
      target: { name: "fecha_nac", value: "1990-01-01" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { name: "email", value: "juan@test.com" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { name: "contrasena", value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Ciudad"), {
      target: { name: "ciudad", value: "1" },
    });
    fireEvent.change(screen.getByLabelText("Tipo de Documento"), {
      target: { name: "tipo_doc", value: "Cédula de ciudadanía" },
    });
    fireEvent.change(screen.getByLabelText("Número de Documento"), {
      target: { name: "num_doc", value: "123456789" },
    });
    fireEvent.change(screen.getByLabelText("Usuario"), {
      target: { name: "usuario", value: "juan123" },
    });

    // Envía el formulario
    fireEvent.click(screen.getByText("Registrarse"));

    await waitFor(() => {
      expect(createPaciente).toHaveBeenCalledWith({
        nombre: "Juan",
        direccion: "Calle 123",
        telefono: "1234567890",
        fecha_nac: "1990-01-01",
        email: "juan@test.com",
        contrasena: "password123",
        historial: null,
        ciudad: "1",
        tipo_doc: "Cédula de ciudadanía",
        num_doc: "123456789",
        usuario: "juan123",
      });

      // Verifica que se muestre el mensaje de éxito
      expect(
        screen.getByText("✅ Paciente registrado correctamente")
      ).toBeInTheDocument();

      // Verifica que se llame a cambiarModo
      expect(mockCambiarModo).toHaveBeenCalledTimes(1);
    });
  });

  test("No envia el formulario si hay feeckback", async () => {
    render(<RegistroForm cambiarModo={mockCambiarModo} />);

    await waitFor(() => {
      expect(getAllCiudades).toHaveBeenCalled();
    });

    // Llena todos los campos requeridos
    fireEvent.change(screen.getByLabelText("Nombre"), {
      target: { name: "nombre", value: "Juan" },
    });
    fireEvent.change(screen.getByLabelText("Dirección"), {
      target: { name: "direccion", value: "Calle 123" },
    });
    fireEvent.change(screen.getByLabelText("Teléfono"), {
      target: { name: "telefono", value: "123456789" },
    });
    fireEvent.change(screen.getByLabelText("Fecha de nacimiento"), {
      target: { name: "fecha_nac", value: "1990-01-01" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { name: "email", value: "juan@test.com" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { name: "contrasena", value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Ciudad"), {
      target: { name: "ciudad", value: "1" },
    });
    fireEvent.change(screen.getByLabelText("Tipo de Documento"), {
      target: { name: "tipo_doc", value: "Cédula de ciudadanía" },
    });
    fireEvent.change(screen.getByLabelText("Número de Documento"), {
      target: { name: "num_doc", value: "123456789" },
    });
    fireEvent.change(screen.getByLabelText("Usuario"), {
      target: { name: "usuario", value: "juan123" },
    });

    // Envía el formulario
    fireEvent.click(screen.getByText("Registrarse"));

    // Verifica que no se llame a createPaciente
    expect(createPaciente).not.toHaveBeenCalled();
  });

  test("maneja errores en el registro", async () => {
    createPaciente.mockResolvedValueOnce({
      error: new Error("Error de registro"),
    });

    render(<RegistroForm cambiarModo={mockCambiarModo} />);

    await waitFor(() => {
      expect(getAllCiudades).toHaveBeenCalled();
    });

    // Llena todos los campos requeridos
    fireEvent.change(screen.getByLabelText("Nombre"), {
      target: { name: "nombre", value: "Juan" },
    });
    fireEvent.change(screen.getByLabelText("Dirección"), {
      target: { name: "direccion", value: "Calle 123" },
    });
    fireEvent.change(screen.getByLabelText("Teléfono"), {
      target: { name: "telefono", value: "1234567890" },
    });
    fireEvent.change(screen.getByLabelText("Fecha de nacimiento"), {
      target: { name: "fecha_nac", value: "1990-01-01" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { name: "email", value: "juan@test.com" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { name: "contrasena", value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Ciudad"), {
      target: { name: "ciudad", value: "1" },
    });
    fireEvent.change(screen.getByLabelText("Tipo de Documento"), {
      target: { name: "tipo_doc", value: "Cédula de ciudadanía" },
    });
    fireEvent.change(screen.getByLabelText("Número de Documento"), {
      target: { name: "num_doc", value: "123456789" },
    });
    fireEvent.change(screen.getByLabelText("Usuario"), {
      target: { name: "usuario", value: "juan123" },
    });

    // Envía el formulario
    fireEvent.click(screen.getByText("Registrarse"));

    await waitFor(() => {
      expect(createPaciente).toHaveBeenCalled();

      // Verifica que se muestre el mensaje de error
      expect(
        screen.getByText("❌ Error al registrar paciente")
      ).toBeInTheDocument();

      // Verifica que NO se llame a cambiarModo
      expect(mockCambiarModo).not.toHaveBeenCalled();
    });
  });

  test("cambia a modo login al hacer clic en el enlace", async () => {
    render(<RegistroForm cambiarModo={mockCambiarModo} />);

    await waitFor(() => {
      expect(getAllCiudades).toHaveBeenCalled();
    });

    fireEvent.click(screen.getByText("Inicia sesión"));

    expect(mockCambiarModo).toHaveBeenCalledTimes(1);
  });

  test("maneja errores al cargar ciudades", async () => {
    getAllCiudades.mockRejectedValueOnce(new Error("Error al cargar ciudades"));

    render(<RegistroForm cambiarModo={mockCambiarModo} />);

    await waitFor(() => {
      expect(getAllCiudades).toHaveBeenCalledTimes(1);
    });

    // Verifica que el componente sigue renderizado
    expect(screen.getByText("Registro de Paciente")).toBeInTheDocument();
  });

  test("no envía el formulario si el teléfono tiene menos de 10 dígitos", async () => {
    render(<RegistroForm cambiarModo={mockCambiarModo} />);

    await waitFor(() => {
      expect(getAllCiudades).toHaveBeenCalled();
    });

    // Ingresa un teléfono con menos de 10 dígitos
    fireEvent.change(screen.getByLabelText("Teléfono"), {
      target: { name: "telefono", value: "123" },
    });

    // Intenta enviar el formulario
    fireEvent.click(screen.getByText("Registrarse"));

    // Verifica que no se llame a createPaciente
    expect(createPaciente).not.toHaveBeenCalled();

    // Verifica que el mensaje de error se muestre
    expect(screen.getByText("Debes digitar 10 dígitos")).toBeInTheDocument();
  });

  test("muestra feedback si el teléfono tiene menos de 10 dígitos y feedbackTel es false", async () => {
    render(<RegistroForm cambiarModo={mockCambiarModo} />);

    await waitFor(() => {
      expect(getAllCiudades).toHaveBeenCalled();
    });

    const telefonoInput = screen.getByLabelText("Teléfono");

    // Ingresa un teléfono con menos de 10 dígitos
    fireEvent.change(telefonoInput, {
      target: { name: "telefono", value: "123" },
    });

    // Verifica que se muestre el mensaje de feedback
    expect(screen.getByText("Debes digitar 10 dígitos")).toBeInTheDocument();
  });

  test("no cambia feedback si el teléfono tiene menos de 10 dígitos y feedbackTel ya es true", async () => {
    render(<RegistroForm cambiarModo={mockCambiarModo} />);

    await waitFor(() => {
      expect(getAllCiudades).toHaveBeenCalled();
    });

    const telefonoInput = screen.getByLabelText("Teléfono");

    // Simula que feedbackTel ya es true
    fireEvent.change(telefonoInput, {
      target: { name: "telefono", value: "123" },
    });
    fireEvent.change(telefonoInput, {
      target: { name: "telefono", value: "12" },
    });

    // Verifica que el mensaje de feedback siga mostrándose
    expect(screen.getByText("Debes digitar 10 dígitos")).toBeInTheDocument();
  });

  test("oculta feedback si el teléfono tiene 10 o más dígitos y feedbackTel es true", async () => {
    render(<RegistroForm cambiarModo={mockCambiarModo} />);

    await waitFor(() => {
      expect(getAllCiudades).toHaveBeenCalled();
    });

    const telefonoInput = screen.getByLabelText("Teléfono");

    // Simula que feedbackTel es true
    fireEvent.change(telefonoInput, {
      target: { name: "telefono", value: "123" },
    });

    // Ingresa un teléfono con exactamente 10 dígitos
    fireEvent.change(telefonoInput, {
      target: { name: "telefono", value: "1234567890" },
    });

    // Verifica que el mensaje de feedback desaparezca
    expect(
      screen.queryByText("Debes digitar 10 dígitos")
    ).not.toBeInTheDocument();
  });

  test("no cambia feedback si el teléfono tiene 10 o más dígitos y feedbackTel ya es false", async () => {
    render(<RegistroForm cambiarModo={mockCambiarModo} />);

    await waitFor(() => {
      expect(getAllCiudades).toHaveBeenCalled();
    });

    const telefonoInput = screen.getByLabelText("Teléfono");

    // Ingresa un teléfono con exactamente 10 dígitos
    fireEvent.change(telefonoInput, {
      target: { name: "telefono", value: "1234567890" },
    });

    // Verifica que el mensaje de feedback no se muestre
    expect(
      screen.queryByText("Debes digitar 10 dígitos")
    ).not.toBeInTheDocument();
  });
});
