if(!Pixel) {
	var Pixel = {};
	if(!px) var px = Pixel;
}

//-------------------------------------------------------
Pixel.isSet = function(item) { return item != undefined ? item : false; };


//-------------------------------------------------------
Pixel.log = function(message) {
	console.log("Pixel: " + message)
}


//-------------------------------------------------------
//RequestAnimationFrame finder by Paul Irish
//from http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
          };
})();