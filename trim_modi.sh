#!/bin/bash

#input params start time , end time , index 

echo "test"
echo $0
echo $1
#echo $2

ffmpeg -i '/media/saurabh/New Volume2/feeny_dataset/modi.wav' -ss $1 -to $2  -c copy '/media/saurabh/New Volume2/feeny_dataset/modi_data/modi_$3.wav'
