/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('Mixing.Application', {
    extend: 'Ext.app.Application',
    
    name: 'Mixing',

    stores: [
        // TODO: add global / shared stores here
        'MxObject',
        'MxFormular',
        'MxFormularDetail',
        'MxFormularDetailResult',
        'MxElement',
        'MxSubstance',
        'MxSubstanceResult',
        'MxSubstanceDetail',
        'MxAllSubstance'
    ],
    
    launch: function () {
        // TODO - Launch the application
        var allSubstanceStore = Ext.getStore('MxAllSubstance');
        allSubstanceStore.load({
            params: { getAll: true, objectId: 0 }
        });

        var elementStore = Ext.getStore('MxElement');
        elementStore.load();

        var objectStore = Ext.getStore('mxObject');
        objectStore.load(function (records) {
            Ext.getCmp('object').setValue(records[0].get('ID'));
            var substanceStore = Ext.getStore('mxSubstance');
            substanceStore.load({
                params: { getAll: false, objectId: records[0].get('ID') }
            });
            var formularStore = Ext.getStore('mxFormular');
            formularStore.load({
                params: { objectId: records[0].get('ID') },
                callback: function (records) {
                    Ext.getCmp('formular').setValue(records[0].get('ID'));
                    var formularDetailStore = Ext.getStore('mxFormularDetail');
                    formularDetailStore.load({
                        params: { formularId: records[0].get('ID') }
                    });
                }
            });
        });
    }
});
