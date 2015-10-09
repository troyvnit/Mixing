/**
 * This view is an example list of people.
 */
Ext.define('Mixing.view.main.MxSubstanceList', {
    extend: 'Ext.grid.Panel',
    xtype: 'mx_substance_list',

    requires: [
        'Mixing.store.MxSubstance'
    ],

    title: Mixing.util.Utilities.mxSetting.get('mxk-Substance'),

    store: {
        type: 'mxSubstance'
    },

    columns: [
        { text: Mixing.util.Utilities.mxSetting.get('mxk-Substance'), dataIndex: 'Name', flex: 1 },
        {
            xtype: 'actioncolumn',
            text: Mixing.util.Utilities.mxSetting.get('mxk-Component'),
            flex: 1,
            items: [
                {
                    icon: 'icons/cog_edit.png',
                    tooltip: 'Edit'
                }
            ],
            align: 'center'
        }
    ],

    tbar: {
        items: [
            {
                xtype: 'button',
                text: 'Add/Remove',
                handler: 'addRemoveSubstance'
            }
        ]
    },

    listeners: {
        
    }
});
