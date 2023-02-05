
function snakeToCamel(str){
    console.log(str);
    return str.replace(/[^a-zA-z0-9]+(.)/g, (m, chr)=> chr.toUpperCase());
}

function isCanvasUseable(canvasID){

    let canvas = document.getElementById(canvasID);

    if(!canvas.getContext){ console.log('this browser not supported canvas. please change your browser or update.')}
}