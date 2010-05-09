test_files ?= $(wildcard test/*.rb)

tmp_files ?= $(wildcard *.aux)
tmp_files += $(wildcard *.log)
tmp_files += $(wildcard *.out)

all:	clean test compile

clean:
	echo "Cleaning up latex tmps"
	rm -f $(tmp_files)

.PHONY: test
test:
	echo 'Testing code...'
	ruby test/test.rb
	echo 'All tests ok'

compile:
	echo 'Compiling for TOC...'
	latex libro.tex
	echo 'Compiling...'
	latex libro.tex
