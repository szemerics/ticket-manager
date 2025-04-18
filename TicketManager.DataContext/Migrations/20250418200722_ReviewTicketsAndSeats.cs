using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TicketManager.DataContext.Migrations
{
    /// <inheritdoc />
    public partial class ReviewTicketsAndSeats : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Screenings_ScreeningId",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "Seats",
                table: "Rooms");

            migrationBuilder.RenameColumn(
                name: "TicketPrice",
                table: "Tickets",
                newName: "Price");

            migrationBuilder.RenameColumn(
                name: "Capacity",
                table: "Rooms",
                newName: "RowNumber");

            migrationBuilder.AlterColumn<int>(
                name: "ScreeningId",
                table: "Tickets",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "SeatId",
                table: "Tickets",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ColumnNumber",
                table: "Rooms",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ScreeningId",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Seat",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ScreeningId = table.Column<int>(type: "int", nullable: false),
                    Row = table.Column<int>(type: "int", nullable: false),
                    Column = table.Column<int>(type: "int", nullable: false),
                    IsReserved = table.Column<bool>(type: "bit", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Seat", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Seat_Screenings_ScreeningId",
                        column: x => x.ScreeningId,
                        principalTable: "Screenings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_SeatId",
                table: "Tickets",
                column: "SeatId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_ScreeningId",
                table: "Orders",
                column: "ScreeningId");

            migrationBuilder.CreateIndex(
                name: "IX_Seat_ScreeningId",
                table: "Seat",
                column: "ScreeningId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Screenings_ScreeningId",
                table: "Orders",
                column: "ScreeningId",
                principalTable: "Screenings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Screenings_ScreeningId",
                table: "Tickets",
                column: "ScreeningId",
                principalTable: "Screenings",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Seat_SeatId",
                table: "Tickets",
                column: "SeatId",
                principalTable: "Seat",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Screenings_ScreeningId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Screenings_ScreeningId",
                table: "Tickets");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Seat_SeatId",
                table: "Tickets");

            migrationBuilder.DropTable(
                name: "Seat");

            migrationBuilder.DropIndex(
                name: "IX_Tickets_SeatId",
                table: "Tickets");

            migrationBuilder.DropIndex(
                name: "IX_Orders_ScreeningId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "SeatId",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "ColumnNumber",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "ScreeningId",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "Tickets",
                newName: "TicketPrice");

            migrationBuilder.RenameColumn(
                name: "RowNumber",
                table: "Rooms",
                newName: "Capacity");

            migrationBuilder.AlterColumn<int>(
                name: "ScreeningId",
                table: "Tickets",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Seats",
                table: "Rooms",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Screenings_ScreeningId",
                table: "Tickets",
                column: "ScreeningId",
                principalTable: "Screenings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
