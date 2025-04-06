using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
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

            // Screening Mappings
            CreateMap<Screening, ScreeningDto>()
                .ForMember(dest => dest.MovieTitle, opt => opt.MapFrom(src => src.Movie.Title))
                .ForMember(dest => dest.RoomName, opt => opt.MapFrom(src => src.Room.Name))
                .ReverseMap();

            CreateMap<ScreeningCreateDto, Screening>()
                .ForMember(dest => dest.ScreeningPrice, opt => opt.MapFrom(src => src.ScreeningPrice));
            CreateMap<ScreeningUpdateDto, Screening>();

            // Room Mappings
            CreateMap<Room, RoomDto>().ReverseMap();
            CreateMap<RoomCreateDto, Room>()
                .ForMember(dest => dest.Seats, opt => opt.MapFrom(src => Enumerable.Range(1, src.Capacity).ToList()));
            CreateMap<RoomUpdateDto, Room>()
                .ForMember(dest => dest.Seats, opt => opt.MapFrom(src => Enumerable.Range(1, src.Capacity).ToList()));

            // User Mapping
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<UserCreateDto, User>();
            CreateMap<UserUpdateDto, User>();


            // Order Mapping
            CreateMap<Order, OrderDto>().ReverseMap();
            CreateMap<OrderCreateDto, Order>()
                .ForMember(dest => dest.PurchaseDate, opt => opt.MapFrom(src => DateTime.Now));

            // Ticket Mappings
            CreateMap<Ticket, TicketDto>().ReverseMap();
            CreateMap<TicketCreateDto, Ticket>();
            CreateMap<TicketUpdateDto, Ticket>();


            // Settings Mappings
            CreateMap<Setting, SettingDto>().ReverseMap();
            CreateMap<UpdateSettingDto, Setting>();
        }
    }
}
