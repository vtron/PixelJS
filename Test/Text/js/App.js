$(document).ready(function() {
	var App = new Pixel.App();
	
	App.setSize(400,400);
	App.setBackgroundColor(0,0,0);
	
	var tf = new Pixel.Textfield();
	tf.setAutoSize(true);
	tf.setTextSize(50);
	tf.setText("Testinggggg");
	tf.alignment = Pixel.ALIGNMENT_CENTER_TOP;
	tf.pos.set(50, 50);
	App.addChild(tf);
		
	App.update = function() {
		tf.rotation += 1;
	}
	
	
	$(document.body).append(App.element);
	App.start();
	
	//App.stop();
});