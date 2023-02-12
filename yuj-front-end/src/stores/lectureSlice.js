import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 특정 강의의 정보를 가져오는 함수
const getLecture = createAsyncThunk("GET_LECTURE", async(lectureId) => {
    const response = await axios.get(`https://i8a504.p.ssafy.io/api/lectures/${lectureId}`);
    return response.data;
})

const searchLectures = createAsyncThunk("SEARCH_LECTURES", async(keyword) => {
    const response = await axios.get(`https://i8a504.p.ssafy.io/api/lectures?search=${keyword}`);
    return response.data;
})

const lectureSlice = createSlice({
    name: 'lectureSlice',

    initialState: {
        thumnail: './assets/Sample.jpg',
        lectures: [],
        lecturesSearched:[],
    },

    reducers: {

    },

    extraReducers: {
        [getLecture.fulfilled]: (state, {payload}) => {
            console.log("get lecture", payload);
            state.thumnail = '/assets/Sample.jpg';
            state.currLecture = payload;
        },
        [searchLectures.fulfilled]: (state, {payload}) => {
            console.log("search lectures", payload);
            state.lecturesSearched = payload;
        }
    }
})

export default lectureSlice;

export {getLecture, searchLectures};