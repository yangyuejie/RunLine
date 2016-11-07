/**
 * Created by yang on 2016/9/4.
 */
var GameLayer = cc.Layer.extend({

    ctor:function () {
        this._super();
        //尺寸
        var winSize = cc.winSize;

        //背景
        var colorLayer = new cc.LayerColor(cc.color(255,255,255,155),winSize.width,winSize.height);
        this.addChild(colorLayer);

        //布局页面信息
        var relation = new RelationItem();
        this.addChild(relation);

        var levelInfo = new LevelInfor();
        levelInfo.setParmArr(relation.getItemArr());
        levelInfo.setLevelData(0);
        this.addChild(levelInfo);
        return true;
    }
});


var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});