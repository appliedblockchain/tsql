test:
	pnpm exec jest

clean:
	rm -Rf cjs mjs test/*.js

build-cjs:
	rm -Rf cjs
	pnpm exec tsc -m commonjs -d --sourceMap --outDir cjs
	echo '{"type":"commonjs"}' > cjs/package.json

build-mjs:
	rm -Rf mjs
	pnpm exec tsc -d --sourceMap --outDir mjs

build: build-cjs build-mjs

rebuild: clean build

update:
	pnpm up --latest

preversion: test rebuild

postversion:
	git push
	git push --tags
	pnpm publish

.PHONY: test
