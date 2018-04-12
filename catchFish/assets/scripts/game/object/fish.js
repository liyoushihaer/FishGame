import Bezier from 'bezier'
const FishState = {
    Invalid: -1,
    Run: 1,
    RunFast: 2,
    Dead: 3
};
cc.Class({
    extends: cc.Component,

    properties: {
       spriteAtlas: {
           default: null,
           type: cc.SpriteAtlas
       },
       _lastFishPos:{
            default:cc.Vec2(0,0),
       }
    },

    // use this for initialization
    onLoad: function () {
        // this.getComponent(cc.Sprite).spriteFrame = this.spriteAtlas.getSpriteFrame('cannonPlus');
        this.state = FishState.Invalid;
        this.runTime = 0;
    },
    initWithData: function(data){
        // this.getComponent(cc.Sprite).spriteFrame = this.spriteAtlas.getSpriteFrame('cannonPlus');


        //首先取出动画
        let config = data.config;
        let bezier = data.bezier;
        let animation = this.getComponent(cc.Animation);

        //去除
        let clicpNameList = ['run','dead'];
        let animateConfig = config.animates;
        for (let i = 0 ; i < clicpNameList.length ; i ++){
            let spriteFrameList = this.getSpriteFrameList(animateConfig[clicpNameList[i]]);
            cc.log('sprite frame list = ' + spriteFrameList.length);
            let clicp = cc.AnimationClip.createWithSpriteFrames(spriteFrameList,5);
            if (clicpNameList[i] === 'run'){
                clicp.wrapMode = cc.WrapMode.Loop;
            }
            animation.defaultClip = clicp;
            animation.addClip(clicp, clicpNameList[i]);

        }
        //
        // this.getComponent(cc.Sprite).spriteFrame = this.spriteAtlas.getSpriteFrame("fish_bigred_dead_0");


        //创建一条贝塞尔曲线
        this.bezier = Bezier(bezier,500, 10);
        this.setState(FishState.Run);

    },
    getSpriteFrameList: function (animateConfig) {
        let pre = animateConfig.pre;
        let start = animateConfig.start;
        let end = animateConfig.end;
        let spriteFrameList = [];
        for (let i = start ; i < (end + 1) ; i ++){
            let str = pre + "_" + i;
            cc.log('str = ' + str);
            let spriteFrame = this.spriteAtlas.getSpriteFrame(str);
            spriteFrameList.push(spriteFrame);
        }
        return spriteFrameList;
    },
    
    setState: function (state) {
        if (this.state === state){
            return
        }
        switch (state){
            case FishState.Invalid:
                break;
            case FishState.Run:
                this.node.position = this.bezier.getPoint(0);
                this.getComponent(cc.Animation).play("run");
                break;
            case FishState.RunFast:
                break;
            case FishState.Dead:
                break;
            default:
                break;
        }
        this.state = state;
    },

    dead:function()
    {
        this.node.destroy();
    },

    update: function (dt) {
        //开始运行
        this.runTime += dt;
        switch (this.state){
            case FishState.Run:
                let position = this.bezier.getPoint(this.runTime);
                if (position == null) {
                    this.dead();
                    break;
                }

                let vecSub = cc.pSub(position, this.node.position);
                let direction = cc.pAngle(cc.p(1,0), vecSub);
                var angle = direction / Math.PI * 180; 

                //判断两个向量方向
                let result = cc.pCross(cc.p(1,0), vecSub);               
                if(result>0)
                {
                    angle = 360-angle;
                }

                this.node.position = position;
                this.node.rotation=angle;

                break;
            case FishState.RunFast:
                break;
            default:
                break;
        }
    },

    onCollisionEnter:function(other,self)
    {
        cc.log("fish enter collision")
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
    }
});
