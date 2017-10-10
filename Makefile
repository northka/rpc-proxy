SRC = lib/*.js

REQUIRED = --require should --require should-http

TESTS = test/*

test: 
	@NODE_ENV=test node \
		./node_modules/.bin/_mocha \
		$(REQUIRED) \
		$(TESTS) \
		--bail