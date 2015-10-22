Ext.define('Mixing.store.MxFormularDetail', {
    extend: 'Ext.data.Store',

    alias: 'store.mxFormularDetail',

    storeId: 'mxFormularDetail',

    model: 'Mixing.model.MxFormularDetail',

    proxy: {
        type: 'ajax',
        url: 'http://api.tinhocnongnghiep.com/api/mxformular/getdetail',
        reader: {
            type: 'json'
        }
    }
});
