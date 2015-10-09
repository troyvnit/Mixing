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
        //var elementStore = Ext.getStore('MxElement');
        //debugger;
        //if (elementStore) {
        //    elementStore.load(function (records) {
        //        elementStore.filterBy(function (record) {
        //            return formularDetailStore.findExact('ID', record.get('ID')) == -1;
        //        });
        //        if (elementStore.count() > 0) {
        //            formularDetailStore.insert(0, Ext.create('Mixing.model.MxFormularDetail'));
        //        } else {
        //            Ext.Msg.alert('No record', 'You already added all of elements, no more to add!');
        //        }
        //    });
        //}
    }
});
