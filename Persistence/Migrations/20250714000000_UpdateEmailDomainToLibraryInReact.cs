using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdateEmailDomainToLibraryInReact : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Update all email addresses from @kirjaasto.com to @libraryinreact.com
            migrationBuilder.Sql(@"
                UPDATE LibraryEmailContactDetails 
                SET ContactEmail = REPLACE(ContactEmail, '@kirjaasto.com', '@libraryinreact.com')
                WHERE ContactEmail LIKE '%@kirjaasto.com'
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Revert email addresses back to @kirjaasto.com
            migrationBuilder.Sql(@"
                UPDATE LibraryEmailContactDetails 
                SET ContactEmail = REPLACE(ContactEmail, '@libraryinreact.com', '@kirjaasto.com')
                WHERE ContactEmail LIKE '%@libraryinreact.com'
            ");
        }
    }
}
