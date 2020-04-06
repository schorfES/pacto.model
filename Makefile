.PHONY:  docs validate tests coverage build release


docs:
	node_modules/.bin/doctoc \
		./README.md


validate:
	eslint \
		. \
		--ext .js


tests:
	jest \
		src \
		--coverage \
		--verbose


coverage:
	node_modules/.bin/codecov

	cat \
		./coverage/lcov.info \
		| node_modules/.bin/coveralls


build:
	node_modules/.bin/rollup \
		-c \
		--environment INCLUDE_DEPS,BUILD:production

	jest \
		tests \
		--verbose


make release: validate tests build docs
	node_modules/.bin/np \
		--no-yarn \
		--no-tests \
		--tag
