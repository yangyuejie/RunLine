/**
 * Created by Administrator on 2016/11/23 0023.
 */
var GameMenu = sa.BaseLayer.extend({

    ctor:function () {
        this._super();
        this.addButtonInfo();
        return true;
    },

    //添加按钮信息
    addButtonInfo: function(){

        var labelGo = new cc.LabelTTF();
        labelGo.setString("GO");
        labelGo.setFontSize(30);
        labelGo.setColor(cc.color(255,0,0));

        var labelMain = new cc.LabelTTF();
        labelMain.setString("Main");
        labelMain.setFontSize(30);
        labelMain.setColor(cc.color(255,0,0));

        var labelVioce = new cc.LabelTTF();
        labelVioce.setString("Voice");
        labelVioce.setFontSize(30);
        labelVioce.setColor(cc.color(255,0,0));

        var self = this;
        var goButton = new cc.MenuItemLabel(labelGo,function () {
            self.beganMoving();
        }, this);

        var mainButton = new cc.MenuItemLabel(labelMain,function () {
            self.backMainScene();
        }, this);

        var voiceButton = new cc.MenuItemLabel(labelVioce,function () {
            self.changeVoice();
        }, this);

        goButton.setPosition(cc.p(0,-cc.winSize.height/2+radius));
        mainButton.setPosition(cc.p(-cc.winSize.width/2+radius,cc.winSize.height/2-radius));
        voiceButton.setPosition(cc.p(cc.winSize.width/2-radius,cc.winSize.height/2-radius));

        var menu = new cc.Menu(goButton,mainButton,voiceButton);

        this.addChild(menu,100);
    },

    //返回主菜单
    backMainScene: function(){
        cc.director.runScene(new MenuScene());
    },

    //更改音效
    changeVoice: function(){

    },

    //开始移动
    beganMoving : function(){
        this.schedule(this.monitorAction,1);
    },

    //监控动作状态
    monitorAction: function(){
        var array = ItemInforList.shared().getTargetArr();

        //判断是否胜利
        var ifWin = true;
        var indexID = array[0].getParent().getIndexID();
        for(var i=1; i<array.length; i++) {
            if (array[i].getParent().getIndexID() != indexID) {
                ifWin = false;
                break;
            }
        }
        if(ifWin){
            //展示胜利页面
            this.unschedule(this.monitorAction);

            return;
        }
        for(var i=0; i<array.length; i++){
            array[i].moveToTarget();
        }
    }


});