using System;

namespace API.DTO
{
    public class EventSummaryDto
    {
        public int Id { get; set; }
        public required int LibraryId { get; set; }
        public required string LibraryTitle { get; set; }
        public required string LibraryAddress { get; set; }
        public required string EventName { get; set; } // In proper language
        public required DateTime StartTime { get; set; }
        public required DateTime EndTime { get; set; }
        public required int ImageId { get; set; }
        public required string FileName { get; set; }
        public required string FilePath { get; set; }
        public required string AltText { get; set; }

        // Description and Admission removed
        public required List<string> Tags { get; set; }
    }
}
