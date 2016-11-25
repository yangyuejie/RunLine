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

        this.addBackButton();

        return true;
    },

    //添加返回按钮
    addBackButton: function(){
        var size = cc.winSize;

        var labelGo = new cc.LabelTTF();
        labelGo.setString("BACK");
        labelGo.setFontSize(30);
        labelGo.setColor(cc.color(255,0,0));

        var self = this;
        var goButton = new cc.MenuItemLabel(labelGo,function () {
            self.changeSceneWithId(MAIN_SCENE);
        }, this);
        goButton.setPosition(cc.p(-size.width/2+radius,size.height/2-radius));
        var menu = new cc.Menu(goButton);
        this.addChild(menu);
    }

});