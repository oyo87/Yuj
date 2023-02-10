import * as poseDetection from '@tensorflow-models/pose-detection';

export const ModelParams = {
        //threshhold for print result
        SIMILARITY_THRESHHOLD : 0.5,
        SCORE_THRESHHOLD : 0.2,
        //const value for draw skeleton
        LINE_WIDTH : 2,
        RADIUS : 4,
        imageShape : [192, 192, 3],
        modelArch : 'MoveNet',
        Config : {modelType : poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING}
};