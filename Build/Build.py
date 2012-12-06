#!/usr/bin/python3.0
import shutil, os, glob
import http.client ,urllib.request, urllib.parse, urllib.error
from urllib.parse import urlencode
import sys

bCompress = False
if len(sys.argv) > 1:
	bCompress = True

# Always use the following value for the Content-type header.
headers = { "Content-type": "application/x-www-form-urlencoded" }
conn = http.client.HTTPConnection('closure-compiler.appspot.com')

libs = "../Libs/";
src = "../src/";

#------------------------------------------------------------
#Files to Add, in order
files = []

#Pixel
files.append(src + "Pixel.js")

#Src
#Utils
files.append(src + "Utils/Pixel.Constants.js")
files.append(src + "Utils/Pixel.Utils.js")
files.append(src + "Utils/Pixel.Math.js")
files.append(src + "Utils/Pixel.Point.js")
files.append(src + "Utils/Pixel.Rect.js")
#files.append(src + "Utils/Pixel.EventDispatcher.js")

#Objects
files.append(src + "Objects/Pixel.Object.js")
files.append(src + "Objects/2D/Pixel.Shape2D.js")
files.append(src + "Objects/2D/Pixel.RectShape.js")
files.append(src + "Objects/2D/Pixel.OvalShape.js")
files.append(src + "Objects/2D/Pixel.ImageShape.js")

#Canvas
files.append(src + "Canvas/Pixel.Canvas.js")

#App
files.append(src + "App/Pixel.App.js")

# 
# files.append(src + "Objects/Pixel.Textfield.js")





# #Renderers
files.append(src + "Rendering/2D/Pixel.Renderer2D.js")
# files.append(src + "Rendering/WebGL/Pixel.RendererWebGL.js")
# files.append(src + "Rendering/WebGL/Shaders/Pixel.Shader.js")

#Assets
files.append(src + "Assets/Pixel.Color.js")
#files.append(src + "Assets/Pixel.Image.js")
#files.append(src + "Assets/Pixel.Font.js")

# 
# #Graphics






#------------------------------------------------------------
#Does the compression
def compressFile(file):
	with open(file, 'r' ) as f:
		content = f.read()
		# Define the parameters for the POST request and encode them in
		# a URL-safe format.
		params = urllib.parse.urlencode([
			('js_code', content),
			('compilation_level', 'SIMPLE_OPTIMIZATIONS'),
			('output_format', 'text'),
			('output_info', 'compiled_code'),
		])
		
		conn.request('POST', '/compile', params, headers)
		response = conn.getresponse()
		data = response.read()
		conn.close
		
		with open("Pixel.js", "wb") as compressedFile:
			compressedFile.write(data)
			print("Done!")


#------------------------------------------------------------
def addFile(inputFile, combinedFile):
	print("Adding " + inputFile + " ....")
	with open(inputFile,'r') as file:
		inputContent	= file.read()
		combinedFile.write(inputContent)



#Combine Files
with open("Pixel.js", 'w') as combinedFile:
	for file in files:
		addFile(file, combinedFile)
	
#Compress
if bCompress:
	compressFile("Pixel.js")
	print("Compress lib built!")
else:
	print("Uncompressed lib built!")

#Copy libs
#shutil.copyfile(libs + "gl-matrix/gl-matrix-min.js", "libs/gl-matrix-min.js");





#------------------------------------------------------------
#Loop through directory, add all js
def addFiles(dir, combinedFile):
	#with open(file, 'w') as combinedFile:
		for root, subFolders, files in os.walk(dir):
			for filename in files:
				if(filename.endswith('.js')):
					inputFile		= os.path.join(root, filename)
					inputContent	= open(inputFile,'r').read()
					combinedFile.write(inputContent)

# #Combine all JS
# with open("Pixel.js",'w') as combinedFile:
# 	for root, subFolders, files in os.walk(dir):
# 		for filename in files:
# 			if(filename.endswith('.js')):
# 				inputFile		= os.path.join(root, filename)
# 				inputContent	= open(inputFile,'r').read()
# 				combinedFile.write(inputContent)