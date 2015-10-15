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
                Mapper.CreateMap<mx_FormularDetail, MxFormularDetail>()
                    .ForMember(s => s.ElementId, o => o.MapFrom(d => d.mx_Element.ID))
                    .ForMember(s => s.Element, o => o.MapFrom(d => d.mx_Element.Name))
                    .ForMember(s => s.Target, o => o.MapFrom(d => d.TargetValue.Value));
                Mapper.CreateMap<mx_Element, MxElement>();
                Mapper.CreateMap<mx_Substance, MxSubstance>()
                    .ForMember(s => s.SubstanceGroupName, o => o.MapFrom(d => d.mx_SubstanceGroup.Name))
                    .ForMember(s => s.MxSubstanceDetails, o => o.MapFrom(d => d.mx_SubstanceDetail));
                Mapper.CreateMap<mx_SubstanceDetail, MxSubstanceDetail>()
                    .ForMember(s => s.Element, o => o.MapFrom(d => d.mx_Element.Name))
                    .ForMember(s => s.ElementId, o => o.MapFrom(d => d.mx_Element.ID));
            }
        }
    }
}