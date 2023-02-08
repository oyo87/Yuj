import { useEffect } from "react";
import { useInterval } from "../utils/Util";

const videoCanvas = (props) => {

    const videoRef = props.ref;
    const videoTagName = props.videoTagName;

    const canvasTagName = props.canvasTagName;
    
    const width = props.isActive ? 'auto' : '100%';
    const height = props.isActive ? '90vh' : '100%';

    const canvasObj = null;
    const videoObj = null;
    let context = null;

    useEffect(()=>{

        canvasObj = document.getElementById(canvasTagName);
        videoObj = document.getElementById(videoTagName);
        context = canvasObj.getContext('2d');

    });

    useInterval(()=>{
        if(context)
            context.drawImage(videoObj, 0, 0, width, height);
    }, ref? 100:null);

    return(
        <>
            <div className="video-div">
                <canvas id={canvasTagName} width={width} height={height}/>
                <video id={videoTagName} ref={videoRef} width={0} height={0} 
                        autoPlay={true} />
            </div>
        </>
    )

}

export default videoCanvas;