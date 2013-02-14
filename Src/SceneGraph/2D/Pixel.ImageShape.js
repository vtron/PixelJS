//-------------------------------------------------------
//Pixel.Image.js
//For loading, storing, manipulating, etc
Pixel.ImageShape = function(image) {
	Pixel.Shape2D.call(this);
	
	this.image		= null;
	this.imageData	= null;
	this.pixels		= null;
	
	this.load(image);
}

Pixel.ImageShape.prototype = Object.create(Pixel.Shape2D.prototype);


//-------------------------------------------------------
Pixel.ImageShape.prototype.load = function(image) {
	if(image != undefined) {
		//Load from existing Pixel Canvas
		if(image instanceof Pixel.Canvas) {
			this.image	= image.element;
			this.width	= image.width;
			this.height	= image.height;
		} 
		
		//Just keep a reference if it is already loaded
		else if(image.tagName == "CANVAS" || image instanceof Image) {
			this.image = image;
			this.width = this.image.width;
			this.height	= this.image.height;
		}
		
			//If its a string, we need to load the image with a callback
		else if(typeof(image) ==  "string") {
			this.image = new Image();
			
			//Add load listener to set default widht/height of image
			var self = this;
			this.image.onload = function() {
				//If the image width/height arent' set or are 0,
				//Use the value from the image
				if(self.width == 0 || this.height == 0) {			
					self.width		= this.width;
					self.height		= this.height;
				}
			}
			
			this.image.src = image;
		}
	}
}


//-------------------------------------------------------
Pixel.ImageShape.prototype.draw = function() {
	if(this.canvas && this.visible) {
		//Make sure image isn't null
		if(this.image == null) return;
		
		//If its a JS Image Obj, make sure it is loaded
		if((typeof(this.image) == "image") && (this.image.complete == false)) return;
		
		//Otherwise, draw it
		this.canvas.pushMatrix();
		this.canvas.translate(this.position.x, this.position.y, this.position.z);
		this.canvas.rotate(this.rotation);

		this.calculateOffset();
		this.canvas.drawImage(this.image, this.offset.x, this.offset.y, this.width, this.height);
		
		if(this.strokeWidth > 0) {
			this.canvas.setStrokeSize(this.strokeWidth);
			this.canvas.setStrokeColor(this.strokeColor);
			this.canvas.noFill();
			this.canvas.drawRect(this.offset.x, this.offset.y, this.width, this.height);
		}
		
		this.canvas.popMatrix();
	}
}


//-------------------------------------------------------
//Chage the image to a 2D Canvas containing the image
//so we can access pixels, only done if necessary
Pixel.ImageShape.prototype.convertImageToCanvas = function() {
	var tmpCvs		= document.createElement("canvas");
	tmpCvs.width	= this.image.width;
	tmpCvs.height	= this.image.height;
	tmpCvs.getContext('2d').drawImage(this.image, 0, 0, this.image.width, this.image.height);
	
	this.image = tmpCvs;
}


//-------------------------------------------------------
Pixel.ImageShape.prototype.getPixels = function() {
	if(this.image) {
		if(this.image.tagName != "CANVAS" || !this.pixels) {
			this.convertImageToCanvas();
		}
		
		this.imageData	= this.image.getContext('2d').getImageData(0,0, this.image.width, this.image.height);
		this.pixels		= this.imageData.data;
		
		return this.pixels;
	} else {
		Pixel.log("Get Pixels: Image not loaded");
	}
}


//-------------------------------------------------------
Pixel.ImageShape.prototype.setPixels = function(pixels) {
	if(this.image.tagName != "CANVAS" || !this.pixels) {
		this.convertImageToCanvas();
	}
	
	this.imageData.data = pixels;
	this.image.getContext('2d').putImageData(this.imageData, 0, 0);
}