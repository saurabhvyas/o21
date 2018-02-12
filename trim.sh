#!/bin/bash

#input params start time , end time , index 

ffmpeg -i '/media/saurabh/New\ Volume/feeny_dataset/data/feeny.wav' -ss $1 -to $2  -c copy '/media/saurabh/New Volume/feeny_dataset/data/feeny_$3.wav'
