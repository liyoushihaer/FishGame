cc.Class({
    extends: cc.Component,

    properties: {
        fishAnim:{
            default:null,
            type:cc.Animation
        },
    },

    // use this for initialization
    onLoad: function () {
        this.fishAnim = this.node.getComponent(cc.Animation);
        var anim1 =  this.fishAnim.getAnimationState('netAnimation');
        anim1.on('finished',this.dead, this);     
        this.fishAnim.play("netAnimation");
    },

    initNetWithData:function(pos){
        
        this.fishAnim.play("netAnimation");
    },

    dead:function()
    {
        this.node.destroy();
    }
});
