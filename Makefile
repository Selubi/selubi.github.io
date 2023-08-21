.PHONY: install serve build touch rm

install:
	npm install

serve:
	npm run start

build:
	npm run build

touch:
	./tools/touch.sh $(target)

rm:
	./tools/rm.sh $(target)
