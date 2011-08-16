if(!Pixel) {
	var Pixel = {};
	if(!px) var px = Pixel;
}

//-------------------------------------------------------
//-------------------------------------------------------
//Image Class
Pixel.Image = new Class({
	Extends:Pixel.Object,
	
	image:null,
	
	canvas:null,
	ctx:null,
	
	imageData:null,
	pixels:null,
	
	bAllocated:false,
	bLoaded:false,
	size: {
		width:0,
		height:0
	},
	
	
	//-------------------------------------------------------
	initialize:function(url) {
		if(url != undefined) {
			this.load(url);
		}
	},
	
	
	//-------------------------------------------------------
	load:function(url) {
		this.clear();
		this.image = new Asset.image(url, {
			onLoad:function() {
				this.bLoaded = true;
				
				//Get Size of Image
				this.setSize(this.image.width, this.image.height);
			}.bind(this),
			
			onError: function() {
				console.log("Could not load image from '" + url + "'");
			}
		});
	},
	
	
	//-------------------------------------------------------
	isLoaded:function() {
		return this.bLoaded;
	},
	
	
	//-------------------------------------------------------
	clear:function() {
		this.bLoaded	= false;
		this.pixels		= null;
		this.imageData	= null;
		this.image		= null;
	},
	
	
	//-------------------------------------------------------
	setSize:function(width, height) {
		this.parent(width,height);
		
		if(this.bAllocated == false) {			
			//Get Canvas Ref
			this.canvas = new Element('canvas');
			this.ctx = this.canvas.getContext('2d');
			this.imageData = this.ctx.getImageData(0,0,this.getWidth(), this.getHeight());
		}
		
		this.canvas.set({
			width:this.size.width,
			height:this.size.height
		});
	},
	
	
	//-------------------------------------------------------
	getImageData: function() {
		return this.imageData;
	},
	
	
	
	//-------------------------------------------------------
	getPixels:function() {
		if(this.bLoaded) {			
			this.ctx.drawImage(this.image, 0,0);
			this.imageData	= this.ctx.getImageData(0,0,this.size.width, this.size.height)
			this.pixels		= this.imageData.data;
			return this.pixels;
		}
		return null;
	},
	
	
	//-------------------------------------------------------
	setFromPixels:function(pixels, width, height){
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
			this.bLoaded = true;
		}.bind(this));
		
		this.image.src = this.canvas.toDataURL("image/png");
	},
	
	
	//-------------------------------------------------------
	draw:function(pxCanvas, x, y) {
		pxCanvas.drawImage(this, x,y);
	}
});