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

export const OpeningHourType = {
  Workday: 1,
  Friday: 2,
  Saturday: 3,
  Sunday: 4,
  Morning9Hours6: 5,
  Morning9Hours5: 6,
  Morning9Hours4: 7,
  Morning9Hours3: 8,
  Morning10Hours5: 9,
  Morning10Hours4: 10,
  Morning10Hours3: 11,
  Afternoon4Hours: 12,
  Afternoon3Hours: 13,
} as const;

export type OpeningHourType = typeof OpeningHourType[keyof typeof OpeningHourType];

export const WeekType = {
  RegularWeek: 1,
  PublicHolidayWeek: 2,
} as const;

export type WeekType = typeof WeekType[keyof typeof WeekType];

// export const LibraryStatus = {
//   Open: 'open',
//   Closed: 'closed',
//   UnderMaintenance: 'under_maintenance',
//   TemporarilyClosed: 'temporarily_closed'
// } as const;

// export type LibraryStatus = typeof LibraryStatus[keyof typeof LibraryStatus];
