/**
 * This view is an example list of people.
 */
Ext.define('Mixing.view.main.MxFormularDetailList', {
    extend: 'Ext.grid.Panel',
    xtype: 'mx_formularDetail_list',

    requires: [
        'Mixing.store.MxFormularDetail',
        'Mixing.store.MxElement',
    ],

    title: Mixing.util.Utilities.mxSetting.get('mxk-Formular'),

    store: {
        type: 'mxFormularDetail'
    },

    columns: [
        {
            text: Mixing.util.Utilities.mxSetting.get('mxk-Element'), dataIndex: 'Element',
            editor: {
                xtype: 'combobox',
                store: {
                    type: 'mxElement',
                    listeners: {
                    }
                },
                displayField: 'Name',
                valueField: 'ID',
                listeners: {
                    beforequery: function (queryEvent) {
                        var formularDetailStore = Ext.getStore('mxFormularDetail');
                        queryEvent.combo.store.filterBy(function (record) {
                            return formularDetailStore.findExact('ID', record.get('ID')) == -1;
                        });
                        if (queryEvent.combo.store.data.items.length == 0) {
                            Ext.Msg.alert('No record', 'You already added all of elements, no more to add!', function () {
                                var grid = queryEvent.combo.ownerCt.context.grid;
                                var gridRecord = grid.getSelectionModel().getSelection()[0];
                                grid.getStore().remove(gridRecord);
                            });
                        }
                    },
                    select: function (combo, record) {
                        var gridRecord = combo.ownerCt.context.grid.getSelectionModel().getSelection()[0];
                        gridRecord.set('ID', record.get('ID'));
                    }
                }
            }, renderer: function (value, metaData, re) {
                var elementStore = Ext.getStore('MxElement')
                if (parseInt(value)) {
                    var record = elementStore.findRecord('ID', parseInt(value));
                    return record ? record.get('Name') : '';
                }
                return value;
            }, flex: 1
        },
        { text: Mixing.util.Utilities.mxSetting.get('mxk-Target') + ' (ppm)', dataIndex: 'Target', editor: 'numberfield', flex: 1 },
        { text: Mixing.util.Utilities.mxSetting.get('mxk-Result') + ' (ppm)', dataIndex: 'Result', flex: 1 },
        {
            xtype: 'actioncolumn',
            items: [
                {
                    icon: 'icons/delete.png',
                    tooltip: 'Delete',
                    handler: function (grid, rowIndex, colIndex) {
                        Ext.Msg.confirm('Delete', 'Are you sure to delete this record?', function (option) {
                            if (option == 'yes') {
                                grid.getStore().removeAt(rowIndex);
                            }
                        });
                    }
                }
            ],
            align: 'center'
        }
    ],

    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1,
        listeners: {
            beforeedit: function (editor, context) {
                return context.field !== 'Element' || !context.value;
            }
        }
    },

    tbar: {
        items: [
            {
                xtype: 'button',
                text: 'New',
                handler: 'createNewFormularDetail'
            }
        ]
    },

    listeners: {
        
    }
});
