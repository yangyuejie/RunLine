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

    }

};
