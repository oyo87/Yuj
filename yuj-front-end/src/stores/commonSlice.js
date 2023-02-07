import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//웹 페이지 내에서 공통으로 사용할 정보 저장
//요가 카테고리 등

const commonSlice = createSlice({
    name: 'commonSlice',

    initialState: {
        yogaCategory: [
            "Raja",
            "Jnana",
            "Karma",
            "Bhakti",
            "Hahta",
        ]
    },

    reducers: {

    }
})

export default commonSlice;