
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

       // /////////////////////////////
       // // 2. add a menu item with "X" image, which is clicked to quit the program
       // //    you may modify it.
       // // ask the window size
        var size = cc.winSize;
       //
       // // add a "close" icon to exit the progress. it's an autorelease object
       // var closeItem = new cc.MenuItemImage(
       //     res.CloseNormal_png,
       //     res.CloseSelected_png,
       //     function () {
       //         cc.log("Menu is clicked!");
       //     }, this);
       // closeItem.attr({
       //     x: size.width - 20,
       //     y: 20,
       //     anchorX: 0.5,
       //     anchorY: 0.5
       // });
       //
       // var menu = new cc.Menu(closeItem);
       // menu.x = 0;
       // menu.y = 0;
       // this.addChild(menu, 1);
       //
       // /////////////////////////////
       // // 3. add your codes below...
       // // add a label shows "Hello World"
       // // create and initialize a label
       // var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
       // // position the label on the center of the screen
       // helloLabel.x = size.width / 2;
       // helloLabel.y = 0;
       // // add the label as a child to this layer
       // this.addChild(helloLabel, 5);
       //
       //// add "HelloWorld" splash screen"
       // this.sprite = new cc.Sprite(res.HelloWorld_png);
       // this.sprite.attr({
       //     x: size.width / 2,
       //     y: size.height / 2,
       //     scale: 0.5,
       //     rotation: 180
       // });
       // this.addChild(this.sprite, 0);
       //
       // this.sprite.runAction(
       //     cc.sequence(
       //         cc.rotateTo(2, 0),
       //         cc.scaleTo(2, 1, 1)
       //     )
       // );
       // helloLabel.runAction(
       //     cc.spawn(
       //         cc.moveBy(2.5, cc.p(0, size.height - 40)),
       //         cc.tintTo(2.5,255,125,0)
       //     )
       // );

        var colorLayer = new cc.LayerColor(cc.color(255,255,255,155),size.width,size.height);
        this.addChild(colorLayer);

        //var hexagon = new Hexagon();
        //hexagon.drowPolygon();
        //this.addChild(hexagon);
        //hexagon.setPosition(cc.p(size.width/2,size.height/2));


        //var hexagon1 = new Hexagon();
        //hexagon1.drowPolygon();
        //this.addChild(hexagon1);
        //hexagon1.setPosition(cc.p(size.width/2,size.height/2-100));

        //for(var i=-4; i<=4; i++){
        //    var hexagon1 = new Hexagon();
        //    hexagon1.drowPolygon();
        //    this.addChild(hexagon1);
        //    hexagon1.setPosition(cc.p(size.width/2-100*i,size.height/2));
        //}
        //
        //for(var j=-4; j<=3; j++){
        //    var hexagon2 = new Hexagon();
        //    hexagon2.drowPolygon();
        //    this.addChild(hexagon2);
        //    //hexagon2.setPosition(cc.p(size.width/2+100*1.7320508075689/2,size.height/2-50-100*j));
        //    hexagon2.setPosition(cc.p(size.width/2-50-100*j,size.height/2-100*1.7320508075689/2));
        //}
        //
        //for(var j=-3; j<=3; j++){
        //    var hexagon2 = new Hexagon();
        //    hexagon2.drowPolygon();
        //    this.addChild(hexagon2);
        //    //hexagon2.setPosition(cc.p(size.width/2+100*1.7320508075689/2,size.height/2-50-100*j));
        //    hexagon2.setPosition(cc.p(size.width/2-100*j,size.height/2-200*1.7320508075689/2));
        //}
        //
        //for(var j=-3; j<=2; j++){
        //    var hexagon2 = new Hexagon();
        //    hexagon2.drowPolygon();
        //    this.addChild(hexagon2);
        //    //hexagon2.setPosition(cc.p(size.width/2+100*1.7320508075689/2,size.height/2-50-100*j));
        //    hexagon2.setPosition(cc.p(size.width/2-50-100*j,size.height/2-300*1.7320508075689/2));
        //}
        //
        //for(var j=-2; j<=2; j++){
        //    var hexagon2 = new Hexagon();
        //    hexagon2.drowPolygon();
        //    this.addChild(hexagon2);
        //    //hexagon2.setPosition(cc.p(size.width/2+100*1.7320508075689/2,size.height/2-50-100*j));
        //    hexagon2.setPosition(cc.p(size.width/2-100*j,size.height/2-400*1.7320508075689/2));
        //}

        var relation = new RelationItem();
        this.addChild(relation);

        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

