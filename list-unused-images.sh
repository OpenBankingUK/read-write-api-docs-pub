#!/usr/bin/env bash
#
# Lists all unused images that are safe to delete.
# Requires bash >= 4.4 and 'rg' command to be installed.
#
# The script finds the images in the repository and uses ripgrep (rg) to check 
# if they are referenced / mentioned within any of the markdown files.

readarray images < <(find . -type f \( -name '*.png' -o -name '*.gif' -o -name '*.jpg' \))

for imagePath in "${images[@]}"
do
	name=$(basename $imagePath)
	result=$(rg -ig '*.md' $name | xargs) # xargs here just strips whitespaces
	if ! [[ $result ]]; then
		echo $imagePath
	fi
done

