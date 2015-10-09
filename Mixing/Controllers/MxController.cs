﻿using AutoMapper;
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
        public IEnumerable<MxFormular> GetByObject(int objectId)
        {
            using (var _db = new MixingEntities())
            {
                var mxFormulars = _db.mx_Formular.Where(f => f.Object_Ref == objectId).ToList();
                return mxFormulars.Select(Mapper.Map<MxFormular>);
            }
        }

        // GET api/mxformular/getdetail
        [Route("api/mxformular/getdetail")]
        public IEnumerable<MxFormularDetail> GetDetail(int formularId)
        {
            using (var _db = new MixingEntities())
            {
                var result = new List<MxFormularDetail>();
                var mxFormularDetails = _db.mx_FormularDetail.Where(f => f.Formular_Ref == formularId).ToList();
                foreach(var mxFormularDetail in mxFormularDetails)
                {
                    var element = _db.mx_Element.FirstOrDefault(e => e.ID == mxFormularDetail.Element_Ref);
                    result.Add(new MxFormularDetail
                    {
                        ID = mxFormularDetail.Element_Ref.Value,
                        Element = element.Name,
                        Target = mxFormularDetail.TargetValue.Value
                    });
                }
                return result;
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
                if (getAll)
                {
                    var mxSubstancesList = _db.mx_Substance.ToList();
                    var mxSubstances = mxSubstancesList.Select(Mapper.Map<MxSubstance>).ToList();
                    foreach (var mxSubstance in mxSubstances)
                    {
                        var substanceGroup = _db.mx_SubstanceGroup.FirstOrDefault(sg => sg.ID == mxSubstance.SubstanceGroup_Ref);
                        mxSubstance.SubstanceGroupName = substanceGroup != null ? substanceGroup.Name : string.Empty;
                    }
                    return mxSubstances;
                }
                else
                {
                    var mxSubstanceUsedDefaults = _db.mx_SubstanceUsedDefault.Where(sud => sud.Object_Ref == objectId || sud.Object_Ref == 0).Select(sub => sub.Substance_Ref).ToList();
                    var mxSubstancesList = _db.mx_Substance.Where(s => mxSubstanceUsedDefaults.Contains(s.ID)).ToList();
                    var mxSubstances = mxSubstancesList.Select(Mapper.Map<MxSubstance>).ToList();
                    foreach (var mxSubstance in mxSubstances)
                    {
                        var substanceGroup = _db.mx_SubstanceGroup.FirstOrDefault(sg => sg.ID == mxSubstance.SubstanceGroup_Ref);
                        mxSubstance.SubstanceGroupName = substanceGroup != null ? substanceGroup.Name : string.Empty;
                    }
                    return mxSubstances;
                }
            }
        }
    }
}
