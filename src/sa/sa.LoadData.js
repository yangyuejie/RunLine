/**
 * Created by CF-BJ-032 on 2016/10/13.
 */

sa.LoadScene = cc.Node.extend({

    ctor: function () {
        this._super();
    }
});

sa.LoadScene.preload = function(backFun){

    var res = [];
    for(var i=1; i<=/*cardNum*/2; i++){
        res.push("res/data/level_"+i+".txt");
    }
    var self = this;
    cc.loader.load(res, function(err,array) {
        var inforArr = [];
        for(var j=0; j<array.length; j++){
            var subArr = array[j].split("\n");
            for (var i = 0; i < subArr.length; i++) {
                var itemArr = self.dealArray(subArr[i]);
                inforArr.push(itemArr);
            }
            ItemInforList.shared().setLevelData(inforArr);
        }

        //加载item数据信息
        cc.loader.load("res/data/unitInfor.txt", function (err, array) {

            var inforArr = [];
            array = array[0].split("\n");
            for (var i = 0; i < array.length; i++) {
                //var itemArr = array[i].split(",");
                var itemArr = self.dealArray(array[i]);
                inforArr.push(itemArr);
            }

            for (var j = 0; j < inforArr.length; j++) {
                var data = inforArr[j];
                //单元格信息数组
                ItemInforList.shared().addObject(data[0],data);
            }

            //对象缓存池
            ObjectPool.shared().createSubItemPools();

            backFun();
        });

    });
};

//处理数组信息
sa.LoadScene.dealArray = function(array){

    var backArr = [];
    var tempArr = array.split(",");
    for(var i=0; i<tempArr.length; i++){
        if(tempArr[i]==""||tempArr[i]=="\r"){
            break;
        }
        backArr.push(tempArr[i]);
    }
    return backArr;
};
