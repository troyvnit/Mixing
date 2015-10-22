Ext.define('Mixing.store.MxFormular', {
    extend: 'Ext.data.Store',

    alias: 'store.mxFormular',

    storeId: 'mxFormular',

    model: 'Mixing.model.MxFormular',

    proxy: {
        type: 'ajax',
        url: 'http://api.tinhocnongnghiep.com/api/mxformular/getbyobject',
        reader: {
            type: 'json'
        }
    }
});
