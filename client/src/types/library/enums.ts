// Library domain-specific enums

export const LocationType = {
  City: 0,
  Town: 1,
  Village: 2
} as const;

export type LocationType = typeof LocationType[keyof typeof LocationType];

export const ContactType = {
  Email: 'email',
  Phone: 'phone'
} as const;

export type ContactType = typeof ContactType[keyof typeof ContactType];

// export const LibraryStatus = {
//   Open: 'open',
//   Closed: 'closed',
//   UnderMaintenance: 'under_maintenance',
//   TemporarilyClosed: 'temporarily_closed'
// } as const;

// export type LibraryStatus = typeof LibraryStatus[keyof typeof LibraryStatus];
