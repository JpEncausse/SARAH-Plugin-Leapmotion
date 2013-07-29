exports.action = function(data, callback, config, SARAH){
  console.log(data);
  callback({});  
}


exports.init = function(SARAH){

  var Leap = require('./node_modules/leapjs-0.2.0-beta6/lib/index');
  var controller = new Leap.Controller({ enableGestures: true });
/*
  controller.on("frame",              function(frame) { 
    console.log("Frame: " + frame.id + " @ " + frame.timestamp); 
  });
*/
  controller.on("frame",              function(frame) {                               });
  controller.on('ready',              function() { console.log("ready");              });
  controller.on('connect',            function() { console.log("connect");            }); 
  controller.on('disconnect',         function() { console.log("disconnect");         });
  controller.on('focus',              function() { console.log("focus");              });
  controller.on('blur',               function() { console.log("blur");               });
  controller.on('deviceConnected',    function() { console.log("deviceConnected");    });
  controller.on('deviceDisconnected', function() { console.log("deviceDisconnected"); });
  controller.connect();
  console.log("\nWaiting for device to connect...");
  
  
  // controller.gesture('circle',    function(g) { console.log('CIRCLE') });
  // controller.gesture('keyTap',    function(g) { console.log('KEY TAP') });
  // controller.gesture('screenTap', function(g) { console.log('SCREEN TAP') });
  controller.gesture('swipe',     function(g) { 
    
    var last = g.gestures[g.gestures.length - 1];
    
    var x = last.direction[0];
    var y = last.direction[1];
    var z = last.direction[2];
    
    if (Math.abs(x) < 0.3 && Math.abs(y) < 0.3){ return; }
    
    if (Math.abs(x) > Math.abs(y)){
      if (x > 0){ SARAH.run('leapmotion', { type : 'swipe', direction: 1 });  } 
      else      { SARAH.run('leapmotion', { type : 'swipe', direction: 3 });  }
    } 
    else {
      if (y > 0){ SARAH.run('leapmotion', { type : 'swipe', direction: 0 });  } 
      else      { SARAH.run('leapmotion', { type : 'swipe', direction: 2 });  }
    }
  });
}
