/**
 * Created by CF-BJ-032 on 2016/11/7.
 */
var MainMenu = cc.Node.extend({

    ctor:function () {
        this._super();
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
            this.addTouchEvent(subItem);
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

    //注册触摸事件
    addTouchEvent: function(subItem){
        // 屏蔽下层事件
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event){
                var point = touch.getLocation();
                var converP = subItem.convertToNodeSpace(point);
                //判断是否在点击范围之内
                var rect = cc.rect(-1.7320508075689*50/2,-40,1.7320508075689*50,80);
                if(cc.rectContainsPoint(rect,converP)){
                    cc.log("touchBegan......."+subItem.getTag());

                    var selectScene = new SelectScene();
                    cc.director.pushScene(selectScene);
                    return true;
                }
                return false;
            },
            onTouchMoved: function(touch, event){
                var point = touch.getLocation();
            },
            onTouchEnded: function(touch, event){
            },
            swallowTouches: false
        }, subItem);
    }

});