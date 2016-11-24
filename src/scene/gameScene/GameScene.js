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
        this.addChild(colorLayer,-1);

        //布局页面信息
        var relation = new RelationItem();
        this.addChild(relation);

        //读取关卡信息
        var levelInfo = new LevelInfor();
        levelInfo.setParmArr(relation.getItemArr());
        levelInfo.setLevelData(0);
        this.addChild(levelInfo);

        //添加菜单按钮
        var gameMenu = new GameMenu();
        this.addChild(gameMenu);

        return true;
    }
});


var GameScene = AdapterScene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});