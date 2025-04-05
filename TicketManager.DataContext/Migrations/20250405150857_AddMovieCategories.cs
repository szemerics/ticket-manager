using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TicketManager.DataContext.Migrations
{
    /// <inheritdoc />
    public partial class AddMovieCategories : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MovieCategory_Movies_MovieId",
                table: "MovieCategory");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MovieCategory",
                table: "MovieCategory");

            migrationBuilder.RenameTable(
                name: "MovieCategory",
                newName: "MovieCategories");

            migrationBuilder.RenameIndex(
                name: "IX_MovieCategory_MovieId",
                table: "MovieCategories",
                newName: "IX_MovieCategories_MovieId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MovieCategories",
                table: "MovieCategories",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MovieCategories_Movies_MovieId",
                table: "MovieCategories",
                column: "MovieId",
                principalTable: "Movies",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MovieCategories_Movies_MovieId",
                table: "MovieCategories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MovieCategories",
                table: "MovieCategories");

            migrationBuilder.RenameTable(
                name: "MovieCategories",
                newName: "MovieCategory");

            migrationBuilder.RenameIndex(
                name: "IX_MovieCategories_MovieId",
                table: "MovieCategory",
                newName: "IX_MovieCategory_MovieId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MovieCategory",
                table: "MovieCategory",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MovieCategory_Movies_MovieId",
                table: "MovieCategory",
                column: "MovieId",
                principalTable: "Movies",
                principalColumn: "Id");
        }
    }
}
