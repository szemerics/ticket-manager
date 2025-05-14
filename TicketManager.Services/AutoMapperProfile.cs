using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TicketManager.DataContext.Context;
using TicketManager.DataContext.Dtos;
using TicketManager.DataContext.Entities;

namespace TicketManager.Services
{
    public class AutoMapperProfile : Profile
    {

        public AutoMapperProfile()
        {

            // Movie Mappings
            CreateMap<Movie, MovieDto>().ReverseMap();
            CreateMap<MovieCreateDto, Movie>();
            CreateMap<MovieUpdateDto, Movie>();
            CreateMap<MovieCategory, MovieCategoryDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => (int)src))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.ToString()));

            // Screening Mappings
            CreateMap<Screening, ScreeningDto>().ReverseMap();
            CreateMap<Screening, MovieScreeningDto>();
            CreateMap<ScreeningCreateDto, Screening>()
                .ForMember(dest => dest.ScreeningPrice, opt => opt.MapFrom(src => src.ScreeningPrice));
            CreateMap<ScreeningUpdateDto, Screening>();

            // Room Mappings
            CreateMap<Room, RoomDto>().ReverseMap();
            CreateMap<RoomCreateDto, Room>();
            CreateMap<RoomUpdateDto, Room>();



            // User Mapping
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<UserRegisterDto, User>();
            CreateMap<UserUpdateDto, User>()
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));


            // Order Mapping
            CreateMap<Order, OrderDto>()
                .ReverseMap();

            CreateMap<OrderCreateDto, Order>()
                .ForMember(dest => dest.PurchaseDate, opt => opt.MapFrom(src => DateTime.Now));

            // Ticket Mappings
            CreateMap<Ticket, TicketDto>()
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
                .ReverseMap();
            CreateMap<Ticket, OrderTicketDto>()
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
                .ReverseMap();
            CreateMap<TicketCreateDto, Ticket>();
            CreateMap<TicketUpdateDto, Ticket>();


            // Settings Mappings
            CreateMap<Setting, SettingDto>().ReverseMap();
            CreateMap<UpdateSettingDto, Setting>();

            // Role Mappings
            CreateMap<Role, RoleDto>().ReverseMap();

            // Seat Mappings
            CreateMap<Seat, SeatDto>().ReverseMap();
            CreateMap<Seat, OrderSeatDto>();

        }


    }
}
