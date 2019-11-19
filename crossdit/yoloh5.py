"""
This parameter allows you to parse in a function you will want to execute after
each frame of the video is detected. If this parameter is set to a function, after every video
frame is detected, the function will be executed with the following values parsed into it:
-- position number of the frame
-- an array of dictinaries, with each dictinary corresponding to each object detected.
    Each dictionary contains 'name', 'percentage_probability' and 'box_points'
-- a dictionary with with keys being the name of each unique objects and value
   are the number of instances of each of the objects present
-- If return_detected_frame is set to True, the numpy array of the detected frame will be parsed
    as the fourth value into the function
"""

from imageai.Detection import VideoObjectDetection
import os


def forFrame(frame_number, output_array, output_count):
print("FOR FRAME " , frame_number)
print("Output for each object : ", output_array)
print("Output count for unique objects : ", output_count)
print("------------END OF A FRAME --------------")


video_detector = VideoObjectDetection()
video_detector.setModelTypeAsYOLOv3()
video_detector.setModelPath(os.path.join(execution_path, "yolo.h5"))
video_detector.loadModel()


video_detector.detectObjectsFromVideo(input_file_path=os.path.join(execution_path, "traffic.mp4"), output_file_path=os.path.join(execution_path, "video_frame_analysis") ,  frames_per_second=20, per_frame_function=forFrame,  minimum_percentage_probability=30)