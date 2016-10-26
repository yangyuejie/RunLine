/**
 * Created by CF-BJ-032 on 2016/10/26.
 */
var PropItem = Hexagon.extend({

    //延伸方块数组
    extendArr:[],

    ctor:function () {
        this._super();
    },

    //创建延伸方块
    initPropData: function(itemKey){
        var data = ItemInforList.shared().getObject(itemKey);
        //初始化基础属性信息
        this.initDataInfor(data);

        for(var i=0; i<this.getExtendStep(); i++){
            var item = new Hexagon();
            //设置单元格数据信息
            var data = this.getExtendID();
            item.initItemInfor(data);
            item.drowPolygon();
            this.extendArr.push(item);
        }
    },

    //设置类型属性信息
    setTypeInfor: function(){

        var rotate = -1;
        switch(this.itemType){
            case normType:
            case targetType:
                break;
            case leftType:
                rotate = -180;
                break;
            case rightType:
                rotate = 0;
                break;
            case lUpType:
                rotate = -120;
                break;
            case rUpType:
                rotate = -60;
                break;
            case lDownType:
                rotate = 120;
                break;
            case rDownType:
                rotate = 60;
                break;
        }

        if(rotate!=-1){

            //添加创建方向指示标示
            this.addTipLine();
            this.setRotation(30+rotate);

            var label = new cc.LabelTTF();
            label. enableShadow(cc.color(0, 0, 0),4,4);
            label.setString("2");
            label.setFontSize(60);
            label.setColor(cc.color(173, 255, 47));
            label.setRotation(-30-rotate);
            label.setOpacity(80);
            this.drawNode.addChild(label);
        }
    },


    //添加指示线
    addTipLine: function(){

        //直线
        var draw = new cc.DrawNode();
        draw.drawSegment(cc.p(0, 0), cc.p(0, 30), 2, cc.color(255, 0, 0, 255));
        this.addChild(draw);
        draw.setRotation(60);

        //小三角形
        var point = [];
        point[0] = cc.p(0,-5);
        point[1] = cc.p(0,5);
        point[2] = cc.p(10,0);
        var drawNode = cc.DrawNode.create();
        drawNode.drawPoly(point, cc.color(255, 0, 0, 255), 4, cc.color(255, 0, 0, 255));
        this.addChild(drawNode);
        drawNode.setRotation(-30);
        drawNode.setPosition(cc.p(20,11));

    },

    //注册触摸事件
    addTouchEvent: function(moveBack, endBack){

        var tmpPoint;
        var self = this;
        // 屏蔽下层事件
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event){
                var point = touch.getLocation();
                var converP = self.drawNode.convertToNodeSpace(point);
                //判断是否在点击范围之内
                var rect = cc.rect(-1.7320508075689*50/2,-40,1.7320508075689*50,80);
                if(cc.rectContainsPoint(rect,converP)){
                    cc.log("touchBegan.......");
                    tmpPoint = point;
                    self.setScale(1.1);
                    return true;
                }
                return false;
            },
            onTouchMoved: function(touch, event){
                var point = touch.getLocation();
                var x = self.getPositionX()+point.x-tmpPoint.x;
                var y = self.getPositionY()+point.y-tmpPoint.y;
                self.setPosition(cc.p(x,y));
                tmpPoint = point;

                moveBack(self);
            },
            onTouchEnded: function(touch, event){
                endBack(self);
                self.setScale(1);
            },
            swallowTouches: false
        }, this.drawNode);

    },

    //设置延伸方块
    setExtenItem: function(){
        var parent = this.getParent();
        var direction = this.getMoveDir();
        for(var i=0; i<this.getExtendStep(); i++){
            var item = parent.getDirItem(direction);
            if(item==null){
                return;
            }
            item.setRotation(-30);
            item.setAttachItem(this.extendArr[i]);
        }
    }

});
