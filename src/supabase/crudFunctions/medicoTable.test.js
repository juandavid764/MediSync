import { supabase } from "../client";

import {
  getAllMedicos,
  getMedicoById,
  createMedico,
  updateMedico,
  deleteMedico,
} from "./medicoTable.js";

jest.mock("../client");

describe("medicoTable CRUD functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllMedicos", () => {
    it("should return all doctors when successful", async () => {
      const mockData = [
        { id_medico: 1, name: "Doctor1" },
        { id_medico: 2, name: "Doctor2" },
      ];

      supabase.from.mockReturnValue({
        select: jest.fn().mockResolvedValue({ data: mockData, error: null }),
      });

      const result = await getAllMedicos();
      expect(result).toEqual(mockData);
    });

    it("should return null and log error when there is an error", async () => {
      const mockError = new Error("Error fetching doctors");
      supabase.from.mockReturnValue({
        select: jest.fn().mockResolvedValue({ data: null, error: mockError }),
      });

      const result = await getAllMedicos();
      expect(result).toBeNull();
    });
  });

  describe("getMedicoById", () => {
    it("should return a doctor by ID when successful", async () => {
      const mockData = { id_medico: 1, name: "Doctor1" };
      supabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest
              .fn()
              .mockResolvedValue({ data: mockData, error: null }),
          }),
        }),
      });

      const result = await getMedicoById(1);
      expect(result).toEqual(mockData);
    });

    it("should return null and log error when there is an error", async () => {
      const mockError = new Error("Error fetching doctor by ID");
      supabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest
              .fn()
              .mockResolvedValue({ data: null, error: mockError }),
          }),
        }),
      });

      const result = await getMedicoById(1);
      expect(result).toBeNull();
    });
  });

  describe("createMedico", () => {
    it("should create a new doctor and return it when successful", async () => {
      const mockMedico = { name: "New Doctor" };
      const mockData = [{ id_medico: 1, name: "New Doctor" }];
      supabase.from.mockReturnValue({
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockResolvedValue({ data: mockData, error: null }),
        }),
      });

      const result = await createMedico(mockMedico);
      expect(result).toEqual(mockData);
    });

    it("should return null and log error when there is an error", async () => {
      const mockError = new Error("Error creating doctor");
      supabase.from.mockReturnValue({
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockResolvedValue({ data: null, error: mockError }),
        }),
      });

      const result = await createMedico({ name: "New Doctor" });
      expect(result).toBeNull();
    });
  });

  describe("updateMedico", () => {
    it("should update a doctor and return updated data when successful", async () => {
      const mockUpdatedFields = { name: "Updated Doctor" };
      const mockData = [{ id_medico: 1, name: "Updated Doctor" }];
      supabase.from.mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockResolvedValue({ data: mockData, error: null }),
        }),
      });

      const result = await updateMedico(1, mockUpdatedFields);
      expect(result).toEqual(mockData);
    });

    it("should return null and log error when there is an error", async () => {
      const mockError = new Error("Error updating doctor");
      supabase.from.mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockResolvedValue({ data: null, error: mockError }),
        }),
      });

      const result = await updateMedico(1, { name: "Updated Doctor" });
      expect(result).toBeNull();
    });
  });

  describe("deleteMedico", () => {
    it("should delete a doctor and return deleted data when successful", async () => {
      const mockData = [{ id_medico: 1, name: "Doctor to delete" }];
      supabase.from.mockReturnValue({
        delete: jest.fn().mockReturnValue({
          eq: jest.fn().mockResolvedValue({ data: mockData, error: null }),
        }),
      });

      const result = await deleteMedico(1);
      expect(result).toEqual(mockData);
    });

    it("should return null and log error when there is an error", async () => {
      const mockError = new Error("Error deleting doctor");
      supabase.from.mockReturnValue({
        delete: jest.fn().mockReturnValue({
          eq: jest.fn().mockResolvedValue({ data: null, error: mockError }),
        }),
      });

      const result = await deleteMedico(1);
      expect(result).toBeNull();
    });
  });
});