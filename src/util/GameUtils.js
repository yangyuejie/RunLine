/**
 * Created by Administrator on 2016/11/23 0023.
 */
var GameUtils = {

    //注册触摸事件
    addTouchEvent: function(target, moveBack, endBack){

        var tmpPoint;
        // 屏蔽下层事件
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event){
                var point = touch.getLocation();
                var converP = target.convertToNodeSpace(point);
                //判断是否在点击范围之内
                var rect = cc.rect(-1.7320508075689*radius/2,-40,1.7320508075689*radius,80);
                if(cc.rectContainsPoint(rect,converP)){
                    cc.log("touchBegan.......");
                    tmpPoint = point;
                    target.setScale(1.1);
                    return true;
                }
                return false;
            },
            onTouchMoved: function(touch, event){
                var name = target.getName();
                if(name.substring(0,10)!="scrollItem"){
                    var point = touch.getLocation();
                    var x = target.getPositionX()+point.x-tmpPoint.x;
                    var y = target.getPositionY()+point.y-tmpPoint.y;
                    target.setPosition(cc.p(x,y));
                    tmpPoint = point;
                }
                moveBack(target);
            },
            onTouchEnded: function(touch, event){
                endBack(target);
                target.setScale(1);
            },
            swallowTouches: false
        }, target);

    },

    //克隆对象
    clone:function(obj){
        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;

        // Handle Date
        if (obj instanceof Date) {
            var copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            var copy = [];
            var len = obj.length;

            for (var i = 0; i< len; ++i) {
                copy[i] = clone(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            var copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr))
                {
                    if(obj[attr]!=undefined){
                        copy[attr] = cc.clone(obj[attr]);
                    }
                }
            }
            return copy;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    },

    //闪烁动画
    repeatBlink:function(target,duration,uBlinks){
        var action = cc.blink(duration, uBlinks);
        var repeat = cc.repeatForever(action);
        target.runAction(repeat);
    },

    //绘制线段动画
    drowLineAni: function(target,pointArr){

        var index = 0;
        var currPoint = pointArr[index];

        target.schedule(function(){

            if(index+1>=pointArr.length){
                target.unschedule();
                return;
            }
            var disX = pointArr[index+1].x-pointArr[index].x;
            var disY = pointArr[index+1].y-pointArr[index].y;

            var nextPoint = cc.p(0,0);
            nextPoint.x = currPoint.x+disX/10;
            nextPoint.y = currPoint.y+disY/10;

            var drawLine = new cc.DrawNode();
            drawLine.drawSegment(currPoint, nextPoint, 2, cc.color(255, 0, 0, 255));
            target.addChild(drawLine);
            currPoint = nextPoint;

            if(currPoint.x==pointArr[index+1].x && currPoint.y==pointArr[index+1].y){
                index++;
            }

        },0.1);
    }

};
