﻿using System;
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
            CreateMap<Screening, ScreeningDto>().ReverseMap();
            CreateMap<ScreeningCreateDto, Screening>();
            CreateMap<ScreeningUpdateDto, Screening>();

            // Room Mappings
            CreateMap<Room, RoomDto>().ReverseMap();
            CreateMap<RoomCreateDto, Room>()
                .ForMember(dest => dest.Seats, opt => opt.MapFrom(src => Enumerable.Range(1, src.Capacity).ToList()));
            CreateMap<RoomUpdateDto, Room>()
                .ForMember(dest => dest.Seats, opt => opt.MapFrom(src => Enumerable.Range(1, src.Capacity).ToList()));

        }
    }
}
