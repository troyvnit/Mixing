Ext.define('Mixing.model.MxFormularDetail', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'ElementId', type: 'int' },
        { name: 'Element', type: 'string' },
        { name: 'Target', type: 'float' },
        { name: 'Result', type: 'float' }
    ]
});