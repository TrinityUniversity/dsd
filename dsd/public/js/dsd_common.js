var dsd = (function(){
    // Add functions to pub to make them public
    var pub = {};

    var stage;
    var animLayer;
    var staticLayer;

    var lines;
    var text;
    var background; 

    var nodes;      
    var noNodes;   
    var selectedDot;

    var draggingLine;
    var dragLine;

    function updateLines(){
        lines.children.each(function(line, index){
            var origin = line.getAttr("origin").find('.connectDot')[0].getAbsolutePosition();
            var destination = line.getAttr("destination").find('.connectDot')[0].getAbsolutePosition();
            console.log(origin);
            console.log(destination);
            line.points([origin.x, origin.y, destination.x, destination.y]);
        });
    }
    function resetDragLine(){
        draggingLine = false;
        dragLine = null;
    }

    function addNode(posX, posY, type){
        // Node dimensions
        var nodeDim = { width:80, height: 50 };

        // Create the node
        var node = new Kinetic.Group({
            x: posX - nodeDim.width / 2,
            y: posY - nodeDim.height / 2,
            draggable: true,
            id: noNodes,
            value: 0,
        });
        node.on('mouseup', function(e){
            if(draggingLine){
                var cd = this.find('.connectDot')[0]
                var x1 = dragLine.points()[0];
                var y1 = dragLine.points()[1];
                var x2 = cd.getAbsolutePosition().x;
                var y2 = cd.getAbsolutePosition().y;
                dragLine.points([x1, y1, x2, y2]);
                dragLine.setAttr("destination", this);
                resetDragLine();
                e.cancelBubble = true;
            }
        });
        node.on('dragmove', function(e){
            updateLines();
        });
        noNodes += 1;

        // Set the node background
        var nodeImg = new Image();
        nodeImg.src = '/xblock/resource/dsd/public/img/SingleNode.jpg';
        var nodeBackground = new Kinetic.Image({
            x: 0,
            y: 0,
            height: nodeDim.height,
            width: nodeDim.width,
            image: nodeImg,
        });
        node.add(nodeBackground);

        // Set the node connector dot
        var dotRadius = 5;
        var connectDot = new Kinetic.Circle({
            x: nodeDim.width - dotRadius /2,
            y: nodeDim.height / 2,
            radius: dotRadius,
            fill: 'blue',
            stroke: 'black',
            strokeWidth: 2,
            draggable: false,
            name: "connectDot",
        });
        connectDot.on('mousedown', function(e){
            if(selectedDot != null){
                selectedDot.setStroke('black');
            }
            this.setStroke('red');
            selectedDot = this;
            var x = this.getAbsolutePosition().x;
            var y = this.getAbsolutePosition().y;

            var line = new Kinetic.Line({            
                points: [x, y, x, y],
                strokeWidth: 1,
                stroke: "green",
            });
            lines.add(line);
            line.setAttr("origin", this.parent);

            draggingLine = true;
            dragLine = line;
            

            e.cancelBubble = true;
        });
        node.add(connectDot);

        // Set the value text
        var valueText = new Kinetic.Text({
            x: 20,
            y: 15,
            text: 0,
            fontSize: '20',
            fontFamily: 'Calibri',
            fill: 'black'
        });
        valueText.on('click', function() {
            var number = prompt("Node data: ", "");
            node.setAttr("value", number);
            this.setText(number);
            animLayer.draw();
        });
        node.add(valueText);

        // Add node to group and layer
        nodes.add(node);
        animLayer.add(node);
    }

    function writeMessage(message) {
        text.setText(message);
        staticLayer.draw();
    }

    pub.init = init;
    function init(){
        stage = new Kinetic.Stage({
            container: "dsd_block",
            width: 700,
            height: 375
        });

        animLayer = new Kinetic.Layer();
        staticLayer = new Kinetic.Layer();

        nodes = new Kinetic.Group();
        noNodes = 0;
        selectedDot = null;

        lines = new Kinetic.Group();
        draggingLine = false;
        dragLine = null;
        dragOriginNode = null;

        text = new Kinetic.Text({
            x: 10,
            y: 10,
            text: 'Static Layer',
            fontSize: '30',
            fontFamily: 'Calibri',
            fill: 'black'
        });
        background = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: stage.width(),
            height: stage.height(),
            fill: '#888888',
            stroke: 'black',
            strokeWidth: 4
        });
        background.on('mousemove', function() {
            var mousePos = stage.getPointerPosition();
            var x = mousePos.x;
            var y = mousePos.y;
            writeMessage('x: ' + x + ', y: ' + y);
            if(draggingLine){
                var x1 = dragLine.points()[0]
                var y1 = dragLine.points()[1]
                dragLine.points([x1, y1, x, y]);
                animLayer.draw();
            }
        });
        background.on('mouseup', function(){
            if(draggingLine){
                selectedDot.setStroke('black');
                dragLine.destroy();
                resetDragLine();
            }
        })
        background.on('click', function() {
            var mousePos = stage.getPointerPosition();
            var x = mousePos.x;
            var y = mousePos.y;
            
            addNode(x, y, null);
        });

        animLayer.add(background);
        animLayer.add(lines);
        staticLayer.add(text);
        stage.add(animLayer).add(staticLayer);
        stage.getContainer().addEventListener('mousedown', function(evt) {});

        var anim = new Kinetic.Animation(function(frame) {}, animLayer);
        anim.start();
    }

    return pub;    
}());


