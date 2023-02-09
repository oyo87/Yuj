import { useEffect } from "react";
import { useInterval } from "../utils/Util";

const VideoCanvas = (props) => {

    const videoRef = props.videoRef;
    const videoTagName = props.videoTagName;

    const canvasTagName = props.canvasTagName;
    
    const width = props.isActive ? 'auto' : '100%';
    const height = props.isActive ? '90vh' : '100%';

    let canvasObj = null;
    let videoObj = null;
    let context = null;

    useEffect(()=>{

        canvasObj = document.getElementById(canvasTagName);
        videoObj = document.getElementById(videoTagName);
        context = canvasObj.getContext('2d');

    });

    useInterval(()=>{

        //video img check

        console.log(videoObj.onloadeddata)

        if(context){
            console.log('true');
            context.beginPath();
            context.translate(width, 0);
            context.scale(-1, 1);
            context.drawImage(videoObj, 0, 0, width, height);
            // console.log('test', videoObj);
        }
    }, videoRef? 100:null);

    return(
        <>
            <canvas id={canvasTagName} width={width} height={height}/>
            <video id={videoTagName} ref={videoRef} width={0} height={0} 
                    autoPlay={true} style={{visibility:'hidden'}}/>
            <p>어쩔티비</p>
        </>
    )

}

export default VideoCanvas;