// EventSummary interface for listing events in proper language
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

// DetailedEvent interface for full event details in proper language
export interface DetailedEvent extends EventSummary {
  description: string;
  admission: string;
}

// Library name/address DTO for minimal library lists
export interface LibraryNameAddress {
  id: number;
  title: string;
  address: string;
}
import type { LocationType, OpeningHourType } from './enums';

// Base entity interface
export interface BaseEntity {
  id: number;
}

// Library domain interfaces
export interface Library extends BaseEntity {
  title: string;
  address: string;
  homepage: string;
  facebookUrl: string;
  noteTranslations: LibraryNoteTranslation[];
  libraryEmailContactDetails: LibraryEmailContactDetail[];
  libraryPhoneNumberContactDetails: LibraryPhoneNumberContactDetail[];
  libraryMailingAddresses: LibraryMailingAddress[];
  libraryImages: LibraryImage[];
}

export interface LibraryDetails {
  id: number;
  title: string;
  address: string;
  homepage: string;
  facebookUrl: string;
  noteTranslations: LibraryNoteTranslation[];
  libraryEmailContactDetails: LibraryEmailContactDetail[];
  libraryPhoneNumberContactDetails: LibraryPhoneNumberContactDetail[];
  libraryMailingAddresses: LibraryMailingAddress[];
  libraryImages: LibraryImage[];
}

// Library image interface
export interface LibraryImage {
  id: number;
  libraryId: number;
  fileName: string;
  filePath: string;
  altText: string;
  imageType: number; // 1 = Main, 2 = Exterior, 3 = Interior, 4 = Thumbnail
}


export interface LibraryEmailContactDetail extends BaseEntity {
  libraryId: number;
  serviceName: string;
  contactName?: string;
  contactEmail: string;
}

export interface LibraryNoteTranslation {
  language: string;
  note: string;
}

export interface LibraryPhoneNumberContactDetail extends BaseEntity {
  libraryId: number;
  serviceName: string;
  contactName?: string;
  contactPhoneNumber: string;
}

export interface LibraryMailingAddress extends BaseEntity {
  libraryId: number;
  postOfficeBox: string;
  postalCode: string;
  locationType: LocationType;
  locationName: string;
}

export interface LibraryOpeningHours {
  weekNumber: number;
  days: OpeningHourType[];
}

export interface HolidayWeek extends BaseEntity {
  weekNumber: number;
  monday: OpeningHourType;
  tuesday: OpeningHourType;
  wednesday: OpeningHourType;
  thursday: OpeningHourType;
  friday: OpeningHourType;
  saturday: OpeningHourType;
  sunday: OpeningHourType;
}

// Library status interface
export interface LibraryStatus {
  isOpen: boolean;
  statusText: string;
}

// Library image interface
export interface LibraryImage {
  id: number;
  libraryId: number;
  fileName: string;
  filePath: string;
  altText: string;
  imageType: number; // 1 = Main, 2 = Exterior, 3 = Interior, 4 = Thumbnail
}

/* Library-specific DTOs (Data Transfer Objects)
export interface CreateLibraryRequest {
  title: string;
  address: string;
  homepage: string;
  facebookUrl: string;
  notes?: string;
}

export interface UpdateLibraryRequest extends Partial<CreateLibraryRequest> {
  id: number;
}

export interface LibrarySearchParams {
  title?: string;
  address?: string;
  page?: number;
  pageSize?: number;
}
*/