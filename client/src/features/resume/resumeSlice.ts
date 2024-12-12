import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ResumeState {
    personalInfo: {
        name: string;
        lastName: string;
        surname: string;
        gender: string;
        birthDate: string,
    };
    education: {
        institution: string;
        degree: string;
        graduationYear: string;
    }[];
    workExperience: {
        company: string;
        position: string;
        startDate: string;
        endDate: string;
        responsibilities: string;
    }[];
    skills: string[];
}

const initialState: ResumeState = {
    personalInfo: {
        name: '',
        lastName: '',
        surname: '',
        gender: '',
        birthDate: '',
    },
    education: [],
    workExperience: [],
    skills: [],
};

const resumeSlice = createSlice({
    name: 'resume',
    initialState,
    reducers: {
        updatePersonalInfo(state, action: PayloadAction<ResumeState['personalInfo']>) {
            state.personalInfo = action.payload;
        },
        addEducation(state, action: PayloadAction<ResumeState['education'][0]>) {
            state.education.push(action.payload);
        },
        addWorkExperience(state, action: PayloadAction<ResumeState['workExperience'][0]>) {
            state.workExperience.push(action.payload);
        },
        setSkills(state, action: PayloadAction<string[]>) {
            state.skills = action.payload;
        },
        resetResume() {
            return initialState;
        },
    },
});

export const { updatePersonalInfo, addEducation, addWorkExperience, setSkills, resetResume } =
    resumeSlice.actions;

export default resumeSlice.reducer;
