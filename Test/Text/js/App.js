$(document).ready(function() {
	var App = new Pixel.App();
	
	App.setSize(1000,500);
	App.setBackgroundColor(0,0,0);
	
	var tf = new Pixel.TextField();
	tf.setSize(500,100);
	tf.setStrokeColor(255,0,0);
	tf.setStrokeSize(1);
	tf.setTextSize(12);
	tf.setTextAlignment(Pixel.TEXT_ALIGN_LEFT);
/* 	tf.setUseTextBounds(true); */
	tf.setHideOverflow(true);
	tf.setText("Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima. Eodem modo typi, qui nunc nobis videntur parum clari, fiant sollemnes in futurum.");
	tf.doLayout();
	tf.position.set(50, 50);
	tf.scaleAmount.set(1,1,1);
	App.addChild(tf);
		
	App.update = function() {
		//tf.rotation += 1;
	}
	
	
	//Events
	$(document).bind("click", function() {
		switch(tf.getTextAlignment()) {
			case Pixel.TEXT_ALIGN_LEFT:
				tf.setTextAlignment(Pixel.TEXT_ALIGN_CENTER);
				break;
			case Pixel.TEXT_ALIGN_CENTER:
				tf.setTextAlignment(Pixel.TEXT_ALIGN_RIGHT);
				break;
			case Pixel.TEXT_ALIGN_RIGHT:
				tf.setTextAlignment(Pixel.TEXT_ALIGN_LEFT);
				break;
		}
		
		tf.doLayout();
	});
	
	
	$(document).bind("keydown", function(e) {
		switch(e.which) {
			case 38:
				tf.setLeading(tf.getLeading() + 1);
				break;
			case 40:
				tf.setLeading(tf.getLeading() - 1);
				break;
			case 37:
				tf.setWidth(tf.getWidth() - 5);
				break;
			
			case 39:
				tf.setWidth(tf.getWidth() + 5);
				console.log(tf.getWidth());
				break;
		}
		
		tf.doLayout();
	});

	
	
	$(document.body).append(App.element);
	App.start();
	
	//App.stop();
});