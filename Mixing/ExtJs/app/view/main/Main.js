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
                scrollable: true,
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
                                    params: { objectId: record.get('ID') },
                                    callback: function (records) {
                                        Ext.getCmp('formular').setValue(records[0].get('ID'));
                                        var formularDetailStore = Ext.getStore('mxFormularDetail');
                                        formularDetailStore.load({
                                            params: { formularId: records[0].get('ID') }
                                        });
                                    }
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
                                height: 400,
                                flex: 16
                            },
                            {
                                flex: 1
                            },
                            {
                                xtype: 'mx_substance_list',
                                height: 400,
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
                                value: 100,
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
                                        url: 'http://api.tinhocnongnghiep.com/api/calculate',
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

                                            Ext.Msg.alert('Success', result.Message);
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
                scrollable: true,
                padding: 20,
                items: [
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'mx_substance_result',
                                height: 250,
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
                                height: 250,
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
                                            },
                                            {
                                                xtype: 'button',
                                                text: 'Nutrient Ratio Analysis',
                                                width: '100%',
                                                margin: '10px 0 0 0',
                                                handler: function () {
                                                    var mxFormularDetailResultStore = Ext.getStore('mxFormularDetailResult');
                                                    var nutrientRatioAnalysisStore = Ext.create('Ext.data.Store', {
                                                        fields: [
                                                            { name: 'ElementUsed', type: 'string' },
                                                            { name: 'Ratio', type: 'string' }
                                                        ]
                                                    });
                                                    var nutrientRatioAnalysisPopup = Ext.create('Ext.window.Window', {
                                                        layout: 'fit',
                                                        width: 600,
                                                        height: 400,
                                                        padding: 10,
                                                        scrollable: true,
                                                        title: 'Nutrient Ratio Analysis',
                                                        modal: true,
                                                        items: [
                                                            {
                                                                xtype: 'panel',
                                                                layout: 'vbox',
                                                                height: 500,
                                                                items: [
                                                                    {
                                                                        xtype: 'panel',
                                                                        layout: 'hbox',
                                                                        width: '100%',
                                                                        margin: '0 0 20px 0',
                                                                        items: [
                                                                            {
                                                                                xtype: 'gridpanel',
                                                                                multiSelect: true,
                                                                                title: 'Nutrient Ratio Analysis Result',
                                                                                store: nutrientRatioAnalysisStore,
                                                                                columns: [
                                                                                    { text: 'Element Used', dataIndex: 'ElementUsed', flex: 1 },
                                                                                    { text: 'Ratio', dataIndex: 'Ratio', flex: 1 },
                                                                                ],
                                                                                height: 250,
                                                                                scrollable: true,
                                                                                flex: 1,
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        xtype: 'panel',
                                                                        layout: 'hbox',
                                                                        width: '100%',
                                                                        items: [
                                                                            {
                                                                                xtype: 'combobox',
                                                                                emptyText: 'Select Element',
                                                                                id: 'element1',
                                                                                store: mxFormularDetailResultStore,
                                                                                displayField: 'Element',
                                                                                valueField: 'Result',
                                                                                queryMode: 'local',
                                                                                flex: 1
                                                                            },
                                                                            {
                                                                                xtype: 'combobox',
                                                                                emptyText: 'Select Element',
                                                                                id: 'element2',
                                                                                store: mxFormularDetailResultStore,
                                                                                displayField: 'Element',
                                                                                valueField: 'Result',
                                                                                queryMode: 'local',
                                                                                flex: 1,
                                                                                margin: '0 5px 0 5px'
                                                                            },
                                                                            {
                                                                                xtype: 'combobox',
                                                                                emptyText: 'Select Element',
                                                                                id: 'element3',
                                                                                store: mxFormularDetailResultStore,
                                                                                displayField: 'Element',
                                                                                valueField: 'Result',
                                                                                queryMode: 'local',
                                                                                flex: 1
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        xtype: 'panel',
                                                                        layout: 'hbox',
                                                                        width: '100%',
                                                                        margin: '20px 0 0 0',
                                                                        items: [
                                                                            {
                                                                                xtype: 'button',
                                                                                text: 'Add Custom Ratio',
                                                                                flex: 16,
                                                                                handler: function () {
                                                                                    var element1 = Ext.getCmp('element1');
                                                                                    var element2 = Ext.getCmp('element2');
                                                                                    var element3 = Ext.getCmp('element3');
                                                                                    var elements = [];
                                                                                    var values = [];

                                                                                    if (element1.value) {
                                                                                        elements.push(element1.rawValue);
                                                                                        values.push(element1.value);
                                                                                    }
                                                                                    if (element2.value) {
                                                                                        elements.push(element2.rawValue);
                                                                                        values.push(element2.value);
                                                                                    }
                                                                                    if (element3.value) {
                                                                                        elements.push(element3.rawValue);
                                                                                        values.push(element3.value);
                                                                                    }

                                                                                    if (values.length == 0) {
                                                                                        Ext.Msg.alert('No value', 'Please select elements to get ratio!');
                                                                                        return;
                                                                                    }

                                                                                    var min = values[0];
                                                                                    for (var i = 0; i < values.length; i++) {
                                                                                        min = values[i] < min ? values[i] : min;
                                                                                    }

                                                                                    for (var i = 0; i < values.length; i++) {
                                                                                        values[i] = parseFloat(values[i] / min).toFixed(2).replace('.00', '');
                                                                                    }

                                                                                    nutrientRatioAnalysisStore.add({
                                                                                        ElementUsed: elements.join(' : '),
                                                                                        Ratio: values.join(' : ')
                                                                                    });
                                                                                }
                                                                            },
                                                                            {
                                                                                flex: 1
                                                                            },
                                                                            {
                                                                                xtype: 'button',
                                                                                text: 'Close',
                                                                                flex: 16
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    });

                                                    nutrientRatioAnalysisPopup.show();
                                                }
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
