using AutoMapper;
using Mixing.DataAccess;
using Mixing.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Mixing.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class MxController : ApiController
    {

        [Route("api/mxobject")]
        // GET api/mxobject
        public IEnumerable<MxObject> GetObjects()
        {
            using (var _db = new MixingEntities())
            {
                var mxObjects = _db.mx_Object.ToList();
                return mxObjects.Select(Mapper.Map<MxObject>);
            }
        }

        [Route("api/mxsetting")]
        // GET api/mxsetting
        public IEnumerable<mx_Setting> GetSettings()
        {
            using (var _db = new MixingEntities())
            {
                var mxSettings = _db.mx_Setting.ToList();
                return mxSettings;
            }
        }

        // GET api/mxformular/getbyobject
        [Route("api/mxformular/getbyobject")]
        public IEnumerable<MxFormular> GetFormularByObject(int objectId)
        {
            using (var _db = new MixingEntities())
            {
                var mxFormulars = _db.mx_Formular.Where(f => f.Object_Ref == objectId).ToList();
                return mxFormulars.Select(Mapper.Map<MxFormular>);
            }
        }

        // GET api/mxformular/getdetail
        [Route("api/mxformular/getdetail")]
        public IEnumerable<MxFormularDetail> GetFormularDetail(int formularId)
        {
            using (var _db = new MixingEntities())
            {
                var mxFormularDetails = _db.mx_FormularDetail.Where(f => f.Formular_Ref == formularId).ToList();
                return mxFormularDetails.Select(Mapper.Map<MxFormularDetail>).ToList();
            }
        }

        // GET api/mxelement
        [Route("api/mxelement")]
        public IEnumerable<MxElement> GetElements()
        {
            using (var _db = new MixingEntities())
            {
                var mxElements = _db.mx_Element.ToList();
                return mxElements.Select(Mapper.Map<MxElement>);
            }
        }

        // GET api/mxsubstance
        [Route("api/mxsubstance")]
        public IEnumerable<MxSubstance> GetSubstances(bool getAll, int objectId)
        {
            using (var _db = new MixingEntities())
            {
                var mxSubstancesList = new List<mx_Substance>();

                if (getAll)
                {
                    mxSubstancesList = _db.mx_Substance.ToList();
                }
                else
                {
                    var mxSubstanceUsedDefaults = _db.mx_SubstanceUsedDefault.Where(sud => sud.Object_Ref == objectId || sud.Object_Ref == 0).Select(sub => sub.Substance_Ref).ToList();
                    mxSubstancesList = _db.mx_Substance.Where(s => mxSubstanceUsedDefaults.Contains(s.ID)).ToList();
                }

                var mxSubstances = mxSubstancesList.Select(Mapper.Map<MxSubstance>).ToList();
                return mxSubstances;
            }
        }

        // POST api/calculate
        [HttpPost]
        [Route("api/calculate")]
        public CalculateRs Calculate(CalculateRq rq)
        {
            var rs = new CalculateRs();
            rs.FormularDetails = rq.FormularDetails;
            foreach(var formularDetail in rs.FormularDetails)
            {
                formularDetail.Result = formularDetail.Target + 1;
                formularDetail.PercentError = formularDetail.Target - 1;
            }

            rs.Substances = rq.Substances;
            foreach (var substance in rs.Substances)
            {
                substance.Volume = DateTime.Now.Millisecond;
                substance.Price = DateTime.Now.Millisecond - 5;
                substance.Cost = DateTime.Now.Millisecond - 10;
                substance.ImageUrl = "http://nonghoc.com/Images/logo_slogan.png";
                substance.AdUrl = "http://nonghoc.com";
                substance.InfoNote = "Info will display here";
                substance.WarningNote = "Warning will display here";
            }

            rs.Volume = rq.Volume;
            rs.EC = 2.3f;
            rs.TotalCost = 12345;

            rs.DomainName = Request.RequestUri.Host;
            rs.Message = "Here demo for: refDomainName = " + rs.DomainName + "; objectID = " + rq.ObjectId + "; formularID = " + rq.FormularId + "; volume = " + rs.Volume;

            return rs;
        }
    }
}
