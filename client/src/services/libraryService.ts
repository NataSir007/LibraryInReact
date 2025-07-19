import { apiService } from './apiService';
import type { Library, LibraryOpeningHours } from '../types/library/interfaces';

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

  // Get opening hours
  static async getOpeningHours(weekOffset: number): Promise<LibraryOpeningHours> {
    return apiService.get<LibraryOpeningHours>(`/api/libraries/opening-hours/${weekOffset}`);
  }

  // Get library status based on current date/time, opening hours, and holiday weeks.
  // If it is closed at the moment, give information when it will be open next time.
  static async getLibraryOpenStatus(): Promise<{ isOpen: boolean; statusText: string }> {
    return apiService.get<{ isOpen: boolean; statusText: string }>('/api/libraries/open-status');
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
