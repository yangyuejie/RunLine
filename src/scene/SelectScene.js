/**
 * Created by CF-BJ-032 on 2016/11/7.
 */
var SelectScene = cc.Scene.extend({

    ctor:function () {
        this._super();

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
        pageView.setContentSize(cc.size(winSize.width*2/3, winSize.height/3));
        pageView.setPosition(cc.p(winSize.width/6,winSize.height/2+(index-1)*winSize.height/3));

        for (var i = 0; i < 3; ++i) {
            var layout = new ccui.Layout();
            layout.setContentSize(300,300);
            this.addCardBnt(layout,i);
            pageView.addPage(layout);
        }
        pageView.addEventListener(this.pageViewEvent, this);
        this.addChild(pageView);
    },

    //布局关卡按钮
    addCardBnt: function(layout,index){
        for(var i=0; i<5; i++){
            for(var j=0; j<5; j++){
                var subItem = new SubItem();
                subItem.drowSixEdge(cc.color(200,200,200,200));
                subItem.setPosition(50+(radius+10)*j,50+radius*i);
                layout.addChild(subItem);
            }
        }
    },

    pageViewEvent: function (sender, type) {
        switch (type) {
            case ccui.PageView.EVENT_TURNING:
                var pageView = sender;
                cc.log("page = " + (pageView.getCurPageIndex().valueOf() - 0 + 1));

                cc.director.pushScene(new GameScene());

                ////尺寸
                //var winSize = cc.winSize;
                //
                ////背景
                //var colorLayer = new cc.LayerColor(cc.color(255,255,255,155),winSize.width,winSize.height);
                //this.addChild(colorLayer);
                ////布局页面信息
                //var relation = new RelationItem();
                //this.addChild(relation);
                //
                //var levelInfo = new LevelInfor();
                //levelInfo.setParmArr(relation.getItemArr());
                //levelInfo.setLevelData(0);
                //this.addChild(levelInfo);
                break;
            default:
        }
    }

});
