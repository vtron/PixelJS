//-------------------------------------------------------
//Pixel.js
//Main Class, creates library

//-------------------------------------------------------
//Define Bind for browsers that don't have it
//See https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind
if (!Function.prototype.bind) {

  Function.prototype.bind = function (oThis) {

    if (typeof this !== "function") // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be fBound is not callable");

    var aArgs = Array.prototype.slice.call(arguments, 1), 
        fToBind = this, 
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP ? this : oThis || window, aArgs.concat(Array.prototype.slice.call(arguments)));    
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };

}


//-------------------------------------------------------
//Create Main Class Object, checking for namespace
if(typeof Pixel == 'undefined') {
	Pixel = {
		'version': '0.5'
	};
	
	//Create Alias
	if(typeof px == 'undefined') px = Pixel;
} else {
	console.log("Pixel Namespace Already Exists!");
}




