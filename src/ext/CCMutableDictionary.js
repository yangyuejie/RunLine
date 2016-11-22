/**
 * Created by boyin787 on 16/3/21.
 */

cc.MutableDictionary = _js.map.extend({

    ctor: function () {
        this._super();
    },

    dector: function(){
        if(this.keys){
            this.keys.splice(0,this.keys.length);
            delete this.keys;
        }
        delete this.values;
    },

/// return the number of items
    count: function () {
        return this.size();
    },

/// return all the keys
    allKeys: function () {
        var tRet = new std.vector();

        if (this.keys.length > 0) {
            for (var i = 0; i < this.keys.length; i++) {
                tRet.push_back(this.keys[i]);
            }
        }
        return tRet;
    },

    /** @warning : We use '==' to compare two objects*/
    allKeysForObject: function (object) {
        var tRet = new std.vector();
        if (this.keys.length > 0) {
            for (var i = 0; i < this.keys.length; i++) {
                if (this.values[this.keys[i]] === object) {
                    tRet.push_back(this.keys[i]);
                }

            }
        }
        return tRet;
    },
    objectForKey: function (key)			///<
    {
        return this.findObject(key);
    },


    setObject: function (pObject, key) {
        this.insertObject(key, pObject);
    },

    removeObjectForKey: function (key) {
        return this.removeByKey(key);
    },

    removeAllObjects: function () {
        this.clear();
    }

});