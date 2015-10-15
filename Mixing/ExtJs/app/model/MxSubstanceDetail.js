Ext.define('Mixing.model.MxSubstanceDetail', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'ID', type: 'int' },
        { name: 'ElementId', type: 'int' },
        { name: 'Element', type: 'string' },
        { name: 'NutritiveValue', type: 'float' }
    ]
});