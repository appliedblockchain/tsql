test:
	pnpm tsc
	pnpm eslint src
	pnpm jest --coverage

clean:
	rm -Rf cjs mjs test/*.js

build-cjs:
	rm -Rf cjs
	pnpm exec tsc -p tsconfig.cjs.json
	echo '{"type":"commonjs"}' > cjs/package.json

build-mjs:
	rm -Rf mjs
	pnpm exec tsc -p tsconfig.mjs.json

build: build-cjs build-mjs

rebuild: clean build

update:
	pnpm up --latest

preversion: test rebuild

postversion:
	git push
	git push --tags
	pnpm publish --access public

.PHONY: test
