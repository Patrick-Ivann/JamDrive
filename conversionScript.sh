#!/bin/sh
dir1=/home/ivann/JamDrive/fichiers
while inotifywait -qqe modify -e create  "$dir1"; do

    unoconv -f pdf -o pdf *.docx
done