/**
 * This view is an example list of people.
 */
Ext.define('Mixing.view.main.MxFormularDetailResult', {
    extend: 'Ext.grid.Panel',
    xtype: 'mx_formularDetail_result',

    requires: [
        'Mixing.store.MxFormularDetail',
        'Mixing.store.MxElement',
    ],

    title: Mixing.util.Utilities.mxSetting.get('mxk-Formular'),

    store: {
        type: 'mxFormularDetailResult'
    },

    columns: [
        { text: Mixing.util.Utilities.mxSetting.get('mxk-Element'), dataIndex: 'Element', flex: 1 },
        { text: Mixing.util.Utilities.mxSetting.get('mxk-Target') + ' (ppm)', dataIndex: 'Target', flex: 1 },
        { text: Mixing.util.Utilities.mxSetting.get('mxk-Result') + ' (ppm)', dataIndex: 'Result', flex: 1 },
        { text: Mixing.util.Utilities.mxSetting.get('mxk-PercentError') + ' (ppm)', dataIndex: 'PercentError', flex: 1 }
    ],
});
