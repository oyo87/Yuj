import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 특정 강의의 정보를 가져오는 함수
const getLecture = createAsyncThunk("GET_LECTURE", async(lectureId) => {
    const response = await axios.get(`https://i8a504.p.ssafy.io/api/lectures/${lectureId}`);
    return response.data;
})

// 특정 강의의 스케줄을 가져오는 함수
const getLectureSchedule = createAsyncThunk("GET_LECTURE_SCHDULE", async(lectureId) => {
    const response = await axios.get(`http://localhost:5000/lectures/lectureSchedule/${lectureId}`);
    return response.data;
})

const lectureSlice = createSlice({
    name: 'lectureSlice',

    initialState: {
        thumnail: './assets/Sample.jpg',
        lectureSchedule: [],
    },

    reducers: {
    },

    extraReducers: {
        [getLecture.fulfilled]: (state, {payload}) => {
            console.log("get lecture", payload);
            state.thumnail = '/assets/Sample.jpg';
            state.currLecture = payload;
        },
        [getLectureSchedule.fulfilled]: (state, {payload}) => {
            console.log("get lecture Schedule", payload);
            state.lectureSchedule = payload;
        }
    }
})

export default lectureSlice;

export {getLecture, getLectureSchedule};