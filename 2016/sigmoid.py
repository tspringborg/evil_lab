#!/usr/bin/python
# -*- coding: utf-8 -*-
import sys, math
def main(x):
	if type(x) == str:
		x = float(x)
	try:
		res = 1 / (1 + math.exp(-x))
	except OverflowError:
		res = 0.0
	return res
if __name__ == "__main__":
	sigmoid = main(*sys.argv[1:])
	print sigmoid