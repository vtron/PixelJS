#!/usr/bin/python3.0
import shutil, os, glob
import http.client ,urllib.request, urllib.parse, urllib.error
from urllib.parse import urlencode
import sys

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

#Libs
files.append(libs + "gl-matrix-min.js");

#Src
#Utils
files.append(src + "Utils/Pixel.Constants.js")
files.append(src + "Utils/Pixel.Utils.js")
files.append(src + "Utils/Pixel.Math.js")
files.append(src + "Utils/Pixel.Point.js")
files.append(src + "Utils/Pixel.Rect.js")

#Assets
files.append(src + "Assets/Pixel.Font.js")
files.append(src + "Assets/Pixel.Color.js")

#Scene Graph
files.append(src + "SceneGraph/Pixel.Object.js")
files.append(src + "SceneGraph/2D/Pixel.Shape2D.js")
files.append(src + "SceneGraph/2D/Pixel.RectShape.js")
files.append(src + "SceneGraph/2D/Pixel.EllipseShape.js")
files.append(src + "SceneGraph/2D/Pixel.ImageShape.js") 

files.append(src + "SceneGraph/Typography/Pixel.TextField.js")

#Events
files.append(src + "SceneGraph/Events/Pixel.EventTypes.js") 
files.append(src + "SceneGraph/Events/Pixel.EventCenter.js") 

#Canvas
files.append(src + "Canvas/Pixel.Canvas.js")

#2D Renderer
files.append(src + "Canvas/Renderers/2D/Pixel.Renderer2D.js")

#3D Renderer
# files.append(src + "Rendering/WebGL/Pixel.RendererWebGL.js")
# files.append(src + "Rendering/WebGL/Shaders/Pixel.Shader.js")

#App
files.append(src + "App/Pixel.App.js")




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



#------------------------------------------------------------
#APPLICATION

if len(sys.argv) > 1 and (sys.argv[1] == "DEBUG" or sys.argv[1] == "RELEASE"):
	#Combine Files
	with open("Pixel.js", 'w') as combinedFile:
		for file in files:
			addFile(file, combinedFile)
		
	#Compress
	if sys.argv[1]=="RELEASE":
		compressFile("Pixel.js")
	
	#Done
	print(sys.argv[1] + " lib built!")
else:
	print("Please specify DEBUG or RELEASE")
	











#Copy libs
#shutil.copyfile(libs + "gl-matrix/gl-matrix-min.js", "libs/gl-matrix-min.js");





# #------------------------------------------------------------
# #Loop through directory, add all js
# def addFiles(dir, combinedFile):
# 	#with open(file, 'w') as combinedFile:
# 		for root, subFolders, files in os.walk(dir):
# 			for filename in files:
# 				if(filename.endswith('.js')):
# 					inputFile		= os.path.join(root, filename)
# 					inputContent	= open(inputFile,'r').read()
# 					combinedFile.write(inputContent)

# #Combine all JS
# with open("Pixel.js",'w') as combinedFile:
# 	for root, subFolders, files in os.walk(dir):
# 		for filename in files:
# 			if(filename.endswith('.js')):
# 				inputFile		= os.path.join(root, filename)
# 				inputContent	= open(inputFile,'r').read()
# 				combinedFile.write(inputContent)