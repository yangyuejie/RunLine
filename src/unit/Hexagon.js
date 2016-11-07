/**
 * Created by yang on 2016/8/28.
 */

var Hexagon = BaseItem.extend({

    //附加unit
    attachArr:[],

    //关联指针
    left:null,
    right:null,
    lUp:null,
    rUp:null,
    lDown:null,
    rDown:null,

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
        var color = this.getItemColor();
        var subItem = new SubItem();
        subItem.drowSixEdge(color);
        this.addChild(subItem);
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
        var item = this.getDirItem(dirction);
        if(item!=null&&item.judgeRouteId(target)){
            return item;
        }
        return null;
    },

    //获取关联方向item
    getDirItem: function(dirction){
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
        return item;
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
        var cube = null;
        var array = this.getAttachItem();
        for(var i=0; i<array.length; i++){
            if(array[i].getIfChangeDir()){
                cube = array[i];
                //移除标记方块
                this.removeTarget(target);
                break;
            }
        }
        if(cube){
            target.setMoveDir(cube.getMoveDir());
            target.setRouteID(cube.getRouteID());
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
        this.addChild(subItem);
    },

    //缩放动作
    ScaleBackAction: function(){
        var seq = cc.sequence(cc.scaleTo(0.25,1.1),cc.scaleTo(0.25,1));
        this.runAction(seq);

    }

});
