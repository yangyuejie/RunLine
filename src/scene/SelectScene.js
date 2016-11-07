/**
 * Created by CF-BJ-032 on 2016/11/7.
 */
var SelectScene = cc.Scene.extend({

    ctor:function () {
        this._super();
        //添加pageView
        this.addPageView();

        return true;
    },

    //添加pageView
    addPageView: function(){

        var winSize = cc.director.getWinSize();
        var pageView = new ccui.PageView();
        pageView.setTouchEnabled(true);
        pageView.setContentSize(cc.size(winSize.width/2, winSize.height/2));
        pageView.setPosition(cc.p(100,100));

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
        for(var i=0; i<3; i++){
            for(var j=0; j<5; j++){
                var subItem = new SubItem();
                subItem.drowSixEdge(cc.color(200,200,200,200));
                subItem.setPosition(50+radius*j,50+radius*i);
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
        }
    }

});
