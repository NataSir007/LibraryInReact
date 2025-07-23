using Domain;

public class LibraryNoteTranslation
{
    public int Id { get; set; }
    public int LibraryId { get; set; }
    public Library? Library { get; set; }
    public required string Language { get; set; }
    public required string Note { get; set; }
}