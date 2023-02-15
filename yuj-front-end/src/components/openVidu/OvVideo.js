import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUserVideoRef, setUserCanvasRef, setUserCanvasContext, 
    setTeacherVideoRef, setTeacherCanvasRef, setTeacherCanvasContext, inferenceTarget } from '../../stores/modelSlice';

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
        this.width = null;
        this.height = null;
    }

    componentDidUpdate(props) {
        this.navigateDefaultOrAIDrawing(props);
    }

    componentDidMount() {
        this.context = this.canvasRef.current.getContext('2d');

        if(this.props.type === '수강생'){
            this.canvasRef.current.id = 'student-canvas';
            this.videoRef.current.id = 'student-video';
            this.props.setUserVideoRef(this.videoRef);
            this.props.setUserCanvasRef(this.canvasRef);
            this.props.setUserCanvasContext(this.canvasRef.current.getContext('2d'));
        }
        else if(this.props.type === '강사'){
            this.canvasRef.current.id = 'teacher-canvas';
            this.videoRef.current.id = 'teacher-video';
            const prevState = this.props.model.teacherSkeletonState;
            console.log('mount? ', prevState);
            console.log(prevState.targetVideoRef ===this.videoRef.current);
            this.props.setTeacherVideoRef(this.videoRef);
            this.props.setTeacherCanvasRef(this.canvasRef);
            this.props.setTeacherCanvasContext(this.canvasRef.current.getContext('2d'));
        }

        console.log('video mount')
        console.log(this.props.type, " : ",this.props.model);
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
        this.width = this.canvasRef.current.widht;
        this.height = this.canvasRef.current.height;

        if(state && !!this.videoRef){
            this.props.streamManager.addVideoElement(this.videoRef.current);

            const inferenceFlag = this.props.model.userInferenceState.inferenceState;
            if(inferenceFlag && this.props.type !== "강사"){ this.drawVideoWithInferenceInfo() }
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
        const modelSliceState = this.props.model;

        let teacherVideo = modelSliceState.userInferenceState.targetVideoRef;
        let userVideo = modelSliceState.teacherSkeletonState.targetVideoRef;
        
        let teacherContext = modelSliceState.teacherSkeletonState.targetCanvasContext;
        let userContext = modelSliceState.userInferenceState.targetCanvasContext;

        userContext.drawImage(userVideo, 0, 0, this.width, this.height);
        teacherContext.drawImage(teacherVideo, 0,0, this.width, this.height);
        
        let userPose = await this.props.inferenceTarget(modelSliceState.model, "수강생", userVideo);
        // let teacherPose = await this.props.inferenceTarget(modelSliceState.model, "강사", teacherVideo);
        console.log('user pose ', userPose);
        // console.log('teacher pose ', teacherPose);

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
        inferenceTarget : (model, target, videoTag) => {dispatch(inferenceTarget({model:model, target:target, videoTag:videoTag}))},
        
        setUserVideoRef : (video) => {dispatch(setUserVideoRef(video))},
        setUserCanvasRef : (canvas)=>{dispatch(setUserCanvasRef(canvas))},
        setUserCanvasContext : (context)=>{dispatch(setUserCanvasContext(context))},

        setTeacherVideoRef : (video) => {dispatch(setTeacherVideoRef(video))},
        setTeacherCanvasRef : (canvas)=>{dispatch(setTeacherCanvasRef(canvas))},
        setTeacherCanvasContext : (context)=>{dispatch(setTeacherCanvasContext(context))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenViduVideoComponent);
