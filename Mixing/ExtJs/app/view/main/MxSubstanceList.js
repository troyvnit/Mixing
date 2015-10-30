/**
 * This view is an example list of people.
 */
Ext.define('Mixing.view.main.MxSubstanceList', {
    extend: 'Ext.grid.Panel',
    xtype: 'mx_substance_list',
    id: 'mxSubstanceGrid',

    requires: [
        'Mixing.store.MxSubstance',
        'Mixing.store.MxSubstanceDetail',
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
                    tooltip: 'Edit',
                    handler: function (grid, rowIndex, colIndex) {
                        var substance = grid.getStore().getAt(rowIndex);
                        var elementStore = Ext.create('Ext.data.Store', {
                            model: 'Mixing.model.MxSubstanceDetail',
                            data: substance.get('MxSubstanceDetails')
                        });
                        var formularDetailStore = Ext.getStore('mxFormularDetail');
                        elementStore.filterBy(function (record) {
                            return formularDetailStore.findExact('ElementId', record.get('ElementId')) !== -1;
                        });

                        var additionalRecords = formularDetailStore.queryBy(function (record, id) {
                            return elementStore.findExact('ElementId', record.get('ElementId')) == -1;
                        });

                        additionalRecords.each(function (record) {
                            var newRecord = { ElementId: record.get('ElementId'), Element: record.get('Element'), NutritiveValue: 0 };
                            elementStore.add(Ext.create('Mixing.model.MxSubstanceDetail', newRecord));
                            substance.get('MxSubstanceDetails').push(newRecord);
                        });

                        var editSubstancePopup = Ext.create('Ext.window.Window', {
                            layout: 'fit',
                            width: 400,
                            height: 600,
                            padding: 10,
                            scrollable: true,
                            title: 'Edit Substances',
                            modal: true,
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'gridpanel',
                                            id: 'editSubstancesGrid',
                                            multiSelect: true,
                                            title: substance.get('Name'),
                                            store: elementStore,
                                            columns: [
                                                { text: Mixing.util.Utilities.mxSetting.get('mxk-Element'), dataIndex: 'Element', flex: 1 },
                                                { text: Mixing.util.Utilities.mxSetting.get('mxk-Value') + ' (ppm)', dataIndex: 'NutritiveValue', editor: 'numberfield', flex: 1 },
                                            ],
                                            plugins: {
                                                ptype: 'cellediting',
                                                clicksToEdit: 1,
                                                listeners: {
                                                    beforeedit: function (editor, context) {
                                                        return context.field !== 'Element';
                                                    }
                                                }
                                            },
                                            height: '100%',
                                            scrollable: true,
                                            flex: 10,

                                            tbar: {
                                                items: [
                                                    {
                                                        xtype: 'button',
                                                        text: 'Clear Changes',
                                                        handler: function (button) {
                                                            var dirtyRecords = button.up('gridpanel').getStore().findBy(function (record) {
                                                                return record.dirty;
                                                            });
                                                            if (dirtyRecords > -1) {
                                                                button.up('gridpanel').getStore().rejectChanges();
                                                            }
                                                        }
                                                    }
                                                ]
                                            },
                                        }
                                    ]
                                }
                            ]
                        });

                        editSubstancePopup.show();
                    }
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
