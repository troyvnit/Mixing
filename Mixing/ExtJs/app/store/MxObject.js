Ext.define('Mixing.store.MxObject', {
    extend: 'Ext.data.Store',

    alias: 'store.mxObject',

    storeId: 'mxObject',

    model: 'Mixing.model.MxObject',

    proxy: {
        type: 'ajax',
        url: 'http://localhost:10387/api/mxobject',
        reader: {
            type: 'json'
        },
        autoLoad: true
    }
});
