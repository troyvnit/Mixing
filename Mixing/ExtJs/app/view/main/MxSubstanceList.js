/**
 * This view is an example list of people.
 */
Ext.define('Mixing.view.main.MxSubstanceList', {
    extend: 'Ext.grid.Panel',
    xtype: 'mx_substance_list',

    requires: [
        //'Mixing.store.MxSubstance'
    ],

    title: Mixing.util.Utilities.mxSetting.get('mxk-Substance'),

    store: {
        type: 'mxSubstance'
    },

    columns: [
        { text: Mixing.util.Utilities.mxSetting.get('mxk-Substance'), dataIndex: 'Substance', flex: 1 },
        { text: Mixing.util.Utilities.mxSetting.get('mxk-Component') + ' (ppm)', dataIndex: 'Target', editor: 'numberfield', flex: 1 },
        {
            xtype: 'actioncolumn',
            text: 'Troy',
            flex: 1,
            items: [
                {
                    text: 'Edit',
                    tooltip: 'Edit'
                }
            ]
        }
    ],

    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1
    },

    tbar: {
        items: [
            {
                xtype: 'button',
                text: 'Add',
                handler: 'createNewSubstance'
            }
        ]
    },

    listeners: {
        
    }
});
