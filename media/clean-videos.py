#!/usr/bin/python3
# This file deletes all existing videos in the media/ directory
import os
from PIL import Image
from pymediainfo import MediaInfo

def is_image(path):
    try:
        im = Image.open(path)
        im.close()
        return True
    except IOError:
        return False

def is_video(path):
    fileInfo = MediaInfo.parse(path)
    for track in fileInfo.tracks:
        if track.track_type == "Video":
            return True
        else:
            return False

def clean():
    video_counter = 0
    total_files = 0
    for file in os.listdir('.'):
        total_files += 1
        image = is_image(file)
        if image:
            continue
        else:
            video = is_video(file)
            if video:
                os.system(f"rm {file}")
                video_counter +=1
    return video_counter, total_files

if __name__ == "__main__":
    video_counter, total_files = clean()
    print(f"Cleaned {video_counter} video files out of {total_files} total files")
    
