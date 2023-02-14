import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { calSimilarity, convertToCalculateFormat, setModelBackend, loadModel, estimate } from "../utils/ModelFunction";
import { ModelParams } from "../utils/ModelParams";

const initModel = createAsyncThunk("SET_INITIAL_MODEL", async()=>{
    await setModelBackend();
    const model = await loadModel(ModelParams.Config, ModelParams.imageShape);
    return model;
})

const inferenceTarget = createAsyncThunk("INFERENCE_TARGET", async({model, target, videoTag})=>{
    let pose = await estimate(videoTag, model);
    await model.dispose();
    //결과 안나오면 여기 await 걸어 줘야 하는거 잊지마라
    pose = convertToCalculateFormat(pose);
    return {target: target, result: pose};
})

const calculateSimilarity = createAsyncThunk("CALCULATE_DISTANCE", async({})=>{
    calSimilarity()
})

const drawTargetCanvasResults = createAsyncThunk("DRAW_RESULT_TO_TARGET", async({videoTag, canvasTag, result, color})=>{
    let context = canvasTag.getContext('2d');
    //draw background
    context.drawImage(videoTag, 0, 0, canvasTag.width, canvasTag.height);

})


const modelSlice = createSlice({

    name: 'modelSlice',

    initialState : {
        similarity : 0,
        color : '',
    
        model : '',
    
        userInferenceState : {
            cameraState : true,
            targetCanvasContext: '',
            inferenceState : false,
            inferenceResult : {}
        },
    
        teacherSkeletonState : {
            cameraState : true,
            targetCanvasContext: '',
            skeletonState : false,
            skeletonResult : {},
            color : "Green"
        },
    },
    

    reducers : {
        toggleUserCamera:(state)=>{
            state.userInferenceState.cameraState =!state.userInferenceState.cameraState;
        },
        toggleTeacherCamera:(state)=>{
            state.teacherSkeletonState.cameraState =!state.teacherSkeletonState.cameraState;
        },
        toggleInferenceMode:(state)=>{
            state.userInferenceState.inferenceState =!state.userInferenceState.inferenceState;
        },

        toggleSkeletonMode:(state)=>{
            state.teacherSkeletonState.skeletonState =!state.teacherSkeletonState.skeletonState;
        },
        returnToInitState:(state)=>{
            state.model = '';
            state.userInferenceState = {
                targetCanvasContext: '',
                inferenceState: false,
                inferenceResult: {}
            };
            state.teacherSkeletonState = {
                targetCanvasContext: '',
                skeletonState : false, 
                skeletonResult : {}
            }; 
        },
    },

    extraReducers : {
        [initModel.fulfilled]:(state, payload) => {
            console.log('redux set model? ', payload);
            state.model = payload;
        },
        [inferenceTarget.fulfilled]:(state, payload) => {
            if(payload.target === "수강생"){
                state.userInferenceState.inferenceResult = payload.result;
            }else {
                state.teacherSkeletonState.skeletonResult = payload.result;
            }
        }
    }

})

export default modelSlice;

export const {toggleInferenceMode, toggleSkeletonMode, returnToInitState} = modelSlice.actions;

export { inferenceTarget, initModel };