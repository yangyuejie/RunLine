/**
 * Created by Administrator on 2016/11/24 0024.
 */
sa.BaseLayer = cc.Layer.extend({

    ctor:function () {
        this._super();
        return;
    },

    changeSceneWithId: function(sceneId){
       switch (sceneId){
           case MAIN_SCENE:
               cc.director.runScene(new MenuScene());
               break;
           case SELECT_SCENE:
               cc.director.runScene(new SelectScene());
               break;
           case GAME_SCENE:
               cc.director.runScene(new GameScene());
               break;
           case TOTURIAL_SCENE:
               cc.director.runScene(new ToturialScene());
               break;
           case ABOUT_SCENE:
               cc.director.runScene(new AboutScene());
               break;
           case COMMENT_SCENE:
               break;
       }
    }
});