Ext.define('Mixing.store.MxElement', {
    extend: 'Ext.data.Store',

    alias: 'store.mxElement',

    storeId: 'mxElement',

    model: 'Mixing.model.MxElement',

    proxy: {
        type: 'ajax',
        url: 'http://localhost:10387/api/mxelement',
        reader: {
            type: 'json'
        }
    }
});
