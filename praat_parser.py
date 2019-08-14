# this file wil parse input textgrid file, and extract sentence segments

from praatio import tgio
import sox

# create transformer
tfm = sox.Transformer()

textgrid_location = "/mnt/orangedrive2/feeny_dataset/new_data/text/maan_ki_baat_june.TextGrid"
input_audio_location = "/mnt/orangedrive2/feeny_dataset/new_data/audio/maan_ki_baat_june.wav"
output_dir_location = "/mnt/orangedrive2/feeny_dataset/new_data/trimmed/" 

sentences=[]

sentence_start_time=0
sentence_end_time=0
#end_sentence_reached=False
sentence_started=False
sentences_counter=0

def trim_audio(audiofile_path,output_dir_path,start_time,end_time):
    
    # create the output file.
    if start_time == end_time:
        return 
    print("trimming")
    print(start_time)
    print(end_time)
    try:
        tfm.trim(start_time, end_time)
        tfm.build(audiofile_path,  output_dir_path + str(sentences_counter) + ".wav" )
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