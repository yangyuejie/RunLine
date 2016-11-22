/**
 * Created by boyin787 on 16/3/21.
 */

var _js = _js = _js || {};

_js.map = cc.Object.extend({
    keys : null ,
    values : null,

    ctor : function ()
    {
        this._super();
        this.keys = new Array();
        this.values = new Object();
    },

    size  : function () {
        return this.keys.length;
    },

    clear : function () {
        if(this.keys)
        {
            this.keys.splice(0,this.keys.length);
        }
        this.values = null;
        this.values = new Object();
    },

    insertObject : function ( key,value)
    {
        if(!this.values[key])
        {
            this.keys.push(key);
        }
        this.values[key] = value;
    },

    removeByKey : function ( key)
    {
        var index = this.keyIndexOf(key);
        if(index != -1){
            this.keys.splice(index, 1);
        }
        this.values[key] = null;

    },

    keyIndexOf : function ( key )
    {
        var size = this.keys.length;
        if(size > 0){
            for(var i=0, len=size; i < len; i++){
                if(this.keys[i] == key)
                    return i;
            }
        }
        return -1;
    },

    removeByValue : function ( value)
    {

    },

    findObject : function (key)
    {
        return this.values[key];
    },

    isHasKey : function ( key )
    {
        if(!this.keys[key])return false;

        return true;
    },

    isHasValue : function ( value )
    {
        for (var i in this.data)
        {
            if(this.values[i] === value)
            {
                return true;
            }
        }
        return false ;
    }
});