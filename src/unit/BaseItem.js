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
        //var data = item.getDataArr();
        this.setItemID(data[0]);
        this.setRouteID(data[1]);
        this.setMoveDir(data[2]);
        this.setExtendStep(data[3]);
        this.setRotateDir(data[4]);
        this.setMoveSpeed(data[5]);
        this.setRelatePos(data[6]);
        this.setIfStop(data[7]);
        this.setIfTarget(data[8]);
        this.setIfChangeDir(data[9]);
        this.setIfDisplay(data[10]);
        this.setItemColor(data[11]);
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

    getMoveDir: function(move_dir){
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

    getRotateDir: function(rotate_dir){
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

    getRelatePos: function(relate_pos){
        return this.relate_pos;
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

    getIfTarget: function(ifTarget){
        return this.ifTarget;
    },

    setIfChangeDir: function(ifChangeDir){
        if(ifChangeDir=="FALSE"){
            this.ifChangeDir = false;
        }else{
            this.ifChangeDir = true;
        }
    },

    getIfChangeDir: function(ifChangeDir){

        return this.ifChangeDir;
    },

    setIfDisplay: function(ifDisplay){
        if(ifDisplay=="FALSE"){
            this.ifDisplay = false;
        }else{
            this.ifDisplay = true;
        }
    },

    getIfDisplay: function(ifDisplay){
        return this.ifDisplay;
    },

    setItemColor: function(color){
        var array = color.split("\\");
        this.itemColor = cc.color(array[0],array[1],array[2],array[3]);
    }

});