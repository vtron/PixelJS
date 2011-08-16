if(!Pixel) {
	var Pixel = {};
	if(!px) var px = Pixel;
}


Pixel.Spritesheet = new Class({
	sheet: null,
	data: null,
	
	
	//-------------------------------------------------------
	initialize:function() {
		sheet = new Pixel.Image();
	},
	
	//-------------------------------------------------------
	load: function(folder, name) {
		sheet.load(url);
	}
});