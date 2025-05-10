using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BeestjeOpJeFeestje.Migrations
{
    /// <inheritdoc />
    public partial class AddedPriceAndDiscountColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_CustomerCards_CustomerCardId",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<decimal>(
                name: "discount",
                table: "BookedBugs",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "totalPrice",
                table: "BookedBugs",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CustomerCardId",
                table: "AspNetUsers",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_CustomerCards_CustomerCardId",
                table: "AspNetUsers",
                column: "CustomerCardId",
                principalTable: "CustomerCards",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_CustomerCards_CustomerCardId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "discount",
                table: "BookedBugs");

            migrationBuilder.DropColumn(
                name: "totalPrice",
                table: "BookedBugs");

            migrationBuilder.AlterColumn<int>(
                name: "CustomerCardId",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_CustomerCards_CustomerCardId",
                table: "AspNetUsers",
                column: "CustomerCardId",
                principalTable: "CustomerCards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
