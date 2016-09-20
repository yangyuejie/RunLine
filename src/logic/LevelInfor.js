/**
 * Created by yang on 2016/9/4.
 */

var LevelInfor = cc.Node.extend({

    //关卡信息
    itemArray:[],
    //关卡数值信息
    levelData:[],

    //目标对象
    targetArray: [],

    ctor:function () {
        this._super();

        return true;
    },

    setParmArr: function(array){
        this.itemArray = array;
    },

    //关卡数值信息
    setLevelData: function(array){
        this.levelData = array;
        this.setDataInfor();
       // this.changeLayOut();
        //添加按钮
        this.addStartButton();
    },

    //读取关卡数据信息
    setDataInfor: function(){

        //获取关卡
        var level = cc.sys.localStorage.getItem("level");
        if(level==null){
            level = 0;
        }
        var array = this.levelData[level];
        array = this.setDataArra(array);

        for(var i=0; i<array.length; i++){
            if(i>=9){
                break;
            }
            for(var j=0; j<array[i].length; j++){

                var data = array[i][j];
                data = parseInt(data);
                //判断结束标志
                if(data==-1){
                    break;
                }

                var item = this.itemArray[i][j];
                //设置关联方向标志
                if(data>=1&&data<=6){
                    item.setDirection(data);
                }

                //设置目标位置信息
                if(data>=101&&data<200){
                    var state = parseInt(data/100);
                    var color = parseInt((data-100)/10);
                    var path = parseInt((data-100)%10);
                    item.setStateInfor(state);
                    item.setDirection(path);
                    item.setColorState(color);

                    var hexagon = new Hexagon();
                    hexagon.setColorState(attColor);
                    hexagon.setDirection(path);
                    hexagon.drowPolygon();
                    hexagon.setRotation(0);
                    item.addChild(hexagon);
                    this.targetArray.push(hexagon);

                }else if(data<100){
                    item.setDirection(parseInt(data%10));
                    item.setColorState(parseInt(data/10));
                    item.setStateInfor(0);
                }
                item.drowPolygon();
            }
        }
    },

    //处理文件信息
    setDataArra: function(array){

        var dataArray = [];
        var lineArr = [];
        var elem = "";
        var ifAdd = false;
        for(var i=0; i<array.length; i++){

            var item = array[i];
            if(item == " "){
                if(!ifAdd){
                    if(elem=="-1"){
                        dataArray.push(lineArr);
                        lineArr = [];
                    }else{
                        lineArr.push(elem);
                    }
                    elem = "";
                    ifAdd = true;
                }
            }else{
                ifAdd = false;
                elem += item;
            }
        }
        return dataArray;
    },

    //更改布局页面信息
    changeLayOut: function(){
        var scene = cc.director.getRunningScene();
        var self = this;
        scene.schedule(function(dt){
            for(var i=0; i<self.targetArray.length; i++){
                self.targetArray[i].moveToTarget();
            }
        },1);
    },

    addStartButton: function(){
        var label = new cc.LabelTTF();
        label.setString("GO");
        label.setFontSize(30);
        label.setColor(cc.color(255,0,0));

        var self = this;
        var goButton = new cc.MenuItemLabel(label,function () {
            self.changeLayOut();
        }, this);
        goButton.setPosition(cc.p(0,-cc.winSize.height/2+50));
        var menu = new cc.Menu(goButton);

        var scene = cc.director.getRunningScene();
        scene.addChild(menu,100);
    }

});
