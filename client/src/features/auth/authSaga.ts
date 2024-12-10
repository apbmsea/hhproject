import { call, put, takeLatest } from 'redux-saga/effects';
import { loginRequest, loginSuccess, loginFailure } from './authSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import authApi from '../../services/authApi';

function* loginSaga(action: PayloadAction<{ nickname: string; password: string }>) {
    try {
        const user = yield call(authApi.login, action.payload);
        yield put(loginSuccess(user));
    } catch (error: any) {
        yield put(loginFailure(error.message || 'Ошибка авторизации'));
    }
}

export default function* authSaga() {
    yield takeLatest(loginRequest.type, loginSaga);
}