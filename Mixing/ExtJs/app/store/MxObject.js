Ext.define('Mixing.store.MxObject', {
    extend: 'Ext.data.Store',

    alias: 'store.mxObject',

    storeId: 'mxObject',

    model: 'Mixing.model.MxObject',

    proxy: {
        type: 'ajax',
        url: 'http://api.tinhocnongnghiep.com/api/mxobject',
        reader: {
            type: 'json'
        },
        autoLoad: true
    }
});
