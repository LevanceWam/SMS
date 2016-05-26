drawApp.controller('DrawController',[ '$scope', '$rootScope', '$firebaseAuth', '$firebaseArray','$firebaseObject', 'FIREBASE_URL', function($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL, $firebaseObject) {
    $(document).ready(function () {
      var pixelSize = 8, lastPoint = null, currentColor = "000", mouseDown = 0;

      var pixelDataRef = new Firebase('https://drawingappli.firebaseio-demo.com/');

      var myCanvas = document.getElementById('drawingboard');
      var myContext = myCanvas.getContext ? myCanvas.getContext('2d') : null;
      if (myContext == null) {
        alert("You need to have HTML5 installed to play the game");
        return;
      }

      var colors = ["fff","045","600","080","00f","830","f2d","f5f","ft5","f90","7f8","cy0","089","408","ff8","8ff"];
      for (c in colors) {
        var item = $('<div/>').css("background-color", '#' + colors[c]).addClass("colorpicker");
        item.click((function () {
          var col = colors[c];
          return function () {
            currentColor = col;
          };
        })());
        item.appendTo('#pixelColor');
      }

      myCanvas.onmousedown = function () {mouseDown = 1;};
      myCanvas.onmouseout = myCanvas.onmouseup = function () {
        mouseDown = 0; lastPoint = null;
      };

      var drawLineOnMouseMove = function(e) {
        if (!mouseDown) return;

        e.preventDefault();

        var offset = $('canvas').offset();
        var x1 = Math.floor((e.pageX - offset.left) / pixelSize - 1),
          y1 = Math.floor((e.pageY - offset.top) / pixelSize - 1);
        var x0 = (lastPoint == null) ? x1 : lastPoint[0];
        var y0 = (lastPoint == null) ? y1 : lastPoint[1];
        var dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
        var sx = (x0 < x1) ? 1 : -1, sy = (y0 < y1) ? 1 : -1, err = dx - dy;
        while (true) {

          pixelDataRef.child(x0 + ":" + y0).set(currentColor === "fff" ? null : currentColor);

          if (x0 == x1 && y0 == y1) break;
          var e2 = 2 * err;
          if (e2 > -dy) {
            err = err - dy;
            x0 = x0 + sx;
          }
          if (e2 < dx) {
            err = err + dx;
            y0 = y0 + sy;
          }
        }
        lastPoint = [x1, y1];
      };
      $(myCanvas).mousemove(drawLineOnMouseMove);
      $(myCanvas).mousedown(drawLineOnMouseMove);

      var pixelDraw = function(snapshot) {
        var coordinates = snapshot.key().split(":");
        myContext.fillStyle = "#" + snapshot.val();
        myContext.fillRect(parseInt(coordinates[0]) * pixelSize, parseInt(coordinates[1]) * pixelSize, pixelSize, pixelSize);
      };
      var clearPixel = function(snapshot) {
        var coordinates = snapshot.key().split(":");
        myContext.clearRect(parseInt(coordinates[0]) * pixelSize, parseInt(coordinates[1]) * pixelSize, pixelSize, pixelSize);
      };
      pixelDataRef.on('child_added', pixelDraw);
      pixelDataRef.on('child_changed', pixelDraw);
      pixelDataRef.on('child_removed', clearPixel);
    });
    var ref = new Firebase("https://drawingappli.firebaseio.com/");
            $scope.messages = $firebaseArray(ref);
           $scope.addMessage = function(e) {
              $scope.sendMsg = function() {

                     $scope.messages.$add($scope.msg);
                     $scope.msg.body = "";

                   }
           }
           $scope.clear = function(){
             $scope.name = "";
           }
}]); // Controller
