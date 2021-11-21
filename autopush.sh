#!/bin/sh
DATE_N=`/bin/date "+%Y-%m-%d %H:%M:%S"`
/usr/bin/node linkedin-fulltile-job-scrapper.js
/usr/bin/node linkedin-intern-job-scrapper.js


/usr/bin//git add .
/usr/bin/git commit -m "${DATE_N} Update"

/usr/bin/git push origin master

echo "Done"
exit 0