/**
 * Created by yang on 2016/9/4.
 */

var LevelInfor = cc.Node.extend({

    //关卡信息
    itemArray:[],
    //道具数组
    propArray:[],

    ctor:function () {
        this._super();

        return true;
    },

    setParmArr: function(array){
        this.itemArray = array;
    },

    //关卡数值信息
    setLevelData: function(level){

        //获取关卡
        var array = this.getLevelData(level);
        //设置布局数据信息
        this.setDataInfor(array);
        //添加按钮
        this.addStartButton();
        //设置技能方块
        this.addDirection(array);
    },

    //获取关卡信息
    getLevelData: function(level){
        //var level = cc.sys.localStorage.getItem("level");
        //if(level==null){
        //    level = 0;
        //}
        var array = ItemInforList.shared().getLevelData(level);
        return array;
    },

    //读取关卡数据信息
    setDataInfor: function(array){

        ItemInforList.shared().removeTarget();

        for(var i=0; i<array.length; i++){
            if(i>=9){
                break;
            }
            for(var j=0; j<array[i].length; j++){
                var data = array[i][j];
                var item = this.itemArray[i][j];
                //设置单元格数据信息
                item.initItemInfor(data);
                item.drowPolygon();
            }
        }
    },

    //更改布局页面信息
    changeLayOut: function(){
        //var scene = cc.director.getRunningScene();
        //var self = this;
        this.schedule(this.monitorAction,1);
        //this.schedule(function(dt){
        //    var array = ItemInforList.shared().getTargetArr();
        //
        //    //判断是否胜利
        //    var ifWin = true;
        //    var indexID = array[0].getParent().getIndexID();
        //    for(var i=1; i<array.length; i++) {
        //        if (array[i].getParent().getIndexID() != indexID) {
        //            ifWin = false;
        //            break;
        //        }
        //    }
        //    if(ifWin){
        //        //展示胜利页面
        //        scene.unschedule(scene.schedule);
        //        //重新布局
        //        self.disLayoutNew();
        //        return;
        //    }
        //    for(var i=0; i<array.length; i++){
        //        array[i].moveToTarget();
        //    }
        //},1);
    },

    //监控动作状态
    monitorAction: function(){
        var array = ItemInforList.shared().getTargetArr();

        //判断是否胜利
        var ifWin = true;
        var indexID = array[0].getParent().getIndexID();
        for(var i=1; i<array.length; i++) {
            if (array[i].getParent().getIndexID() != indexID) {
                ifWin = false;
                break;
            }
        }
        if(ifWin){
            //展示胜利页面
            this.unschedule(this.monitorAction);
            //重新布局
            this.disLayoutNew();
            return;
        }
        for(var i=0; i<array.length; i++){
            array[i].moveToTarget();
        }
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
    },

    //添加指示方向unit
    addDirection: function(array){

        var scene = cc.director.getRunningScene();
        for(var i=0; i<4; i++){
            var unit = new PropItem();
            unit.initPropData(array[9][i]);
            unit.drowPolygon();
            unit.addSubItem();
            unit.storeInitialPos(cc.p(100*(i+1),100));
            scene.addChild(unit,100);
            unit.addTouchEvent(LevelInfor.prototype.touchMoveBack.bind(this), LevelInfor.prototype.touchEndBack.bind(this));
            this.propArray.push(unit);
        }
    },

    //监控位置
    touchMoveBack: function(node){

       var position = node.getPosition();

        for(var i=0; i<lineNum; i++){
            var array = this.itemArray[i];
            for(var j=0; j<array.length; j++){
                var item = array[j];
                var dis = cc.pDistance(item.getPosition(), position);
                if(dis < radius/2){
                    if(!this.judgeEffectPos(item)){
                        //无效位置
                        continue;
                    }
                    item.setScale(1.1);
                }else{
                    item.setScale(1);
                }
            }
        }
    },

    //点击结束回调
    touchEndBack: function(node){

        var ifEct = false;
        for(var i=0; i<lineNum; i++){
            var array = this.itemArray[i];
            for(var j=0; j<array.length; j++) {
                var item = array[j];
                if (item.getScale() > 1) {
                    node.removeFromParent();
                    node.setPosition(cc.p(0, 0));
                    node.setRotation(node.getRotation() - 30);
                    item.setAttachItem(node);
                    node.setExtenItem();
                    ifEct = true;
                    break;
                }
            }
            if(ifEct){
                break;
            }
        }
        if(!ifEct){
            //还原位置。。。
            node.recoverPos();
        }
    },

    //判断是否放到了有效位置
    judgeEffectPos: function(item){
        var array = item.getAttachItem();
        for(var i=0; i<array.length; i++){
            if(array[i].getIfTarget()||array[i].getExtendStep()!=0){//目标方块、技能方块无效
                return false;
            }
        }
        return true;
    },

    //重新布局页面信息
    disLayoutNew: function(){
        //var level = cc.sys.localStorage.getItem("level");
        //cc.sys.localStorage.setItem("level",level+1);

        for(var i=0; i<lineNum; i++){
            var array = this.itemArray[i];
            for(var j=0; j<array.length; j++){
                var item = array[j];
                var attachArr = item.getAttachItem();
                for(var m=0; m<attachArr.length; m++){
                    item.removeAttachItem(m);
                    m--;
                }
            }
        }
        this.setLevelData(1);
    }

});
