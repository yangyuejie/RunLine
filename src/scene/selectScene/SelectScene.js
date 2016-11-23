/**
 * Created by CF-BJ-032 on 2016/11/7.
 */
var SelectScene = AdapterScene.extend({

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
        pageView.setContentSize(cc.size(radius*7, radius*6));
        pageView.setPosition(cc.p(radius,winSize.height/2+(index-1)*radius*5));
        //设置触发滚动距离
        pageView.setCustomScrollThreshold(30);

        for (var i = 0; i < 3; ++i) {
            var layout = new ccui.Layout();
            layout.setContentSize(radius*6,radius*5);
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
                var level = 60*num+index*20+i*5+j;
                var subItem = new SubItem();
                //subItem.drowSixEdge(cc.color(200,200,200,200));
                var color = cc.color(level*2, 255-level*2, 255-level, 255);
                subItem.drowCircular(20,color);
                subItem.setPosition(radius+(radius+20)*j,radius+radius*i);
                subItem.setName("scrollItem_"+level);
                var colorLabel = cc.color(255*(1-num),255*num,0);
                subItem.addLabel(colorLabel,""+level);
                //注册触摸
                var touchMove = SelectScene.prototype.touchMoveBack.bind(this);
                var touchEnd = SelectScene.prototype.touchEndBack.bind(this);
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
