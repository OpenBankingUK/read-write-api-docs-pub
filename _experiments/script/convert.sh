cp $1 $1.out -r

grep -rl h1 $1.out | xargs sed -i 's/<h1[^>]*>/\n# /g'
grep -rl h2 $1.out | xargs sed -i 's/<h2[^>]*>/\n## /g'
grep -rl h3 $1.out | xargs sed -i 's/<h3[^>]*>/\n### /g'
grep -rl h4 $1.out | xargs sed -i 's/<h4[^>]*>/\n#### /g'
grep -rl h5 $1.out | xargs sed -i 's/<h5[^>]*>/\n##### /g'
grep -rl h6 $1.out | xargs sed -i 's/<h6[^>]*>/\n##### /g'

grep -rl h1 $1.out | xargs sed -i 's/<\/h1>/\n/g'
grep -rl h2 $1.out | xargs sed -i 's/<\/h2>/\n/g'
grep -rl h3 $1.out | xargs sed -i 's/<\/h3>/\n/g'
grep -rl h4 $1.out | xargs sed -i 's/<\/h4>/\n/g'
grep -rl h5 $1.out | xargs sed -i 's/<\/h5>/\n/g'
grep -rl h6 $1.out | xargs sed -i 's/<\/h6>/\n/g'

grep -rl p $1.out | xargs sed -i -E 's/<p[^>]*>/\n/g'
grep -rl p $1.out | xargs sed -i 's/<\/p>/\n/g'

grep -rl br $1.out | xargs sed -i 's/<br \/>/\n/g'

grep -rl strong $1.out | xargs sed -i 's/<strong>/ **/g'
grep -rl strong $1.out | xargs sed -i 's/<\/strong>/** /g'

grep -rl em $1.out | xargs sed -i 's/<em>/ **/g'
grep -rl em $1.out | xargs sed -i 's/<\/em>/** /g'

grep -rl body $1.out | xargs sed -i -E 's/<body[^>]*>//g'
grep -rl body $1.out | xargs sed -i -E 's/<\/body>/\n/g'

grep -rl div $1.out | xargs sed -i -E 's/<div[^>]*>//g'
grep -rl div $1.out | xargs sed -i -E 's/<\/div>/\n/g'

grep -rl span $1.out | xargs sed -i -E 's/<span[^>]*>//g'
grep -rl span $1.out | xargs sed -i -E 's/<\/span>//g'

grep -rl table $1.out | xargs sed -i -E 's/<table[^>]*>/\n```\n/g'
grep -rl table $1.out | xargs sed -i -E 's/<\/table>/\n```\n/g'

grep -rl colgroup $1.out | xargs sed -i -E 's/<colgroup[^>]*>//g'
grep -rl colgroup $1.out | xargs sed -i -E 's/<\/colgroup>/\n/g'

grep -rl col $1.out | xargs sed -i -E 's/<col[^>]*>//g'
grep -rl col $1.out | xargs sed -i -E 's/<\/col>/\n/g'

grep -rl tbody $1.out | xargs sed -i -E 's/<tbody[^>]*>//g'
grep -rl tbody $1.out | xargs sed -i -E 's/<\/tbody>/\n/g'

grep -rl tr $1.out | xargs sed -i -E 's/<tr[^>]*>/\n---\n| /g'
grep -rl tr $1.out | xargs sed -i -E 's/<\/tr>/\n---\n/g'

grep -rl th $1.out | xargs sed -i -E 's/<th[^>]*>//g'
grep -rl th $1.out | xargs sed -i -E 's/<\/th>/\n\n\n/g'

grep -rl td $1.out | xargs sed -i -E 's/<td[^>]*>//g'
grep -rl td $1.out | xargs sed -i -E 's/<\/td>/\n\n\n/g'

grep -rl ul $1.out | xargs sed -i -E 's/<ul[^>]*>//g'
grep -rl ul $1.out | xargs sed -i -E 's/<\/ul>//g'

grep -rl ul $1.out | xargs sed -i -E 's/<ol[^>]*>//g'
grep -rl ul $1.out | xargs sed -i -E 's/<\/ol>//g'

grep -rl li $1.out | xargs sed -i -E 's/<li[^>]*>/\n- /g'
grep -rl li $1.out | xargs sed -i -E 's/<\/li>/\n/g'

grep -rl time $1.out | xargs sed -i -E 's/<time[^>]*>/ /g'
grep -rl time $1.out | xargs sed -i -E 's/<\/time>/ /g'

grep -rl code $1.out | xargs sed -i -E 's/<code[^>]*>/`/g'
grep -rl code $1.out | xargs sed -i -E 's/<\/code>/`/g'

grep -rl pre $1.out | xargs sed -i 's/<\/pre>//g'
grep -rl html $1.out | xargs sed -i 's/<\/html>//g'
