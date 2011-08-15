#!/usr/bin/python3.0
import os, glob
import http.client ,urllib.request, urllib.parse, urllib.error
from urllib.parse import urlencode
import sys

# Always use the following value for the Content-type header.
headers = { "Content-type": "application/x-www-form-urlencoded" }
conn = http.client.HTTPConnection('closure-compiler.appspot.com')



dir = "../src";

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




#Combine all JS
with open("Pixel.js",'w') as combinedFile:
	for root, subFolders, files in os.walk(dir):
		for filename in files:
			if(filename.endswith('.js')):
				inputFile		= os.path.join(root, filename)
				inputContent	= open(inputFile,'r').read()
				combinedFile.write(inputContent)


#Do the compression
compressFile("Pixel.js")