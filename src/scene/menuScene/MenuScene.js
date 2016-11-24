/**
 * Created by CF-BJ-032 on 2016/11/7.
 */
var MenuScene = AdapterScene.extend({
    onEnter:function () {
        this._super();
        var layer = new MainMenuLayer();
        this.addChild(layer);
    }
});

var MainMenuLayer = sa.BaseLayer.extend({

    ctor:function () {
        this._super();
        //尺寸
        var winSize = cc.winSize;
        //背景
        var colorLayer = new cc.LayerColor(cc.color(255,255,255,155),winSize.width,winSize.height);
        this.addChild(colorLayer);

        //布局背景信息
        this.addGroundInf();
        //布局按钮信息
        this.layoutButton();
    },

    //布局背景信息
    addGroundInf: function(){

        //添加方向小标记
        for(var i=0; i<7; i++){
            var item = new SubItem();
            item.drowRoadTip();
            item.setPosition(cc.p(radius*(i+1),radius*(i+1)));
            this.addChild(item);
        }
    },

    //布局按钮信息
    layoutButton: function(){

        var size = cc.winSize;
        for(var i=0; i<5; i++){
            var subItem = new SubItem();
            subItem.drowSixEdge(cc.color(100,100,100,100));
            if(i<2){
                subItem.setPosition(cc.p(size.width/4+i*size.width/2,size.height/4));
            }else if(i>2){
                subItem.setPosition(cc.p(size.width/4+(i-3)*size.width/2,size.height/4+size.height/2));
            }else{
                subItem.setPosition(cc.p(size.width/2,size.height/2));
            }

            subItem.setTag(i);
            this.addBntLabel(subItem);
            this.addChild(subItem);
            var touchMove = MainMenuLayer.prototype.touchMoveBack.bind(this);
            var touchEnd = MainMenuLayer.prototype.touchEndBack.bind(this);
            GameUtils.addTouchEvent(subItem,touchMove,touchEnd);
        }
    },

    //添加按钮上的label
    addBntLabel:function(subItem){

        var size = subItem.getContentSize();
        var label = new cc.LabelTTF();
        label.setFontSize(15);
        label.setPosition(cc.p(size.width/2,size.height/2));
        label.setColor(cc.color(255,0,0));
        var name = "";
        switch (subItem.getTag()){
            case 0:
                name = "选择关卡";
                break;
            case 1:
                name = "声音";
                break;
            case 2:
                name = "玩法介绍";
                break;
            case 3:
                name = "关于我们";
                break;
            case 4:
                name = "评论";
                break;
        }
        label.setString(name);
        subItem.addChild(label);
    },

    //监控位置
    touchMoveBack: function(node){
    },

    //点击结束回调
    touchEndBack: function(node){
        cc.log("tag======" + node.getTag());
        switch (node.getTag()){
            case 0:
                var selectScene = new SelectScene();
                cc.director.pushScene(selectScene);
                break;
            case 1:
                break;
            case 2:
                var toturialScene = new ToturialScene();
                cc.director.pushScene(toturialScene);
                break;
            case 3:
                break;
            case 4:
                break;
        }
        //cc.director.pushScene(new GameScene());
    }

});