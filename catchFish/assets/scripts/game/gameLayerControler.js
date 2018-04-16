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

    onLoad: function () {
        this.node.on('touchstart',function(event){
            this.onTouchStart(event);
        }, this);

        this.initCannonPos();
    },

    initCannonPos:function()
    {
        this._cannonPos = new cc.Vec2(-214,-320);
        this._cannonScript = this.gameCannon.getComponent('cannon');
    },

    onTouchStart:function(event)
    {
        let pos = event.getLocation();
        pos =  this.node.convertToNodeSpaceAR(pos);

        let vecSub = cc.pSub(pos,this._cannonPos);
        let direction = cc.pAngle(cc.p(0,1), vecSub);
        var angle = direction / Math.PI * 180; 
        let result = cc.pCross(cc.p(0,1), vecSub);
        if(result>0)
        {
            angle = -1*angle;
        }
        this.gameCannon.rotation=angle;
        this.initCannonPos();
        
        // let oldPosition = this.gameCannon.position;
        // let newPos_1 = this.node.convertToWorldSpaceAR(oldPosition);
        // let newPos_2 = this.node.convertToNodeSpaceAR(newPos_1);

        this._cannonScript.playAction();
        this.createBullet(angle,this._cannonPos);
    },

    createBullet:function(angle,startPos){
        let bulletNode = cc.instantiate(this.bulletPrefab);
        bulletNode.parent = this.node;
        bulletNode.position = startPos;

        bulletNode.setRotation(angle);
        bulletNode.getComponent('bullet').initBulletWithData(angle,startPos);
    },
});
