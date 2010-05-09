test_files ?= $(wildcard test/*.rb)

tmp_files ?= $(wildcard *.aux)
tmp_files += $(wildcard *.log)
tmp_files += $(wildcard *.out)

all:	clean test compile

clean:
	rm -f $(tmp_files)
.PHONY: test
test:
	echo 'Testing...'
	$(foreach TESTEABLE, $(test_files), $(shell ruby $(TESTEABLE) ))
compile:
	echo 'Compiling...'
