import type { LocationType, OpeningHourType, WeekType } from './enums';

// Base entity interface
export interface BaseEntity {
  id: number;
}

// Library domain interfaces
export interface Library extends BaseEntity {
  name: string;
  address: string;
  homepage: string;
  facebookUrl: string;
  notes?: string;
  libraryEmailContactDetails: LibraryEmailContactDetail[];
  libraryPhoneNumberContactDetails: LibraryPhoneNumberContactDetail[];
  libraryMailingAddresses: LibraryMailingAddress[];
  libraryImages: LibraryImage[];
}

export interface LibraryDetails {
  id: number;
  name: string;
  address: string;
  homepage: string;
  facebookUrl: string;
  notes?: string;
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

// Opening hours and holiday weeks interfaces
export interface OpeningHour extends BaseEntity {
  openingHourType: OpeningHourType;
  openingTime: string; // Time string in HH:mm:ss format
  closingTime: string; // Time string in HH:mm:ss format
  weekType: WeekType;
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
  todayHours: string;
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
  name: string;
  address: string;
  homepage: string;
  facebookUrl: string;
  notes?: string;
}

export interface UpdateLibraryRequest extends Partial<CreateLibraryRequest> {
  id: number;
}

export interface LibrarySearchParams {
  name?: string;
  address?: string;
  page?: number;
  pageSize?: number;
}
*/