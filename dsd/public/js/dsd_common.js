var dsd = (function(){
    var g = {}; // Global settings
    var pub = {}; // Public variables and functions

    var stage;
    var mainLayer;

    var urlPrefix;
    /*
     *  init(runtime, element)
     *  - Initializes DSD application
     *  - runtime/element are required for edx studio integration
     */
    pub.init = init;
    function init(runtime, element){
        g.runtime = runtime;
        g.element = element;
        getUrlPrefix();
        loadStage();
    }
    
    /*
     *  urlPrefix()
     *  - Gets the URL prefix for the runtime to be used when
     *  - referencing static content (i.e. images)
     */
    function getUrlPrefix(){
        var handlerUrl = g.runtime.handlerUrl(g.element, 'url_prefix');
        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: JSON.stringify({"hello": "world"}),
            async: false,
        }).done(function(data){
            console.log(data);
            urlPrefix = data;
        });
    }

    /*
     *  loadStage()
     *  - Loads and builds the stage from the XBlock backend. If no
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
            if(data){
                buildStage(data);
            } else {
                blankStage();
            }
        });
    }

    /*
     *  buildStage(data)
     *  - Re-builds an existing stage from data
     */
    function buildStage(data){
        // Rebuild an existing ribbon
        function buildRibbon(){
            var saveImageObj = new Image();
            saveImageObj.onload = function(){
                console.log(stage.get(".save-image"));
                stage.get(".save-image")[0].image(saveImageObj);
                stage.get(".save-image")[0].on("click", function(e){
                    saveStage();
                });
                stage.draw();
            }
            saveImageObj.src = urlPrefix + 'public/img/floppy.png';
        }

        stage = Kinetic.Node.create(JSON.stringify(data), "dsd_block");
        buildRibbon();
    }

    /*
     *  blankStage()
     *  - Creates a default, blank stage
     */
    function blankStage(){
        // Add a ribbon to a blank stage
        function addRibbon(){
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
                strokeWidth: 0,
                name: "ribbon-background"
            });

            var saveImageObj = new Image();
            saveImageObj.onload = function(){
                var saveImage = new Kinetic.Image({
                    x: 15,
                    y: 2.5,
                    height: 25,
                    width: 25,
                    image: saveImageObj,
                    name: "save-image",
                });
                saveImage.on("click", function(e){
                    saveStage();
                });
                stage.find(".ribbon").add(saveImage);   
                stage.draw();
            }
            saveImageObj.src = urlPrefix + 'public/img/floppy.png';
        
            ribbon.add(background);
            mainLayer.add(ribbon);
        }

        stage = new Kinetic.Stage({
            container: "dsd_block",
            width: 700,
            height: 375,
        });

        mainLayer = new Kinetic.Layer({
            name:"animLayer",
        });

        addRibbon();
        stage.add(mainLayer);
    }

    /*
     *  saveStage()
     *  - Saves a stage to the xblock backend
     */
    function saveStage(){
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


    return pub;
}());


// var dsd = (function(){
//     var g = {}; // Globals
//     var pub = {}; // Add functions to pub to make them public

//     var stage;

//     var animLayer;
//     var staticLayer;

//     var lines;
//     var background; 

//     var nodes;
//     var noNodes;  

//     var connectDots;      
//     var selectedDot;

//     var draggingLine;
//     var dragLine;

//     var ribbon;

//     /*
//      *  drawRibbon()
//      *  - Draws the top most ribbon
//      */
//     function drawRibbon(){
//         var ribbonHeight = 30;

//         var ribbon = new Kinetic.Group({
//             x: 0,
//             y: 0,
//             width: stage.width(),
//             height: ribbonHeight,
//             name: "ribbon",
//         });

//         var background = new Kinetic.Rect({
//             x: 0,
//             y: 0,
//             width: stage.width(),
//             height: ribbonHeight,
//             fill: '#dddddd',
//             strokeWidth: 0
//         });

//         var saveImage = new Image();
//         saveImage.src = '/xblock/resource/dsd/public/img/floppy.png';
//         var saveIcon = new Kinetic.Image({
//             x: 15,
//             y: 2.5,
//             height: 25,
//             width: 25,
//             image: saveImage,
//         });
//         saveIcon.on("click", function(e){
//             saveStage();
//         });

//         ribbon.add(background);
//         ribbon.add(saveIcon);
//         animLayer.add(ribbon);
//     }

//     /*
//      *  backgroundListeners()
//      *  - Listeners for background
//      */
//     function backgroundListeners(){
//         background.on("click", backgroundMouseClick);
//         background.on("mousemove", backgroundMouseMove);
//         background.on("mouseup", backgroundMouseUp);
//     }

