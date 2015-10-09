/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Mixing.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    createNewFormularDetail: function () {
        var formularDetailStore = Ext.getStore('mxFormularDetail');
        formularDetailStore.insert(0, Ext.create('Mixing.model.MxFormularDetail'));
    },

    addRemoveSubstance: function () {
        var substanceStore = Ext.getStore('mxSubstance');

        var allSubstanceStore = Ext.getStore('MxAllSubstance');

        allSubstanceStore.filterBy(function (record) {
            return substanceStore.findExact('ID', record.get('ID')) == -1;
        });

        var addRemoveSubstancePopup = Ext.create('Ext.window.Window', {
            layout: 'fit',
            width: 600,
            height: 600,
            padding: 10,
            scrollable: true,
            title: 'Add / Remove Substances',
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'gridpanel',
                            id: 'allSubstanceGrid',
                            multiSelect: true,
                            title: Mixing.util.Utilities.mxSetting.get('mxk-Substance'),
                            store: allSubstanceStore,
                            columns: [
                                { text: Mixing.util.Utilities.mxSetting.get('mxk-Substance'), dataIndex: 'Name', flex: 1, align: 'right' }
                            ],
                            features: [{
                                ftype: 'grouping',
                                groupHeaderTpl: '<div>{name}</div>'
                            }],
                            height: '100%',
                            scrollable: true,
                            flex: 10
                        },
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'vbox',
                                pack: 'center'
                            },
                            height: '100%',
                            padding: 5,
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'Add ->',
                                    width: 100,
                                    handler: function () {
                                        var grid = Ext.getCmp('allSubstanceGrid');
                                        var selectedRecords = grid.getSelectionModel().getSelection();
                                        selectedRecords.forEach(function (record) {
                                            substanceStore.add(record);
                                            allSubstanceStore.remove(record);
                                        });
                                    }
                                },
                                {
                                    height: 10
                                },
                                {
                                    xtype: 'button',
                                    text: '<- Remove',
                                    width: 100,
                                    handler: function () {
                                        var grid = Ext.getCmp('substanceGrid');
                                        var selectedRecords = grid.getSelectionModel().getSelection();
                                        selectedRecords.forEach(function (record) {
                                            substanceStore.remove(record);
                                            allSubstanceStore.add(record);
                                        });
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            id: 'substanceGrid',
                            multiSelect: true,
                            title: Mixing.util.Utilities.mxSetting.get('mxk-Substance'),
                            store: substanceStore,
                            columns: [
                                { text: Mixing.util.Utilities.mxSetting.get('mxk-Substance'), dataIndex: 'Name', flex: 1 }
                            ],
                            height: '100%',
                            scrollable: true,
                            flex: 10
                        }
                    ]
                }
            ]
        });

        addRemoveSubstancePopup.show();
    }
});
