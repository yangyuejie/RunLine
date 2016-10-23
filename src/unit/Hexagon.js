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
        this.attachArr = [];
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

            //添加子方块
            item.addSubItem();

            //添加到数组
            this.setAttachItem(item);
            //判断是否目标对象
            if(item.getIfTarget()){
                ItemInforList.shared().addTargetInfo(item);
            }
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

        //var subItem = new SubItem();
        //subItem.drowCircular();
        //this.drawNode.addChild(subItem);
    },

    //添加球
    addCircle: function(){

        var dn = new cc.DrawNode();
        dn.drawCircle(cc.p(0,0), 30, 360, 100, false, cc.color(255, 0, 0));
        this.addChild(dn);
    },

    //设置状态信息
    setStateInfor: function(state){
        this.itemType = state;
    },

    //设置附加unit
    setAttachItem: function(item){
        this.attachArr.push(item);
        this.addChild(item);
    },

    //获取附加unit
    getAttachItem: function(){
        return this.attachArr;
    },

    //移除附加unit
    removeAttachItem: function(index){

        var target = this.attachArr[index];
        target.removeFromParent();
        this.attachArr.splice(index,1);
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
        var dire = cube.getReleateInfor(this);
        if(dire!=null){
            //移除目标方块
            cube.removeTarget(this);
            //添加目标方块
            dire.setAttachItem(this);
            //执行动作
            dire.ScaleBackAction();
        }
    },

    //获取关联方向item信息
    getReleateInfor: function(target){

        //获取移动方向
        this.judgeChangeDir(target);
        var dirction = target.getMoveDir();

        var item = null;
        switch (dirction){
            case "left":
                item = this.left;
                break;
            case "right":
                item = this.right;
                break;
            case "lUp":
                item = this.lUp;
                break;
            case "rUp":
                item = this.rUp;
                break;
            case "lDown":
                item = this.lDown;
                break;
            case "rDown":
                item = this.rDown;
                break;
        }

        if(item!=null&&item.judgeRouteId(target)){
            return item;
        }
        return null;
    },

    //判定目标对象路径id
    judgeRouteId: function(item){
        var array = this.getAttachItem();
        for(var i=0; i<array.length; i++){
            if(item.getRouteID()==array[i].getRouteID()){
                return true;
            }
        }
        return false;
    },

    //移除目标方块对象
    removeTarget: function(item){
        var array = this.getAttachItem();
        for(var i=0; i<array.length; i++){
            if(item.getRouteID()==array[i].getRouteID()){
                this.removeAttachItem(i);
                i--;
            }
        }
    },

    //判断是否更改方向
    judgeChangeDir: function(target){
        var array = this.getAttachItem();
        for(var i=0; i<array.length; i++){
            if(array[i].getIfChangeDir()){
                target.setMoveDir(array[i].getMoveDir());
                break;
            }
        }
    },

    //添加子方块
    addSubItem: function(){
        //判断是否目标方块
        if(this.getIfTarget()){
            return;
        }
        var subItem = new SubItem();
        subItem.addDirecteLine(this);
        this.drawNode.addChild(subItem);
    },

    //缩放动作
    ScaleBackAction: function(){
        var seq = cc.sequence(cc.scaleTo(0.25,1.1),cc.scaleTo(0.25,1));
        this.runAction(seq);

    }

});
