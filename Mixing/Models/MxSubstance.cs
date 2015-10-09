using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Mixing.Models
{
    public class MxSubstance
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string FullName { get; set; }
        public Nullable<int> SubstanceGroup_Ref { get; set; }
        public string SubstanceGroupName { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public string AdUrl { get; set; }
        public string InfoNote { get; set; }
        public string WarningNote { get; set; }
        public Nullable<int> Price { get; set; }
    }
}