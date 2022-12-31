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
            CreateMap<Service_OfferCreation, Service_Offer>();
            CreateMap<Service_OfferUpdate, Service_Offer>();
            CreateMap<MaterialUpdate, Material>();
            CreateMap<MaterialCreation, Material>();
            CreateMap<Material_OfferCreation, Material_Offer>();
            CreateMap<Material_OfferUpdate, Material_Offer>();
            CreateMap<OrderCreation, Order>();
            CreateMap<OrderUpdate, Order>();
            CreateMap<Offer_StatusCreation, Offer_Status>();
            CreateMap<Order_StatusCreation, Order_Status>();















        }
    }
}