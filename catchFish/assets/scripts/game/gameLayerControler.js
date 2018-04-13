cc.Class({
    extends: cc.Component,

    properties: {
        gameCannon:{
            default:null,
            type:cc.Node
        },
        gameBg:{
            default:null,
            type:cc.Node
        },
        bulletPrefab: {
            default: null,
            type: cc.Prefab
        },
        netPrefab:{
            default: null,
            type: cc.Prefab
        },
        _cannonPos:cc.Vec2(0,0),
        _cannonScript:null
    },

    // use this for initialization
    onLoad: function () {
        this.node.on('touchstart',function(event){
            this.onTouchStart(event);
        }, this);

        this.node.on('touchmove',function(event){

        }, this);

        this.node.on('touchend',function(event){
        }, this);

        this.initCannonPos();
    },

    initCannonPos:function()
    {
        let posOrigin = this.gameCannon.position;
        let newPos = this.gameCannon.convertToWorldSpaceAR(posOrigin);
        newPos =  this.node.convertToNodeSpaceAR(newPos);
        this._cannonPos = newPos;

        this._cannonScript = this.gameCannon.getComponent('cannon');
    },

    onTouchStart:function(event)
    {
        let pos = event.getLocation();
        pos =  this.node.convertToNodeSpaceAR(pos);
        cc.log("touch pos"+pos.x,pos.y);
        let vecSub = cc.pSub(pos,this._cannonPos);
        let direction = cc.pAngle(cc.p(0,1), vecSub);
        var angle = direction / Math.PI * 180; 
        let result = cc.pCross(cc.p(0,1), vecSub);
        if(result>0)
        {
            angle = -1*angle;
        }
        this.gameCannon.rotation=angle;
        this._cannonScript.playAction();
        this.createBullet(angle,this._cannonPos);
    },

    createBullet:function(angle,startPos){
        let bulletNode = cc.instantiate(this.bulletPrefab);
        bulletNode.parent = this.node;
        bulletNode.setRotation(angle);
        bulletNode.getComponent('bullet').initBulletWithData(angle,startPos);
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
