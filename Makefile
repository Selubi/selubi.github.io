.PHONY: install serve build

install:
	yarn install --frozen-lockfile

serve:
	yarn run start

build:
	yarn build

