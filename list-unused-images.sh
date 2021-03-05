#!/usr/bin/env bash
#
# Lists all images that aren't referenced in any markdown file. (safe to delete)
# reauires bash >= 4.4 and 'rg' command to be installed
#
readarray images < <(find . -type f \( -name '*.png' -o -name '*.gif' -o -name '*.jpg' \))

for imagePath in "${images[@]}"
do
	name=$(basename $imagePath)
	result=$(rg -ig '*.md' $name | xargs) # xargs here just strips whitespace
	if ! [[ $result ]]; then
		echo $imagePath
	fi
done

