Ext.define('Mixing.store.MxAllSubstance', {
    extend: 'Ext.data.Store',

    alias: 'store.mxAllSubstance',

    storeId: 'mxAllSubstance',

    model: 'Mixing.model.MxSubstance',

    proxy: {
        type: 'ajax',
        url: 'http://localhost:10387/api/mxsubstance',
        reader: {
            type: 'json'
        }
    },

    sorters: 'Name',

    groupField: 'SubstanceGroupName'
});
