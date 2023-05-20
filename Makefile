.PHONY: install serve build touch rm

install:
	yarn install --frozen-lockfile

serve-en:
	yarn run start

serve-ja:
	yarn run start --locale ja

build:
	yarn build

touch:
	./tools/touch.sh $(target)

rm:
	./tools/rm.sh $(target)
