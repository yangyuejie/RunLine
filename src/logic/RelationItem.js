/**
 * Created by yang on 2016/8/30.
 */
var RelationItem = cc.Node.extend({
    itemArray:[],
    ctor:function () {
        this._super();
        //布局页面
        this.layOutItems();
        //设置关联性
        this.setRelation();

        return true;
    },

    //布局固定数量的单元格
    layOutItems: function(){

        var size = cc.winSize;
        var halfNum = (lineNum-1)/2;
        var indexX  = halfNum/2;
        var indexY = halfNum/2-halfNum%2;
        var highNum = -halfNum;
        var topHalf = false;
        for(var j=0; j<lineNum; j++){

            var array = [];

            if(j>halfNum){
                if(j%2==0){
                    indexY--;
                }else{
                    indexX--;
                }
            }
            for(var i=-indexX; i<=indexY; i++){
                var hexagon = new Hexagon();
                hexagon.initBaseItem();
                var addX = 0;
                if(indexX==indexY){
                    addX = 0;
                }else{
                    if(topHalf){
                        addX = -radius/2;
                    }else{
                        addX = radius/2;
                    }

                }
                hexagon.setPosition(cc.p(size.width/2-addX-radius*i,size.height/2+highNum*radius*1.7320508075689/2));
                this.addChild(hexagon);
                array.push(hexagon);
            }
            this.itemArray.push(array.reverse());
            if(j>halfNum){

            }else{
                if(j!=halfNum){
                    if(j%2==0){
                        indexX++;
                    }else{
                        indexY++;
                    }
                }else{
                    topHalf = true;
                }
            }
            highNum++;
        }
    },
    //设置关联性
    setRelation: function(){

        for(var i=lineNum-1; i>0; i--){

            for(var j=0; j<this.itemArray[i].length; j++){

                if(this.itemArray[i].length<this.itemArray[i-1].length){
                    this.itemArray[i][j].lDown = this.itemArray[i-1][j];
                    this.itemArray[i][j].rDown = this.itemArray[i-1][j+1];

                    this.itemArray[i-1][j].rUp = this.itemArray[i][j];
                    this.itemArray[i-1][j+1].lUp = this.itemArray[i][j];
                }else{

                    if(j<this.itemArray[i-1].length){
                        this.itemArray[i-1][j].rUp = this.itemArray[i][j+1];
                        this.itemArray[i-1][j].lUp = this.itemArray[i][j];

                        this.itemArray[i][j].rDown = this.itemArray[i-1][j];
                        this.itemArray[i][j+1].lDown = this.itemArray[i-1][j];
                    }else{
                        break;
                    }
                }

                if(j+1<this.itemArray[i].length){
                    this.itemArray[i][j].right = this.itemArray[i][j+1];
                    this.itemArray[i][j+1].left = this.itemArray[i][j];
                }
            }
        }

        for(var m=0; m<this.itemArray[0].length-1; m++){
            this.itemArray[0][m].right = this.itemArray[0][m+1];
            this.itemArray[0][m+1].left = this.itemArray[0][m];
        }
    },

    getItemArr: function(){
        return this.itemArray;
    }

});