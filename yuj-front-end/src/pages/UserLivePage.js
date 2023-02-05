import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';

import * as tf from '@tensorflow/tfjs-core';
import * as poseDetection from '@tensorflow-models/pose-detection';

import { useState, useEffect } from "react";
import { poseSimilarity } from "posenet-similarity";

import UserCamera from '../components/UserCamera';

const UserLivePage = () => {

    const [detector, setDetector]  = useState("");
    const imageShape = [192, 192, 3];
    const CLIENT_WIDTH = window.innerWidth;
    const CLIENT_HEIGHT = window.innerHeight;
    const THRESHHOLD = 0.3;
    const LINE_WIDTH = 2;
    const RADIUS = 4;

    useEffect( ()=>{
        //init device
        setModelBackend();
        //init model
        const modelConfig = {modelType : poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING};
        loadModel(modelConfig);
    }, []);

    //이 페이지를 벗어나는 경우 모델 지우기 구현해야함
    //lifecycle 찾아볼 것

    /*
    model이 추론할 디바이스 설정
    */
    async function setModelBackend (targetDevice){
        const engineList = tf.engine().registryFactory;
        if ( targetDevice && targetDevice in engineList){ await tf.setBackend(targetDevice) } 
        //set best backend automatically(choose by priority in registryFactory)
        else{ await tf.backend() }
        console.log("Current inference Devices : ", tf.getBackend());
    }

    /* 
    
    */
    async function loadModel(modelConfig){
        let model = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, modelConfig);
        setDetector(model);
        //warm up
        console.log(detector);
        await detector.estimatePoses(tf.zeros(imageShape));
    }

    async function estimate(imageElement){

        var infStartTime = Date.now();
        const pose = await detector.estimatePoses(imageElement, {flipHorizontal: false});
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
            // console.log('before format', value);
            let formatObject = {
                score : value.score,
                part : value.name,
                position : {
                    x : value.x,
                    y : value.y
                }
            }
            // console.log('after format ', formatObject);

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
        console.log(similarity);

        return {strategy : strategy, result : similarity, time : Math.floor((calEndTime - calStartTime)/1000)};
    }

    async function calPose(){
        const pose1Image = document.getElementById('test1');
        const pose2Image = document.getElementById('test2');
        
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

        await Promise.all([
            drawPoints('canvas1', 'test1', poseResults[0].keypoints, 'Green'),
            drawPoints('canvas2', 'test2', poseResults[1].keypoints, 'Red'),
            drawSkeleton('canvas1', 'test1', poseResults[0].keypoints, 'Green'),
            drawSkeleton('canvas2', 'test2', poseResults[1].keypoints, 'Red')
        ]);

    }

    async function inferenceAndDrawPoints(){
        
    }

    function drawPoints(canvasID, imageID, points, color){

        const imageTag = document.getElementById(imageID);
        const canvasTag = document.getElementById(canvasID);
        let context = canvasTag.getContext('2d');

        context.fillStyle = color;

        context.beginPath();
        context.drawImage(imageTag, 0,0, imageTag.width, imageTag.height);

        for(const [key, value] of points.entries()){
            const circle = new Path2D();
            circle.arc(value.position.x, value.position.y, RADIUS, 0 , 2 * Math.PI);
            context.fill(circle);
            context.fillText(value.part, value.position.x-10, value.position.y-10);
            context.stroke(circle);
        }
    }

    function drawSkeleton(canvasID, imageID, points, color){

        const imageTag = document.getElementById(imageID);
        const canvasTag = document.getElementById(canvasID);
        let context = canvasTag.getContext('2d');

        context.fillStyle = color;
        context.strokeStyle = color;
        context.lineWidth = LINE_WIDTH;

        console.log('keypoints?', points);

        poseDetection.util.getAdjacentPairs("MoveNet").forEach(
            ([i, j])=>{

                const keypoint1 = points[i];
                const keypoint2 = points[j];
                
                // score is null, show keypoint only
                const score1 = keypoint1.score != null ? keypoint1.score : 1;
                const score2 = keypoint2.score != null ? keypoint2.score : 1;
                const scoreThreshHold = THRESHHOLD || 0;

                if(score1 >= scoreThreshHold && score2 >= scoreThreshHold){
                    context.beginPath();
                    context.moveTo(keypoint1.position.x, keypoint1.position.y);
                    context.lineTo(keypoint2.position.x, keypoint2.position.y);
                    context.stroke();

                }

            });

        console.log('skeleton', imageID, 'done');

    }

    async function drawTest(){
        const image1 = document.getElementById('canvas1');
        const image = document.getElementById('test1');
        let context = image1.getContext('2d');

        context.beginPath();
        context.drawImage(image, 0, 0, image.width, image.height);
        context.moveTo(75,50);
        context.lineTo(100, 75);
        context.lineTo(100,75);
        context.stroke();

        console.log(poseDetection.util.getAdjacentPairs("MoveNet"));


    }

    function serializeObject(object){
        return JSON.stringify(object);
    }

    return(
        <>
            <h2>pose estimation demo(moveNet)</h2>
            <div className="video-div" style={{display: 'inline-flex'}}>
                <div className='imageObject'>
                    <img id='test1' src="./assets/Sample2.jpg" width={1000} height={1000} alt=""></img>
                    <canvas id='canvas1' width={1000} height={1000}></canvas>
                </div>
                <div className='imageObject'>
                    <img id='test2' src="./assets/Sample.jpg" width={1000} height={1000} alt=""></img>
                    <canvas id='canvas2' width={1000} height={1000}></canvas>
                </div>
            </div>
            <UserCamera imgTagName="test3" canvasTagName="test3" imgSrc="./assets/Sample3.jpg" width={CLIENT_WIDTH/2} height={CLIENT_HEIGHT/2}></UserCamera>
            <button onClick={calPose}>get pose</button>
            <button onClick={drawTest}>Draw</button>
        </>
    );
}

export default UserLivePage;