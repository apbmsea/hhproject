import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { loginRequest } from '../features/auth/authSlice';

const Login = () => {
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector((state: RootState) => state.auth);

    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginRequest({ nickname, password }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">{isLoading ? 'Загрузка...' : 'Войти'}</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default Login;
