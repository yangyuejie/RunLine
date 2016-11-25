/**
 * Created by 杨跃杰 on 2016/10/20.
 */
var SubItem = cc.Node.extend({
    ctor:function () {
        this._super();
        return true;
    },

    //判断添加类型
    addSubType: function(item){
        //添加指示线
        this.addDirecteLine(item);
    },

    //绘制六边形
    drowSixEdge:function(color){
        //创建DrawNode
        var drawNode = cc.DrawNode.create();

        var point1 = [];
        point1[0] = cc.p(-radius/2, 0);
        point1[1] = cc.p(-1/2*radius/2, -1.7320508075689/2*radius/2);
        point1[2] = cc.p(1/2*radius/2, -1.7320508075689/2*radius/2);
        point1[3] = cc.p(radius/2, 0);
        point1[4] = cc.p(1/2*radius/2, 1.7320508075689/2*radius/2);
        point1[5] = cc.p(-1/2*radius/2, 1.7320508075689/2*radius/2);

        drawNode.drawPoly(point1, color, 4, cc.color(0, 0, 0, 255));
        this.addChild(drawNode);
        return point1;
    },

    //绘制圆形
    drowCircular: function(radius,color){
        var drawNode = new cc.DrawNode();
        drawNode.drawCircle(cc.p(0,0), radius, 0, 150, false, 40, color);
        this.addChild(drawNode);
    },

    //绘制指示方向
    addTipLine: function(){

        var drawLine = new cc.DrawNode();
        drawLine.drawSegment(cc.p(0, 0), cc.p(0, 30), 2, cc.color(255, 0, 0, 255));
        this.addChild(drawLine);

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

    //添加指示方向
    addDirecteLine: function(item){

        var direction = item.getMoveDir();
        if(direction=="null"){
            return;
        }
        var drawNode = this.drowRoadTip();
        var rotate;
        switch (direction){
            case "left":
                rotate = 30;
                break;
            case "right":
                rotate = 210;
                break;
            case "lUp":
                rotate = 90;
                break;
            case "rUp":
                rotate = 150;
                break;
            case "lDown":
                rotate = -30;
                break;
            case "rDown":
                rotate = -90;
                break;
        }
        drawNode.setRotation(rotate);
    },

    //绘制小路标记
    drowRoadTip: function(){
        var drawNode = new cc.DrawNode();
        var point = [];
        point[0] = cc.p(-10, 0);
        point[1] = cc.p(-1/2*10, -1.7320508075689/2*10);
        point[2] = cc.p(1/2*10, -1.7320508075689/2*10);
        drawNode.drawCatmullRom(point, 30, 5, cc.color(255,255,255,80));
        this.addChild(drawNode);
        return drawNode;
    },

    //添加label
    addLabel: function(color,str){
        var size = this.getContentSize();
        var label = new cc.LabelTTF();
        label.setFontSize(30);
        label.setPosition(cc.p(size.width/2,size.height/2));
        label.setColor(color);
        label.setString(str);
        this.addChild(label);
    }

});
