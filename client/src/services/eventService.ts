import type { DetailedEvent, EventSummary } from '../types/library/interfaces';
import { apiService } from './apiService';



export class EventService {
  // Get all events for a given language
  static async getAllEvents(languageCode: string): Promise<EventSummary[]> {
    return apiService.get<EventSummary[]>(`/api/events?languageCode=${languageCode}`);
  }

    // Get all events for a given language
  static async getEvent(languageCode: string, eventId: string): Promise<DetailedEvent> {
    return apiService.get<DetailedEvent>(`/api/events/${eventId}?languageCode=${languageCode}`);
  }

  // Get all future events in a series (i.e., with the same ParentEventId).
  static async getEventSeries(languageCode: string, eventId: string): Promise<EventSummary[]> {
    return apiService.get<EventSummary[]>(`/api/events/series/${eventId}?languageCode=${languageCode}`);
  }

  // Get all tags
  static async getAllTags(): Promise<string[]> {
    return apiService.get<string[]>('/api/events/tags');
  }

  // Get filtered events
  static async getFilteredEvents(
    search?: string,
    startDate?: string,
    endDate?: string,
    languageCode: string = 'fi'
  ): Promise<EventSummary[]> {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    params.append('languageCode', languageCode);
    //console.log('Fetching filtered events with params:', params.toString());
    return apiService.get<EventSummary[]>(`/api/events/filter?${params.toString()}`);
  }
}

export default EventService;
