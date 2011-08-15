if(!Pixel) {
	var Pixel = {};
	if(!px) var px = Pixel;
};

//Render Modes
Pixel.RENDER_MODE_2D		= 0;
Pixel.RENDER_MODE_WEBGL		= 1;

//Font Alignment
Pixel.TEXT_ALIGN_LEFT	= "left";
Pixel.TEXT_ALIGN_CENTER = "center";
Pixel.TEXT_ALIGN_RIGHT	= "right";

//Font Baseline
Pixel.TEXT_BASELINE_TOP			= "top";
Pixel.TEXT_BASELINE_HANGING		= "hanging";
Pixel.TEXT_BASELINE_MIDDLE		= "middle";
Pixel.TEXT_BASELINE_BOTTOM		= "bottom";