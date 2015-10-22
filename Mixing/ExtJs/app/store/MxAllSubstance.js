Ext.define('Mixing.store.MxAllSubstance', {
    extend: 'Ext.data.Store',

    alias: 'store.mxAllSubstance',

    storeId: 'mxAllSubstance',

    model: 'Mixing.model.MxSubstance',

    proxy: {
        type: 'ajax',
        url: 'http://api.tinhocnongnghiep.com/api/mxsubstance',
        reader: {
            type: 'json'
        },
        timeout: 1000000
    },

    sorters: 'Name',

    groupField: 'SubstanceGroupName'
});
