/**
 * Created by yang on 2016/9/4.
 */

var Checkpoint = {

    //加载关卡数值信息
    loadCardData: function(loadCallback){
        //var res = [];
        //for(var i=1; i<cardNum+1; i++){
        //    res.push("res/data/checkpoint_"+i+".txt");
        //}
        //var self = this;
        //cc.loader.load(res, function(err,array){
        //    loadCallback(array);
        //});

        cc.loader.load("res/data/unitInfor.txt", function(err,array){
            for(var i=0; i<array.length; i++){
                cc.log(array[i]);
            }
        });
    }
};
