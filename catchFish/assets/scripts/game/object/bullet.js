cc.Class({
    extends: cc.Component,

    properties: {
        _angle:0,
        _startPos:cc.Vec2(0,0),
        _action:null,
        _isStart:false
    },

    onLoad: function () {

    },

    initBulletWithData:function(angle,startPos){
        this._angle = angle;
        this._startPos = startPos;
        this.node.position = startPos;
        this._isStart = true;
    },

    update: function (dt) {
        while (this._isStart) 
        {
            if(this.isBulletOutWindow()== true)
            {
                this.node.destroy();
                return;
            }
    
            let length = dt*10;
            let deltaX = length* Math.cos(this._angle);
            let deltaY = Math.abs(length*Math.sin(this._angle));
            if(this._angle<0)
            {
                deltaX = deltaX*-1;
            }
            
            let prePos = this.node.position; 
            let newPos = new cc.Vec2(prePos.x+deltaX,prePos.y+deltaY); 
            this.node.position  = newPos;

            // var action = cc.moveTo(dt, newPos.x, newPos.y);
           
            // this.node.stopAction(this._action);
            // this.node.runAction(action);
            // this._action = action;
        } ;
    },

    onCollisionEnter:function(other,self)
    {
        cc.log("bullet enter collision")
        // 碰撞系统会计算出碰撞组件在世界坐标系下的相关的值，并放到 world 这个属性里面
        var world = self.world;

        // 碰撞组件的 aabb 碰撞框
        var aabb = world.aabb;

        // 上一次计算的碰撞组件的 aabb 碰撞框
        var preAabb = world.preAabb;

        // 碰撞框的世界矩阵
        var t = world.transform;

        // 以下属性为圆形碰撞组件特有属性
        var r = world.radius;
        var p = world.position;

        // 以下属性为 矩形 和 多边形 碰撞组件特有属性
        var ps = world.points;
    },

    isBulletOutWindow:function(){
        let pos = this.node.position;
        if (pos.x >680 || pos.x <-680 || pos.y>400 || pos.y<-400) {
            return true;
        }
        return false;
    },


});
