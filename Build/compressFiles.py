#!/usr/bin/python3.0
import os, glob
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

#Libs
# files.append(libs + "MooTools/mootools-core-1.3.2.js")
# files.append(libs + "MooTools/mootools-more-1.3.2.1.js")
# files.append(libs + "Tween.js/Tween.js")

#Src
#Pixel
files.append(src + "Pixel.js")

#Utils
files.append(src + "Utils/Pixel.Constants.js")
files.append(src + "Utils/Pixel.Utils.js")
files.append(src + "Utils/Pixel.Math.js")
files.append(src + "Utils/Pixel.EventDispatcher.js")

#Renderers
files.append(src + "Graphics/Rendering/Pixel.Renderer.js")
files.append(src + "Graphics/Rendering/Pixel.Renderer2D.js")

#Graphics
files.append(src + "Graphics/Pixel.Color.js")
files.append(src + "Graphics/Pixel.Canvas.js")
files.append(src + "Graphics/Pixel.Object.js")
files.append(src + "Graphics/Pixel.Image.js")
files.append(src + "Graphics/Pixel.Font.js")
files.append(src + "Graphics/Pixel.Textfield.js")

#App
files.append(src + "App/Pixel.App.js")


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
	with open(inputFile,'r') as file:
		inputContent	= file.read()
		combinedFile.write(inputContent)



#Combine Files
with open("Pixel.js", 'w') as combinedFile:
	for file in files:
		addFile(file, combinedFile)
	
#Compress
compressFile("Pixel.js")








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