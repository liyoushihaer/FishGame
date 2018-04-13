const  kRevolutionHeight = 720;
const  kRevolutionWidth = 1280;
const  M_PI = Math.PI;
const  M_PI_2 = M_PI/2;


cc.ActionBulletMove = cc.ActionInterval.extend({
    _angle:0,
    _bulletSpeed:0,
    _dx:0,
    _dy:0,

    ctor:function(angle,speed){
        cc.ActionInterval.prototype.ctor.call(this);
        this.initWithDuration(10);
        this._angle = angle;
        this._bulletSpeed = speed;
        this._dx = Math.sin(this._angle);
        this._dy = Math.cos(this._angle);
    },

    setAngle:function(angle)
    {
        this._angle = angle;
        this._dx = Math.sin(this._angle);
        this._dy = Math.cos(this._angle);
    },

    step:function( dt){
        if (this._firstTick)
        {
            this._firstTick = false;
            this._elapsed = 0;
        }
        else
        {
           this. _elapsed += dt;
        }
    
        if (this.target)
        {
            let pt = this.target.getPosition();
            let deltaX = this._bulletSpeed  * this._dx * dt;
            let deltaY = this._bulletSpeed  * this._dy * dt;
            pt.x += deltaX;
            pt.y += deltaY;
    
            if (pt.x < -kRevolutionWidth/2) {
                pt.x = pt.x+2*Math.abs(deltaX);
                this._dx = -this._dx;
                this._angle = -this._angle; 
            }
            if (pt.x > kRevolutionWidth/2)  { 
                pt.x = kRevolutionWidth/2 - (pt.x - kRevolutionWidth/2); 
                this._dx = -this._dx; 
                this._angle = -this._angle; 
            }
    
            if (pt.y < -kRevolutionHeight/2) { 
                pt.y = pt.y+2* Math.abs(deltaY);
                this._dy = -this._dy; 
                this._angle = M_PI - this._angle; 
            }
        
            if (pt.y > kRevolutionHeight/2)  { 
                pt.y = kRevolutionHeight/2 - (pt.y - kRevolutionHeight/2); 
                this._dy = -this._dy;
                this._angle = M_PI - this._angle;
            }
    
            console.log("old angle is ", this._angle);
            this.target.setPosition(pt);
            //cc.log("point x = %f,point y = %f, time is %f", pt.x_, pt.y_, dt);
            this.target.setRotation((this._angle) * 180 / M_PI);
        }
        else
        {
           console.log("tagget is no nonentity");
        }
    
        // if (this.target)
        // {
        //     if (this._elapsed >= this._duration)
        //     {
        //         this.target.active = false;
        //     }
        //     else
        //     {
        //        this. target.active = true;
        //     }
        // }
    
    },

    isDone:function() { 
        return false; 
    },

    startWithTarget:function(target){
        cc.ActionInterval.prototype.startWithTarget.call(this, target);
    } 

});

cc.actionBulletMove = function(angle,speed){
    return new cc.ActionBulletMove(angle,speed);
};