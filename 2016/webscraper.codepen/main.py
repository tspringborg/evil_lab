#!/usr/bin/python
# -*- coding: utf-8 -*-
import sys
from bs4 import BeautifulSoup
from py import requests_read_url
def main(*args):
	print args
	html = requests_read_url.main(args[0])
	soup = BeautifulSoup(html, 'html.parser')
if __name__ == "__main__":
	main(*sys.argv[1:])