import { apiService } from './apiService';
import type { Library } from '../types/library/interfaces';

// Library-specific API calls
export class LibraryService {
  
  // Get all libraries
  static async getAllLibraries(): Promise<Library[]> {
    return apiService.get<Library[]>('/api/libraries');
  }

  // Get single library by ID
  static async getLibrary(id: number): Promise<Library> {
    return apiService.get<Library>(`/api/libraries/${id}`);
  }

  // Create new library
  // static async createLibrary(library: Omit<Library, 'id'>): Promise<Library> {
  //   return apiService.post<Library>('/api/libraries', library);
  // }

  // Update existing library
  // static async updateLibrary(id: number, library: Partial<Library>): Promise<Library> {
  //   return apiService.put<Library>(`/api/libraries/${id}`, library);
  // }

  // Delete library
  // static async deleteLibrary(id: number): Promise<void> {
  //   return apiService.delete(`/api/libraries/${id}`);
  // }
}

export default LibraryService;
