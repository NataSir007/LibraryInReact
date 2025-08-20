using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;
using YourNamespace.Models; // Adjust namespace
using YourNamespace.Services; // Adjust namespace
using YourNamespace.Repositories; // Adjust namespace

namespace Tests.UnitTests
{
  public class EventServiceTests
  {
    private readonly Mock<IEventRepository> _mockEventRepository;
    private readonly Mock<ILogger<EventService>> _mockLogger;
    private readonly EventService _eventService;

    public EventServiceTests()
    {
      _mockEventRepository = new Mock<IEventRepository>();
      _mockLogger = new Mock<ILogger<EventService>>();
      _eventService = new EventService(_mockEventRepository.Object, _mockLogger.Object);
    }

    [Fact]
    public async Task GetAllEvents_ReturnsAllEvents()
    {
      // Arrange
      var expectedEvents = new List<Event>
      {
        new Event { Id = 1, Title = "Event 1", Date = DateTime.Now.AddDays(1) },
        new Event { Id = 2, Title = "Event 2", Date = DateTime.Now.AddDays(2) }
      };

      _mockEventRepository.Setup(repo => repo.GetAllAsync()).ReturnsAsync(expectedEvents);

      // Act
      var result = await _eventService.GetAllEvents();

      // Assert
      Assert.Equal(expectedEvents.Count, result.Count());
      Assert.Equal(expectedEvents, result);
    }

    [Fact]
    public async Task GetEventById_ExistingId_ReturnsEvent()
    {
      // Arrange
      var eventId = 1;
      var expectedEvent = new Event { Id = eventId, Title = "Event 1", Date = DateTime.Now.AddDays(1) };

      _mockEventRepository.Setup(repo => repo.GetByIdAsync(eventId)).ReturnsAsync(expectedEvent);

      // Act
      var result = await _eventService.GetEventById(eventId);

      // Assert
      Assert.NotNull(result);
      Assert.Equal(expectedEvent, result);
    }

    [Fact]
    public async Task GetEventById_NonExistingId_ReturnsNull()
    {
      // Arrange
      var eventId = 99;
      _mockEventRepository.Setup(repo => repo.GetByIdAsync(eventId)).ReturnsAsync((Event)null);

      // Act
      var result = await _eventService.GetEventById(eventId);

      // Assert
      Assert.Null(result);
    }

    [Fact]
    public async Task FilterEventsByLibraryName_ReturnsFilteredEvents()
    {
      // Arrange
      string libraryName = "Central Library";
      var events = new List<Event>
      {
        new Event { Id = 1, Title = "Event 1", Date = DateTime.Now.AddDays(1), LibraryName = "Central Library" },
        new Event { Id = 2, Title = "Event 2", Date = DateTime.Now.AddDays(2), LibraryName = "East Library" },
        new Event { Id = 3, Title = "Event 3", Date = DateTime.Now.AddDays(3), LibraryName = "Central Library" }
      };

      _mockEventRepository.Setup(repo => repo.GetAllAsync()).ReturnsAsync(events);

      // Act
      var result = await _eventService.FilterEventsByLibraryName(libraryName);

      // Assert
      Assert.Equal(2, result.Count());
      Assert.All(result, e => Assert.Equal(libraryName, e.LibraryName));
    }

    [Fact]
    public async Task FilterEventsByLibraryName_NoMatchingEvents_ReturnsEmptyList()
    {
      // Arrange
      string libraryName = "Non-existent Library";
      var events = new List<Event>
      {
        new Event { Id = 1, Title = "Event 1", Date = DateTime.Now.AddDays(1), LibraryName = "Central Library" },
        new Event { Id = 2, Title = "Event 2", Date = DateTime.Now.AddDays(2), LibraryName = "East Library" }
      };

      _mockEventRepository.Setup(repo => repo.GetAllAsync()).ReturnsAsync(events);

      // Act
      var result = await _eventService.FilterEventsByLibraryName(libraryName);

      // Assert
      Assert.Empty(result);
    }

    [Fact]
    public async Task FilterEventsByStartDate_ReturnsEventsOnOrAfterDate()
    {
      // Arrange
      DateTime startDate = DateTime.Today;
      var events = new List<Event>
      {
        new Event { Id = 1, Title = "Past Event", Date = DateTime.Today.AddDays(-2) },
        new Event { Id = 2, Title = "Today Event", Date = DateTime.Today },
        new Event { Id = 3, Title = "Future Event", Date = DateTime.Today.AddDays(3) }
      };

      _mockEventRepository.Setup(repo => repo.GetAllAsync()).ReturnsAsync(events);

      // Act
      var result = await _eventService.FilterEventsByStartDate(startDate);

      // Assert
      Assert.Equal(2, result.Count());
      Assert.All(result, e => Assert.True(e.Date >= startDate));
    }

    [Fact]
    public async Task FilterEventsByStartDate_NoMatchingEvents_ReturnsEmptyList()
    {
      // Arrange
      DateTime startDate = DateTime.Today.AddDays(10);
      var events = new List<Event>
      {
        new Event { Id = 1, Title = "Past Event", Date = DateTime.Today.AddDays(-2) },
        new Event { Id = 2, Title = "Today Event", Date = DateTime.Today },
        new Event { Id = 3, Title = "Future Event", Date = DateTime.Today.AddDays(3) }
      };

      _mockEventRepository.Setup(repo => repo.GetAllAsync()).ReturnsAsync(events);

      // Act
      var result = await _eventService.FilterEventsByStartDate(startDate);

      // Assert
      Assert.Empty(result);
    }

    [Fact]
    public async Task FilterEventsByEndDate_ReturnsEventsOnOrBeforeDate()
    {
      // Arrange
      DateTime endDate = DateTime.Today;
      var events = new List<Event>
      {
        new Event { Id = 1, Title = "Past Event", Date = DateTime.Today.AddDays(-2) },
        new Event { Id = 2, Title = "Today Event", Date = DateTime.Today },
        new Event { Id = 3, Title = "Future Event", Date = DateTime.Today.AddDays(3) }
      };

      _mockEventRepository.Setup(repo => repo.GetAllAsync()).ReturnsAsync(events);

      // Act
      var result = await _eventService.FilterEventsByEndDate(endDate);

      // Assert
      Assert.Equal(2, result.Count());
      Assert.All(result, e => Assert.True(e.Date <= endDate));
    }

    [Fact]
    public async Task FilterEventsByEndDate_NoMatchingEvents_ReturnsEmptyList()
    {
      // Arrange
      DateTime endDate = DateTime.Today.AddDays(-10);
      var events = new List<Event>
      {
        new Event { Id = 1, Title = "Past Event", Date = DateTime.Today.AddDays(-2) },
        new Event { Id = 2, Title = "Today Event", Date = DateTime.Today },
        new Event { Id = 3, Title = "Future Event", Date = DateTime.Today.AddDays(3) }
      };

      _mockEventRepository.Setup(repo => repo.GetAllAsync()).ReturnsAsync(events);

      // Act
      var result = await _eventService.FilterEventsByEndDate(endDate);

      // Assert
      Assert.Empty(result);
    }
  }
}