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
            Name = "Malmi Library",
            Address = "Ylä-Malmin tori 3, 00700 Helsinki",
            Homepage = "https://www.hel.fi/kirjastot/malmi",
            FacebookUrl = "https://www.facebook.com/malmi-kirjasto"
        },
        // Maunula Library (Id = 2)
        new Library
        {
            Id = 2,
            Name = "Maunula Library",
            Address = "Metsäpurontie 16, 00630 Helsinki",
            Homepage = "https://www.hel.fi/kirjastot/maunula",
            FacebookUrl = "https://www.facebook.com/maunula-kirjasto"
        },
        // Rikhardinkatu Library (Id = 3)
        new Library
        {
            Id = 3,
            Name = "Rikhardinkatu Library",
            Address = "Rikhardinkatu 3, 00130 Helsinki",
            Homepage = "https://www.hel.fi/kirjastot/rikhardinkatu",
            FacebookUrl = "https://www.facebook.com/rikhardinkatu-kirjasto"
        },
        // Tikkurila Library (Id = 4)
        new Library
        {
            Id = 4,
            Name = "Tikkurila Library",
            Address = "Ratatie 11, 01300 Vantaa",
            Homepage = "https://www.vantaa.fi/kirjastot/tikkurila",
            FacebookUrl = "https://www.facebook.com/tikkurila-kirjasto"
        },
        // Sello Library (Id = 5)
        new Library
        {
            Id = 5,
            Name = "Sello Library",
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
  }
}