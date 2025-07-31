using Microsoft.EntityFrameworkCore;
using Domain;
using Domain.Enums;
using System.Reflection.Emit;

namespace Persistence;

public static class DbInitializer
{
  public static async Task SeedData(AppDbContext context)
  {

    // Seed Library entities for 5 libraries (if not present)
    if (!context.Libraries.Any())
    {
      var allLibraries = new List<Library>
      {
        // Malmi Library (Id = 1)
        new Library
        {
            Id = 1,
            Title = "Malmi Library",
            Address = "Ylä-Malmin tori 3, 00700 Helsinki",
            Homepage = "https://www.hel.fi/kirjastot/malmi",
            FacebookUrl = "https://www.facebook.com/malmi-kirjasto"
        },
        // Maunula Library (Id = 2)
        new Library
        {
            Id = 2,
            Title = "Maunula Library",
            Address = "Metsäpurontie 16, 00630 Helsinki",
            Homepage = "https://www.hel.fi/kirjastot/maunula",
            FacebookUrl = "https://www.facebook.com/maunula-kirjasto"
        },
        // Rikhardinkatu Library (Id = 3)
        new Library
        {
            Id = 3,
            Title = "Rikhardinkatu Library",
            Address = "Rikhardinkatu 3, 00130 Helsinki",
            Homepage = "https://www.hel.fi/kirjastot/rikhardinkatu",
            FacebookUrl = "https://www.facebook.com/rikhardinkatu-kirjasto"
        },
        // Tikkurila Library (Id = 4)
        new Library
        {
            Id = 4,
            Title = "Tikkurila Library",
            Address = "Ratatie 11, 01300 Vantaa",
            Homepage = "https://www.vantaa.fi/kirjastot/tikkurila",
            FacebookUrl = "https://www.facebook.com/tikkurila-kirjasto"
        },
        // Sello Library (Id = 5)
        new Library
        {
            Id = 5,
            Title = "Sello Library",
            Address = "Leppävaarankatu 9, 02600 Espoo",
            Homepage = "https://www.espoo.fi/kirjastot/sello",
            FacebookUrl = "https://www.facebook.com/sello-kirjasto"
        }
      };

      context.Libraries.AddRange(allLibraries);
      await context.SaveChangesAsync();
    }

    // Get library IDs for foreign keys
    var libraries = context.Libraries.ToList();

    // Seed LibraryNoteTranslations for 5 libraries (if not present)
    if (!context.LibraryNoteTranslations.Any())
    {
      var libraryNotes = new List<LibraryNoteTranslation>
      {
        // Malmi Library (Id = 1)
        new LibraryNoteTranslation { LibraryId = libraries[0].Id, Language = "en", Note = "Malmi Library serves the northeastern part of Helsinki with a strong focus on local community needs and cultural activities." },
        new LibraryNoteTranslation { LibraryId = libraries[0].Id, Language = "fi", Note = "Malmin kirjasto palvelee Koillis-Helsingin aluetta painottaen paikallisyhteisön tarpeita ja kulttuuritoimintaa." },
        new LibraryNoteTranslation { LibraryId = libraries[0].Id, Language = "sv", Note = "Malmi bibliotek betjänar nordöstra Helsingfors med fokus på lokalsamhällets behov och kulturverksamhet." },

        // Maunula Library (Id = 2)
        new LibraryNoteTranslation { LibraryId = libraries[1].Id, Language = "en", Note = "Maunula Library serves the northern districts of Helsinki with a focus on community engagement and family-friendly services." },
        new LibraryNoteTranslation { LibraryId = libraries[1].Id, Language = "fi", Note = "Maunulan kirjasto palvelee Helsingin pohjoisia kaupunginosia keskittyen yhteisöllisyyteen ja perheystävällisiin palveluihin." },
        new LibraryNoteTranslation { LibraryId = libraries[1].Id, Language = "sv", Note = "Maunula bibliotek betjänar norra Helsingfors med fokus på gemenskap och familjevänliga tjänster." },

        // Rikhardinkatu Library (Id = 3)
        new LibraryNoteTranslation { LibraryId = libraries[2].Id, Language = "en", Note = "Rikhardinkatu Library is centrally located in Helsinki, offering comprehensive library services in the city center." },
        new LibraryNoteTranslation { LibraryId = libraries[2].Id, Language = "fi", Note = "Rikhardinkadun kirjasto sijaitsee Helsingin keskustassa tarjoten monipuolisia kirjastopalveluja." },
        new LibraryNoteTranslation { LibraryId = libraries[2].Id, Language = "sv", Note = "Rikhardinkatu bibliotek ligger centralt i Helsingfors och erbjuder omfattande bibliotekstjänster." },

        // Tikkurila Library (Id = 4)
        new LibraryNoteTranslation { LibraryId = libraries[3].Id, Language = "en", Note = "Tikkurila Library is a modern library located in the heart of Tikkurila, serving the local community with extensive book collections and digital services." },
        new LibraryNoteTranslation { LibraryId = libraries[3].Id, Language = "fi", Note = "Tikkurilan kirjasto on moderni kirjasto Tikkurilan sydämessä, tarjoten laajat kirjavalikoimat ja digitaalisia palveluja." },
        new LibraryNoteTranslation { LibraryId = libraries[3].Id, Language = "sv", Note = "Tikkurila bibliotek är ett modernt bibliotek i hjärtat av Tikkurila med ett stort bokutbud och digitala tjänster." },

        // Sello Library (Id = 5)
        new LibraryNoteTranslation { LibraryId = libraries[4].Id, Language = "en", Note = "Sello Library is located in the popular Sello shopping center, offering convenient access to library services for shoppers and residents." },
        new LibraryNoteTranslation { LibraryId = libraries[4].Id, Language = "fi", Note = "Sellon kirjasto sijaitsee suositussa Sellon kauppakeskuksessa, tarjoten kätevän pääsyn kirjastopalveluihin." },
        new LibraryNoteTranslation { LibraryId = libraries[4].Id, Language = "sv", Note = "Sello bibliotek ligger i det populära köpcentret Sello och erbjuder enkel tillgång till bibliotekstjänster." }
      };

      context.LibraryNoteTranslations.AddRange(libraryNotes);
      await context.SaveChangesAsync();
    }

    // Seed LibraryPhoneNumberContactDetail for 5 libraries (if not present)
    if (!context.LibraryPhoneNumberContactDetails.Any())
    {
      var phoneContacts = new List<LibraryPhoneNumberContactDetail>
      {      
        // Malmi Library (Id = 1)
        new LibraryPhoneNumberContactDetail { Id = 1, LibraryId = libraries[0].Id, ServiceName = "Customer service", ContactName = "Maija Mehiläinen", ContactPhoneNumber = "+358 9 11111111" },
        new LibraryPhoneNumberContactDetail { Id = 2, LibraryId = libraries[0].Id, ServiceName = "Chief Librarian", ContactName = "Unto Ukkonen", ContactPhoneNumber = "+358 9 22222222" },

        // Maunula Library (Id = 2)
        new LibraryPhoneNumberContactDetail { Id = 3, LibraryId = libraries[1].Id, ServiceName = "Customer service", ContactName = "Apolon Kreikalainen", ContactPhoneNumber = "+358 9 33333333" },
        new LibraryPhoneNumberContactDetail { Id = 4, LibraryId = libraries[1].Id, ServiceName = "Chief Librarian", ContactName = "Bertta Banaani", ContactPhoneNumber = "+358 9 44444444" },

        // Rikhardinkatu Library (Id = 3)
        new LibraryPhoneNumberContactDetail { Id = 5, LibraryId = libraries[2].Id, ServiceName = "Customer service", ContactName = "Tuula Tuulikello", ContactPhoneNumber = "+358 9 55555555" },
        new LibraryPhoneNumberContactDetail { Id = 6, LibraryId = libraries[2].Id, ServiceName = "Chief Librarian", ContactName = "Carita Sammakko", ContactPhoneNumber = "+358 9 66666666" },

        // Tikkurila Library (Id = 4)
        new LibraryPhoneNumberContactDetail { Id = 7, LibraryId = libraries[3].Id, ServiceName = "Customer service", ContactName = "Joonas Jäämeri", ContactPhoneNumber = "+358 9 77777777" },
        new LibraryPhoneNumberContactDetail { Id = 8, LibraryId = libraries[3].Id, ServiceName = "Chief Librarian", ContactName = "Dora Duunari", ContactPhoneNumber = "+358 9 88888888" },

        // Sello Library (Id = 5)
        new LibraryPhoneNumberContactDetail { Id = 9, LibraryId = libraries[4].Id, ServiceName = "Customer service", ContactName = "Kirsi Kirsikka", ContactPhoneNumber = "+358 9 99999999" },
        new LibraryPhoneNumberContactDetail { Id = 10, LibraryId = libraries[4].Id, ServiceName = "Chief Librarian", ContactName = "Eemeli Esiintyjä", ContactPhoneNumber = "+358 9 10101010" }
      };
      context.LibraryPhoneNumberContactDetails.AddRange(phoneContacts);
      await context.SaveChangesAsync();
    }

    // Seed LibraryEmailContactDetail for 5 libraries (if not present)
    if (!context.LibraryEmailContactDetails.Any())
    {
      var emailContacts = new List<LibraryEmailContactDetail>
      {
          // Malmi Library (Id = 1)
          new LibraryEmailContactDetail { Id = 1, LibraryId = libraries[0].Id, ServiceName = "Customer service", ContactName = "Maija Mehiläinen", ContactEmail = "maija.mehilainen@libraryinreact.com" },
          new LibraryEmailContactDetail { Id = 2, LibraryId = libraries[0].Id, ServiceName = "Co-operation with schools", ContactName = "Ville Vinter", ContactEmail = "ville.vinter@libraryinreact.com" },
          new LibraryEmailContactDetail { Id = 3, LibraryId = libraries[0].Id, ServiceName = "Contact person for daycare", ContactName = "Liisa Lumikello", ContactEmail = "liisa.lumikello@libraryinreact.com" },
          new LibraryEmailContactDetail { Id = 4, LibraryId = libraries[0].Id, ServiceName = "Exhibition premises", ContactName = "Kalle Kukkamäki", ContactEmail = "kalle.kukkamaki@libraryinreact.com" },
          new LibraryEmailContactDetail { Id = 5, LibraryId = libraries[0].Id, ServiceName = "Information services", ContactName = "Sanni Satakieli", ContactEmail = "sanni.satakieli@libraryinreact.com" },

          // Maunula Library (Id = 2)
          new LibraryEmailContactDetail { Id = 6, LibraryId = libraries[1].Id, ServiceName = "Customer service", ContactName = "Apolon Kreikalainen", ContactEmail = "apolon.kreikalainen@libraryinreact.com" },
          new LibraryEmailContactDetail { Id = 7, LibraryId = libraries[1].Id, ServiceName = "Co-operation with schools", ContactName = "Aino Aurinkonen", ContactEmail = "aino.aurinkonen@libraryinreact.com" },
          new LibraryEmailContactDetail { Id = 8, LibraryId = libraries[1].Id, ServiceName = "Contact person for daycare", ContactName = "Paavo Puumerkki", ContactEmail = "paavo.puumerkki@libraryinreact.com" },
          new LibraryEmailContactDetail { Id = 9, LibraryId = libraries[1].Id, ServiceName = "Exhibition premises", ContactName = "Elina Esikko", ContactEmail = "elina.esikko@libraryinreact.com" },
          new LibraryEmailContactDetail { Id = 10, LibraryId = libraries[1].Id, ServiceName = "Information services", ContactName = "Mikael Marjanen", ContactEmail = "mikael.marjanen@libraryinreact.com" },

          // Rikhardinkatu Library (Id = 3)
          new LibraryEmailContactDetail { Id = 11, LibraryId = libraries[2].Id, ServiceName = "Customer service", ContactName = "Tuula Tuulikello", ContactEmail = "tuula.tuulikello@libraryinreact.com" },
          new LibraryEmailContactDetail { Id = 12, LibraryId = libraries[2].Id, ServiceName = "Co-operation with schools", ContactName = "Heikki Heinäkuu", ContactEmail = "heikki.heinakuu@libraryinreact.com" },
          new LibraryEmailContactDetail { Id = 13, LibraryId = libraries[2].Id, ServiceName = "Contact person for daycare", ContactName = "Sofia Sammakko", ContactEmail = "sofia.sammakko@libraryinreact.com" },
          new LibraryEmailContactDetail { Id = 14, LibraryId = libraries[2].Id, ServiceName = "Exhibition premises", ContactName = "Risto Riimukivi", ContactEmail = "risto.riimukivi@libraryinreact.com" },
          new LibraryEmailContactDetail { Id = 15, LibraryId = libraries[2].Id, ServiceName = "Information services", ContactName = "Anna Apilainen", ContactEmail = "anna.apilainen@libraryinreact.com" },

          // Tikkurila Library (Id = 4)
          new LibraryEmailContactDetail { Id = 16, LibraryId = libraries[3].Id, ServiceName = "Customer service", ContactName = "Joonas Jäämeri", ContactEmail = "joonas.jaameri@libraryinreact.com" },
          new LibraryEmailContactDetail { Id = 17, LibraryId = libraries[3].Id, ServiceName = "Co-operation with schools", ContactName = "Pirkko Pilvilinna", ContactEmail = "pirkko.pilvilinna@libraryinreact.com" },
          new LibraryEmailContactDetail { Id = 18, LibraryId = libraries[3].Id, ServiceName = "Contact person for daycare", ContactName = "Oskari Omenankukka", ContactEmail = "oskari.omenankukka@libraryinreact.com" },
          new LibraryEmailContactDetail { Id = 19, LibraryId = libraries[3].Id, ServiceName = "Exhibition premises", ContactName = "Laura Lintunen", ContactEmail = "laura.lintunen@libraryinreact.com" },
          new LibraryEmailContactDetail { Id = 20, LibraryId = libraries[3].Id, ServiceName = "Information services", ContactName = "Veikko Viidakko", ContactEmail = "veikko.viidakko@libraryinreact.com" },

          // Sello Library (Id = 5)
          new LibraryEmailContactDetail { Id = 21, LibraryId = libraries[4].Id, ServiceName = "Customer service", ContactName = "Kirsi Kirsikka", ContactEmail = "kirsi.kirsikka@libraryinreact.com" },
          new LibraryEmailContactDetail { Id = 22, LibraryId = libraries[4].Id, ServiceName = "Co-operation with schools", ContactName = "Timo Tuulispää", ContactEmail = "timo.tuulispaa@libraryinreact.com" },
          new LibraryEmailContactDetail { Id = 23, LibraryId = libraries[4].Id, ServiceName = "Contact person for daycare", ContactName = "Minna Mansikka", ContactEmail = "minna.mansikka@libraryinreact.com" },
          new LibraryEmailContactDetail { Id = 24, LibraryId = libraries[4].Id, ServiceName = "Exhibition premises", ContactName = "Petri Putoava", ContactEmail = "petri.putoava@libraryinreact.com" },
          new LibraryEmailContactDetail { Id = 25, LibraryId = libraries[4].Id, ServiceName = "Information services", ContactName = "Hanna Harmaakivi", ContactEmail = "hanna.harmaakivi@libraryinreact.com" }
      };
      context.LibraryEmailContactDetails.AddRange(emailContacts);
      await context.SaveChangesAsync();
    }

    // Seed LibraryMailingAddress for 5 libraries (if not present)
    if (!context.LibraryMailingAddresses.Any())
    {
      var mailingAddresses = new List<LibraryMailingAddress>
      {
        // Malmi Library (Id = 1)
        new LibraryMailingAddress
        {
            Id = 1,
            LibraryId = libraries[0].Id,
            PostOfficeBox = "PL 5005",
            PostalCode = "00700",
            LocationType = LocationType.City,
            LocationName = "Helsinki"
        },
        // Maunula Library (Id = 2)
        new LibraryMailingAddress
        {
            Id = 2,
            LibraryId = libraries[1].Id,
            PostOfficeBox = "PL 3003",
            PostalCode = "00630",
            LocationType = LocationType.City,
            LocationName = "Helsinki"
        },
        // Rikhardinkatu Library (Id = 3)
        new LibraryMailingAddress
        {
            Id = 3,
            LibraryId = libraries[2].Id,
            PostOfficeBox = "PL 4004",
            PostalCode = "00130",
            LocationType = LocationType.City,
            LocationName = "Helsinki"
        },
        // Tikkurila Library (Id = 4)
        new LibraryMailingAddress
        {
            Id = 4,
            LibraryId = libraries[3].Id,
            PostOfficeBox = "PL 1001",
            PostalCode = "01300",
            LocationType = LocationType.City, // Assuming this enum value exists
            LocationName = "Vantaa"
        },
        // Sello Library (Id = 5)
        new LibraryMailingAddress
        {
            Id = 5,
            LibraryId = libraries[4].Id,
            PostOfficeBox = "PL 2002",
            PostalCode = "02600",
            LocationType = LocationType.City,
            LocationName = "Espoo"
        },
      };
      context.LibraryMailingAddresses.AddRange(mailingAddresses);
      await context.SaveChangesAsync();
    }

    // Seed opening hours for all libraries(if not present)
    if (!context.OpeningHours.Any())
    {
      var allOpeningHours = new List<OpeningHour>
      {
        // Standard workday pattern
          // Represents a regular workday, 09 - 20 for opening hours
          new OpeningHour { Id = 1, OpeningHourType = OpeningHourType.Workday, OpeningTime = new TimeOnly(9, 0), ClosingTime = new TimeOnly(20, 0), WeekType = WeekType.RegularWeek },

          // Represents a shorter regular workday, 09 - 16 for opening hours, usually on Fridays
          new OpeningHour { Id = 2, OpeningHourType = OpeningHourType.Friday, OpeningTime = new TimeOnly(9, 0), ClosingTime = new TimeOnly(16, 0), WeekType = WeekType.RegularWeek },

          // Saturday pattern, 10 - 16 for opening hours
          new OpeningHour { Id = 3, OpeningHourType = OpeningHourType.Saturday, OpeningTime = new TimeOnly(10, 0), ClosingTime = new TimeOnly(16, 0), WeekType = WeekType.RegularWeek },

          // Represents a closed day, typically Sunday
          new OpeningHour { Id = 4, OpeningHourType = OpeningHourType.Sunday, OpeningTime = new TimeOnly(0, 0), ClosingTime = new TimeOnly(0, 0), WeekType = WeekType.RegularWeek },

          // Eves of holiday
          // for 9 -16 see Friday
          new OpeningHour { Id = 5, OpeningHourType = OpeningHourType.Morning9Hours6, OpeningTime = new TimeOnly(9, 0), ClosingTime = new TimeOnly(15, 0), WeekType = WeekType.PublicHolidayWeek },
          new OpeningHour { Id = 6, OpeningHourType = OpeningHourType.Morning9Hours5, OpeningTime = new TimeOnly(9, 0), ClosingTime = new TimeOnly(14, 0), WeekType = WeekType.PublicHolidayWeek },
          new OpeningHour { Id = 7, OpeningHourType = OpeningHourType.Morning9Hours4, OpeningTime = new TimeOnly(9, 0), ClosingTime = new TimeOnly(13, 0), WeekType = WeekType.PublicHolidayWeek },
          new OpeningHour { Id = 8, OpeningHourType = OpeningHourType.Morning9Hours3, OpeningTime = new TimeOnly(9, 0), ClosingTime = new TimeOnly(12, 0), WeekType = WeekType.PublicHolidayWeek },
          // for 9 -16 see Saturday
          new OpeningHour { Id = 9, OpeningHourType = OpeningHourType.Morning10Hours5, OpeningTime = new TimeOnly(10, 0), ClosingTime = new TimeOnly(15, 0), WeekType = WeekType.PublicHolidayWeek },
          new OpeningHour { Id = 10, OpeningHourType = OpeningHourType.Morning10Hours4, OpeningTime = new TimeOnly(10, 0), ClosingTime = new TimeOnly(14, 0), WeekType = WeekType.PublicHolidayWeek },
          new OpeningHour { Id = 11, OpeningHourType = OpeningHourType.Morning10Hours3, OpeningTime = new TimeOnly(10, 0), ClosingTime = new TimeOnly(13, 0), WeekType = WeekType.PublicHolidayWeek },
          new OpeningHour { Id = 12, OpeningHourType = OpeningHourType.Afternoon4Hours, OpeningTime = new TimeOnly(12, 0), ClosingTime = new TimeOnly(16, 0), WeekType = WeekType.PublicHolidayWeek },
          new OpeningHour { Id = 13, OpeningHourType = OpeningHourType.Afternoon3Hours, OpeningTime = new TimeOnly(12, 0), ClosingTime = new TimeOnly(15, 0), WeekType = WeekType.PublicHolidayWeek },
      };
      context.OpeningHours.AddRange(allOpeningHours);
      await context.SaveChangesAsync();
    }

    // Seed HolidayWeeks (if not present)
    if (!context.HolidayWeeks.Any())
    {
      var holidayWeeks = new List<HolidayWeek>
        {
            // Christmas week
            new HolidayWeek
            {
              Id = 1,
              WeekNumber = 49,
              Monday = OpeningHourType.Workday,             // 1.12.25 9-20
              Tuesday = OpeningHourType.Workday,            // 2.12.25 9-20
              Wednesday = OpeningHourType.Workday,          // 3.12.25 9-20
              Thursday = OpeningHourType.Workday,           // 4.12.25 9-20
              Friday = OpeningHourType.Friday,              // 5.12.25 9-16
              Saturday = OpeningHourType.Sunday,            // 6.12.25 closed
              Sunday = OpeningHourType.Sunday               // 7.12.25 closed
            },
            new HolidayWeek
            {
              Id = 2,
              WeekNumber = 52,
              Monday = OpeningHourType.Workday,             // 22.12.25 9-20
              Tuesday = OpeningHourType.Friday,             // 23.12.25 9-16
              Wednesday = OpeningHourType.Sunday,           // 24.12.25 closed (Christmas Eve)
              Thursday = OpeningHourType.Sunday,            // 25.12.25 closed (Christmas Day)
              Friday = OpeningHourType.Sunday,              // 26.12.25 closed (Boxing Day)
              Saturday = OpeningHourType.Saturday,          // 27.12.25 10-16
              Sunday = OpeningHourType.Sunday               // 28.12.25 closed
            },
            new HolidayWeek
            {
              Id = 3,
              WeekNumber = 1,
              Monday = OpeningHourType.Workday,             // 29.12.25 9-20
              Tuesday = OpeningHourType.Workday,            // 30.12.25 9-20
              Wednesday = OpeningHourType.Friday,           // 31.12.25 9-16
              Thursday = OpeningHourType.Sunday,            // 01.01.26 closed
              Friday = OpeningHourType.Friday,              // 02.01.26 9-16
              Saturday = OpeningHourType.Saturday,          // 03.01.26 10-16
              Sunday = OpeningHourType.Sunday               // 04.01.26 Closed
            },
            new HolidayWeek
            {
              Id = 4,
              WeekNumber = 2,
              Monday = OpeningHourType.Friday,             // 05.01.26 9-16
              Tuesday = OpeningHourType.Sunday,            // 06.01.26 closed
              Wednesday = OpeningHourType.Workday,         // 07.01.26 9-20
              Thursday = OpeningHourType.Workday,          // 08.01.26 9-20
              Friday = OpeningHourType.Friday,             // 09.01.26 9-16
              Saturday = OpeningHourType.Saturday,         // 10.01.26 10-16
              Sunday = OpeningHourType.Sunday              // 11.01.26 Closed
            },
            // Easter week
            new HolidayWeek
            {
              Id = 5,
              WeekNumber = 14,
              Monday = OpeningHourType.Workday,            // 30.03.26 9-20
              Tuesday = OpeningHourType.Workday,           // 31.03.26 9-20
              Wednesday = OpeningHourType.Workday,         // 01.04.26 9-20
              Thursday = OpeningHourType.Morning9Hours6,   // 02.04.26 9-12
              Friday = OpeningHourType.Sunday,             // 03.04.26 closed
              Saturday = OpeningHourType.Sunday,           // 04.04.26 closed
              Sunday = OpeningHourType.Sunday              // 05.04.26 closed
            },
            // Helatorstai week
            new HolidayWeek
            {
              Id = 6,
              WeekNumber = 20,
              Monday = OpeningHourType.Workday,           // 11.05.26 9-20
              Tuesday = OpeningHourType.Workday,          // 12.05.26 9-20
              Wednesday = OpeningHourType.Friday,         // 13.05.26 9-16
              Thursday = OpeningHourType.Sunday,          // 14.05.26 closed
              Friday = OpeningHourType.Friday,            // 15.05.26 9-16
              Saturday = OpeningHourType.Saturday,        // 16.05.26 10-16
              Sunday = OpeningHourType.Sunday             // 17.05.26 closed
            },
            // Midsummer week
            new HolidayWeek
            {
              Id = 7,
              WeekNumber = 25,
              Monday = OpeningHourType.Workday,           // 15.06.26 9-20
              Tuesday = OpeningHourType.Workday,          // 16.06.26 9-20
              Wednesday = OpeningHourType.Workday,        // 17.06.26 9-20
              Thursday = OpeningHourType.Friday,          // 18.06.26 9-16
              Friday = OpeningHourType.Sunday,            // 19.06.26 closed
              Saturday = OpeningHourType.Sunday,          // 20.06.26 closed
              Sunday = OpeningHourType.Sunday             // 21.06.26 closed
            }
        };
      context.HolidayWeeks.AddRange(holidayWeeks);
      await context.SaveChangesAsync();
    }

    // Seed LibraryImage for the libraries (if not present)
    if (!context.LibraryImages.Any())
    {
      var libraryImages = new List<LibraryImage>
      {
        // Maunula Library (Id = 2) - we have the actual image file for this one
        new LibraryImage
        {
          Id = 1,
          LibraryId = libraries[1].Id,
          ImageType = ImageType.Main,
          FileName = "library-maunula-main.jpg",
          FilePath = "/uploads/libraries/library-maunula-main.jpg",
          AltText = "Main exterior view of Maunula Library building"
        },
        
        // Additional sample images for other libraries
        new LibraryImage
        {
          Id = 2,
          LibraryId = libraries[0].Id,
          ImageType = ImageType.Main,
          FileName = "malmi-library-main.jpg",
          FilePath = "/uploads/libraries/malmi-library-main.jpg",
          AltText = "Main exterior view of Malmi Library"
        },
        new LibraryImage
        {
          Id = 3,
          LibraryId = libraries[0].Id,
          ImageType = ImageType.Interior,
          FileName = "malmi-library-interior.jpg",
          FilePath = "/uploads/libraries/malmi-library-interior.jpg",
          AltText = "Interior reading area of Malmi Library"
        },

        new LibraryImage
        {
          Id = 4,
          LibraryId = libraries[2].Id,
          ImageType = ImageType.Main,
          FileName = "rikhardinkatu-library-main.jpg",
          FilePath = "/uploads/libraries/rikhardinkatu-library-main.jpg",
          AltText = "Main exterior view of Rikhardinkatu Library"
        },

        new LibraryImage
        {
          Id = 5,
          LibraryId = libraries[3].Id,
          ImageType = ImageType.Exterior,
          FileName = "tikkurila-library-interior.jpg",
          FilePath = "/uploads/libraries/tikkurila-library-interior.jpg",
          AltText = "Exterior view of Tikkurila Library building"
        },

        new LibraryImage
        {
          Id = 6,
          LibraryId = libraries[4].Id,
          ImageType = ImageType.Main,
          FileName = "sello-library-main.jpg",
          FilePath = "/uploads/libraries/sello-library-main.jpg",
          AltText = "Main entrance of Sello Library in shopping center"
        }
      };
      context.LibraryImages.AddRange(libraryImages);
      await context.SaveChangesAsync();
    }

    // Seed EventTags (if not present)
    if (!context.Tags.Any())
    {
      var tags = new List<Tag>
      {
        new Tag { Name = "Language Cafés and discussion groups" },
        new Tag { Name = "Literature" },
        new Tag { Name = "Music" },
        new Tag { Name = "Exhibitions" },
        new Tag { Name = "Training and courses" },
        new Tag { Name = "For senior citizens" },
        new Tag { Name = "For children and families" },
        new Tag { Name = "Other events" }
      };
      context.Tags.AddRange(tags);
      await context.SaveChangesAsync();
    }

    // Seed Events (if not present)
    if (!context.Events.Any())
    {
      var events = new List<Event>
      {
        new Event {
          Id = 1,
          LibraryId = libraries[0].Id, // Malmi Library
          StartTime = new DateTime(2025, 8, 15, 18, 0, 0),
          EndTime = new DateTime(2025, 8, 15, 20, 0, 0),
          CreatedAt = new DateTime(2025, 7, 25, 12, 0, 0),
          MeetingUrl = null,
          EventSeriesId = null
        },
        new Event {
          Id = 2,
          LibraryId = libraries[1].Id, // Maunula Library
          StartTime = new DateTime(2025, 8, 1, 10, 0, 0),
          EndTime = new DateTime(2025, 8, 1, 13, 0, 0),
          CreatedAt = new DateTime(2025, 7, 25, 12, 0, 0),
          MeetingUrl = null,
          EventSeriesId = null
        },
        new Event {
          Id = 3,
          LibraryId = libraries[2].Id, // Rikhardinkatu Library
          StartTime = new DateTime(2025, 8, 5, 9, 0, 0),
          EndTime = new DateTime(2025, 10, 4, 16, 0, 0),
          CreatedAt = new DateTime(2025, 7, 25, 12, 0, 0),
          MeetingUrl = null,
          EventSeriesId = null
        },
        new Event {
          Id = 4,
          LibraryId = libraries[3].Id, // Tikkurila Library
          StartTime = new DateTime(2025, 8, 11, 14, 0, 0),
          EndTime = new DateTime(2025, 8, 11, 16, 0, 0),
          CreatedAt = new DateTime(2025, 7, 25, 12, 0, 0),
          MeetingUrl = null,
          EventSeriesId = null
        },
        new Event {
          Id = 5,
          LibraryId = libraries[4].Id, // Sello Library
          StartTime = new DateTime(2025, 8, 20, 10, 0, 0),
          EndTime = new DateTime(2025, 8, 20, 15, 0, 0),
          CreatedAt = new DateTime(2025, 7, 25, 12, 0, 0),
          MeetingUrl = null,
          EventSeriesId = null
        },
        new Event {
          Id = 6,
          LibraryId = libraries[3].Id, // Tikkurila Library
          StartTime = new DateTime(2025, 8, 11, 17, 0, 0),
          EndTime = new DateTime(2025, 8, 11, 19, 0, 0),
          CreatedAt = new DateTime(2025, 7, 25, 12, 0, 0),
          MeetingUrl = null,
          EventSeriesId = null
        },
        new Event {
          Id = 7,
          LibraryId = libraries[3].Id, // Tikkurila Library
          StartTime = new DateTime(2025, 8, 12, 17, 0, 0),
          EndTime = new DateTime(2025, 8, 12, 19, 0, 0),
          CreatedAt = new DateTime(2025, 7, 25, 12, 0, 0),
          MeetingUrl = null,
          EventSeriesId = null
        },
        new Event {
          Id = 8,
          LibraryId = libraries[4].Id, // Sello Library
          StartTime = new DateTime(2025, 8, 22, 11, 0, 0),
          EndTime = new DateTime(2025, 8, 22, 13, 0, 0),
          CreatedAt = new DateTime(2025, 7, 25, 12, 0, 0),
          MeetingUrl = null,
          EventSeriesId = null
        },
        new Event {
          Id = 9,
          LibraryId = libraries[0].Id, // Malmi Library
          StartTime = new DateTime(2025, 8, 18, 15, 0, 0),
          EndTime = new DateTime(2025, 8, 18, 17, 0, 0),
          CreatedAt = new DateTime(2025, 7, 25, 12, 0, 0),
          MeetingUrl = null,
          EventSeriesId = null
        },
        new Event {
          Id = 10,
          LibraryId = libraries[0].Id, // Malmi Library
          StartTime = new DateTime(2025, 8, 18, 15, 0, 0),
          EndTime = new DateTime(2025, 8, 18, 17, 0, 0),
          CreatedAt = new DateTime(2025, 7, 25, 12, 0, 0),
          MeetingUrl = null,
          EventSeriesId = null
        },
        new Event {
          Id = 11,
          LibraryId = libraries[2].Id, // Rikhardinkatu Library
          StartTime = new DateTime(2025, 8, 6, 15, 0, 0),
          EndTime = new DateTime(2025, 8, 6, 17, 0, 0),
          CreatedAt = new DateTime(2025, 7, 25, 12, 0, 0),
          MeetingUrl = null,
          EventSeriesId = null
        }
      };
      context.Events.AddRange(events);
      await context.SaveChangesAsync();
    }

    // Seed EventImages for each Event (if not present)
    if (!context.EventImages.Any())
    {
      var eventImages = new List<EventImage>
      {
        new EventImage { Id = 1, EventId = 1, FileName = "Storytime Under the Star.jpg", FilePath = "/uploads/events/Storytime Under the Star.jpg", AltText = "Image for event: Storytime Under the Stars" },
        new EventImage { Id = 2, EventId = 2, FileName = "Creative Bookmarks Workshop.jpg", FilePath = "/uploads/events/Creative Bookmarks Workshop.jpg", AltText = "Image for event: Creative Bookmarks Workshop" },
        new EventImage { Id = 3, EventId = 3, FileName = "Art Exhibition.jpg", FilePath = "/uploads/events/Art Exhibition.jpg", AltText = "Image for event: Art Exhibition" },
        new EventImage { Id = 4, EventId = 4, FileName = "Digital Skills for Seniors.jpg", FilePath = "/uploads/events/Digital Skills for Seniors.jpg", AltText = "Image for event: Digital Skills for Seniors" },
        new EventImage { Id = 5, EventId = 5, FileName = "Family Fan Day.jpg", FilePath = "/uploads/events/Family Fan Day.jpg", AltText = "Image for event: Family Fun Day" },
        new EventImage { Id = 6, EventId = 6, FileName = "Language Cafe Finnish for Beginners.jpg", FilePath = "/uploads/events/Language Cafe Finnish for Beginners.jpg", AltText = "Image for event: Language Café: Finnish for Beginners" },
        new EventImage { Id = 7, EventId = 7, FileName = "Language Cafe Italian for Beginners.jpg", FilePath = "/uploads/events/Language Cafe Italian for Beginners.jpg", AltText = "Image for event: Language Café: Italian for Beginners" },
        new EventImage { Id = 8, EventId = 8, FileName = "Travel Through Books.jpg", FilePath = "/uploads/events/Travel Through Books.jpg", AltText = "Image for event: Travel Through Books" },
        new EventImage { Id = 9, EventId = 9, FileName = "Literary Escape Room.jpg", FilePath = "/uploads/events/Literary Escape Room.jpg", AltText = "Image for event: Literary Escape Room" },
        new EventImage { Id = 10, EventId = 10, FileName = "Poetry and Performance Night.jpg", FilePath = "/uploads/events/Poetry and Performance Night.jpg", AltText = "Image for event: Poetry and Performance Night" },
        new EventImage { Id = 11, EventId = 11, FileName = "Lets play and practice chess.jpg", FilePath = "/uploads/events/Lets play and practice chess.jpg", AltText = "Image for event: Let's play and practice chess" }
      };
      context.EventImages.AddRange(eventImages);
      await context.SaveChangesAsync();
    }

    // Seed EventTranslations (if not present)
    if (!context.EventTranslations.Any())
    {
      var eventTranslations = new List<EventTranslation>
      {
        // Event 1: Storytime Under the Stars
        new EventTranslation { Id = 1, EventId = 1, Language = "en", Title = "Storytime Under the Stars", Admission = "Free", Description = "Join us for a magical evening of stories under the stars. Bring your family and enjoy tales from around the world in a cozy outdoor setting." },
        new EventTranslation { Id = 2, EventId = 1, Language = "fi", Title = "Tähtien alla satuhetki", Admission = "Vapaa pääsy", Description = "Tule mukaan taianomaiseen iltaan tähtien alla. Tuo perheesi ja nauti tarinoista eri puolilta maailmaa viihtyisässä ulkoilmassa." },
        new EventTranslation { Id = 3, EventId = 1, Language = "sv", Title = "Sagostund under stjärnorna", Admission = "Gratis", Description = "Följ med på en magisk kväll med sagor under stjärnorna. Ta med familjen och njut av berättelser från hela världen i en mysig utomhusmiljö." },

        // Event 2: Creative Bookmarks Workshop
        new EventTranslation { Id = 4, EventId = 2, Language = "en", Title = "Creative Bookmarks Workshop", Admission = "Free", Description = "Get creative and design your own unique bookmarks! All materials provided. Suitable for all ages." },
        new EventTranslation { Id = 5, EventId = 2, Language = "fi", Title = "Luovat kirjanmerkit -työpaja", Admission = "Vapaa pääsy", Description = "Tule askartelemaan omat uniikit kirjanmerkit! Kaikki tarvikkeet saatavilla. Sopii kaikenikäisille." },
        new EventTranslation { Id = 6, EventId = 2, Language = "sv", Title = "Kreativa bokmärken workshop", Admission = "Gratis", Description = "Kom och skapa dina egna unika bokmärken! Alla material finns på plats. Passar alla åldrar." },

        // Event 3: Art Exhibition
        new EventTranslation { Id = 7, EventId = 3, Language = "en", Title = "Art Exhibition", Admission = "Free", Description = "Explore a diverse art exhibition featuring local artists. Discover paintings, sculptures, and more throughout the library." },
        new EventTranslation { Id = 8, EventId = 3, Language = "fi", Title = "Taidenäyttely", Admission = "Vapaa pääsy", Description = "Tutustu monipuoliseen taidenäyttelyyn, jossa esillä paikallisten taiteilijoiden töitä. Löydä maalauksia, veistoksia ja paljon muuta kirjaston tiloissa." },
        new EventTranslation { Id = 9, EventId = 3, Language = "sv", Title = "Konstutställning", Admission = "Gratis", Description = "Upptäck en mångsidig konstutställning med lokala konstnärer. Se målningar, skulpturer och mycket mer i biblioteket." },

        // Event 4: Digital Skills for Seniors
        new EventTranslation { Id = 10, EventId = 4, Language = "en", Title = "Digital Skills for Seniors", Admission = "Free", Description = "A hands-on workshop for seniors to learn digital skills. Bring your device or use one of ours. Friendly guidance provided." },
        new EventTranslation { Id = 11, EventId = 4, Language = "fi", Title = "Seniorien digitaitotyöpaja", Admission = "Vapaa pääsy", Description = "Käytännön työpaja senioreille digitaidoista. Tuo oma laitteesi tai käytä kirjaston laitteita. Ystävällistä ohjausta tarjolla." },
        new EventTranslation { Id = 12, EventId = 4, Language = "sv", Title = "Digitala färdigheter för seniorer", Admission = "Gratis", Description = "Praktisk verkstad för seniorer om digitala färdigheter. Ta med din egen enhet eller använd bibliotekets. Vänlig handledning ges." },

        // Event 5: Family Fun Day
        new EventTranslation { Id = 13, EventId = 5, Language = "en", Title = "Family Fun Day", Admission = "Free", Description = "A day full of fun activities for the whole family! Games, crafts, and stories await. No registration needed." },
        new EventTranslation { Id = 14, EventId = 5, Language = "fi", Title = "Perheiden hauska päivä", Admission = "Vapaa pääsy", Description = "Koko perheen hauska tapahtumapäivä! Luvassa pelejä, askartelua ja tarinoita. Ei ennakkoilmoittautumista." },
        new EventTranslation { Id = 15, EventId = 5, Language = "sv", Title = "Familjens roliga dag", Admission = "Gratis", Description = "En dag fylld med roliga aktiviteter för hela familjen! Spel, pyssel och sagor väntar. Ingen föranmälan behövs." },

        // Event 6: Language Café: Finnish for Beginners
        new EventTranslation { Id = 16, EventId = 6, Language = "en", Title = "Language Café: Finnish for Beginners", Admission = "Free", Description = "Practice Finnish in a relaxed setting with other beginners. All are welcome, no prior knowledge required." },
        new EventTranslation { Id = 17, EventId = 6, Language = "fi", Title = "Kielikahvila: suomi aloittelijoille", Admission = "Vapaa pääsy", Description = "Harjoittele suomea rennossa ilmapiirissä muiden aloittelijoiden kanssa. Kaikki ovat tervetulleita, aiempaa osaamista ei tarvita." },
        new EventTranslation { Id = 18, EventId = 6, Language = "sv", Title = "Språkcafé: finska för nybörjare", Admission = "Gratis", Description = "Öva finska i en avslappnad miljö med andra nybörjare. Alla är välkomna, ingen förkunskap krävs." },

        // Event 7: Language Café: Italian for Beginners
        new EventTranslation { Id = 19, EventId = 7, Language = "en", Title = "Language Café: Italian for Beginners", Admission = "Free", Description = "Learn basic Italian phrases and practice conversation in a friendly group. Suitable for all levels." },
        new EventTranslation { Id = 20, EventId = 7, Language = "fi", Title = "Kielikahvila: italia aloittelijoille", Admission = "Vapaa pääsy", Description = "Opi italian alkeita ja harjoittele keskustelua rennossa ryhmässä. Sopii kaikille tasoille." },
        new EventTranslation { Id = 21, EventId = 7, Language = "sv", Title = "Språkcafé: italienska för nybörjare", Admission = "Gratis", Description = "Lär dig italienska grunder och öva samtal i en vänlig grupp. Passar alla nivåer." },

        // Event 8: Travel Through Books
        new EventTranslation { Id = 22, EventId = 8, Language = "en", Title = "Travel Through Books", Admission = "Free", Description = "Travel the world through books! Discover new cultures and stories in this interactive reading event." },
        new EventTranslation { Id = 23, EventId = 8, Language = "fi", Title = "Kirjojen matkassa maailmalle", Admission = "Vapaa pääsy", Description = "Matkusta kirjojen avulla maailman ympäri! Tutustu uusiin kulttuureihin ja tarinoihin tässä vuorovaikutteisessa lukutapahtumassa." },
        new EventTranslation { Id = 24, EventId = 8, Language = "sv", Title = "Resa genom böcker", Admission = "Gratis", Description = "Res jorden runt med böcker! Upptäck nya kulturer och berättelser på detta interaktiva läsevenemang." },

        // Event 9: Literary Escape Room
        new EventTranslation { Id = 25, EventId = 9, Language = "en", Title = "Literary Escape Room", Admission = "Free", Description = "Solve puzzles and riddles in our literary escape room. Work as a team to unlock the story!" },
        new EventTranslation { Id = 26, EventId = 9, Language = "fi", Title = "Kirjallinen pakohuone", Admission = "Vapaa pääsy", Description = "Ratkaise arvoituksia ja pulmia kirjallisessa pakohuoneessamme. Toimi tiiminä ja avaa tarina!" },
        new EventTranslation { Id = 27, EventId = 9, Language = "sv", Title = "Litterärt escape room", Admission = "Gratis", Description = "Lös gåtor och pussel i vårt litterära escape room. Samarbeta för att låsa upp berättelsen!" },

        // Event 10: Poetry and Performance Night
        new EventTranslation { Id = 28, EventId = 10, Language = "en", Title = "Poetry and Performance Night", Admission = "Free", Description = "An evening of poetry readings and live performances. Share your own work or just enjoy the show!" },
        new EventTranslation { Id = 29, EventId = 10, Language = "fi", Title = "Runo- ja esitysilta", Admission = "Vapaa pääsy", Description = "Runonlausuntaa ja esityksiä illan hämärtyessä. Voit esiintyä itse tai tulla vain nauttimaan!" },
        new EventTranslation { Id = 30, EventId = 10, Language = "sv", Title = "Poesi- och föreställningskväll", Admission = "Gratis", Description = "En kväll med poesiuppläsningar och liveframträdanden. Dela ditt eget verk eller njut av föreställningen!" },

        // Event 11: Let's play and practice chess
        new EventTranslation { Id = 31, EventId = 11, Language = "fi", Title = "Shakkipaja: pelataan ja harjoitellaan", Admission = "Vapaa pääsy", Description = "Shakkipaja kirjastolla – tule mukaan pelaamaan ja oppimaan! \n\nTervetuloa mukaan maksuttomaan shakkipajaan! Pajassa pääset harjoittelemaan shakin alkeita tai hiomaan pelitaitojasi kokeneemmassa porukassa. Käymme läpi pelin perussäännöt, erilaisia avauksia ja taktisia oivalluksia. Pelaamme myös yhdessä leikkimielisiä pelejä ja ratkaistaan hauskoja shakkitehtäviä.\n\nPaja sopii kaikentasoisille pelaajille – olitpa sitten vasta-alkaja tai jo kokenut nappuloiden liikuttelija. Tule yksin tai kaverin kanssa, paikalle voi tulla myös vain seuraamaan peliä ja oppimaan uutta!" },
        new EventTranslation { Id = 32, EventId = 11, Language = "sv", Title = "Schackverkstad: spela och öva", Admission = "Gratis", Description = "Schackverkstad på biblioteket – kom och spela och lär dig!\n\nVälkommen till en kostnadsfri schackverkstad! Här får du öva på schackets grunder eller finslipa dina spelkunskaper i ett mer erfaret sällskap. Vi går igenom spelets grundregler, olika öppningar och taktiska knep. Vi spelar också tillsammans vänskapliga partier och löser roliga schackproblem.\n\nVerkstaden passar spelare på alla nivåer – oavsett om du är nybörjare eller redan van att flytta pjäser. Kom ensam eller med en vän, du kan också bara komma för att titta på spelet och lära dig något nytt!" },
        new EventTranslation { Id = 33, EventId = 11, Language = "en", Title = "Let's play and practice chess", Admission = "Free", Description = "Chess workshop at the library – come play and learn!\n\nWelcome to a free chess workshop! Here you can practice the basics of chess or hone your skills with more experienced players. We will go through the basic rules of the game, different openings, and tactical ideas. We will also play friendly games together and solve fun chess puzzles.\n\nThe workshop is suitable for players of all levels – whether you are a beginner or already experienced. Come alone or with a friend, or just drop by to watch and learn something new!" }
      };
      context.EventTranslations.AddRange(eventTranslations);
      await context.SaveChangesAsync();
    }

    // Seed Tags (if not present)
    if (!context.Tags.Any())
    {
      var tags = new List<Tag>
      {
        new Tag { Name = "Language Cafés and discussion groups" },
        new Tag { Name = "Literature" },
        new Tag { Name = "Music" },
        new Tag { Name = "Exhibitions" },
        new Tag { Name = "Training and courses" },
        new Tag { Name = "For senior citizens" },
        new Tag { Name = "For children and families" },
        new Tag { Name = "Other events" }
      };
      context.Tags.AddRange(tags);
      await context.SaveChangesAsync();
    }

    // Seed EventTags (if not present)
    if (!context.EventTags.Any())
    {
      var eventTags = new List<EventTag>
      {
        new EventTag { EventId = 1, TagId = 7 },  // Storytime Under the Stars
        new EventTag { EventId = 2, TagId = 7 },  // Creative Bookmarks Workshop
        new EventTag { EventId = 3, TagId = 4 },  // Art Exhibition
        new EventTag { EventId = 3, TagId = 6 },  // Art Exhibition (For senior citizens)
        new EventTag { EventId = 3, TagId = 7 },  // Art Exhibition (For children and families)
        new EventTag { EventId = 4, TagId = 6 },  // Digital Skills for Seniors
        new EventTag { EventId = 5, TagId = 7 },  // Family Fun Day
        new EventTag { EventId = 6, TagId = 6 },  // Language Café: Finnish for Beginners
        new EventTag { EventId = 7, TagId = 6 },  // Language Café: Italian for Beginners
        new EventTag { EventId = 8, TagId = 7 },  // Travel Through Books
        new EventTag { EventId = 8, TagId = 2 },  // Travel Through Books (Literature)
        new EventTag { EventId = 9, TagId = 2 },  // Literary Escape Room (Literature)
        new EventTag { EventId = 10, TagId = 2 }, // Poetry and Performance Night (Literature)
        new EventTag { EventId = 10, TagId = 3 }, // Poetry and Performance Night (Music)
        new EventTag { EventId = 11, TagId = 6 }  // Let's play and practice chess (Other events)
      };
      foreach (var et in eventTags)
      {
        if (!context.EventTags.Any(x => x.EventId == et.EventId && x.TagId == et.TagId))
        {
          context.EventTags.Add(et);
        }
      }
      await context.SaveChangesAsync();
    }
  }
}
