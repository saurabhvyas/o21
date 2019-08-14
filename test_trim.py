import sox

tfm = sox.Transformer()

tfm.trim(22.482383219954617, 34.03438321995461)
tfm.build("/mnt/orangedrive2/feeny_dataset/new_data/audio/maan_ki_baat_june.wav", "/mnt/orangedrive2/feeny_dataset/new_data/trimmed/"  + "2.wav" )