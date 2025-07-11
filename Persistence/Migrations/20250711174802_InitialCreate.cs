using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "HolidayWeeks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    WeekNumber = table.Column<int>(type: "INTEGER", nullable: false),
                    Monday = table.Column<int>(type: "INTEGER", nullable: false),
                    Tuesday = table.Column<int>(type: "INTEGER", nullable: false),
                    Wednesday = table.Column<int>(type: "INTEGER", nullable: false),
                    Thursday = table.Column<int>(type: "INTEGER", nullable: false),
                    Friday = table.Column<int>(type: "INTEGER", nullable: false),
                    Saturday = table.Column<int>(type: "INTEGER", nullable: false),
                    Sunday = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HolidayWeeks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Libraries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 128, nullable: false),
                    Address = table.Column<string>(type: "TEXT", maxLength: 128, nullable: false),
                    Homepage = table.Column<string>(type: "TEXT", maxLength: 256, nullable: false),
                    FacebookUrl = table.Column<string>(type: "TEXT", maxLength: 256, nullable: false),
                    Notes = table.Column<string>(type: "TEXT", maxLength: 1024, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Libraries", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LibraryEmailContactDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    LibraryId = table.Column<int>(type: "INTEGER", nullable: false),
                    ServiceName = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    ContactName = table.Column<string>(type: "TEXT", maxLength: 64, nullable: true),
                    ContactEmail = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LibraryEmailContactDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LibraryEmailContactDetails_Libraries_LibraryId",
                        column: x => x.LibraryId,
                        principalTable: "Libraries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LibraryMailingAddresses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    LibraryId = table.Column<int>(type: "INTEGER", nullable: false),
                    PostOfficeBox = table.Column<string>(type: "TEXT", maxLength: 10, nullable: false),
                    PostalCode = table.Column<string>(type: "TEXT", maxLength: 10, nullable: false),
                    LocationType = table.Column<int>(type: "INTEGER", nullable: false),
                    LocationName = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LibraryMailingAddresses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LibraryMailingAddresses_Libraries_LibraryId",
                        column: x => x.LibraryId,
                        principalTable: "Libraries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LibraryOpeningHours",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    LibraryId = table.Column<int>(type: "INTEGER", nullable: false),
                    OpeningHourType = table.Column<int>(type: "INTEGER", nullable: false),
                    OpeningTime = table.Column<TimeOnly>(type: "TEXT", nullable: false),
                    ClosingTime = table.Column<TimeOnly>(type: "TEXT", nullable: false),
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

            migrationBuilder.CreateTable(
                name: "LibraryPhoneNumberContactDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    LibraryId = table.Column<int>(type: "INTEGER", nullable: false),
                    ServiceName = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    ContactName = table.Column<string>(type: "TEXT", maxLength: 64, nullable: true),
                    ContactPhoneNumber = table.Column<string>(type: "TEXT", maxLength: 24, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LibraryPhoneNumberContactDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LibraryPhoneNumberContactDetails_Libraries_LibraryId",
                        column: x => x.LibraryId,
                        principalTable: "Libraries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LibraryEmailContactDetails_LibraryId",
                table: "LibraryEmailContactDetails",
                column: "LibraryId");

            migrationBuilder.CreateIndex(
                name: "IX_LibraryMailingAddresses_LibraryId",
                table: "LibraryMailingAddresses",
                column: "LibraryId");

            migrationBuilder.CreateIndex(
                name: "IX_LibraryOpeningHours_LibraryId",
                table: "LibraryOpeningHours",
                column: "LibraryId");

            migrationBuilder.CreateIndex(
                name: "IX_LibraryPhoneNumberContactDetails_LibraryId",
                table: "LibraryPhoneNumberContactDetails",
                column: "LibraryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HolidayWeeks");

            migrationBuilder.DropTable(
                name: "LibraryEmailContactDetails");

            migrationBuilder.DropTable(
                name: "LibraryMailingAddresses");

            migrationBuilder.DropTable(
                name: "LibraryOpeningHours");

            migrationBuilder.DropTable(
                name: "LibraryPhoneNumberContactDetails");

            migrationBuilder.DropTable(
                name: "Libraries");
        }
    }
}
