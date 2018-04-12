cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad: function () {

    },

    update: function (dt) {

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
        
        return false;
    },


});
