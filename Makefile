.PHONY: install serve build

install:
	yarn install --frozen-lockfile

serve-en:
	yarn run start

serve-ja:
	yarn run start --locale ja

build:
	yarn build

