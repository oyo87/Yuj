import React, { Component } from 'react';
import { connect } from 'react-redux';
import { inferenceTarget } from '../../stores/modelSlice';

class OpenViduVideoComponent extends Component {

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
    }

    componentDidUpdate(props) {
        this.navigateDefaultOrAIDrawing(props);
        // if (props && !!this.videoRef) {
        //     this.props.streamManager.addVideoElement(this.videoRef.current);
        //     console.log('parent update');
        //     this.drawVideoToCanvas();
        // }
    }

    componentDidMount() {
        this.context = this.canvasRef.current.getContext('2d');

        if(this.props.type === '강사'){
            this.canvasRef.current.id = 'teacher-canvas';
            this.videoRef.current.id = 'teacher-video';
        }
        else{
            this.canvasRef.current.id = 'student-canvas';
        }

        const test = document.getElementById('teacher-video');
        console.log(this.props.type, test);
        console.log(typeof this.videoRef.current, this.videoRef.current);
        this.navigateDefaultOrAIDrawing(this.props);
    }

    /*
    순서
    1. infState 가 토글되어 있는지 확인(undefined 아닌거도 체크할 것)
    2. inference and save values
    3. if inference && User -> draw
    4. if skeleton -> draw teacher
    
    */

    navigateDefaultOrAIDrawing(state){
        if(state && !!this.videoRef){
            this.props.streamManager.addVideoElement(this.videoRef.current);

            const inferenceFlag = this.props.model.userInferenceState.inferenceState;
            if(inferenceFlag){ this.drawVideoWithInferenceInfo() }
            else { this.drawVideoToCanvas() }
        }
    }

    async drawVideoWithInferenceInfo(){
        console.log('inference ready');
        // this.context.drawImage(this.videoRef.current, 0, 0, this.canvasRef.current.width, this.canvasRef.current.height);
        await this.renderResult();
        requestAnimationFrame(this.drawVideoWithInferenceInfo.bind(this));
    }
    
    drawVideoToCanvas() {
        this.context.beginPath();
        // console.log(this.props);
        this.context.drawImage(this.videoRef.current, 0, 0, this.canvasRef.current.width, this.canvasRef.current.height);
        requestAnimationFrame(this.drawVideoToCanvas.bind(this));
    }

    async renderResult(){
        // console.log(this.props.model)

        this.context.drawImage(this.videoRef.current, 0, 0, this.canvasRef.current.width, this.canvasRef.current.height);
        let teacherVideo = document.getElementById('teacher-video');

        let userPose = await this.props.inferenceTarget(this.props.model.model, "수강생", this.videoRef.current);
        let teacherPose = await this.props.inferenceTarget(this.props.model.model, "강사", teacherVideo);
        await console.log('user pose', this.props.model.userInferenceState.inferenceResult);
        // console.log('teacher pose', teacherPose);

        return;

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

const mapStateToProps = (state) => {return{ model : state.model }}

const mapDispatchToProps = (dispatch) => {
    return {
        inferenceTarget : (model, target, videoTag) => {dispatch(inferenceTarget({model:model, target:target, videoTag:videoTag}))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenViduVideoComponent);
