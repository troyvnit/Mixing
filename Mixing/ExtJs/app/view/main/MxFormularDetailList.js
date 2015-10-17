/**
 * This view is an example list of people.
 */
Ext.define('Mixing.view.main.MxFormularDetailList', {
    extend: 'Ext.grid.Panel',
    xtype: 'mx_formularDetail_list',
    id: 'mxFormularDetailGrid',

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
            text: Mixing.util.Utilities.mxSetting.get('mxk-Element'), dataIndex: 'Element', allowBlank: false,
            editor: {
                xtype: 'combobox',
                queryMode: 'local',
                store: {
                    type: 'mxElement'
                },
                displayField: 'Name',
                valueField: 'Name',
                listeners: {
                    beforerender: function(combo){
                        combo.store.load();
                    },
                    beforequery: function (queryEvent) {
                        var grid = queryEvent.combo.ownerCt.context.grid;
                        var gridRecord = grid.getSelectionModel().getSelection()[0];
                        var formularDetailStore = Ext.getStore('mxFormularDetail');
                        var filterStore = function () {
                            queryEvent.combo.store.clearFilter();
                            queryEvent.combo.store.filterBy(function (record) {
                                return formularDetailStore.findExact('ElementId', record.get('ID')) == -1 || record.get('ID') == gridRecord.get('ElementId');
                            });
                            if (queryEvent.combo.store.data.items.length == 0) {
                                Ext.Msg.alert('No record', 'You already added all of elements, no more to add!', function () {
                                    grid.getStore().remove(gridRecord);
                                });
                            }
                        }
                        if (!queryEvent.combo.store.complete) {
                            queryEvent.combo.store.load(filterStore);
                        } else {
                            filterStore();
                        }
                    },
                    select: function (combo, record) {
                        var grid = combo.ownerCt.context.grid;
                        var gridRecord = combo.ownerCt.context.grid.getSelectionModel().getSelection()[0];
                        gridRecord.set('ElementId', record.get('ID'));
                    }
                }
            }, flex: 1
        },
        { text: Mixing.util.Utilities.mxSetting.get('mxk-Target') + ' (ppm)', dataIndex: 'Target', editor: 'numberfield', minValue: 0, flex: 1 },
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
            edit: function (editor, context) {
                context.record.commit();
            }
        }
    },

    tbar: {
        items: [
            {
                xtype: 'button',
                text: 'Add',
                handler: 'createNewFormularDetail'
            }
        ]
    },

    listeners: {
        afterrender(grid, eOpts ) {
            grid.getView().on("itemadd", function () {
                grid.editingPlugin.startEdit(0, 0);
            });
        }
    }
});
