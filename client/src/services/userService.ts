import type { User, LibraryCard, DebtRecord} from '../types/users/interfaces';
import { apiService } from './apiService';

export class userService {
  // // Retrieves all users from the system
  // static async getAllUsers(): Promise<User[]> {
  //   return apiService.get<User[]>('/api/users');
  // }
  
  // Retrieves a specific user by their ID
  static async getUserById(userId: string): Promise<User> {
    return apiService.get<User>(`/api/users/${userId}`);
  }
  
  // Creates a new user in the system
  static async createUser(userData: Partial<User>): Promise<User> {
    return apiService.post<User>('/api/users', userData);
  }
  
  // Updates an existing user's information
  static async updateUser(userId: string, userData: Partial<User>): Promise<User> {
    return apiService.put<User>(`/api/users/${userId}`, userData);
  }
  
  // // Deletes a user from the system
  // static async deleteUser(userId: string): Promise<void> {
  //   return apiService.delete(`/api/users/${userId}`);
  // } 

  // // Retrieves all library cards in the system
  // getAllLibraryCards() :Promise<LibraryCard[]> {
  //   return apiService.get<LibraryCard[]>('/api/library-cards'); 
  // }

  // Retrieves a specific library card by its ID
  getLibraryCardById(cardId: string): Promise<LibraryCard> {
    return apiService.get<LibraryCard>(`/api/library-cards/${cardId}`);
  }

  // // Creates a new library card
  // createLibraryCard(cardData: Partial<LibraryCard>): Promise<LibraryCard> {
  //   return apiService.post<LibraryCard>('/api/library-cards', cardData);
  // }

  // // Updates an existing library card's information
  // updateLibraryCard(cardId: string, cardData: Partial<LibraryCard>): Promise<LibraryCard> {
  //   return apiService.put<LibraryCard>(`/api/library-cards/${cardId}`, cardData);
  // }

  // // Deletes a library card from the system
  // deleteLibraryCard(cardId: string): Promise<void> {
  //   return apiService.delete(`/api/library-cards/${cardId}`);
  // }

  // // Retrieves all debt records in the system
  // getAllDebtRecords(): Promise<DebtRecord[]> {
  //   return apiService.get<DebtRecord[]>('/api/debt-records');
  // }

  // Retrieves debt records associated with a specific library card
  getDebtRecordByLibraryCardId(libraryCardId: string): Promise<DebtRecord> {
    return apiService.get<DebtRecord>(`/api/debt-records/${libraryCardId}`);
  }

  // Creates a new debt record for a specific library card
  createDebtRecordByLibraryCardId(libraryCardId: string, cardData: Partial<LibraryCard>): Promise<DebtRecord> {
    return apiService.post<DebtRecord>(`/api/debt-records/${libraryCardId}`, cardData);
  }

  // Deletes a debt record associated with a specific library card
  deleteDebtRecordByLibraryCardId(libraryCardId: string): Promise<void> {
    return apiService.delete(`/api/debt-records/${libraryCardId}`);
  }
}


export default userService;