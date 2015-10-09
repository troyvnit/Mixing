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
        'MxElement',
        'MxSubstance',
        'MxAllSubstance'
    ],
    
    launch: function () {
        // TODO - Launch the application
        var allSubstanceStore = Ext.getStore('MxAllSubstance');
        allSubstanceStore.load({
            params: { getAll: true, objectId: 0 }
        });
    }
});
