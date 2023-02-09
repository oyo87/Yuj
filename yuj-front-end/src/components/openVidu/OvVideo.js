import React, { Component } from 'react';
import VideoCanvas from '../VideoCanvas';

export default class OpenViduVideoComponent extends Component {

    /*
    props에 담겨 오는 streamManager 를
    하위 컴포넌트에 넘겨주고
    update & mount cycle에 
    video element를 제어해야 할 것 같다.
    */
    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
        this.canvasRef = React.createRef();
    }

    componentDidUpdate(props) {
        if (props && !!this.videoRef) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
            console.log('parent update');
            // this.drawVideoToCanvas();
        }
    }

    componentDidMount() {
        if (this.props && !!this.videoRef) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
            console.log('parent mount');
            // this.drawVideoToCanvas();
        }
    }

    drawVideoToCanvas() {
        if(this.canvasRef.current && this.videoRef.current){
            const context = this.canvasRef.current.getContext('2d');
            context.beginPath();
            context.translate(this.canvasRef.current.width, 0);
            context.scale(-1, 1);
            context.drawImage(this.videoRef.current, 0, 0, this.canvasRef.current.width, this.canvasRef.current.height);
        }
    }

    // render() {
    //     return (this.props.isActive === true 
    //         ? (< video style={{width:'auto', height:'90vh'}} autoPlay = { true} ref = { this.videoRef } />) 
    //         : (< video autoPlay = { true} ref = { this.videoRef } />))
    // }

    render(){
        return(
            <VideoCanvas isActive={this.props.isActive} videoRef={this.videoRef} 
            canvasTagName={"userCanvas"} videoTagName={"userVideo"}/>
        )
    }

    // render(){
    //     <video autoPlay={true} width={0} height={0} ref={this.videoRef}
    //             style={{visibility:'hidden'}}/>
    //     // <canvas ref={this.canvasRef}/>
    //     return ( this.props.isActive === true ? 
    //     (<canvas ref={this.canvasRef} style={{width:'auto', height:'90vh'}}/>) 
    //     : (<canvas ref={this.canvasRef} style={{width:'100%', height:'100%'}}/>))
    // }

}
