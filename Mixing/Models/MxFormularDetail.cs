﻿namespace Mixing.Models
{
    public class MxFormularDetail
    {
        public int ID { get; set; }
        public int ElementId { get; set; }
        public string Element { get; set; }
        public int Target { get; set; }
        public int Result { get; set; }
        public int PercentError { get; set; }
    }
}