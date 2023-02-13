import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';

import * as tf from '@tensorflow/tfjs-core';
import * as poseDetection from '@tensorflow-models/pose-detection';

import { poseSimilarity } from "posenet-similarity";


async function setModelBackend (targetDevice){
    const engineList = tf.engine().registryFactory;
    if ( targetDevice && targetDevice in engineList){ await tf.setBackend(targetDevice) } 
    //set best backend automatically(choose by priority in registryFactory)
    else{ await tf.backend() }
    console.log("Current inference Devices : ", tf.getBackend());
}

async function loadModel(modelConfig, imageShape){
    let model = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, modelConfig);
    //warm up
    await model.estimatePoses(tf.zeros(imageShape));
    console.log(model);
    model.dispose();
    return model;
}

export {setModelBackend, loadModel, }