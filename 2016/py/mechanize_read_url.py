#!/usr/bin/python
# -*- coding: utf-8 -*-
import sys
import mechanize

debug = True

headers_chrome =[
	("user-agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36"),
	("accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"),
	("accept-encoding", "gzip, deflate, sdch"),
	("accept-language", "da,en-US;q=0.8,en;q=0.6,nb;q=0.4"),
	("connection","close")
]

def main(url):
	print "read_url("+url+")"
	br = mechanize.Browser()
	br.set_handle_robots(False)   # ignore robots
	br.set_handle_refresh(False)  # can sometimes hang without this
	br.addheaders = headers_chrome
	response = br.open(url)
	contents = response.read()
	if debug is True:
		print "-- retrieved content: --"
		print contents
		print "-- retrieved content end --"
	return response.read() 
	
if __name__ == "__main__":
	main(sys.argv[1])
