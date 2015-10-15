/**
 * This view is an example list of people.
 */
Ext.define('Mixing.view.main.MxSubstanceResult', {
    extend: 'Ext.grid.Panel',
    xtype: 'mx_substance_result',

    requires: [
        'Mixing.store.MxSubstance',
        'Mixing.store.MxSubstanceDetail',
    ],

    title: Mixing.util.Utilities.mxSetting.get('mxk-Substance'),

    store: {
        type: 'mxSubstanceResult'
    },

    columns: [
        { text: Mixing.util.Utilities.mxSetting.get('mxk-Substance'), dataIndex: 'Name', flex: 3 },
        { text: Mixing.util.Utilities.mxSetting.get('mxk-Volume'), dataIndex: 'Volume', flex: 1 },
        { text: Mixing.util.Utilities.mxSetting.get('mxk-Price'), dataIndex: 'Price', flex: 2 },
        { text: Mixing.util.Utilities.mxSetting.get('mxk-Cost'), dataIndex: 'Cost', flex: 2 },
        { text: Mixing.util.Utilities.mxSetting.get('mxk-Note'), dataIndex: 'InfoNote', flex: 4 },
        {
            text: Mixing.util.Utilities.mxSetting.get('mxk-Sponsor'), dataIndex: 'ImageUrl', flex: 3,
            renderer: function (value) {
                return '<img src="' + value + '" height=30 />';
            }
        },
    ],
});
