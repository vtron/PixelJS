//-------------------------------------------------------
//Pixel.Utils.js


//-------------------------------------------------------
Pixel.isSet = function(item) { return item != undefined ? item : false; };


//-------------------------------------------------------
Pixel.log = function(message) {
	console.log("PixelJS Log: " + message)
}

//-------------------------------------------------------
//Touch device detection
//from http://stackoverflow.com/questions/2607248/optimize-website-for-touch-devices
Pixel.isTouchDevice = function() {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
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