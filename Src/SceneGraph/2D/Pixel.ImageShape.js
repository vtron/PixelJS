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
		this.canvas.translate(this.pos.x, this.pos.y, this.pos.z);
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

/*
Pixel.Image = Pixel.Object.extend({
	init: function(url) {
		this._super();
	
		this.bAllocated = false;
		this.canvas		= null;
		
		this.image		= null;
		this.imageData	= null;
		this.bLoaded	= false;
		
		//Texture is only set from webgl renderer
		//And is loaded 
		this.texture		= null;
		
		//Load image if URL is set
		if(url != undefined) this.load(url);
	},
	
	
	//-------------------------------------------------------
	load: function(src) {
		this.clear();
		
		this.image = new Image();
		
		this.image.addEventListener("load", function() { 
			this.bLoaded = true;
			this.dispatch("loaded", this);
			
			//Get Size of Image
			this.setSize(this.image.width, this.image.height);
		}.bind(this));
		
		
		this.image.addEventListener("error", function() {
			console.log("Could not load image from '" + url + "'");
		});
		
		
		this.image.src = src;
	},
	
	
	//-------------------------------------------------------
	isLoaded: function() {
		return this.bLoaded;
	},
	
	
	//-------------------------------------------------------
	clear: function() {
		this.bLoaded	= false;
		this.pixels		= null;
		this.imageData	= null;
		this.image		= null;
	},
	
	
	//-------------------------------------------------------
	setSize: function(width, height) {
		this._super(width, height);
		
		if(this.bAllocated == false) {			
			//Get Canvas Ref
			this.canvas = document.createElement('canvas');
			this.ctx = this.canvas.getContext('2d');
			this.imageData = this.ctx.getImageData(0,0,this.getWidth(), this.getHeight());
		}
		
		
		this.canvas.setAttribute("width", this.width);
		this.canvas.setAttribute("height", this.height);
	},
	
	
	//-------------------------------------------------------
	getImageData: function() {
		return this.imageData;
	},
	
	
	//-------------------------------------------------------
	getPixels: function() {
		if(this.bLoaded) {			
			this.ctx.drawImage(this.image, 0,0);
			this.imageData	= this.ctx.getImageData(0,0,this.size.width, this.size.height)
			this.pixels		= this.imageData.data;
			return this.pixels;
		}
		
		return null;
	},
	
	
	//-------------------------------------------------------
	setFromPixels: function(pixels, width, height){
		this.clear();
		
		//Resize the Canvas, get the new image data obj
		this.setSize(width, height);
		this.imageData	= this.ctx.getImageData(0,0,this.size.width, this.size.height);
		this.pixels		= this.imageData.data;
		
		//Copy pixels into image data
		var i=pixels.length;
		while(i--) this.pixels[i] = pixels[i];
		
		//Draw Data back into the canvas object
		this.ctx.putImageData(this.imageData, 0,0);
		
		//Store info as an IMG, drawing using drawImage() is WAY faster than putImageData()
		this.image = new Element("img");  
		this.image.addEvent("load", function() {
			this.image.removeEvent("load");
			this.dispatch("loaded", this);
			this.bLoaded = true;
		}.bind(this));
		
		this.image.src = this.canvas.toDataURL("image/png");
	}
});*/
