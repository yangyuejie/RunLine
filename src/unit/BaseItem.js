/**
 * Created by CF-BJ-032 on 2016/10/18.
 */
var BaseItem = cc.Node.extend({

    //item id
    item_id:"100",
    //路径id
    route_id:"0",
    //移动方向
    move_dir:"null",
    //延伸步数
    extend_step:0,
    //旋转方向
    rotate_dir:"null",
    //移动速度
    move_speed:0,
    //旋转速度
    rotate_speed:0,
    //关联位置
    relate_pos:"null",
    //是否基础方块
    ifBaseItem:true,
    //是否阻挡
    ifStop: false,
    //是否目标
    ifTarget:false,
    //是否改变方向
    ifChangeDir: false,
    //是否消失
    ifDisplay: false,
    //颜色
    itemColor:null,

    ctor: function () {
        this._super();
    },

    //初始化数据
    initDataInfor: function(data){
        this.setItemID(data[0]);
        this.setRouteID(data[1]);
        this.setMoveDir(data[2]);
        this.setExtendStep(data[3]);
        this.setRotateDir(data[4]);
        this.setMoveSpeed(data[5]);
        this.setRelatePos(data[6]);
        this.setIfBaseItem(data[7]);
        this.setIfStop(data[7]);
        this.setIfTarget(data[9]);
        this.setIfChangeDir(data[10]);
        this.setIfDisplay(data[11]);
        this.setItemColor(data[12]);
    },

    //item id
    setItemID: function(item_id){
        this.item_id = item_id;
    },

    getItemID: function(){
        return this.item_id;
    },

    setRouteID: function(route_id){
        this.route_id = route_id;
    },

    getRouteID: function(){
        return this.route_id;
    },

    setMoveDir: function(move_dir){
        this.move_dir = move_dir;
    },

    getMoveDir: function(){
        return this.move_dir;
    },

    setExtendStep: function(extend_step){
        this.extend_step = extend_step;
    },

    getExtendStep: function(){
        return this.extend_step;
    },

    setRotateDir: function(rotate_dir){
        this.rotate_dir = rotate_dir;
    },

    getRotateDir: function(){
        return this.rotate_dir;
    },

    setMoveSpeed: function(move_speed){
        this.move_speed = move_speed;
    },

    getMoveSpeed: function(){
        return this.move_speed;
    },

    setRelatePos: function(relate_pos){
        this.relate_pos = relate_pos;
    },

    getRelatePos: function(){
        return this.relate_pos;
    },

    setIfBaseItem: function(ifBase){
        if(ifBase=="FALSE"){
            this.ifBaseItem = false;
        }else{
            this.ifBaseItem = true;
        }
    },

    getIfBaseItem: function(){
        return this.ifBaseItem;
    },

    setIfStop: function(ifStop){
        if(ifStop=="FALSE"){
            this.ifStop = false;
        }else{
            this.ifStop = true;
        }
    },

    getIfStop: function(){
        return this.ifStop;
    },

    setIfTarget: function(ifTarget){
        if(ifTarget=="FALSE"){
            this.ifTarget = false;
        }else{
            this.ifTarget = true;
        }
    },

    getIfTarget: function(){
        return this.ifTarget;
    },

    setIfChangeDir: function(ifChangeDir){
        if(ifChangeDir=="FALSE"){
            this.ifChangeDir = false;
        }else{
            this.ifChangeDir = true;
        }
    },

    getIfChangeDir: function(){
        return this.ifChangeDir;
    },

    setIfDisplay: function(ifDisplay){
        if(ifDisplay=="FALSE"){
            this.ifDisplay = false;
        }else{
            this.ifDisplay = true;
        }
    },

    getIfDisplay: function(){
        return this.ifDisplay;
    },

    setItemColor: function(color){
        var array = color.split("\\");
        this.itemColor = cc.color(parseInt(array[0]),parseInt(array[1]),parseInt(array[2]),parseInt(array[3]));
    },

    getItemColor: function(){
        return this.itemColor;
    }

});
