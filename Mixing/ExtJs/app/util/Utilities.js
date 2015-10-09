Ext.define('Mixing.util.Utilities', {
    singleton: true,
    mxSetting: new Ext.util.HashMap(),
    constructor: function () {
        var _self = this;
        Ext.Ajax.request({
            url: 'http://localhost:10387/api/mxsetting',
            async: false,
            success: function (response, opts) {
                var settings = Ext.decode(response.responseText);
                Ext.each(settings, function (setting, index) {
                    _self.mxSetting.add(setting.Key, setting.Value);
                });
            }
        });
    }
});