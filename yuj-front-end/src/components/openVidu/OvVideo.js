import React, { Component } from 'react';

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
        this.context = null;
        this.coordinate = props.coordnates;
    }

    componentDidUpdate(props) {        
        if (props && !!this.videoRef) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
            console.log('parent update');
            this.drawVideoToCanvas();
        }
    }

    componentDidMount() {
        this.context = this.canvasRef.current.getContext('2d');

        if(this.props.type === '강사'){
            this.canvasRef.current.id = 'teacher-canvas';
        }
        else{
            this.canvasRef.current.id = 'student-canvas';
        }
        
        if (this.props && !!this.videoRef) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
            console.log('parent mount');
            console.log(this.canvasRef.current.width, this.canvasRef.current.height);
            this.drawVideoToCanvas();
        }
    }
    
    drawVideoToCanvas() {
        this.context.beginPath();
        this.context.drawImage(this.videoRef.current, 0, 0, this.canvasRef.current.width, this.canvasRef.current.height);
        requestAnimationFrame(this.drawVideoToCanvas.bind(this));
    }

    render() {
        return (this.props.isActive === true ? 
            (<>
                <canvas width={1920} height={1080} style={{ border:'solid', width:'auto', height:'90vh' }} ref={this.canvasRef}/>
                <video width={"0px"} height={"0px"} autoPlay = { true} ref = { this.videoRef } style={{visibility:'hidden'}}/>
            </>) 
        :   (<>
                <canvas width={1920} height={1080} style={{ border:'solid', width:'100%', height:'100%' }} ref={this.canvasRef}/>
                <video width={"0px"} height={"0px"} autoPlay = { true} ref = { this.videoRef } style={{visibility:'hidden'}}/>
            </>))
    }

}
