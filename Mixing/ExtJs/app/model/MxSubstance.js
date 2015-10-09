Ext.define('Mixing.model.MxSubstance', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'ID', type: 'int' },
        { name: 'Name', type: 'string' },
        { name: 'FullName', type: 'string' },
        { name: 'SubstanceGroupName', type: 'string'},
        { name: 'ImageUrl', type: 'string' }
    ]
});