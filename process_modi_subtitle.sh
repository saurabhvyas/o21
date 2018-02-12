#!/bin/bash

v1=0
v2=0

count=0


while read p; do
#echo $p
v1=$(echo "${p}" | awk -v FS="-->" '{ print $1 }')
v2=$(echo "${p}" | awk -v FS="-->" '{ print $2 }')

(( count++ ))

ffmpeg -i '/media/saurabh/New Volume2/feeny_dataset/modi.wav' -ss $v1 -to $v2  -c copy "/media/saurabh/New Volume2/feeny_dataset/modi_data/modi_${count}.wav"

#echo "$v1"
#echo "$v2"
echo "$count"

done <temp3.txt
