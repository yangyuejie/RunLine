/**
 * Created by Administrator on 2016/11/24 0024.
 */
var ObjectPool = Singleton_Class(cc.Object, {

    subItemPool:[],
    subItemStor:[],

    ctor: function () {
        this._super();
        this.subItemPool = [];
        this.subItemStor = [];
    },

    //创建suitem对象缓存池
    createSubItemPools:function(){

        for(var n=0; n<2; n++){
            for(var m=0; m<3; m++){
                for(var i=0; i<4; i++) {
                    for (var j = 0; j < 5; j++) {

                        var level = 60*n+m*20+i*5+j;
                        var subItem = new SubItem();
                        var color = cc.color(level*2, 255-level*2, 255-level, 255);
                        subItem.drowCircular(20,color);
                        subItem.setPosition(radius+(radius+20)*j,radius*i);
                        subItem.setName("scrollItem_"+level);

                        var colorLabel = cc.color(255*(1-n),255*n,0);
                        subItem.addLabel(colorLabel,""+level);
                        this.subItemPool.push(subItem);
                    }
                }
            }
        }
    },

    //从缓存池中取一个对象
    getSubItem:function(){
        if(this.subItemPool.length==0){
            this.subItemPool = this.subItemStor.splice(0,this.subItemStor.length);
        }
        var item = this.subItemPool[0];
        this.subItemPool.splice(0,1);
        this.subItemStor.push(item);
        if(item.getParent()!=null){
            item.removeFromParent();
        }
        return item;
    }

});