using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdateOpeningHourSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LibraryOpeningHours");

            migrationBuilder.CreateTable(
                name: "OpeningHours",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    OpeningHourType = table.Column<int>(type: "INTEGER", nullable: false),
                    OpeningTime = table.Column<TimeOnly>(type: "TEXT", nullable: false),
                    ClosingTime = table.Column<TimeOnly>(type: "TEXT", nullable: false),
                    WeekType = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OpeningHours", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OpeningHours");

            migrationBuilder.CreateTable(
                name: "LibraryOpeningHours",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    LibraryId = table.Column<int>(type: "INTEGER", nullable: false),
                    ClosingTime = table.Column<TimeOnly>(type: "TEXT", nullable: false),
                    OpeningHourType = table.Column<int>(type: "INTEGER", nullable: false),
                    OpeningTime = table.Column<TimeOnly>(type: "TEXT", nullable: false),
                    WeekType = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LibraryOpeningHours", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LibraryOpeningHours_Libraries_LibraryId",
                        column: x => x.LibraryId,
                        principalTable: "Libraries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LibraryOpeningHours_LibraryId",
                table: "LibraryOpeningHours",
                column: "LibraryId");
        }
    }
}
