var App;

var Main = Pixel.App.extend({
	pos: {
		x: 0,
		y: 0
	},
	
	radius:125 * Pixel.scale,
	speed: 1,
	date:null,
	
	scale:window.devicePixelScale,
	
	numbers:[],

	setup: function() {
		//Set the size of the app
		App.setSize(960,640);
		
		this.pos.x = App.getWidth()/2;
		this.pos.y = App.getHeight()/2  - 20;
		
		App.showFPS();
		
		this.setBackgroundColor(0,0,0);
		
		//Create numbers
		var angleIncrement = (Math.PI*2)/12.0;
		var numberPadding = 25 * Pixel.scale;
		for(var i=0; i<12; i++) {
			var textSize = (i+1) % 3 ? 14 : 24;
			this.numbers.push(new Pixel.Textfield(i+1, new Pixel.Font("Helvetica", textSize * Pixel.scale)));
			var xPos = Math.cos(i*angleIncrement - (Math.PI/2) + angleIncrement)	* (this.radius-numberPadding);
			var yPos = Math.sin(i*angleIncrement - (Math.PI/2) + angleIncrement)	* (this.radius-numberPadding);
			
			this.numbers[i].setPos(xPos-this.numbers[i].getWidth()/2, yPos-this.numbers[i].getHeight()/2);
		}
		
		//Add Listeners
		App.addEventListener("mousedown", function(e) {
		});
		
		App.addEventListener("mousemoved", function(e){
		});
		
		App.addEventListener("mouseup", function(e){
		});;
	},
	
	
	//-------------------------------------------------------	
	update: function() {
		date = new Date();
	},
	
	
	//-------------------------------------------------------	
	draw: function() {
		this.clear(0, 0, App.getWidth(),App.getHeight());
		
		this.drawClock();
	},
	
	
	//-------------------------------------------------------
	drawClock: function() {
		App.pushMatrix();
		App.translate(this.pos.x, this.pos.y);
		
		//Draw BG
		App.setFillColor(50,50,50);
		App.setStrokeColor(150, 150, 150);
		App.setStrokeSize(10*window.devicePixelRatio);
		App.drawCircle(0,0, this.radius);
		
		App.drawNumbers();
		
		App.setLineCap(Pixel.LINE_CAP_ROUND);
		App.drawHands();
		
		App.popMatrix();
	},
	
	
	//-------------------------------------------------------
	drawHands: function() {
		var rotation;
		
		App.pushMatrix();
		
		//Rotate back to 12
		App.rotate(-90);
		
		//Set Hour hand
		App.pushMatrix();
		var hours = date.getHours();
		if(hours>11) hours -= 12;
		rotation = Pixel.Math.map(0, 12, hours, 0.0, 360); 
		rotation += Pixel.Math.map(0, 59, date.getMinutes(), 0.0, 360.0/12.0);	
		App.rotate(rotation);
		App.setStrokeColor(200, 200, 200);
		App.setStrokeSize(5 * Pixel.scale);
		App.drawLine(-5,0, this.radius/3, 0);
		App.popMatrix();
		
		//Set Minute hand
		App.pushMatrix();
		rotation = Pixel.Math.map(0, 59, date.getMinutes(), 0.0, 360); 
		App.rotate(rotation);
		App.setStrokeColor(150, 150, 150);
		App.setStrokeSize(3 * Pixel.scale);
		App.drawLine(-5,0, this.radius/2, 0);
		App.popMatrix();
		
		//Set Second hand
		App.pushMatrix();
		rotation = Pixel.Math.map(0,59,date.getSeconds(), 0.0, 360) 
		App.rotate(rotation);
		App.setStrokeColor(255, 0, 0);
		App.setStrokeSize(1 * Pixel.scale);
		App.drawLine(-5,0, this.radius - 25, 0);
		App.popMatrix();
		
		App.popMatrix();		
	},
	
	
	//-------------------------------------------------------
	drawNumbers: function() {
		var angleIncrement = Math.PI*2/this.numbers.length;
		for(var i=0; i<12; i++) {
			App.setFillColor(150, 150, 150);
			App.drawTextfield(this.numbers[i]);
		}
	}
});

//Add App to DOM	
App = new Main(Pixel.RENDERER_2D);
wrapper.appendChild(App.canvas);

App.start();

addEventListener("keypress", function(event){
	if(App.getRenderer() == Pixel.RENDERER_2D) {
		App.setRenderer(Pixel.RENDER_MODE_WEBGL);
	} else {
		App.setRenderer(Pixel.RENDER_MODE_2D);
	}
  });