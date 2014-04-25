var dsd = (function(){
    var g = {}; // Globals
    var pub = {}; // Add functions to pub to make them public

    var stage;
    var animLayer;
    var staticLayer;

    var lines;
    var background; 

    var nodes;
    var connectDots;      
    var noNodes;   
    var selectedDot;

    var draggingLine;
    var dragLine;

    var ribbon;

    /*
     *  saveStage()
     *  - Saves the stage to the XBlock backend. This is the
     *  - equivalent of a student saving their answer.
     */
    function saveStage(){        
        saveVariables();

        var url = g.runtime.handlerUrl(g.element, 'save_stage');
        $.ajax({
            type: "POST",
            url: url,
            data: stage.toJSON(),
            async: false,
            success: function(data, textStatus, jqXHR){
                alert("Data saved!");
            }
        });
    }

    /*
     *  drawRibbon()
     *  - Draws the top most ribbon
     */
    function drawRibbon(){
        var ribbonHeight = 30;

        var ribbon = new Kinetic.Group({
            x: 0,
            y: 0,
            width: stage.width(),
            height: ribbonHeight,
            name: "ribbon",
        });

        var background = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: stage.width(),
            height: ribbonHeight,
            fill: '#dddddd',
            strokeWidth: 0
        });

        var saveImage = new Image();
        saveImage.src = '/xblock/resource/dsd/public/img/floppy.png';
        var saveIcon = new Kinetic.Image({
            x: 15,
            y: 2.5,
            height: 25,
            width: 25,
            image: saveImage,
        });
        saveIcon.on("click", function(e){
            saveStage();
        });

        ribbon.add(background);
        ribbon.add(saveIcon);
        animLayer.add(ribbon);
    }

    

    /*
     *  backgroundListeners()
     *  - Listener for background
     */
    function backgroundListeners(){
        background.on("click", backgroundMouseClick);
    }

    function backgroundMouseClick(e){
        var mousePos = stage.getPointerPosition();
        var x = mousePos.x;
        var y = mousePos.y;
            
        addNode(x, y, null);
        stage.draw();
    }
    /*
     *  connectDotListener()
     *  - Listener for connectDot
     */
    function connectDotListener(e){
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
            name: "line",
        });
        lines.add(line);
        line.setAttr("origin", this.parent);

        draggingLine = true;
        dragLine = line;
        e.cancelBubble = true;
        stage.draw();
    }

    /*
     *  updateListeners()
     *  - updates all event listeners
     */
    function updateListeners(){
        for(var i=0; i<connectDots.length;i++){
            connectDots[i].on('mousedown', connectDotListener);
        }
        backgroundListeners();
    }

    function updateLines(){
        lines.children.each(function(line, index){
            var origin = line.getAttr("origin").find('.connectDot')[0].getAbsolutePosition();
            var destination = line.getAttr("destination").find('.connectDot')[0].getAbsolutePosition();
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
        // --- Images are annoying!
        // var nodeImg = new Image();
        // nodeImg.src = '/xblock/resource/dsd/public/img/SingleNode.jpg';
        // var nodeBackground = new Kinetic.Image({
        //     x: 0,
        //     y: 0,
        //     height: nodeDim.height,
        //     width: nodeDim.width,
        //     image: nodeImg,
        // });
        var nodeBackground = new Kinetic.Rect({
            x: 0,
            y: 0,
            height: nodeDim.height,
            width: nodeDim.width,
            fill: '#ffffff',
            stroke: "#000000",
            strokeWidth: 1,
        });
        nodeBackground.moveToBottom();
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
        connectDot.on('mousedown', connectDotListener);
        connectDots.push(connectDot);

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

    function blankStage(){
        stage = new Kinetic.Stage({
            container: "dsd_block",
            width: 700,
            height: 375
        });

        animLayer = new Kinetic.Layer({name:"animLayer"});
        staticLayer = new Kinetic.Layer({name:"staticLayer"});

        nodes = new Kinetic.Group();
        connectDots = new Kinetic.Collection();
        noNodes = 0;
        selectedDot = null;

        lines = new Kinetic.Group();
        draggingLine = false;
        dragLine = null;
        dragOriginNode = null;

        background = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: stage.width(),
            height: stage.height(),
            fill: '#888888',
            stroke: 'black',
            strokeWidth: 4,
            name: "background"
        });
        background.on('mousemove', function() {
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
        });
        background.on('click', backgroundMouseClick);

        animLayer.add(background);
        animLayer.add(lines);
        stage.add(animLayer).add(staticLayer);
        stage.getContainer().addEventListener('mousedown', function(evt) {});

        var anim = new Kinetic.Animation(function(frame) {}, animLayer);
        anim.start();

        drawRibbon();
    }


    /*
     *  loadVariables()
     *  - load variables to stage
     */
    function loadVariables(){
        // animLayer
        console.log(stage.find(".animLayer"));
        animLayer = stage.find(".animLayer")[0];

        l = stage.find(".line");
        lines = new Kinetic.Group();
        for(var i=0; i<l.length; i++){
            lines.add(l[i]);
        }

        selectedDot = null;
        connectDots = stage.find(".connectDot");
        for(var i=0; i<connectDots.length;i++){
            connectDots[i].on("mousedown", connectDotListener);
            connectDots[i].setStroke("black");
        }

        background = stage.find(".background")[0];
    }

    /*
     *  loadStage()
     *  - Loads and sets the stage from the XBlock backend. If no
     *  - stage is found then an blank stage is created
     */
    function loadStage(){
        var handlerUrl = g.runtime.handlerUrl(g.element, 'get_stage');
        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: JSON.stringify({"hello": "world"}),
            async: false,
        }).done(function(data){
            blankStage();

            if(data){
                stage = Kinetic.Node.create(JSON.stringify(data), "dsd_block");
                loadVariables();
                updateListeners();
                stage.draw();
            }
        });

    }

    pub.init = init;
    function init(runtime, element){
        g.runtime = runtime;
        g.element = element;

        loadStage();
    }

    pub.stage = function(){
        return stage;
    }

    pub.nodes = function(){
        return nodes;
    }

    pub.lines = function(){
        return lines;
    }

    return pub; 
}());


