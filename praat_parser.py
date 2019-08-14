# this file wil parse input textgrid file, and extract sentence segments

from praatio import tgio
#import sox
import ffmpeg

# create transformer
#tfm = sox.Transformer()


textgrid_location = "/mnt/orangedrive2/feeny_dataset/new_data/text/maan_ki_baat_june.TextGrid"
input_audio_location = "/mnt/orangedrive2/feeny_dataset/new_data/audio/maan_ki_baat_june.wav"
output_dir_location = "/mnt/orangedrive2/feeny_dataset/new_data/trimmed/" 


#ffmpeg_stream = ffmpeg.input(input_audio_location)

sentences=[]

sentence_start_time=0
sentence_end_time=0
#end_sentence_reached=False
sentence_started=False
sentences_counter=0

def trim_audio(audiofile_path,output_dir_path,start_time,end_time):
    global ffmpeg_stream
    # create the output file.
    if start_time == end_time:
        return 
    print("trimming")
    print(start_time)
    print(end_time)
    try:
        #ffmpeg_stream=ffmpeg_stream.trim(start=start_time, end=end_time)
        (
        ffmpeg
        .input(audiofile_path, ss=start_time, t=(end_time - start_time))
        .output(output_dir_path + str(sentences_counter) + ".wav")
        .run()
        )

        #ffmpeg_stream=ffmpeg_stream.output(ffmpeg_stream,output_dir_path + str(sentences_counter) + ".wav")
        #ffmpeg.run(ffmpeg_stream)
    except Exception as e: print(e)

def parse_text_grid():
    global sentence_started
    global sentence_start_time
    global sentence_end_time
    global sentences
    global sentences_counter

    tg = tgio.openTextgrid(textgrid_location) 
    print(tg.tierNameList)
    firstTier = tg.tierDict[tg.tierNameList[0]]
    for start, stop, label in firstTier.entryList:
        if label == "sounding" and sentence_started == False:
            sentence_started=True
            sentence_start_time=start
            sentences_counter=sentences_counter + 1
        elif label == "silent" and ( stop - start ) >= 1:
             sentence_started=False
             sentence_end_time=start
             sentences.append([sentence_start_time,sentence_end_time])
             trim_audio(input_audio_location,output_dir_location,sentence_start_time,sentence_end_time)

        #print("From:%f, To:%f, %s" % (start, stop, label))

parse_text_grid()
#print(sentences)