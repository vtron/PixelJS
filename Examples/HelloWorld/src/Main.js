var wrapper = document.getElementById("wrapper");

//Create App
var Main = Pixel.App.extend({
	pos: {
		x: 0,
		y: 0
	},
	
	radius:150,
	speed: 1,
	date:null,
	
	numbers:[],
	
	init:function() {
		this._super();
	},
	
	setup: function() {
		//Set the size of the app
		App.setSize(800,600);
		
		App.showFPS();
		
		//Create numbers
		var angleIncrement = (Math.PI*2)/12.0;
		var numberPadding = 25;
		for(var i=0; i<12; i++) {
			this.numbers.push(new Pixel.Textfield(i+1, new Pixel.Font("Helvetica", 18)));
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
		});
		
		//Add App to DOM
		wrapper.appendChild(App.canvas);
		wrapper.style.width		= App.getWidth() + "px";
		wrapper.style.height	= App.getHeight() + "px";
		
		//App.drawRoundedRect(50,50,100,100, {tl:10, tr:20, br:5, bl:15});
	},
	
	
	//-------------------------------------------------------	
	update: function() {
		this.pos.x = App.getWidth()/2;
		this.pos.y = App.getHeight()/2;
		
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
		App.setFillColor(0,0,0, 0.25);
		App.setStrokeColor(0,0.0);
		App.setStrokeSize(5);
		App.drawCircle(0,0, this.radius);
		
		App.setLineCap(Pixel.LINE_CAP_ROUND);
		App.drawHands();
		
		App.drawNumbers();
		
		App.popMatrix();
	},
	
	//-------------------------------------------------------
	drawHands: function() {
		var rotation;
		
		App.pushMatrix();
		
		//Rotate back to 12
		App.rotate(-Math.PI/2);
		
		//Set Second hand
		App.pushMatrix();
		rotation = Pixel.map(0,59,date.getSeconds(), 0.0, Math.PI*2) 
		App.rotate(rotation);
		App.setStrokeSize(1);
		App.drawLine(0,0, this.radius - 25, 0);
		App.popMatrix();
		
		//Set Minute hand
		App.pushMatrix();
		rotation = Pixel.map(0, 59, date.getMinutes(), 0.0, Math.PI*2); 
		App.rotate(rotation);
		App.setStrokeSize(3);
		App.drawLine(0,0, this.radius/2, 0);
		App.popMatrix();
		
		//Set Hour hand
		App.pushMatrix();
		var hours = date.getHours();
		if(hours>11) hours -= 12;
		rotation = Pixel.map(0, 12, hours, 0.0, Math.PI*2); 
		App.rotate(rotation);
		App.setStrokeSize(5);
		App.drawLine(0,0, this.radius/3, 0);
		App.popMatrix();
		
		App.popMatrix();		
	},
	
	//-------------------------------------------------------
	drawNumbers: function() {
		
		var angleIncrement = Math.PI*2/this.numbers.length;
		for(var i=0; i<12; i++) {
			App.setFillColor(0,0,0);
			App.drawTextfield(this.numbers[i]);
		}
		
		App.popMatrix();
	}
});	

//-------------------------------------------------------
//Run App
var App = new Main();
App.run();