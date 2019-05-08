cd ..

rem rm -rf out

xcopy .\in\*.html .\out\*.md /i /s /q

grep -rl h1 ./out/*.md | xargs sed -i -E "s/<h1[^>]*>/\n## /g"
grep -rl h2 ./out/*.md | xargs sed -i -E  "s/<h2[^>]*>/\n### /g"
grep -rl h3 ./out/*.md | xargs sed -i -E  "s/<h3[^>]*>/\n#### /g"
grep -rl h4 ./out/*.md | xargs sed -i -E  "s/<h4[^>]*>/\n##### /g"
grep -rl h5 ./out/*.md | xargs sed -i -E  "s/<h5[^>]*>/\n###### /g"
grep -rl h6 ./out/*.md | xargs sed -i -E  "s/<h6[^>]*>/\n####### /g"

grep -rl h1 ./out/*.md | xargs sed -i "s/<\/h1>/\n/g"
grep -rl h2 ./out/*.md | xargs sed -i "s/<\/h2>/\n/g"
grep -rl h3 ./out/*.md | xargs sed -i "s/<\/h3>/\n/g"
grep -rl h4 ./out/*.md | xargs sed -i "s/<\/h4>/\n/g"
grep -rl h5 ./out/*.md | xargs sed -i "s/<\/h5>/\n/g"
grep -rl h6 ./out/*.md | xargs sed -i "s/<\/h6>/\n/g"

grep -rl p ./out/*.md | xargs sed -i -E "s/<p[^>]*>/\n/g"
grep -rl p ./out/*.md | xargs sed -i "s/<\/p>/\n/g"

grep -rl br ./out/*.md | xargs sed -i "s/<br \/>/\n/g"

grep -rl strong ./out/*.md | xargs sed -i "s/<strong>/ **/g"
grep -rl strong ./out/*.md | xargs sed -i "s/<\/strong>/** /g"

grep -rl em ./out/*.md | xargs sed -i -E "s/<em[^>]*>/ _/g"
grep -rl em ./out/*.md | xargs sed -i "s/<\/em>/_ /g"

grep -rl body ./out/*.md | xargs sed -i -E "s/<body[^>]*>//g"
grep -rl body ./out/*.md | xargs sed -i -E "s/<\/body>/\n/g"

grep -rl div ./out/*.md | xargs sed -i -E "s/<div[^>]*>//g"
grep -rl div ./out/*.md | xargs sed -i -E "s/<\/div>/\n/g"

grep -rl span ./out/*.md | xargs sed -i -E "s/<span[^>]*>//g"
grep -rl span ./out/*.md | xargs sed -i -E "s/<\/span>//g"

grep -rl table ./out/*.md | xargs sed -i -E "s/<table[^>]*>/\n```TABLE START\n/g"
grep -rl table ./out/*.md | xargs sed -i -E "s/<\/table>/\n```TABLE END\n/g"

grep -rl colgroup ./out/*.md | xargs sed -i -E "s/<colgroup[^>]*>//g"
grep -rl colgroup ./out/*.md | xargs sed -i -E "s/<\/colgroup>/\n/g"

grep -rl col ./out/*.md | xargs sed -i -E "s/<col[^>]*>//g"
grep -rl col ./out/*.md | xargs sed -i -E "s/<\/col>/\n/g"

grep -rl tbody ./out/*.md | xargs sed -i -E "s/<tbody[^>]*>//g"
grep -rl tbody ./out/*.md | xargs sed -i -E "s/<\/tbody>/\n/g"

grep -rl tr ./out/*.md | xargs sed -i -E "s/<tr[^>]*>/\n---\n| /g"
grep -rl tr ./out/*.md | xargs sed -i -E "s/<\/tr>/\n---\n/g"

grep -rl th ./out/*.md | xargs sed -i -E "s/<th[^>]*>//g"
grep -rl th ./out/*.md | xargs sed -i -E "s/<\/th>/\n\n\n/g"

grep -rl td ./out/*.md | xargs sed -i -E "s/<td[^>]*>//g"
grep -rl td ./out/*.md | xargs sed -i -E "s/<\/td>/\n\n\n/g"

grep -rl ul ./out/*.md | xargs sed -i -E "s/<ul[^>]*>//g"
grep -rl ul ./out/*.md | xargs sed -i -E "s/<\/ul>//g"

grep -rl ul ./out/*.md | xargs sed -i -E "s/<ol[^>]*>//g"
grep -rl ul ./out/*.md | xargs sed -i -E "s/<\/ol>//g"

grep -rl li ./out/*.md | xargs sed -i -E "s/<li[^>]*>/\n- /g"
grep -rl li ./out/*.md | xargs sed -i -E "s/<\/li>/\n/g"

grep -rl time ./out/*.md | xargs sed -i -E "s/<time[^>]*>/ /g"
grep -rl time ./out/*.md | xargs sed -i -E "s/<\/time>/ /g"

grep -rl code ./out/*.md | xargs sed -i -E "s/<code[^>]*>/`/g"
grep -rl code ./out/*.md | xargs sed -i -E "s/<\/code>/`/g"

grep -rl pre ./out/*.md | xargs sed -i "s/<\/pre>//g"
grep -rl html ./out/*.md | xargs sed -i "s/<\/html>//g"

grep -rl lt ./out/*.md | xargs sed -i "s/&lt;/</g"
grep -rl gt ./out/*.md | xargs sed -i "s/&gt;/>/g"
grep -rl quot ./out/*.md | xargs sed -i "s/&quot;/\"/g"

grep -rl Notes ./out/*.md | xargs sed -i "s/**Notes**/Notes/g"


cd script
