namespace Domain.Enums;

public enum OpeningHourType
{
  Workday = 1,  // Represents a regular workday, 09 - 20 for opening hours
  Friday = 2,   // Represents Friday, 09 - 16 for opening hours and a eve of holiday with 7 hours, from 9 to 16
  Saturday = 3, // Represents Saturday, 10 - 16 for opening hours and a eve of holiday with 6 hours, from 10 to 16
  Sunday = 4,   // Represents Sunday, Closed

  // Special values for public holidays
  Morning9Hours6 = 5, // Eve of holiday with 6 hours, from 9 to 15
  Morning9Hours5 = 6, // Eve of holiday with 5 hours, from 9 to 14
  Morning9Hours4 = 7, // Eve of holiday with 4 hours, from 9 to 13
  Morning9Hours3 = 8, // Eve of holiday with 3 hours, from 9 to 12
  Morning10Hours5 = 9, // Eve of holiday with 5 hours, from 10 to 15
  Morning10Hours4 = 10, // Eve of holiday with 4 hours, from 10 to 14
  Morning10Hours3 = 11, // Eve of holiday with 3 hours, from 10 to 13
  Afternoon4Hours = 12, // Eve of holiday with 4 hours, from 12 to 16
  Afternoon3Hours = 13, // Eve of holiday with 3 hours, from 12 to 15
}