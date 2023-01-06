using AuthenticationApi.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AuthenticationApi.Db;

public class AppDbContext : IdentityDbContext<User>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }
    public DbSet<Offer>? Offers { get; set; }
    public DbSet<Vehicle_Type> Vehicle_Types { get; set; }
    public DbSet<Vehicle> Vehicles { get; set; }
    public DbSet<Client> Clients { get; set; }
    public DbSet<User_Vehicle> User_Vehicle { get; set; }
    public DbSet<Service> Services { get; set; }
    public DbSet<Material> Materials { get; set; }
    public DbSet<Order> Order { get; set; }
    public DbSet<Order_Status> Order_status { get; set; }
    public DbSet<Offer_Status> Offer_status { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<User>(e =>
        {
            e.HasMany(p => p.Offers)
            .WithOne(p => p.User)
            .HasForeignKey(p => p.userid); 
        });
        builder.Entity<Vehicle_Type>(e =>
        {
            e.HasMany(p => p.Vehicles)
            .WithOne(p => p.vehicle_type)
            .HasForeignKey(p => p.vehicle_typeid);
        });
        builder.Entity<Client>(e =>
        {
            e.HasMany(p => p.Vehicles)
            .WithOne(p => p.client)
            .HasForeignKey(p => p.clientid);
        });
        builder.Entity<Client>(e =>
        {
            e.HasMany(p => p.Offers)
            .WithOne(p => p.client)
            .HasForeignKey(p => p.clientid);
        });
        builder.Entity<Material>(e =>
        {
            e.HasMany(p => p.Orders)
            .WithOne(p => p.material)
            .HasForeignKey(p => p.materialid);
        });
        builder.Entity<Service>(e =>
        {
            e.HasMany(p => p.Offers)
            .WithOne(p => p.service)
            .HasForeignKey(p => p.serviceid);
        });
        builder.Entity<Material>(e =>
        {
            e.HasMany(p => p.Offers)
            .WithOne(p => p.material)
            .HasForeignKey(p => p.materialid);
        });
        builder.Entity<Order_Status>(e =>
        {
            e.HasMany(p => p.Orders)
            .WithOne(p => p.order_status)
            .HasForeignKey(p => p.order_statusid);
        });
        builder.Entity<Offer_Status>(e =>
        {
            e.HasMany(p => p.Offers)
            .WithOne(p => p.offer_status)
            .HasForeignKey(p => p.offer_statusid);
        });

        builder.Entity<User_Vehicle>()
        .HasKey(bc => bc.id);
        builder.Entity<User_Vehicle>()
            .HasOne(bc => bc.user)
            .WithMany(b => b.user_vehicle)
            .HasForeignKey(bc => bc.userid);
        builder.Entity<User_Vehicle>()
            .HasOne(bc => bc.vehicle)
            .WithMany(c => c.user_vehicle)
            .HasForeignKey(bc => bc.vehicleid);
        builder.Entity<Material>()
       .Property(p => p.price)
       .HasColumnType("decimal(18,3)");
        builder.Entity<Service>()
    .Property(p => p.price)
    .HasColumnType("decimal(18,3)");
        builder.Entity<Offer>()
    .Property(p => p.totalPrice)
    .HasColumnType("decimal(18,3)");



    }

}

