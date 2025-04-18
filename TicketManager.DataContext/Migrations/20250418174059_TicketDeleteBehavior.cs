using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TicketManager.DataContext.Migrations
{
    /// <inheritdoc />
    public partial class TicketDeleteBehavior : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Seat_SeatId",
                table: "Tickets");

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
                name: "FK_Tickets_Seat_SeatId",
                table: "Tickets");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Seat_SeatId",
                table: "Tickets",
                column: "SeatId",
                principalTable: "Seat",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
