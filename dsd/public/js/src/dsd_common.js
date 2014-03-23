var dsd = (function(){
    // Public methods and properties
    var pub = {};

    var stage;
    var animLayer;
    var staticLayer;
    var connector;
    var dunkeys;
    var nodunkeys;
    var lines;
    var bluehex;
    var yellowhex;
    var redhex;
    var text;
    var background; 
    var dunkeyimg;
    var valuetext;
    var connectDot;
    var anim;

    /* Public functions */
    pub.writeMessage = writeMessage;
    function writeMessage(message) {
        text.setText(message);
        staticLayer.draw();
    }

    pub.init = init;
    function init(){
        stage = new Kinetic.Stage({
            container: "dsd_block",
            width: 800,
            height: 500
        });
        animLayer = new Kinetic.Layer();
        staticLayer = new Kinetic.Layer();
        connector = null;
        dunkeys = new Kinetic.Group({});
        lines = new Kinetic.Group({});
        nodunkeys = 0;
        blueHex = new Kinetic.RegularPolygon({
            x: stage.width()/2,
            y: stage.height()/2,
            sides: 6,
            radius: 70,
            fill: '#00D2FF',
            stroke: 'black',
            strokeWidth: 4,
            draggable: true
        });
        yellowHex = new Kinetic.RegularPolygon({
            x: stage.width()/2,
            y: stage.height()/2,
            sides: 6,
            radius: 70,
            fill: 'yellow',
            stroke: 'black',
            strokeWidth: 4,
            draggable: true
        });
        redHex = new Kinetic.RegularPolygon({
            x: 470,
            y: stage.height()/2,
            sides: 6,
            radius: 70,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4,
            offset: {
              x: 70,
              y: 0
            },
            draggable: true
        });
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
        });
        background.on('click', function() {
            var mousePos = stage.getPointerPosition();
            var x = mousePos.x;
            var y = mousePos.y;
            
            var newDunkey = new Kinetic.Image({
                x: mousePos.x,
                y: mousePos.y,
                height: 50,
                width: 80,
                value: 0,
                image: dunkeyimg,
                id: nodunkeys,
                connected: false,
                recievingfrom: null,
                goingto: null,
                draggable: true, 
            });

            dunkeys.add(newDunkey);
            newDunkey.on('dragmove', function() {
                connectDot.setX(newDunkey.getX() + 80);
                connectDot.setY(newDunkey.getY() + 25);
                valueText.setX(newDunkey.getX() + 20);
                valueText.setY(newDunkey.getY() + 15);
            });
            
            newDunkey.on('click', function() {
                var nodelist = [];
                nodelist.push(this.getAttr('value'));
                var nextNode = this.getAttr('goingto');
                while(nextNode != null)
                {
                    nodelist.push(dunkeys.getChildren()[nextNode].getAttr('value'));
                    var nextNode = dunkeys.getChildren()[nextNode].getAttr('goingto');
                }
                
                alert(nodelist.toString());
                
            });
            dunkeyimg = new Image();
            dunkeyimg.src = '/xblock/resource/dsd/public/img/SingleNode.jpg';
            valueText = new Kinetic.Text({
                x: mousePos.x + 20,
                y: mousePos.y + 15,
                text: dunkeys.getChildren()[nodunkeys].getAttr('value'),
                pointer: nodunkeys,
                fontSize: '20',
                fontFamily: 'Calibri',
                fill: 'black'
            });
            valueText.on('click', function() {
                var number = prompt("Node data: ", "");
                dunkeys.getChildren()[this.getAttr('pointer')].setAttr('value', number);
                this.setText(number);
                animLayer.draw();
            });
            connectDot = new Kinetic.Circle({
                x: mousePos.x+80,
                y: mousePos.y+25,
                radius: 5,
                fill: 'blue',
                id: nodunkeys,
                connect: null,
                stroke: 'black',
                strokeWidth: 2, 
                dunkey: newDunkey
            });
            nodunkeys += 1;
            connectDot.on('click', function() {
            
                if(connector == null)
                {
                    connectDot.setStroke('red');
                    connector = connectDot;
                }
                
                else if(connector == connectDot)
                {
                    connectDot.setStroke('black');
                    connector = null;
                }
                
                else
                {
                    var connectline = new Kinetic.Line({
                        points: [dunkeys.getChildren()[connectDot.getAttr('id')].getPosition().x, dunkeys.getChildren()[connectDot.getAttr('id')].getPosition().y + 25, dunkeys.getChildren()[connector.getAttr('id')].getPosition().x + 80, dunkeys.getChildren()[connector.getAttr('id')].getPosition().y + 25],
                        stroke: 'yellow',
                        from: connector.getAttr('id'),
                        to: connectDot.getAttr('id'),
                        strokeWidth: 4
                    });
                    
                    connectline.on('click', function(){
                    
                        dunkeys.getChildren()[this.getAttr('from')].setAttr('goingto', null);
                        dunkeys.getChildren()[this.getAttr('to')].setAttr('revievingfrom', null);
                        this.destroy();
                    
                    });
                    
                    //connector.setAttr('connect', connectDot.getAttr('id'));
                    //connectDot.setAttr('connect', connector.getAttr('id'));
                    dunkeys.getChildren()[connector.getAttr('id')].setAttr('goingto', connectDot.getAttr('id'));
                    dunkeys.getChildren()[connectDot.getAttr('id')].setAttr('recievingfrom', connector.getAttr('id'));
                    
                    dunkeys.getChildren()[connectDot.getAttr('id')].on('dragmove', function() {
                    
                        connectline.setPoints([this.getPosition().x, this.getPosition().y + 25, dunkeys.getChildren()[this.getAttr('recievingfrom')].getPosition().x + 80, dunkeys.getChildren()[this.getAttr('recievingfrom')].getPosition().y + 25]);
                    
                    });
                    
                    dunkeys.getChildren()[connector.getAttr('id')].on('dragmove', function() {
                    
                        connectline.setPoints([this.getPosition().x + 80, this.getPosition().y + 25, dunkeys.getChildren()[this.getAttr('goingto')].getPosition().x, dunkeys.getChildren()[this.getAttr('goingto')].getPosition().y + 25]);
                    
                    });
                    
                    animLayer.add(connectline);
                    connector.setStroke('black');
                    connector = null;
                }
            });
            animLayer.add(newDunkey);
            animLayer.add(connectDot);
            animLayer.add(valueText);
        });
        animLayer.add(background);
        staticLayer.add(text);
        stage.add(animLayer).add(staticLayer);
        stage.getContainer().addEventListener('mousedown', function(evt) {});

        var period = 2000;
        anim = new Kinetic.Animation(function(frame) {
            var scale = Math.sin(frame.time * 2 * Math.PI / period) + 0.001;
            // scale x and y
            blueHex.scale({x:scale, y:scale});
            // scale only x
            yellowHex.scale({x:1, y:scale});
            // scale only y
            redHex.scale({x:scale, y: 1});
        }, animLayer);

        anim.start();
    }

    return pub;    
}());


