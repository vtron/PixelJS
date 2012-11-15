var App1, App2;
window.onload = function() {
	var wrapper = document.getElementById("wrapper");

	
	//Create App
	var App = Pixel.App.extend({
		setup: function() {
			this.showFPS();
			this.setSize(500,500);
			this.setBackgroundColor(50.0, 10, 1.5);
			this.rotation = 0.0;
			
			this.testImage1 = new Pixel.Image("images/cat1.png");
			this.testImage2 = new Pixel.Image("images/nutKick.jpg");
			
			this.setStrokeSize(0);
			this.noStroke();
		},
		
		//-------------------------------------------------------	
		update: function() {
			this.rotation += 0.5;
			if(this.rotation > 360.0) this.rotation = 0.0;
		},
		
		
		//-------------------------------------------------------	
		draw: function() {
			this.setFillColor(255,8,37);
			//this.drawRect(0,0, this.getWidth(), this.getHeight());
			var nShapes = 20;
			for(var i=0; i<nShapes; i++) {
				this.pushMatrix();
				this.translate(this.getWidth()/2, this.getHeight()/2);
				//this.rotate((this.rotation*i) * 0.05);
				this.rotate(i*360.0/nShapes);
				this.scale(3.0-((i/nShapes)*3.0), 3.0 - ((i/nShapes)*3.0));
				
				this.pushMatrix();
				this.rotate(this.rotation);
				this.setFillColor(150,255, 255, 1.0);
				this.noStroke();
				this.drawSquare(-25, -25, 50);
				this.popMatrix();
				
				this.pushMatrix();
				this.rotate(-this.rotation);
				this.setFillColor(255,255, 255, 1.0);
				//this.setStrokeColor(0, 0, 0, 1.0);
				this.drawSquare(-25, -25, 50);
				this.popMatrix();
				
				this.popMatrix();
			}
			
			this.pushMatrix();
			this.translate(this.getWidth()/2, this.getHeight()/2);
			this.setFillColor(50.0, 10, 1.5, 1.0);
			this.drawCircle(0,0, 15);
			this.popMatrix();
			
			this.drawImage(this.testImage1, 50, 50, 250, 250);
			this.drawImage(this.testImage2, 350, 350, 100, 100);
		},
		
		//-------------------------------------------------------
		mouseDownListener: function(e) {
		},
		
		//-------------------------------------------------------
		mouseMovedListener: function(e) {
		},
		
		//-------------------------------------------------------
		mouseUpListener: function(e) {
		},
	});

	
	App1 = new App(Pixel.RENDER_MODE_2D);
	//App2 = new App(Pixel.RENDER_MODE_WEBGL);
		
	
	//-------------------------------------------------------
	//Run App
	//App1.run();
	App2.run();

	wrapper.appendChild(App1.canvas);
	wrapper.appendChild(App2.canvas);
}

