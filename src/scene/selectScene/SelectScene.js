/**
 * Created by CF-BJ-032 on 2016/11/7.
 */
var SelectScene = AdapterScene.extend({
    onEnter:function () {
        this._super();
        var layer = new SelectLayer();
        this.addChild(layer);
    }
});
var SelectLayer = sa.BaseLayer.extend({

    ifMoveing:false,
    ctor:function () {
        this._super();
        this.ifMoveing = false;
        var winSize = cc.winSize;
        //背景
        var colorLayer = new cc.LayerColor(cc.color(25,52,55,155),winSize.width,winSize.height);
        this.addChild(colorLayer);

        //添加pageView
        for(var i=0; i<2; i++){
            this.addPageView(i);
        }
        return true;
    },

    //添加pageView
    addPageView: function(index){

        var winSize = cc.director.getWinSize();
        var pageView = new ccui.PageView();
        pageView.setTouchEnabled(true);
        pageView.setContentSize(cc.size(radius*7, radius*4));
        if(index>0){
            pageView.setPosition(cc.p(radius,winSize.height/2+radius/2));
        }else{
            pageView.setPosition(cc.p(radius,winSize.height/2-radius*5+radius/2));
        }

        //设置触发滚动距离
        pageView.setCustomScrollThreshold(30);

        for (var i = 0; i < 3; ++i) {
            var layout = new ccui.Layout();
            layout.setContentSize(radius*6,radius*5);
            layout.setBackGroundColor(cc.color.GREEN);
            layout.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            layout.setBackGroundColorOpacity(100);
            this.addCardBnt(layout,i,index);
            pageView.addPage(layout);
        }
       // pageView.addEventListener(this.pageViewEvent, this);
        this.addChild(pageView);
    },

    //布局关卡按钮
    addCardBnt: function(layout,index,num){
        for(var i=0; i<4; i++){
            for(var j=0; j<5; j++){
                var subItem = ObjectPool.shared().getSubItem();//new SubItem();
                //注册触摸
                var touchMove = SelectLayer.prototype.touchMoveBack.bind(this);
                var touchEnd = SelectLayer.prototype.touchEndBack.bind(this);
                GameUtils.addTouchEvent(subItem,touchMove,touchEnd);
                layout.addChild(subItem);
            }
        }
    },

    pageViewEvent: function (sender, type) {
        switch (type) {
            case ccui.PageView.EVENT_TURNING:
                var pageView = sender;
                cc.log("page = " + (pageView.getCurPageIndex().valueOf() - 0 + 1));
                break;
            default:
                break;
        }
    },

    //监控位置
    touchMoveBack: function(node){
        this.ifMoveing = true;
    },

    //点击结束回调
    touchEndBack: function(node){
        cc.log("tag======" + node.getTag());
        if(this.ifMoveing){
            this.ifMoveing = false;
            return;
        }
        cc.director.pushScene(new GameScene());
    }

});
