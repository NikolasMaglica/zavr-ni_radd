using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AuthenticationApi.Migrations
{
    public partial class ll : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_User_Vehicle",
                table: "User_Vehicle");

            migrationBuilder.AddPrimaryKey(
                name: "PK_User_Vehicle",
                table: "User_Vehicle",
                column: "id");

            migrationBuilder.CreateIndex(
                name: "IX_User_Vehicle_userid",
                table: "User_Vehicle",
                column: "userid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_User_Vehicle",
                table: "User_Vehicle");

            migrationBuilder.DropIndex(
                name: "IX_User_Vehicle_userid",
                table: "User_Vehicle");

            migrationBuilder.AddPrimaryKey(
                name: "PK_User_Vehicle",
                table: "User_Vehicle",
                columns: new[] { "userid", "vehicleid" });
        }
    }
}
