Ext.define('Mixing.store.MxFormular', {
    extend: 'Ext.data.Store',

    alias: 'store.mxFormular',

    storeId: 'mxFormular',

    model: 'Mixing.model.MxFormular',

    proxy: {
        type: 'ajax',
        url: 'http://localhost:10387/api/mxformular/getbyobject',
        reader: {
            type: 'json'
        }
    }
});
