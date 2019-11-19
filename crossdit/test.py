from imageai.Prediction import ImagePrediction
import os
import sys
import json

def main():
    has_arg = len(sys.argv) > 1
    file = str(sys.argv[1]) if has_arg else "E:/projects/trash_server/server/image.jpeg"
    if has_arg:
        print("using image from argument")
    else:
        print("using default image")

    execution_path = os.getcwd()

    prediction = ImagePrediction()
    prediction.setModelTypeAsResNet()
    # prediction.setModelPath(os.path.join(execution_path, "resnet50_weights_tf_dim_ordering_tf_kernels.h5"))
    prediction.setModelPath("E:/projects/trash_server/crossdit/resnet50_weights_tf_dim_ordering_tf_kernels.h5")
    prediction.loadModel()

    output_list = []

    predictions, probabilities = prediction.predictImage(os.path.join(execution_path, file))
    for eachPrediction, eachProbability in zip(predictions, probabilities):
        m_dict = {}
        m_dict[eachPrediction] = eachProbability
        output_list.append(m_dict)

    # print(json.dumps(output_dict))
    f = open("E:/projects/trash_server/server/result.json", "w")
    f.write(json.dumps(output_list))
    f.close()

main()