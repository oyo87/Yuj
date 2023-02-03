import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';

import * as tf from '@tensorflow/tfjs-core';
import * as poseDetection from '@tensorflow-models/pose-detection';

import { useState, useEffect } from "react";
import { poseSimilarity } from "posenet-similarity";
import MainHeader from "../components/mainHeader/MainHeader";
import MainFooter from "../components/mainFooter/MainFooter";

const UserLivePage = () => {

    const [detector, setDetector]  = useState("");
    const imageShape = [192, 192, 3];

    useEffect( ()=>{
        //init device
        setModelBackend();
        //init model
        const modelConfig = {modelType : poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING};
        loadModel(modelConfig);
    }, []);

    async function setModelBackend (targetDevice){
        const engineList = tf.engine().registryFactory;
        if ( targetDevice && targetDevice in engineList){ await tf.setBackend(targetDevice) } 
        //set best backend automatically(choose by priority in registryFactory)
        else{ await tf.backend() }
        console.log("Current inference Devices : ", tf.getBackend());
    }

    async function loadModel(modelConfig){
        let model = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, modelConfig);
        setDetector(model);
        //warm up
        console.log(detector);
        await detector.estimatePoses(tf.zeros(imageShape));
    }

    async function estimate(imageElement){

        var infStartTime = Date.now();
        const pose = await detector.estimatePoses(imageElement);
        console.log('inf time : ', Math.floor((Date.now() - infStartTime)/1000), tf.getBackend());
        console.log(pose);

        if(!pose.length)
            throw new Error("Cannot find poses. try again or check your state");

        // return this.convert2CalculateFormat(await pose[0]);
        return pose[0];
    }

    async function convert2CalculateFormat(pose){
        console.log('formatting to similarity');
        const formatObjectList = [];
        for(const [key, value] of pose.keypoints.entries()){
            console.log('before format', value);
            let formatObject = {
                score : value.score,
                part : value.name,
                position : {
                    x : value.x,
                    y : value.y
                }
            }
            console.log('after format ', formatObject);

            formatObjectList.push(formatObject);
        }
        //deep copy
        pose.keypoints = [...formatObjectList];
        return pose;
    }

    async function calSimilarity(config, origin, target){

        var calStartTime = Date.now();
        const similarity = await poseSimilarity(origin, target, config);
        var calEndTime = Date.now();
        let strategy = config.strategy;

        return {strategy : strategy, result : similarity, time : Math.floor((calEndTime - calStartTime)/1000)};
    }

    async function calPose(){
        const pose1Image = document.getElementById('test1');
        const pose2Image = document.getElementById('test3');
        
        const poseResults = [];
        
        const posePromises = [pose1Image, pose2Image].map(async (item) => {
                let result = await estimate(item);
                console.log('wow', result);
                result = await convert2CalculateFormat(result);
                poseResults.push(result);
            });
            
        await Promise.all(posePromises);
        
        const weightDistance = await calSimilarity({strategy : 'weightedDistance'}, ...poseResults);
        alert(serializeObject(weightDistance));
    }

    function serializeObject(object){
        return JSON.stringify(object);
    }

    return(
        <>
            <h2>pose estimation demo(moveNet)</h2>
            <div className="video-div">
                <img src="./assets/Sample2.jpg" width={1000} height={1000} alt=""></img>
                <img src="./assets/tempProfilePicture.jpg" width={1000} height={1000} alt=""></img>
            </div>
            <button onClick={calPose}>get pose</button>
        </>
    );
}

export default UserLivePage;