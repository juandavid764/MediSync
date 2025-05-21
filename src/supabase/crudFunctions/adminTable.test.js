import { createAdmin, getAllAdmins, getAdminById, updateAdmin, deleteAdmin } from './adminTable';
import { supabase } from '../client';

jest.mock('../client', () => ({
  supabase: {
    from: jest.fn()
  }
}));

describe('adminTable CRUD functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createAdmin', () => {
    it('should insert a new admin and return data', async () => {
      const mockInsert = jest.fn().mockReturnThis();
      const mockSelect = jest.fn().mockReturnThis();
      const mockSingle = jest.fn().mockResolvedValue({ data: { id_admin: 1 }, error: null });
      supabase.from.mockReturnValue({
        insert: mockInsert,
        select: mockSelect,
        single: mockSingle
      });
      const result = await createAdmin({ email: 'a', contrasena: 'b', sede: 'c' });
      expect(result).toEqual({ id_admin: 1 });
      expect(supabase.from).toHaveBeenCalledWith('admin');
      expect(mockInsert).toHaveBeenCalledWith([{ email: 'a', contrasena: 'b', sede: 'c' }]);
    });
    it('should throw error if supabase returns error', async () => {
      const mockInsert = jest.fn().mockReturnThis();
      const mockSelect = jest.fn().mockReturnThis();
      const mockSingle = jest.fn().mockResolvedValue({ data: null, error: new Error('fail') });
      supabase.from.mockReturnValue({ insert: mockInsert, select: mockSelect, single: mockSingle });
      await expect(createAdmin({ email: 'a', contrasena: 'b', sede: 'c' })).rejects.toThrow('fail');
    });
  });

  describe('getAllAdmins', () => {
    it('should return all admins', async () => {
      const mockSelect = jest.fn().mockResolvedValue({ data: [{ id_admin: 1 }], error: null });
      supabase.from.mockReturnValue({ select: mockSelect });
      const result = await getAllAdmins();
      expect(result).toEqual([{ id_admin: 1 }]);
      expect(supabase.from).toHaveBeenCalledWith('admin');
    });
    it('should throw error if supabase returns error', async () => {
      const mockSelect = jest.fn().mockResolvedValue({ data: null, error: new Error('fail') });
      supabase.from.mockReturnValue({ select: mockSelect });
      await expect(getAllAdmins()).rejects.toThrow('fail');
    });
  });

  describe('getAdminById', () => {
    it('should return admin by id', async () => {
      const mockSelect = jest.fn().mockReturnThis();
      const mockEq = jest.fn().mockReturnThis();
      const mockSingle = jest.fn().mockResolvedValue({ data: { id_admin: 1 }, error: null });
      supabase.from.mockReturnValue({ select: mockSelect, eq: mockEq, single: mockSingle });
      const result = await getAdminById(1);
      expect(result).toEqual({ id_admin: 1 });
      expect(supabase.from).toHaveBeenCalledWith('admin');
      expect(mockEq).toHaveBeenCalledWith('id_admin', 1);
    });
    it('should throw error if supabase returns error', async () => {
      const mockSelect = jest.fn().mockReturnThis();
      const mockEq = jest.fn().mockReturnThis();
      const mockSingle = jest.fn().mockResolvedValue({ data: null, error: new Error('fail') });
      supabase.from.mockReturnValue({ select: mockSelect, eq: mockEq, single: mockSingle });
      await expect(getAdminById(1)).rejects.toThrow('fail');
    });
  });

  describe('updateAdmin', () => {
    it('should update admin and return data', async () => {
      const mockUpdate = jest.fn().mockReturnThis();
      const mockEq = jest.fn().mockReturnThis();
      const mockSelect = jest.fn().mockReturnThis();
      const mockSingle = jest.fn().mockResolvedValue({ data: { id_admin: 1 }, error: null });
      supabase.from.mockReturnValue({ update: mockUpdate, eq: mockEq, select: mockSelect, single: mockSingle });
      const result = await updateAdmin(1, { email: 'x' });
      expect(result).toEqual({ id_admin: 1 });
      expect(supabase.from).toHaveBeenCalledWith('admin');
      expect(mockUpdate).toHaveBeenCalledWith({ email: 'x' });
      expect(mockEq).toHaveBeenCalledWith('id_admin', 1);
    });
    it('should throw error if supabase returns error', async () => {
      const mockUpdate = jest.fn().mockReturnThis();
      const mockEq = jest.fn().mockReturnThis();
      const mockSelect = jest.fn().mockReturnThis();
      const mockSingle = jest.fn().mockResolvedValue({ data: null, error: new Error('fail') });
      supabase.from.mockReturnValue({ update: mockUpdate, eq: mockEq, select: mockSelect, single: mockSingle });
      await expect(updateAdmin(1, { email: 'x' })).rejects.toThrow('fail');
    });
  });

  describe('deleteAdmin', () => {
    it('should delete admin and return true', async () => {
      const mockDelete = jest.fn().mockReturnThis();
      const mockEq = jest.fn().mockResolvedValue({ error: null });
      supabase.from.mockReturnValue({ delete: mockDelete, eq: mockEq });
      const result = await deleteAdmin(1);
      expect(result).toBe(true);
      expect(supabase.from).toHaveBeenCalledWith('admin');
      expect(mockEq).toHaveBeenCalledWith('id_admin', 1);
    });
    it('should throw error if supabase returns error', async () => {
      const mockDelete = jest.fn().mockReturnThis();
      const mockEq = jest.fn().mockResolvedValue({ error: new Error('fail') });
      supabase.from.mockReturnValue({ delete: mockDelete, eq: mockEq });
      await expect(deleteAdmin(1)).rejects.toThrow('fail');
    });
  });
});
