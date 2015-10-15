/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
//

Ext.define('Mixing.view.main.Main', {
    extend: 'Ext.container.Container',
    requires: [
        'Mixing.view.main.MainController',
        'Mixing.view.main.MainModel'
    ],

    xtype: 'app-main',

    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },

    items: [
        {
        region: 'center',
        xtype: 'tabpanel',
        id: 'mainTabPanel',
        items: [
            {
                title: 'Welcome',
                id: 'welcomeTab',
            },
            {
                title: 'Calculator',
                id: 'calculatorTab',
                padding: 20,
                items: [
                    {
                        xtype: 'combobox',
                        fieldLabel: 'Select Object',
                        id: 'object',
                        store: {
                            type: 'mxObject'
                        },
                        displayField: 'Name',
                        valueField: 'ID',
                        listeners: {
                            select: function (combo, record, eOpts) {
                                var formularStore = Ext.getStore('mxFormular');
                                formularStore.load({
                                    params: { objectId: record.get('ID') }
                                });

                                var substanceStore = Ext.getStore('mxSubstance');
                                substanceStore.load({
                                    params: { getAll: false, objectId: record.get('ID') }
                                });
                            }
                        },
                        width: '100%'
                    },
                    {
                        xtype: 'combobox',
                        fieldLabel: 'Select Formular',
                        id: 'formular',
                        store: {
                            type: 'mxFormular'
                        },
                        displayField: 'Name',
                        valueField: 'ID',
                        queryMode: 'local',
                        listeners: {
                            select: function (combo, record, eOpts) {
                                var formularDetailStore = Ext.getStore('mxFormularDetail');
                                formularDetailStore.load({
                                    params: { formularId: record.get('ID') }
                                });
                            }
                        },
                        width: '100%'
                    },
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        padding: '20px 0 0 0',
                        items: [
                            {
                                xtype: 'mx_formularDetail_list',
                                minHeight: 500,
                                flex: 16
                            },
                            {
                                flex: 1
                            },
                            {
                                xtype: 'mx_substance_list',
                                minHeight: 500,
                                flex: 8
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        padding: '10px 0 10px 0',
                        items: [
                            {
                                xtype: 'numberfield',
                                id: 'volume',
                                fieldLabel: 'Volume (Lit)',
                                flex: 16
                            },
                            {
                                flex: 1
                            },
                            {
                                xtype: 'button',
                                text: 'Calculate',
                                handler: function () {
                                    var formularDetails = [];
                                    var formularDetailStore = Ext.getStore('mxFormularDetail');
                                    formularDetailStore.each(function (formularDetail) {
                                        formularDetails.push(formularDetail.data);
                                    });

                                    var substances = [];
                                    var substanceStore = Ext.getStore('mxSubstance');
                                    substanceStore.each(function (substance) {
                                        substances.push(substance.data);
                                    });

                                    Ext.Ajax.request({
                                        url: 'http://localhost:10387/api/calculate',
                                        method: 'POST',
                                        jsonData: {
                                            Volume: Ext.getCmp('volume').value,
                                            ObjectId: Ext.getCmp('object').value,
                                            FormularId: Ext.getCmp('formular').value,
                                            FormularDetails: formularDetails,
                                            Substances: substances
                                        },
                                        async: false,
                                        success: function (response, opts) {
                                            var result = Ext.decode(response.responseText);
                                            formularDetailStore.removeAll();
                                            formularDetailStore.add(result.FormularDetails);
                                            var formularDetailResultStore = Ext.getStore('mxFormularDetailResult');
                                            formularDetailResultStore.removeAll();
                                            formularDetailResultStore.add(result.FormularDetails);
                                            substanceStore.removeAll();
                                            substanceStore.add(result.Substances);
                                            var substanceResultStore = Ext.getStore('mxSubstanceResult');
                                            substanceResultStore.removeAll();
                                            substanceResultStore.add(result.Substances);
                                            Ext.getCmp('totalPanel').setTitle(Mixing.util.Utilities.mxSetting.get('mxk-CalculateForVolume').replace('?', result.Volume));
                                            Ext.getCmp('ec').setValue(result.EC);
                                            Ext.getCmp('totalCost').setValue(result.TotalCost);

                                            Ext.getCmp('mainTabPanel').setActiveTab('resultTab');
                                        }
                                    });
                                },
                                flex: 8
                            }
                        ]
                    }
                ]
            },
            {
                title: 'Result',
                id: 'resultTab',
                padding: 20,
                items: [
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'mx_substance_result',
                                scrollable: true,
                                height: 400,
                                flex: 1
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        padding: '20px 0 0 0',
                        items: [
                            {
                                xtype: 'mx_formularDetail_result',
                                scrollable: true,
                                height: 400,
                                flex: 16
                            },
                            {
                                flex: 1
                            },
                            {
                                xtype: 'panel',
                                id: 'totalPanel',
                                title: Mixing.util.Utilities.mxSetting.get('mxk-CalculateForVolume'),
                                items: [
                                    {
                                        xtype: 'panel',
                                        padding: 10,
                                        items: [
                                            {
                                                xtype: 'numberfield',
                                                id: 'ec',
                                                fieldLabel: 'EC = ',
                                                readOnly: true,
                                                width: '100%'
                                            },
                                            {
                                                xtype: 'numberfield',
                                                id: 'totalCost',
                                                fieldLabel: 'Total Cost = ',
                                                readOnly: true,
                                                width: '100%'
                                            }
                                        ]
                                    }
                                ],
                                flex: 8
                            }
                        ]
                    }
                ]
            },
            {
                title: 'About'
            }
        ]
    }]
});
