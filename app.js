
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    curx:100,
    cury:100,
    addX:5,
    addY:5,

    total:0,

    posAry:[],


    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;


        /* you can create scene with following comment code instead of using csb file.
        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);
        */

        this.schedule(this.update, 0.1);

        return true;
    },

    update: function(dt){

        var draw = new cc.DrawNode();
        this.addChild(draw, 10);
        var winSize = cc.director.getWinSize();
        //drawSegment
        //draw.drawSegment(cc.p(0, 0), cc.p(winSize.width, winSize.height), 1, cc.color(255, 255, 255, 255));


        var opacity = 255-this.total;
        if(opacity<=0){
            opacity = 0;
        }

        var dis = Math.sqrt(this.addX*this.addX + this.addY*this.addY);
        draw.drawSegment(cc.p(this.curx, this.cury), cc.p(this.curx+this.addX, this.cury+this.addY), dis, cc.color(255, 0, 0, opacity));
        this.curx += this.addX;
        this.cury += this.addY;

        //this.posAry.push(draw);

        //if(this.posAry.length>20){
        //    this.posAry[0].removeFromParent();
        //    this.posAry.splice(0,1);
        //}
        this.total += 5;

        if(opacity==0){
            this.unschedule(this.update);
        }
    }

});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

