using System.Collections.Generic;

namespace Mixing.Models
{
    public class CalculateRs
    {
        public int Volume { get; set; }
        public float EC { get; set; }
        public int TotalCost { get; set; }
        public List<MxFormularDetail> FormularDetails { get; set; }
        public List<MxSubstance> Substances { get; set; }
    }
}