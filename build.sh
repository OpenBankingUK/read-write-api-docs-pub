#!/usr/bin/env bash
# Instructions taken from, https://vuepress.vuejs.org/guide/deploy.html#github-pages, and adjusted to make it more pedantic.
#
# Tested against:
#
# * `GNU bash, version 4.4.23(1)-release (x86_64-apple-darwin17.5.0)`.
# * `GNU bash, version 4.4.19(1)-release (x86_64-alpine-linux-musl)`.
#
# Example:
# $ docker run --rm -it -v $(pwd)/scripts/deploy.sh:/usr/bin/deploy alpine sh -c 'apk add --no-cache bash && bash --version && /usr/bin/deploy'

# abort on errors and more error-checking.
set -euo pipefail
set -o noclobber  # Avoid overlay files (echo "hi" > foo)
set -o errexit    # Used to exit upon error, avoiding cascading errors
set -o pipefail   # Unveils hidden failures
set -o nounset    # Exposes unset variables
shopt -s nullglob    # Non-matching globs are removed  ('*.foo' => '')
shopt -s failglob    # Non-matching globs throw errors
shopt -s nocaseglob  # Case insensitive globs
shopt -s dotglob     # Wildcards match dotfiles ("*.sh" => ".foo.sh")

# Fix memory leak issue
export NODE_OPTIONS="--max-old-space-size=8192"
printf "Setting node memory size to 8GB"

# build
printf "
 ______ _  _  _     ______
(_____ (_)(_)(_)   / _____)
 _____) )  _  _   ( (____  ____  _____  ____  ___
|  __  / || || |   \____ \|  _ \| ___ |/ ___)/___)
| |  \ \ || || |   _____) ) |_| | ____( (___|___ |
|_|   |_\_____/   (______/|  __/|_____)\____|___/
                          |_|
"

printf "%b" "\e[32m" "yarn installing dependencies ..." "\e[0m" "\n"
yarn install --non-interactive

printf "%b" "\e[32m" "running yarn docs:build ..." "\e[0m" "\n"
yarn docs:build

# copy files ignored by yarn docs:build
printf "%b" "\e[32m" "copying extra files ..." "\e[0m" "\n"
mkdir -p docs/.vuepress/dist/v3.1.7/references
cp -r docs/v3.1.7/references/* docs/.vuepress/dist/v3.1.7/references/

#This is a, hopefully, temporary workaround for Vuepress ignoring non-image link files when building
for VER in $(ls docs | grep v);
  do echo $VER;
  mkdir -p docs/.vuepress/dist/$VER/resources-and-data-models/aisp/productdatafiles/;
  cp -r docs/$VER/resources-and-data-models/aisp/productdatafiles/* docs/.vuepress/dist/$VER/resources-and-data-models/aisp/productdatafiles/;
done;


printf "%b" "\e[32m" "content generated in folder " "\e[31m\e[1m" "'docs/.vuepress/.dist'" "\e[0m\e[32m" ", deploy its content on a public website.\n\e[39m"

