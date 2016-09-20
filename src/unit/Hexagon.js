/**
 * Created by yang on 2016/8/28.
 */

var Hexagon = cc.Node.extend({

    drawNode: null,

    //关联指针
    left:null,
    right:null,
    lUp:null,
    rUp:null,
    lDown:null,
    rDown:null,

    //状态标志
    itemType:normType,

    //关联方向
    direState:nonDir,

    //颜色状态
    colorState: norColor,

    ctor:function () {

        this._super();
        this.setRotation(30);

    },

    //绘制多边形
    drowPolygon: function(){

        if( this.drawNode){
            this.drawNode.removeFromParent();
        }
        //创建DrawNode
        this.drawNode = cc.DrawNode.create();

        var point1 = [];
        point1[0] = cc.p(-50, 0);
        point1[1] = cc.p(-1/2*50, -1.7320508075689/2*50);
        point1[2] = cc.p(1/2*50, -1.7320508075689/2*50);
        point1[3] = cc.p(50, 0);
        point1[4] = cc.p(1/2*50, 1.7320508075689/2*50);
        point1[5] = cc.p(-1/2*50, 1.7320508075689/2*50);

        var color;
        switch(this.colorState){
            case norColor:
                color = cc.color(100, 100, 100, 100);
                break;
            case pathColor:
                color = cc.color(184, 134, 11, 100);
                break;
            case attColor:
                color = cc.color(255, 0, 0, 255);
                break;
            case dirColor:
                color = cc.color(0, 255, 100, 255);
                break;
        }

        this.drawNode.drawPoly(point1, color, 4, cc.color(0, 0, 0, 255));
        this.addChild(this.drawNode);

        //设置类型属性信息

    },

    //设置类型属性信息
    setTypeInfor: function(){
        switch(this.itemType){
            case normType:
            case targetType:
                break;
            case leftType:
            case rightType:
            case lUpType:
            case rUpType:
            case lDownType:
            case rDownType:
            {
                //添加创建方向指示标示
                
            }
                break;
        }

    },

    //添加指示线
    addTipLine: function(){

        var dn = new cc.DrawNode();
        var ltp = cc.p(0, 2);
        var rbp = cc.p(32, 0);
        dn.drawRect(ltp, rbp, cc.color(255, 0, 0));
        this.addChild(dn);
        dn.setRotation(30);
    },

    //添加球
    addCircle: function(){

        var dn = new cc.DrawNode();
        dn.drawCircle(cc.p(0,0), 30, 360, 100, false, cc.color(255, 0, 0));
        this.addChild(dn);
    },

    //关联方向信息
    setDirection: function(dir){
        this.direState = dir;
    },

    //获取关联方向标志
    getDirection: function(){
        return this.direState;
    },

    //设置状态信息
    setStateInfor: function(state){
        this.itemType = state;
    },

    //设置颜色状态
    setColorState: function(color){
        this.colorState = color;
    },

    //获取颜色状态
    getColorState: function(){
        return this.colorState;
    },

    //方块移动动作
    moveToTarget: function(){
        var cube = this.getParent();
        var dire = cube.getReleateInfor();
        if(dire!=null){
            this.removeFromParent();
            dire.addChild(this);
            dire.ScaleBackAction();

            //还原状态
            cube.recoverCube();
        }
    },

    //获取关联方向item信息
    getReleateInfor: function(){

        var item = null;
        switch(this.direState){
            case nonDir:
                break;
            case leftState:
                item = this.left;
                break;
            case rightState:
                item = this.right;
                break;
            case lUpState:
                item = this.lUp;
                break;
            case rUpState:
                item = this.rUp;
                break;
            case lDownState:
                item = this.lDown;
                break;
            case rDownState:
                item = this.rDown;
                break;
        }

        if(item==null){
            return null;
        }
        if(item.getDirection()==this.getDirection()){
            return item;
        }else{
            return null;
        }
    },

    //缩放动作
    ScaleBackAction: function(){
        var seq = cc.sequence(cc.scaleTo(0.25,1.1),cc.scaleTo(0.25,1));
        this.runAction(seq);
    },

    //还原方块状态
    recoverCube: function(){
        this.setDirection(nonDir);
        this.setStateInfor(normType);
        this.setColorState(norColor);
        this.drowPolygon();
    }


});









