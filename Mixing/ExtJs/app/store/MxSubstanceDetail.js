Ext.define('Mixing.store.MxSubstanceDetail', {
    extend: 'Ext.data.Store',

    alias: 'store.mxSubstanceDetail',

    storeId: 'mxSubstanceDetail',

    model: 'Mixing.model.MxSubstanceDetail',

    proxy: {
        type: 'ajax',
        url: 'http://api.tinhocnongnghiep.com/api/mxsubstancedetail',
        reader: {
            type: 'json'
        }
    },

    sorters: 'Element'
});
