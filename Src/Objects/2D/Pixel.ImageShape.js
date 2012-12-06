//-------------------------------------------------------
//Pixel.Image.js
//For loading, storing, manipulating, etc
Pixel.ImageShape = function() {
	Pixel.Shape2D.call(this);
	
	this.image = null;
}

Pixel.ImageShape.prototype = Object.create(Pixel.Shape2D.prototype);


//-------------------------------------------------------
Pixel.ImageShape.prototype.load = function(image) {
	if(image instanceof Pixel.Canvas) {
		//Load from existing Pixel Canvas
		this.image = image.element;
	} 
	
	else if(image.tagName == "canvas" || image instanceof Image) {
		//Just keep a reference if it is already loaded
		this.image = image;
		//this.width = this.image.width;
		//this.height	= this.image.height;
	}
	
	else if(typeof(image) ==  "string") {
		//If its a string, we need to load the image with a callback
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

//-------------------------------------------------------
Pixel.ImageShape.prototype.draw = function() {
	if(this.canvas) {
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
		
		this.canvas.popMatrix();
	}
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
