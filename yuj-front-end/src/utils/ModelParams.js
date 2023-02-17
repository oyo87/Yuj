import * as poseDetection from '@tensorflow-models/pose-detection';

export const ModelParams = {
        //threshhold for print result
        SIMILARITY_THRESHHOLD : 0.5,
        SCORE_THRESHHOLD : 0.1,
        //const value for draw skeleton
        LINE_WIDTH : 5,
        RADIUS : 3,
        INFERENCE : false,
        VIDEO_WIDTH : 640,
        VIDEO_HEIGHT : 380,
        imageShape : [192, 192, 3],
        modelArch : 'MoveNet',
        Config : {modelType : poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING},
        strategy : 'weightedDistance'
};
