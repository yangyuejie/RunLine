/**
 * Created by yang on 2016/8/28.
 */

var Hexagon = BaseItem.extend({

    //附加unit
    attachArr:[],

    //二次方向
    branchDir:[],

    //二次方向id
    direId:0,

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

    ctor:function () {

        this._super();
        this.setRotation(30);
    },

    //初始化基础方块信息
    initBaseItem: function(){
        var data = ItemInforList.shared().getObject("100");
        this.initDataInfor(data);
    },

    //设置item数据信息
    initItemInfor: function(itemKey){
        var data = ItemInforList.shared().getObject(itemKey);
        var item = new Hexagon();
        //初始化基础属性信息
        item.initDataInfor(data);
        if( !item.getIfBaseItem() ){
            item.setRotation(0);
            item.drowPolygon();
            this.addChild(item);
        }

    },

    //绘制多边形
    drowPolygon: function(){
        //创建DrawNode
        this.drawNode = cc.DrawNode.create();

        var point1 = [];
        point1[0] = cc.p(-radius/2, 0);
        point1[1] = cc.p(-1/2*radius/2, -1.7320508075689/2*radius/2);
        point1[2] = cc.p(1/2*radius/2, -1.7320508075689/2*radius/2);
        point1[3] = cc.p(radius/2, 0);
        point1[4] = cc.p(1/2*radius/2, 1.7320508075689/2*radius/2);
        point1[5] = cc.p(-1/2*radius/2, 1.7320508075689/2*radius/2);

        //基础信息
        var color = this.getItemColor();
        this.drawNode.drawPoly(point1, color, 4, cc.color(0, 0, 0, 255));
        this.addChild( this.drawNode);
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

    //设置附加unit
    setAttachItem: function(item){
        this.attachArr.push(item);
    },

    //获取附加unit
    getAttachItem: function(){
        return this.attachArr;
    },

    //设置二次方向信息
    addSecondDir: function(dirction){
        this.branchDir.push(dirction);
    },

    //获取二次方向数组信息
    getSecondDir: function(direID){

        for(var i=0; i<this.branchDir.length; i++){
            var dirItem = this.branchDir[i];
            if(dirItem.lineid==direID){
                return dirItem.direction;
            }
        }
        return nonDir;
    },

    //设置二次方向ID
    setDirectId : function(id){
        this.direId = id;
    },

    //方块移动动作
    moveToTarget: function(){
        var cube = this.getParent();
        var dire = cube.getReleateInfor();
        if(dire!=null){
            this.removeFromParent();
            dire.addChild(this);
            dire.ScaleBackAction();

            //移动到下一个方块

        }
    },

    //获取关联方向item信息
    getReleateInfor: function(){

        if(this.attachItem!=null){
            this.attachItem.setSecondDir();
        }

        var dire = this.direState;
        var item = null;
        if(this.direId!=0){
            dire = this.getSecondDir(this.direId);
        }

        switch(dire){
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
        return item;

    },

    //缩放动作
    ScaleBackAction: function(){
        var seq = cc.sequence(cc.scaleTo(0.25,1.1),cc.scaleTo(0.25,1));
        this.runAction(seq);

    }

});
