Ext.define('Mixing.model.MxElement', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'ID', type: 'int' },
        { name: 'Name', type: 'string' },
        { name: 'FullName', type: 'string' }
    ]
});