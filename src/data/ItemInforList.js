/**
 * Created by CF-BJ-032 on 2016/10/12.
 */

var ItemInforList = Singleton_Class(cc.Object, {

    //item数据信息
    itemList :{},
    //关卡数据信息
    levelData : [],
    //目标对象
    targetArr : [],

    ctor: function () {
        this._super();
        this.itemList = new cc.MutableDictionary();
    },

    //
    addObject : function( key,item ) {
        this.itemList.setObject(item, key);
    },
    //获取对象
    getObject : function( key ) {
        return this.itemList.objectForKey( key );
    },

    //设置关卡数据信息
    setLevelData: function(array){
        this.levelData.push(array);
    },

    //获取关卡信息
    getLevelData: function(index){
        return this.levelData[index];
    },

    //添加目标对象信息
    addTargetInfo: function(target){
        this.targetArr.push(target);
    },

    //获取目标对象数组
    getTargetArr: function(){
        return this.targetArr;
    },

    //移除目标对象
    removeTarget: function(){
        this.targetArr.splice(0,this.targetArr.length);
    }

});