//     function backgroundMouseClick(e){
//         var mousePos = stage.getPointerPosition();
//         var x = mousePos.x;
//         var y = mousePos.y;
            
//         addNode(x, y, null);
//         stage.draw();
//     }

//     function backgroundMouseMove(e){
//         if(draggingLine){
//             var mousePos = stage.getPointerPosition();
//             var x1 = dragLine.points()[0]
//             var y1 = dragLine.points()[1]
//             dragLine.points([x1, y1, mousePos.x, mousePos.y]);
//             stage.draw();
//         }
//     }

//     function backgroundMouseUp(e){
//         if(draggingLine){
//             selectedDot.setStroke('black');
//             dragLine.destroy();
//             resetDragLine();
//         }
//     }

//     /*
//      *  nodeListeners()
//      *  - Listeners for node
//      */
//     function nodeListeners(){
//         for(var i=0; i<nodes.length;i++){
//             nodes[i].on('mouseup', nodeMouseUp);
//             nodes[i].on('dragmove', nodeDragMove);
//         }
//     }

//     function nodeMouseUp(e){
//         if(draggingLine){
//             var cd = this.find('.connectDot')[0]
//             var x1 = dragLine.points()[0];
//             var y1 = dragLine.points()[1];
//             var x2 = cd.getAbsolutePosition().x;
//             var y2 = cd.getAbsolutePosition().y;
//             dragLine.points([x1, y1, x2, y2]);
//             dragLine.setAttr("destination", this);
//             resetDragLine();
//             e.cancelBubble = true;
//         }
//     }

//     function nodeDragMove(e){
//         updateLines();
//     }

//     /*
//      *  connectDotListeners()
//      *  - Listener for connectDot
//      */
//     function connectDotListeners(){
//         for(var i=0; i<connectDots.length;i++){
//             connectDots[i].on('mousedown', connectDotMouseDown);
//         }
//     }

//     function connectDotMouseDown(e){
//         if(selectedDot != null){
//             selectedDot.setStroke('black');
//         }
//         this.setStroke('red');
//         selectedDot = this;
//         var x = this.getAbsolutePosition().x;
//         var y = this.getAbsolutePosition().y;

//         var line = new Kinetic.Line({            
//             points: [x, y, x, y],
//             strokeWidth: 1,
//             stroke: "green",
//             name: "line",
//         });
//         lines.add(line);
//         line.setAttr("origin", this.parent);

//         draggingLine = true;
//         dragLine = line;
//         e.cancelBubble = true;
//     }

//     /*
//      *  updateListeners()
//      *  - updates all event listeners
//      */
//     function updateListeners(){
//         backgroundListeners();
//         nodeListeners();
//         connectDotListeners();
//     }

//     function updateLines(){
//         lines.children.each(function(line){
//             var origin = line.getAttr("origin").find('.connectDot')[0].getAbsolutePosition();
//             var destination = line.getAttr("destination").find('.connectDot')[0].getAbsolutePosition();
//             line.points([origin.x, origin.y, destination.x, destination.y]);
//         });
//     }

//     function resetDragLine(){
//         draggingLine = false;
//         dragLine = null;
//     }

//     function addNode(posX, posY, type){
//         // Node dimensions
//         var nodeDim = { width:80, height: 50 };

//         // Create the node
//         var node = new Kinetic.Group({
//             x: posX - nodeDim.width / 2,
//             y: posY - nodeDim.height / 2,
//             draggable: true,
//             id: noNodes,
//             value: 0,
//             name: "node",
//         });
//         node.on('mouseup', nodeMouseUp);
//         node.on('dragmove', nodeDragMove);
//         noNodes += 1;

//         // Set the node background
//         // --- Images are annoying!
//         // var nodeImg = new Image();
//         // nodeImg.src = '/xblock/resource/dsd/public/img/SingleNode.jpg';
//         // var nodeBackground = new Kinetic.Image({
//         //     x: 0,
//         //     y: 0,
//         //     height: nodeDim.height,
//         //     width: nodeDim.width,
//         //     image: nodeImg,
//         // });
//         var nodeBackground = new Kinetic.Rect({
//             x: 0,
//             y: 0,
//             height: nodeDim.height,
//             width: nodeDim.width,
//             fill: '#ffffff',
//             stroke: "#000000",
//             strokeWidth: 1,
//         });
//         nodeBackground.moveToBottom();
        
//         // Set the node connector dot
//         var dotRadius = 5;
//         var connectDot = new Kinetic.Circle({
//             x: nodeDim.width - dotRadius /2,
//             y: nodeDim.height / 2,
//             radius: dotRadius,
//             fill: 'blue',
//             stroke: 'black',
//             strokeWidth: 2,
//             draggable: false,
//             name: "connectDot",
//         });
//         connectDot.on('mousedown', connectDotMouseDown);
        
