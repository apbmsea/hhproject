import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

const authApi = {
    login: async ({ nickname, password }: { nickname: string; password: string }) => {
        const response = await axios.post(`${BASE_URL}/login`, { nickname, password });
        return response.data.user; // Сервер должен вернуть объект пользователя
    },
};

export default authApi;
