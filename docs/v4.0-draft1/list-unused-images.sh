#!/usr/bin/env bash
#
# Lists the unused images that are safe to delete.
# Requires bash >= 4.4 and 'rg' command to be installed.
#
# The script finds the images in the repository and uses ripgrep (rg) to check 
# if they are referenced / mentioned within any of the markdown files.
#
# NOTE: it lists directories too (todo: don't list them)


# readarray images < <(find . -type f \( -name '*.png' -o -name '*.gif' -o -name '*.jpg' \))
readarray images < <(find -regextype sed -regex ".*.[jpg|png|gif]")


for imagePath in "${images[@]}"
do
	name=$(basename $imagePath)
	result=$(rg -ig '*.md' $name | xargs 2>/dev/null) # xargs here just strips whitespaces where it can
	if ! [[ $result ]]; then
		echo $imagePath
	fi
done

