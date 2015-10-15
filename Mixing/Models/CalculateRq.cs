using System.Collections.Generic;

namespace Mixing.Models
{
    public class CalculateRq
    {
        public int Volume { get; set; }
        public int ObjectId { get; set; }
        public int FormularId { get; set; }
        public List<MxFormularDetail> FormularDetails { get; set; }
        public List<MxSubstance> Substances { get; set; }
    }
}