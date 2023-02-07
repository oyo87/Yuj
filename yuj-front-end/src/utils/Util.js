import { useEffect, useRef } from "react";

/*
ref : https://iborymagic.tistory.com/96
*/
function useInterval(callback, delay, flag){
    const savedCallback = useRef();

    useEffect(()=>{
        savedCallback.current = callback;
    }, [callback]);

    useEffect(()=>{
        
        const tick = ()=> { savedCallback.current(); }

        if(delay != null && flag){
            let id = setInterval(tick, delay);
            return ()=> clearInterval(id);
        }
        }, [delay, flag]);
}


function snakeToCamel(str){
    console.log(str);
    return str.replace(/[^a-zA-z0-9]+(.)/g, (m, chr)=> chr.toUpperCase());
}

function isCanvasUseable(canvasID){

    let canvas = document.getElementById(canvasID);

    if(!canvas.getContext){ console.log('this browser not supported canvas. please change your browser or update.')}
}

export default {useInterval, snakeToCamel, isCanvasUseable};