//         // Set the value text
//         var valueText = new Kinetic.Text({
//             x: 20,
//             y: 15,
//             text: 0,
//             fontSize: '20',
//             fontFamily: 'Calibri',
//             fill: 'black'
//         });
//         valueText.on('click', function() {
//             var number = prompt("Node data: ", "");
//             node.setAttr("value", number);
//             this.setText(number);
//             animLayer.draw();
//         });

//         node.add(nodeBackground);
//         node.add(connectDot);
//         node.add(valueText);

//         nodes.push(node);
//         connectDots.push(connectDot);

//         animLayer.add(node);
//     }

//     function writeMessage(message) {
//         text.setText(message);
//         staticLayer.draw();
//     }

//     function blankStage(){
//         stage = new Kinetic.Stage({
//             container: "dsd_block",
//             width: 700,
//             height: 375
//         });

//         animLayer = new Kinetic.Layer({name:"animLayer"});
//         staticLayer = new Kinetic.Layer({name:"staticLayer"});

//         nodes = new Kinetic.Collection();
//         connectDots = new Kinetic.Collection();

//         noNodes = 0;
//         selectedDot = null;

//         lines = new Kinetic.Group({name:"lines"});
//         draggingLine = false;
//         dragLine = null;
//         dragOriginNode = null;

//         background = new Kinetic.Rect({
//             x: 0,
//             y: 0,
//             width: stage.width(),
//             height: stage.height(),
//             fill: '#888888',
//             stroke: 'black',
//             strokeWidth: 4,
//             name: "background"
//         });
//         background.moveToBottom();
//         background.on('mousemove', backgroundMouseMove);
//         background.on('mouseup', backgroundMouseUp);
//         background.on('click', backgroundMouseClick);

//         animLayer.add(background);
//         animLayer.add(lines);
//         stage.add(animLayer).add(staticLayer);
//         stage.getContainer().addEventListener('mousedown', function(evt) {});

//         var anim = new Kinetic.Animation(function(frame) {}, animLayer);
//         anim.start();

//         drawRibbon();
//     }


//     /*
//      *  loadVariables()
//      *  - load variables to current js context
//      */
//     function loadVariables(){
//         // animLayer
//         animLayer = stage.find(".animLayer")[0];

//         l = stage.find(".line");
//         console.log(l);
//         l.each(function(line, idx){
//             line.setAttr("origin", Kinetic.Node.create(line.getAttr("origin")));
//             line.setAttr("destination", Kinetic.Node.create(line.getAttr("destination")));
//             lines.add(line);
//         });

//         nodes = stage.find(".node");
//         noNodes = nodes.length;

//         selectedDot = null;
//         connectDots = stage.find(".connectDot");
//         for(var i=0; i<connectDots.length;i++){
//             connectDots[i].setStroke("black");
//         }

//         background = stage.find(".background")[0];
//     }

//     /*
//      *  loadStage()
//      *  - Loads and sets the stage from the XBlock backend. If no
//      *  - stage is found then an blank stage is created
//      */
//     function loadStage(){
//         var handlerUrl = g.runtime.handlerUrl(g.element, 'get_stage');
//         $.ajax({
//             type: "POST",
//             url: handlerUrl,
//             data: JSON.stringify({"hello": "world"}),
//             async: false,
//         }).done(function(data){
//             blankStage();

//             if(data){
//                 stage = Kinetic.Node.create(JSON.stringify(data), "dsd_block");
//                 loadVariables();
//                 updateListeners();
//                 stage.draw();
//             }
//         });
//     }

//     /*
//      *  saveStage()
//      *  - Saves the stage to the XBlock backend. This is the
//      *  - equivalent of a student saving their answer.
//      */
//     function saveStage(){
//         var url = g.runtime.handlerUrl(g.element, 'save_stage');
//         $.ajax({
//             type: "POST",
//             url: url,
//             data: stage.toJSON(),
//             async: false,
//             success: function(data, textStatus, jqXHR){
//                 alert("Data saved!");
//             }
//         });
//     }
//     /*
//      * Public functions
//      * - The functions are accessible via dsd.<func_name>
//      * e.g. dsd.init() will initialize this application
//      *
//      */
//     pub.init = init;
//     function init(runtime, element){
//         g.runtime = runtime;
//         g.element = element;

//         loadStage();
//     }

//     pub.stage = function(){
//         return stage;
//     }

//     pub.nodes = function(){
//         return nodes;
//     }

//     pub.lines = function(){
//         return lines;
//     }

//     return pub; 
// }());