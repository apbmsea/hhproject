import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ResumeState {
    formData: any;
}

const initialState: ResumeState = {
    formData: {},
};

const resumeSlice = createSlice({
    name: 'resume',
    initialState,
    reducers: {
        saveResume: (state, action: PayloadAction<any>) => {
            state.formData = action.payload;
        },
    },
});

export const { saveResume } = resumeSlice.actions;
export default resumeSlice.reducer;