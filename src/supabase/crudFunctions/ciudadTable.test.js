import { supabase } from "../client";

import {
  getAllCiudades,
  getCiudadById,
  createCiudad,
  updateCiudad,
  deleteCiudad,
} from "./cuidadTable.js";

jest.mock("../client");

describe("ciudadTable CRUD functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllCiudades", () => {
    it("should return all cities when successful", async () => {
      const mockData = [
        { id_cuidad: 1, name: "City1" },
        { id_cuidad: 2, name: "City2" },
      ];

      supabase.from.mockReturnValue({
        select: jest.fn().mockResolvedValue({ data: mockData, error: null }),
      });

      const result = await getAllCiudades();
      expect(result).toEqual(mockData);
    });

    it("should return null and log error when there is an error", async () => {
      const mockError = new Error("Error fetching cities");
      supabase.from.mockReturnValue({
        select: jest.fn().mockResolvedValue({ data: null, error: mockError }),
      });

      const result = await getAllCiudades();
      expect(result).toBeNull();
    });
  });

  describe("getCiudadById", () => {
    it("should return a city by ID when successful", async () => {
      const mockData = { id_cuidad: 1, name: "City1" };
      supabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest
              .fn()
              .mockResolvedValue({ data: mockData, error: null }),
          }),
        }),
      });

      const result = await getCiudadById(1);
      expect(result).toEqual(mockData);
    });

    it("should return null and log error when there is an error", async () => {
      const mockError = new Error("Error fetching city by ID");
      supabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest
              .fn()
              .mockResolvedValue({ data: null, error: mockError }),
          }),
        }),
      });

      const result = await getCiudadById(1);
      expect(result).toBeNull();
    });
  });

  describe("createCiudad", () => {
    it("should create a new city and return it when successful", async () => {
      const mockCiudad = { name: "New City" };
      const mockData = [{ id_cuidad: 1, name: "New City" }];
      supabase.from.mockReturnValue({
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockResolvedValue({ data: mockData, error: null }),
        }),
      });

      const result = await createCiudad(mockCiudad);
      expect(result).toEqual(mockData);
    });

    it("should return null and log error when there is an error", async () => {
      const mockError = new Error("Error creating city");
      supabase.from.mockReturnValue({
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockResolvedValue({ data: null, error: mockError }),
        }),
      });

      const result = await createCiudad({ name: "New City" });
      expect(result).toBeNull();
    });
  });

  describe("updateCiudad", () => {
    it("should update a city and return updated data when successful", async () => {
      const mockUpdatedFields = { name: "Updated City" };
      const mockData = [{ id_cuidad: 1, name: "Updated City" }];
      supabase.from.mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockResolvedValue({ data: mockData, error: null }),
        }),
      });

      const result = await updateCiudad(1, mockUpdatedFields);
      expect(result).toEqual(mockData);
    });

    it("should return null and log error when there is an error", async () => {
      const mockError = new Error("Error updating city");
      supabase.from.mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockResolvedValue({ data: null, error: mockError }),
        }),
      });

      const result = await updateCiudad(1, { name: "Updated City" });
      expect(result).toBeNull();
    });
  });

  describe("deleteCiudad", () => {
    it("should delete a city and return deleted data when successful", async () => {
      const mockData = [{ id_cuidad: 1, name: "City to delete" }];
      supabase.from.mockReturnValue({
        delete: jest.fn().mockReturnValue({
          eq: jest.fn().mockResolvedValue({ data: mockData, error: null }),
        }),
      });

      const result = await deleteCiudad(1);
      expect(result).toEqual(mockData);
    });

    it("should return null and log error when there is an error", async () => {
      const mockError = new Error("Error deleting city");
      supabase.from.mockReturnValue({
        delete: jest.fn().mockReturnValue({
          eq: jest.fn().mockResolvedValue({ data: null, error: mockError }),
        }),
      });

      const result = await deleteCiudad(1);
      expect(result).toBeNull();
    });
  });
});
