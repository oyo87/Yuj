import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 특정 강의의 정보를 가져오는 함수
const getLecture = createAsyncThunk("GET_LECTURE", async(lectureId) => {
    const response = await axios.get(`http://localhost:5000/lectures/${lectureId}`);
    return response.data;
})

const lectureSlice = createSlice({
    name: 'lectureSlice',

    initialState: {
        lectures: [],
    },

    reducers: {

    },

    extraReducers: {
        [getLecture.fulfilled]: (state, {payload}) => {
            console.log("get lecture", payload);
            state.thumnail = '/assets/Sample.jpg';
            state.currLecture = payload;
        }
    }
})

export default lectureSlice;

export {getLecture};