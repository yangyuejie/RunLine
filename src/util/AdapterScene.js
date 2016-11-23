/**
 * Created by Administrator on 2016/11/23 0023.
 */
var AdapterScene = cc.Scene.extend({
    _layer:null,
    ctor:function(){
        this._super();

        var designSize = cc.size(960,1136);
        var screenSize = cc.winSize;

        this._layer = new cc.Layer();
        this._layer.setPosition(cc.p(0,(screenSize.height-designSize.height)/2));
        this.addChildBySelf(this._layer);
    },
    addChildBySelf:function(child){
        cc.Scene.prototype.addChild.call(this,child);
    },
    addChild:function(child, localZOrder, tag){
        if(localZOrder!=undefined&&tag!=undefined)
            this._layer.addChild(child,localZOrder,tag);
        else if(localZOrder!=undefined)
            this._layer.addChild(child,localZOrder);
        else
            this._layer.addChild(child);
    },
    removeChildByTag:function(tag,cleanup){
        if(cleanup)
            this._layer.removeChildByTag(tag,cleanup);
        else
            this._layer.removeChildByTag(tag);
    },
    getChildByTag:function(tag){
        return this._layer.getChildByTag(tag);
    },
    getChildren:function() {
        return this._layer.getChildren();
    }
});