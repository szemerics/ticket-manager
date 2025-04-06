using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TicketManager.DataContext.Migrations
{
    /// <inheritdoc />
    public partial class AddedSetting : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Price",
                table: "Tickets",
                newName: "TicketPrice");

            migrationBuilder.RenameColumn(
                name: "Discount",
                table: "Tickets",
                newName: "Type");

            migrationBuilder.AddColumn<decimal>(
                name: "ScreeningPrice",
                table: "Screenings",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.CreateTable(
                name: "Settings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Key = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Settings", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Settings");

            migrationBuilder.DropColumn(
                name: "ScreeningPrice",
                table: "Screenings");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Tickets",
                newName: "Discount");

            migrationBuilder.RenameColumn(
                name: "TicketPrice",
                table: "Tickets",
                newName: "Price");
        }
    }
}
