Ext.define('Mixing.model.MxObject', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'ID', type: 'int' },
        { name: 'Name', type: 'string' },
        { name: 'ImageUrl', type: 'string' }
    ]
});