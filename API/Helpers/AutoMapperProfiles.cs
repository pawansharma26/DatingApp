using System.Linq;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            //   CreateMap<AppUser, MemberDto>();
            //   CreateMap<Photo, PhotoDto>();
            //Implement this in autmapperprofile for getting photoUrl filed outside photo
                CreateMap<AppUser, MemberDto>().ForMember
                (dest => dest.PhotoUrl, opt => opt.MapFrom(src => 
                 src.Photos.FirstOrDefault(x => x.IsMain).Url))
                  .ForMember(dest => dest.Age, opt => 
                  opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
              CreateMap<Photo, PhotoDto>();
              CreateMap<MemberUpdateDto, AppUser>();
               CreateMap<RegisterDto, AppUser>();
            //     .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            // CreateMap<Photo, PhotoDto>();
        }
    }
}