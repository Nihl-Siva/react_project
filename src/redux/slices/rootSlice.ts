import { createSlice } from '@reduxjs/toolkit';

export interface BrickState {
    set_num: number
    name: string,
    year: number,
    theme_id: number,
    num_parts: number,
    set_img_url: string,
    set_url: string
}

const initialState: BrickState = {
    set_num: 0,
    name: '',
    year: 0,
    theme_id: 0,
    num_parts: 0,
    set_img_url: '',
    set_url: ''
}

const rootSlice = createSlice({
    name: "root",
    initialState,
    reducers: {
        chooseSetNum: (state, action) => { state.set_num = action.payload },
        chooseName: (state, action) => { state.name = action.payload },
        chooseYear: (state, action) => { state.year = action.payload },
        chooseThemeId: (state, action) => { state.theme_id = action.payload },
        chooseNumParts: (state, action) => { state.num_parts = action.payload },
        chooseSetImgUrl: (state, action) => { state.set_img_url = action.payload },
        chooseSetUrl: (state, action) => { state.set_url = action.payload }
    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
export const {
    chooseSetNum,
    chooseName,
    chooseYear,
    chooseThemeId,
    chooseNumParts,
    chooseSetImgUrl,
    chooseSetUrl
} = rootSlice.actions;