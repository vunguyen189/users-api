BIN = node_modules/.bin

.PHONY: bootstrap lint background watch test

bootstrap:
	npm install

lint:
	$(BIN)/standard --global pm
	
background:
	node index.js &

watch:
	${BIN}/nodemon index.js

test:
	make lint
	make background
	${BIN}/newman run postman_collection.json -e postman_environment.json
