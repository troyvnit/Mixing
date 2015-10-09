using AutoMapper;
using Mixing.DataAccess;
using Mixing.Models;

namespace Mixing.Mappers
{
    public class AutoMapperConfiguration
    {
        public static void Configure()
        {
            Mapper.Initialize(x =>
            {
                x.AddProfile<DomainToViewModelMappingProfile>();
                x.AddProfile<ViewModelToDomainMappingProfile>();
            });
        }

        public class ViewModelToDomainMappingProfile : Profile
        {
            public override string ProfileName
            {
                get { return "ViewModelToDomainMappings"; }
            }

            protected override void Configure()
            {
                
            }
        }

        public class DomainToViewModelMappingProfile : Profile
        {
            public override string ProfileName
            {
                get { return "DomainToViewModelMappings"; }
            }

            protected override void Configure()
            {
                Mapper.CreateMap<mx_Object, MxObject>();
                Mapper.CreateMap<mx_Formular, MxFormular>();
                Mapper.CreateMap<mx_FormularDetail, MxFormularDetail>();
                Mapper.CreateMap<mx_Element, MxElement>();
                Mapper.CreateMap<mx_Substance, MxSubstance>();
            }
        }
    }
}