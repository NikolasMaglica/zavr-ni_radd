using AuthenticationApi.Dtos;
using AuthenticationApi.Entities;
using AutoMapper;


namespace nikolas.Extensions
{
    public class Imapper : Profile
    {
        public Imapper()
        {            
            CreateMap<OfferCreation, Offer>();
            CreateMap<OfferUpdate, Offer>();
            CreateMap<Vehicle_TypeCreation, Vehicle_Type>();
            CreateMap<Vehicle_TypeUpdate, Vehicle_Type>();
            CreateMap<VehicleCreation, Vehicle>();
            CreateMap<VehicleUpdate, Vehicle>();
            CreateMap<ClientUpdate, Client>();
            CreateMap<ClientCreation, Client>();
            CreateMap<ServiceCreation, Service>();
            CreateMap<ServiceUpdate, Service>();
            CreateMap<MaterialUpdate, Material>();
            CreateMap<MaterialCreation, Material>();
            CreateMap<OrderCreation, Order>();
            CreateMap<OrderUpdate, Order>();
            CreateMap<Offer_StatusCreation, Offer_Status>();
            CreateMap<Order_StatusCreation, Order_Status>();
            CreateMap<User_VehicleCreation, User_Vehicle>();
            CreateMap<User_VehicleUpdate, User_Vehicle>();















        }
    }
}