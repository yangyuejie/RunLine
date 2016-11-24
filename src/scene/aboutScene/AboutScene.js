/**
 * Created by Administrator on 2016/11/24 0024.
 */
var AboutScene = AdapterScene.extend({
    onEnter:function () {
        this._super();
        var layer = new AboutLayer();
        this.addChild(layer);
    }
});

var AboutLayer = sa.BaseLayer.extend({

    ctor:function () {
        this._super();
        return true;
    }

});