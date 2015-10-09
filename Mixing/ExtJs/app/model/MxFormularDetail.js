Ext.define('Mixing.model.MxFormularDetail', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'ID', type: 'int' },
        { name: 'Element', type: 'string' },
        { name: 'Target', type: 'int' },
        { name: 'Result', type: 'int' }
    ]
});