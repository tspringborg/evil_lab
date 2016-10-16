#!/usr/bin/python
# -*- coding: utf-8 -*-
import sys,os
import SimpleHTTPServer
import SocketServer
def main(dir = "./", PORT = 8000):
	os.chdir(dir)
	Handler = SimpleHTTPServer.SimpleHTTPRequestHandler
	httpd = SocketServer.TCPServer(("", PORT), Handler)
	fulldir = os.path.dirname(os.path.realpath(__file__))
	print "## SimpleHTTPServer ##\n"+fulldir+"\nat port:"+str(PORT)
	httpd.serve_forever()
if __name__ == "__main__":
	main(*sys.argv[1:])