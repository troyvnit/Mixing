Ext.define('Mixing.store.MxSubstance', {
    extend: 'Ext.data.Store',

    alias: 'store.mxSubstance',

    storeId: 'mxSubstance',

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
