var fs = require('fs');

cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!',
        fishPrefab:cc.Prefab,
        pointCount:0,
        pointArray:[cc.Vec2],
        editEndBtn:cc.Button
    },

    // use this for initialization
    onLoad: function () {
        this.label.string = this.text
        var parentNode = this.node
        this.addButtonCallback();
        this.node.on(cc.Node.EventType.MOUSE_DOWN,function(event){
        if(this.fishPrefab)
         {
            var fish = cc.instantiate(this.fishPrefab)
            var testNode = this.node
            fish.parent = parentNode
            var posOld = event.getLocation()
            var v2Pos = fish.convertToNodeSpace(posOld)
            fish.setPosition(v2Pos)
         }
        },this)
    },

    addButtonCallback:function()
    {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "fishManager";
        clickEventHandler.handler = "onEditEnd";
        clickEventHandler.customEventData = "foobar";

        this.editEndBtn.clickEvents.push(clickEventHandler);
    },

    onEditEnd:function(event, customEventData){
        console.log("dssd");
    },
    // called every frame
    update: function (dt) {

    },
});
