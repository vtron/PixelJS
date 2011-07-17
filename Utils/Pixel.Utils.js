if(!Pixel) {
	var Pixel = {};
	if(!px) var px = Pixel;
}


Pixel.isSet = function(item) { return item != undefined ? item : false; };