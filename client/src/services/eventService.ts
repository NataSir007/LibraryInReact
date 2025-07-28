import { apiService } from './apiService';

export interface EventSummary {
  id: number;
  libraryId: number;
  libraryTitle: string;
  libraryAddress: string;
  eventName: string;
  startTime: string;
  endTime: string;
  fileName: string;
  filePath: string;
  altText: string;
  tags: string[];
}

export class EventService {
  // Get all events for a given language
  static async getAllEvents(languageCode: string): Promise<EventSummary[]> {
    return apiService.get<EventSummary[]>(`/api/events?languageCode=${languageCode}`);
  }

  // Get all tags
  static async getAllTags(): Promise<string[]> {
    return apiService.get<string[]>('/api/tags');
  }
}

export default EventService;
