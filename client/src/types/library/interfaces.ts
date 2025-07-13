import type { LocationType } from './enums';

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