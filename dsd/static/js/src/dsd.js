/* Javascript for DsdXBlock. */
function DsdXBlock(runtime, element) {

    function updateCount(result) {
        $('.count', element).text(result.count);
    }

    var handlerUrl = runtime.handlerUrl(element, 'increment_count');

    $('p', element).click(function(eventObject) {
        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: JSON.stringify({"hello": "world"}),
            success: updateCount
        });
    });

    $(function ($) {
            
      function writeMessage(message) {
        //text.setText(message);
        staticLayer.draw();
      }
      
      var Ralph = 0;
      var Daniel = 28;
      var George = 22; 
      var Jin = 21;
      
      var text = new Kinetic.Text({
        x: 10,
        y: 10,
        //text: 'Static Layer',
        fontSize: '30',
        fontFamily: 'Calibri',
        fill: 'black'
      });
      
      var stage = new Kinetic.Stage({
        container: 'dsd_block',
        width: 800,
        height: 500
      });
      var animLayer = new Kinetic.Layer();
      var staticLayer = new Kinetic.Layer();

      var selectbackground = new Kinetic.Rect({
        x: 0,
        y: 0,
        width: 200, 
        height: stage.height(),
        fill: '#555555',
        stroke: 'black',
        strokeWidth: 4
      });
      
      selectbackground.on('mousemove', function() {
        var mousePos = stage.getPointerPosition();
        var x = mousePos.x;
        var y = mousePos.y;
        writeMessage('x: ' + x + ', y: ' + y + ', Ralph: '+ Ralph);
      });
      
      selectbackground.on('click', function() {
        Ralph = 0;
      });
      
        var background = new Kinetic.Rect({
        x: 200,
        y: 0,
        width: 600,
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
            
            if(Ralph == 1){
            
            var newgroup = new Kinetic.Group({
                draggable: true
            });
            var singleNodeA = new Kinetic.Rect({
                x: mousePos.x - 25,
                y: mousePos.y - 25,
                width: 75,
                height: 50,
                fill: '#00D2FF',
                stroke: 'black',
                strokeWidth: 4
                //draggable: true
            });
            
            var singleNodeB = new Kinetic.Rect({
                x: mousePos.x + 50,
                y: mousePos.y - 25,
                width: 25,
                height: 50,
                fill: '#00D2FF',
                stroke: 'black',
                strokeWidth: 4
                //draggable: true
            });
            
            var dataText = new Kinetic.Text({
                x: mousePos.x + 15,
                y: mousePos.y - 10,
                text: Daniel,
                fontSize: '20',
                fontFamily: 'Calibri',
                fill: 'black'
            });
            
            dataText.on('click', function() {
            
            var number = prompt("Node data: ", "");
            this.setText(number);
            animLayer.draw();
            });
            
            var connecText = new Kinetic.Text({
                x: mousePos.x + 57.5,
                y: mousePos.y - 10,
                text: '/',
                fontSize: '20',
                fontFamily: 'Calibri',
                fill: 'black'
            });
            
            connecText.on('click', function() {
            
            var number = prompt("Node data: ", "");
            this.setText(number);
            animLayer.draw();
            });
            
            newgroup.add(singleNodeA);
            newgroup.add(singleNodeB);
            newgroup.add(dataText);
            newgroup.add(connecText);
            animLayer.add(newgroup);
            }
            
            if(Ralph == 2){
            
            var newgroup = new Kinetic.Group({
                draggable: true
            });
            var doubleNodeA = new Kinetic.Rect({
                x: mousePos.x,
                y: mousePos.y - 25,
                width: 50,
                height: 50,
                fill: 'red',
                stroke: 'black',
                strokeWidth: 4
                //draggable: true
            });
            
            var doubleNodeB = new Kinetic.Rect({
                x: mousePos.x + 50,
                y: mousePos.y - 25,
                width: 25,
                height: 50,
                fill: 'red',
                stroke: 'black',
                strokeWidth: 4
                //draggable: true
            });
            
            var doubleNodeC = new Kinetic.Rect({
                x: mousePos.x - 25,
                y: mousePos.y - 25,
                width: 25,
                height: 50,
                fill: 'red',
                stroke: 'black',
                strokeWidth: 4
                //draggable: true
            });
            
            var dataText = new Kinetic.Text({
                x: mousePos.x + 15,
                y: mousePos.y - 10,
                text: Jin,
                fontSize: '20',
                fontFamily: 'Calibri',
                fill: 'black'
            });
            
            dataText.on('click', function() {
            
            var number = prompt("Node data: ", "");
            this.setText(number);
            animLayer.draw();
            });
            
            var connecText1 = new Kinetic.Text({
                x: mousePos.x + 57.5,
                y: mousePos.y - 10,
                text: '/',
                fontSize: '20',
                fontFamily: 'Calibri',
                fill: 'black'
            });
            
            connecText1.on('click', function() {
            
            var number = prompt("Node data: ", "");
            this.setText(number);
            animLayer.draw();
            });

            var connecText2 = new Kinetic.Text({
                x: mousePos.x - 17.5,
                y: mousePos.y - 10,
                text: '/',
                fontSize: '20',
                fontFamily: 'Calibri',
                fill: 'black'
            });
            
            connecText2.on('click', function() {
            
            var number = prompt("Node data: ", "");
            this.setText(number);
            animLayer.draw();
            });
            
            newgroup.add(doubleNodeA);
            newgroup.add(doubleNodeB);
            newgroup.add(doubleNodeC);
            newgroup.add(dataText);
            newgroup.add(connecText1);
            newgroup.add(connecText2);
            animLayer.add(newgroup);
            }
            
            if(Ralph == 3){
            var newgroup = new Kinetic.Group({
                draggable: true
            });
            var topRec = new Kinetic.Rect({
            
                x: mousePos.x - 37.5,
                y: mousePos.y - 25,
                width: 75,
                height: 25,
                fill: 'green',
                stroke: 'black',
                strokeWidth: 4
            
            });
            
            var botLeftRec = new Kinetic.Rect({
            
                x: mousePos.x - 37.5,
                y: mousePos.y,
                width: 37.5,
                height: 25,
                fill: 'green',
                stroke: 'black',
                strokeWidth: 4
            
            });
            
            var botRightRec = new Kinetic.Rect({
            
                x: mousePos.x,
                y: mousePos.y,
                width: 37.5,
                height: 25,
                fill: 'green',
                stroke: 'black',
                strokeWidth: 4
            
            });
            
            var dataText = new Kinetic.Text({
                x: mousePos.x - 10,
                y: mousePos.y - 22.5,
                text: George,
                fontSize: '20',
                fontFamily: 'Calibri',
                fill: 'black'
                //draggable: true
            });
            
            dataText.on('click', function() {
            
            var number = prompt("Node data: ", "");
            this.setText(number);
            animLayer.draw();
            });

            var lefText = new Kinetic.Text({
                x: mousePos.x - 22.5,
                y: mousePos.y + 2,
                text: '/',
                fontSize: '20',
                fontFamily: 'Calibri',
                fill: 'black'
                //draggable: true
            });
            
            lefText.on('click', function() {
            
            var number = prompt("Node data: ", "");
            this.setText(number);
            animLayer.draw();
            });
            
            var righText = new Kinetic.Text({
                x: mousePos.x + 15,
                y: mousePos.y + 2,
                text: '/',
                fontSize: '20',
                fontFamily: 'Calibri',
                fill: 'black'
                //draggable: true
            });
            
            righText.on('click', function() {
            
            var number = prompt("Node data: ", "");
            this.setText(number);
            animLayer.draw();
            });
            
            newgroup.add(topRec);
            newgroup.add(botLeftRec);
            newgroup.add(botRightRec);
            newgroup.add(dataText);
            newgroup.add(lefText);
            newgroup.add(righText);
            animLayer.add(newgroup);
            }
      });
            var bluegroup = new Kinetic.Group({
            });
            var singleNodeA = new Kinetic.Rect({
                x: 100 - 50,
                y: 100 - 25,
                width: 75,
                height: 50,
                fill: '#00D2FF',
                stroke: 'black',
                strokeWidth: 4
                //draggable: true
            });
            
            var singleNodeB = new Kinetic.Rect({
                x: 100 + 25,
                y: 100 - 25,
                width: 25,
                height: 50,
                fill: '#00D2FF',
                stroke: 'black',
                strokeWidth: 4
                //draggable: true
            });
            
            var dataText = new Kinetic.Text({
                x: 100 - 10,
                y: 100 - 10,
                text: Daniel,
                fontSize: '20',
                fontFamily: 'Calibri',
                fill: 'black'
            });
            
            var connecText = new Kinetic.Text({
                x: 100 + 32.5,
                y: 100 - 10,
                text: '/',
                fontSize: '20',
                fontFamily: 'Calibri',
                fill: 'black'
            });
            
        bluegroup.on('click', function() {
            Ralph = 1;
      });
            
            bluegroup.add(singleNodeA);
            bluegroup.add(singleNodeB);
            bluegroup.add(dataText);
            bluegroup.add(connecText);
            
            
            var redgroup = new Kinetic.Group({
            });
            var doubleNodeA = new Kinetic.Rect({
                x: 75,
                y: 200 - 25,
                width: 50,
                height: 50,
                fill: 'red',
                stroke: 'black',
                strokeWidth: 4
                //draggable: true
            });
            
            var doubleNodeB = new Kinetic.Rect({
                x: 75 + 50,
                y: 200 - 25,
                width: 25,
                height: 50,
                fill: 'red',
                stroke: 'black',
                strokeWidth: 4
                //draggable: true
            });
            
            var doubleNodeC = new Kinetic.Rect({
                x: 75 - 25,
                y: 200 - 25,
                width: 25,
                height: 50,
                fill: 'red',
                stroke: 'black',
                strokeWidth: 4
                //draggable: true
            });
            
            var dataText = new Kinetic.Text({
                x: 75 + 15,
                y: 200 - 10,
                text: Jin,
                fontSize: '20',
                fontFamily: 'Calibri',
                fill: 'black'
            });
            
            var connecText1 = new Kinetic.Text({
                x: 75 + 57.5,
                y: 200 - 10,
                text: '/',
                fontSize: '20',
                fontFamily: 'Calibri',
                fill: 'black'
            });

            var connecText2 = new Kinetic.Text({
                x: 75 - 17.5,
                y: 200 - 10,
                text: '/',
                fontSize: '20',
                fontFamily: 'Calibri',
                fill: 'black'
            });
            
            redgroup.add(doubleNodeA);
            redgroup.add(doubleNodeB);
            redgroup.add(doubleNodeC);
            redgroup.add(dataText);
            redgroup.add(connecText1);
            redgroup.add(connecText2);
      
        redgroup.on('click', function() {
            Ralph = 2;
      });
      
            var greengroup = new Kinetic.Group({
            });
            var topRec = new Kinetic.Rect({
            
                x: 100 - 37.5,
                y: 300 - 25,
                width: 75,
                height: 25,
                fill: 'green',
                stroke: 'black',
                strokeWidth: 4
            
            });
            
            var botLeftRec = new Kinetic.Rect({
            
                x: 100 - 37.5,
                y: 300,
                width: 37.5,
                height: 25,
                fill: 'green',
                stroke: 'black',
                strokeWidth: 4
            
            });
            
            var botRightRec = new Kinetic.Rect({
            
                x: 100,
                y: 300,
                width: 37.5,
                height: 25,
                fill: 'green',
                stroke: 'black',
                strokeWidth: 4
            
            });
            
            var dataText = new Kinetic.Text({
                x: 100 - 10,
                y: 300 - 22.5,
                text: George,
                fontSize: '20',
                fontFamily: 'Calibri',
                fill: 'black'
                //draggable: true
            });

            var lefText = new Kinetic.Text({
                x: 100 - 22.5,
                y: 300 + 2,
                text: '/',
                fontSize: '20',
                fontFamily: 'Calibri',
                fill: 'black'
                //draggable: true
            });
            
            var righText = new Kinetic.Text({
                x: 100 + 15,
                y: 300 + 2,
                text: '/',
                fontSize: '20',
                fontFamily: 'Calibri',
                fill: 'black'
                //draggable: true
            });
            
            greengroup.add(topRec);
            greengroup.add(botLeftRec);
            greengroup.add(botRightRec);
            greengroup.add(dataText);
            greengroup.add(lefText);
            greengroup.add(righText);
      
        greengroup.on('click', function() {
            Ralph = 3;
      });
      
      animLayer.add(background);
      staticLayer.add(text);
      animLayer.add(selectbackground);
      animLayer.add(bluegroup);
      animLayer.add(redgroup);
      animLayer.add(greengroup);
      stage.add(animLayer).add(staticLayer);
      stage.getContainer().addEventListener('mousedown', function(evt) {});

      var period = 2000;
      
      var blueHex = new Kinetic.RegularPolygon({
        x: stage.width()/2,
        y: stage.height()/2,
        sides: 6,
        radius: 70,
        fill: '#00D2FF',
        stroke: 'black',
        strokeWidth: 4,
        draggable: true
      });

      var yellowHex = new Kinetic.RegularPolygon({
        x: stage.width()/2,
        y: stage.height()/2,
        sides: 6,
        radius: 70,
        fill: 'yellow',
        stroke: 'black',
        strokeWidth: 4,
        draggable: true
      });

      var redHex = new Kinetic.RegularPolygon({
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
      
      var anim = new Kinetic.Animation(function(frame) {
        var scale = Math.sin(frame.time * 2 * Math.PI / period) + 0.001;
        // scale x and y
        blueHex.scale({x:scale, y:scale});
        // scale only x
        yellowHex.scale({x:1, y:scale});
        // scale only y
        redHex.scale({x:scale, y: 1});
      }, animLayer);

      anim.start(); 
    });
}