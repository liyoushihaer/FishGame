cc.Class({
    extends: cc.Component,

    properties: {
        _angle:0,
        _startPos:cc.Vec2(0,0),
        _action:null,
        _isStart:false,
        _bulletId:-1
    },

    onLoad: function () {

    },

    initBulletWithData:function(angle,startPos){
        this._angle = angle;
        this._startPos = startPos;
        this.node.position = startPos;
        this._action = cc.actionBulletMove(angle * Math.PI / 180,1000);
        this.node.runAction(this._action);
        this._action.step(0);
    },

    onCollisionEnter:function(other,self)
    {
        cc.log("bullet enter collision")
        this.node.destroy();
        this.onBulletCollisionFish();      
    },

    onCollisionStay: function (other, self) {
        console.log('on collision stay');
    },
    
    onCollisionExit: function (other, self) {
        console.log('on collision exit');
    },

    isBulletOutWindow:function(){
        let pos = this.node.position;
        // if (pos.x >680 || pos.x <-680 || pos.y>400 || pos.y<-400) {
        //     return true;
        // }
        return false;
    },

    setBulletId:function(id)
    {
        this._bulletId = id;
    },

    onBulletCollisionFish:function()
    {
        // 打开渔网

    }
});
