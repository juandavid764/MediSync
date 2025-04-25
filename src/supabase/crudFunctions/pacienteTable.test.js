import { supabase } from "../client";

import {
  getPacientes,
  getPacienteById,
  createPaciente,
  updatePaciente,
  deletePaciente,
} from "./pacienteTable.js";

jest.mock("../client");

describe("pacienteTable CRUD functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getPacientes", () => {
    it("should return all patients when successful", async () => {
      const mockData = [
        { id_paciente: 1, name: "Patient1" },
        { id_paciente: 2, name: "Patient2" },
      ];

      supabase.from.mockReturnValue({
        select: jest.fn().mockResolvedValue({ data: mockData, error: null }),
      });

      const result = await getPacientes();
      expect(result).toEqual(mockData);
    });

    it("should return null and log error when there is an error", async () => {
      const mockError = new Error("Error fetching patients");
      supabase.from.mockReturnValue({
        select: jest.fn().mockResolvedValue({ data: null, error: mockError }),
      });

      const result = await getPacientes();
      expect(result).toBeNull();
    });
  });

  describe("getPacienteById", () => {
    it("should return a patient by ID when successful", async () => {
      const mockData = { id_paciente: 1, name: "Patient1" };
      supabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest
              .fn()
              .mockResolvedValue({ data: mockData, error: null }),
          }),
        }),
      });

      const result = await getPacienteById(1);
      expect(result).toEqual(mockData);
    });

    it("should return null and log error when there is an error", async () => {
      const mockError = new Error("Error fetching patient by ID");
      supabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest
              .fn()
              .mockResolvedValue({ data: null, error: mockError }),
          }),
        }),
      });

      const result = await getPacienteById(1);
      expect(result).toBeNull();
    });
  });

  describe("createPaciente", () => {
    it("should create a new patient and return it when successful", async () => {
      const mockPaciente = { name: "New Patient" };
      const mockData = [{ id_paciente: 1, name: "New Patient" }];
      supabase.from.mockReturnValue({
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockResolvedValue({ data: mockData, error: null }),
        }),
      });

      const result = await createPaciente(mockPaciente);
      expect(result).toEqual(mockData[0]);
    });

    it("should return null and log error when there is an error", async () => {
      const mockError = new Error("Error creating patient");
      supabase.from.mockReturnValue({
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockResolvedValue({ data: null, error: mockError }),
        }),
      });

      const result = await createPaciente({ name: "New Patient" });
      expect(result).toBeNull();
    });
  });

  describe("updatePaciente", () => {
    it("should update a patient and return updated data when successful", async () => {
      const mockUpdatedFields = { name: "Updated Patient" };
      const mockData = [{ id_paciente: 1, name: "Updated Patient" }];
      supabase.from.mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockResolvedValue({ data: mockData, error: null }),
        }),
      });

      const result = await updatePaciente(1, mockUpdatedFields);
      expect(result).toEqual(mockData[0]);
    });

    it("should return null and log error when there is an error", async () => {
      const mockError = new Error("Error updating patient");
      supabase.from.mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockResolvedValue({ data: null, error: mockError }),
        }),
      });

      const result = await updatePaciente(1, { name: "Updated Patient" });
      expect(result).toBeNull();
    });
  });

  describe("deletePaciente", () => {
    it("should delete a patient and return deleted data when successful", async () => {
      const mockData = [{ id_paciente: 1, name: "Patient to delete" }];
      supabase.from.mockReturnValue({
        delete: jest.fn().mockReturnValue({
          eq: jest.fn().mockResolvedValue({ data: mockData, error: null }),
        }),
      });

      const result = await deletePaciente(1);
      expect(result).toEqual(mockData[0]);
    });

    it("should return null and log error when there is an error", async () => {
      const mockError = new Error("Error deleting patient");
      supabase.from.mockReturnValue({
        delete: jest.fn().mockReturnValue({
          eq: jest.fn().mockResolvedValue({ data: null, error: mockError }),
        }),
      });

      const result = await deletePaciente(1);
      expect(result).toBeNull();
    });
  });
});