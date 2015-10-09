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
        items: [
            {
                title: 'Welcome'
            },
            {
                title: 'Calculator',
                padding: 20,
                items: [
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'panel',
                                layout: 'vbox',
                                items: [
                                    {
                                        xtype: 'combobox',
                                        fieldLabel: 'Select Object',
                                        store: {
                                            type: 'mxObject'
                                        },
                                        displayField: 'Name',
                                        valueField: 'ID',
                                        listeners: {
                                            select: function (combo, record, eOpts) {
                                                var formualarStore = Ext.getStore('mxFormular');
                                                formualarStore.load({
                                                    params: { objectId: record.get('ID') }
                                                });
                                            }
                                        },
                                        width: '100%'
                                    },
                                    {
                                        xtype: 'combobox',
                                        fieldLabel: 'Select Formular',
                                        store: {
                                            type: 'mxFormular'
                                        },
                                        displayField: 'Name',
                                        valueField: 'ID',
                                        queryMode: 'local',
                                        listeners: {
                                            select: function (combo, record, eOpts) {
                                                var formualarDetailStore = Ext.getStore('mxFormularDetail');
                                                formualarDetailStore.load({
                                                    params: { formularId: record.get('ID') }
                                                });
                                            }
                                        },
                                        width: '100%'
                                    },
                                    {
                                        xtype: 'mx_formularDetail_list',
                                        width: '100%'
                                    }
                                ],
                                flex: 6
                            },
                            {
                                flex: 1
                            },
                            {
                                flex: 3
                            }
                        ]
                    },
                ]
            },
            {
                title: 'Result'
            },
            {
                title: 'About'
            }
        ]
    }]
});
