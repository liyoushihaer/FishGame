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

    // update: function (dt) {
    //     while (this._isStart) 
    //     {
    //         // if(this.isBulletOutWindow()== true)
    //         // {
    //         //     this.node.destroy();
    //         //     return;
    //         // }
    
    //         // let length = dt*10;
    //         // let deltaX = length* Math.cos(this._angle);
    //         // let deltaY = Math.abs(length*Math.sin(this._angle));
    //         // if(this._angle<0)
    //         // {
    //         //     deltaX = deltaX*-1;
    //         // }
            
    //         // let prePos = this.node.position; 
    //         // let newPos = new cc.Vec2(prePos.x+deltaX,prePos.y+deltaY); 
    //         // this.node.position  = newPos;

    //         // var action = cc.moveTo(dt, newPos.x, newPos.y);
           
    //         // this.node.stopAction(this._action);
    //         // this.node.runAction(action);
    //         // this._action = action;
    //     } ;
    // },

    onCollisionEnter:function(other,self)
    {
        this.node.destroy();
        cc.log("bullet enter collision")
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
