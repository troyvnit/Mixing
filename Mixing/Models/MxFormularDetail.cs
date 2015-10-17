namespace Mixing.Models
{
    public class MxFormularDetail
    {
        public int ID { get; set; }
        public int ElementId { get; set; }
        public string Element { get; set; }
        public double Target { get; set; }
        public double Result { get; set; }
        public double PercentError { get; set; }
    }
}