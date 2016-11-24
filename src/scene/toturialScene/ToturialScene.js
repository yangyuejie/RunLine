/**
 * Created by Administrator on 2016/11/24 0024.
 */
var ToturialScene = AdapterScene.extend({
    onEnter:function () {
        this._super();
        var layer = new ToturialLayer();
        this.addChild(layer);
    }
});

var ToturialLayer = sa.BaseLayer.extend({

    tipLabel:null,
    ifEnable:false,

    ctor:function () {
        this._super();

        //是否有效点击
        this.ifEnable = false;

        //添加菜单按钮
        this.addBackButton();

        //注册触摸事件
        this.addTouchEvent();

        this.addTipLabel();

        this.addLayOut();

        return true;
    },

    //注册触摸事件
    addTouchEvent: function(){
        var listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.touchBegan.bind(this),
            onTouchMoved: this.touchMoved.bind(this),
            onTouchEnded: this.touchEnded.bind(this)
        });
        cc.eventManager.addListener(listener1, this);
    },

    //创建提示标
    addTipLabel: function(){

        var size = cc.winSize;
        this.tipLabel = new cc.LabelTTF();
        this.tipLabel.setFontSize(30);
        this.tipLabel.setPosition(cc.p(size.width/2,radius));
        this.tipLabel.setColor(cc.color(255,0,0));
        this.tipLabel.setString("点 击 任 意 处 继 续 ...");
        this.addChild(this.tipLabel);
        GameUtils.repeatBlink(this.tipLabel,1,1);
    },

    addLayOut:function(){

        //布局页面信息
        var relation = new RelationItem();
        this.addChild(relation);

        var totalArr = relation.getItemArr();
        var array = ItemInforList.shared().getLevelData(0);

        ItemInforList.shared().removeTarget();


        for(var i=0; i<array.length; i++){
            if(i>=9){
                break;
            }
            for(var j=0; j<array[i].length; j++){
                var data = array[i][j];
                var item = totalArr[i][j];
                //设置单元格数据信息
                item.initItemInfor(data);
                item.drowPolygon();
            }
        }

        var targetArr = ItemInforList.shared().getTargetArr();
        for(var i=0; i<targetArr.length; i++){
            targetArr[i].setVisible(false);
        }
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
    },

    //
    drowOver: function(){
        cc.log("drow over....");
    },

    //
    touchBegan: function (pTouch, pEvent) {
        cc.log("on touch began...");
        var pointArr = [cc.p(100,200), cc.p(100,500), cc.p(500,500), cc.p(500,200), cc.p(100,200)];
        GameUtils.drowLineAni(this,pointArr,ToturialLayer.prototype.drowOver.bind(this));
        if(this.ifEnable){

        }else{

        }
        return true;
    },
    touchMoved: function (pTouch, pEvent) {

    },

    touchEnded: function (pTouch, pEvent) {

    }

});