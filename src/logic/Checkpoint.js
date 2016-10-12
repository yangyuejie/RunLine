/**
 * Created by yang on 2016/9/4.
 */

var Checkpoint = {

    levelData:[],

    //加载关卡数值信息
    loadCardData: function(loadCallback){

        //管卡单元格id信息数组
        this.levelData = [];

        var res = [];
        for(var i=1; i<cardNum+1; i++){
            res.push("res/data/level_"+i+".txt");
        }
        var self = this;
        cc.loader.load(res, function(err,array){
            var inforArr = [];
            array = array[0].split("\n");
            for(var i=0; i<array.length; i++){
                var itemArr = array[i].split(",");
                inforArr.push(itemArr);
            }
           // cc.log(inforArr);
            self.levelData.push(inforArr);
           // loadCallback(array);
        });

        cc.loader.load("res/data/unitInfor.txt", function(err,array){

            var inforArr = [];
            array = array[0].split("\n");
            for(var i=0; i<array.length; i++){
                var itemArr = array[i].split(",");
                inforArr.push(itemArr);
            }

            for(var j=0; j<inforArr.length; j++){
                var data = inforArr[j];
                var item = new ItemInfor();
                item.setItemID(data[0]);
                item.setRouteID(data[1]);
                item.setMoveDir(data[2]);
                item.setExtendStep(data[3]);
                item.setRotateDir(data[4]);
                item.setMoveSpeed(data[5]);
                item.setRelatePos(data[6]);
                item.setIfStop(data[7]);
                item.setIfTarget(data[8]);
                item.setIfChangeDir(data[9]);
                item.setIfDisplay(data[10]);
                item.setItemColor(data[11]);

                //单元格信息数组
                ItemInforList.shared().addObject(item);
            }
        });
    }
};
