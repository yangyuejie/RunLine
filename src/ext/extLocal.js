/**
 * Created by CF-BJ-032 on 2016/10/12.
 */

cc.Object =  cc.Class.extend({
    ctor : function()
    {
    },
    autorelease: function()
    {

    },
    retain: function ()
    {

    },
    release : function ()
    {

    }
});

function Singleton_Class(tbase_class, prop) {
    var vtype = tbase_class.extend(prop);
    var tInstance = new vtype();

    tInstance.shared = function () {
        return tInstance;
    };
    return tInstance;
}
