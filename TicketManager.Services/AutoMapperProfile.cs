﻿using System;
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

            // Screening Mappings
            CreateMap<Screening, ScreeningDto>().ReverseMap();
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
            CreateMap<Order, OrderDto>().ReverseMap();
            CreateMap<OrderCreateDto, Order>()
                .ForMember(dest => dest.PurchaseDate, opt => opt.MapFrom(src => DateTime.Now));

            // Ticket Mappings
            CreateMap<Ticket, TicketDto>()
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
                .ReverseMap();
            CreateMap<TicketCreateDto, Ticket>();
            CreateMap<TicketUpdateDto, Ticket>();


            // Settings Mappings
            CreateMap<Setting, SettingDto>().ReverseMap();
            CreateMap<UpdateSettingDto, Setting>();

            // Role Mappings
            CreateMap<Role, RoleDto>().ReverseMap();


            CreateMap<Seat, SeatDto>().ReverseMap();

        }

        //private List<Seat> GenerateSeats(int rowNumber, int columnNumber)
        //{
        //    var seats = new List<Seat>();
        //    for (int row = 1; row <= rowNumber; row++)
        //    {
        //        for (int column = 1; column <= columnNumber; column++)
        //        {
        //            seats.Add(new Seat
        //            {
        //                Row = row,
        //                Column = column
        //            });
        //        }
        //    }
        //    return seats;
        //}

    }
}
