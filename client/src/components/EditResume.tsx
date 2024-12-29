import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Resume {
    id: number;
    name: string;
    lastname: string;
    years: number;
    email: string;
}

const EditResume: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Получаем ID резюме из URL
    const [formData, setFormData] = useState<Resume | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/resumes/${id}`);
                setFormData(response.data);
            } catch (err) {
                setError('Не удалось загрузить данные резюме.');
            }
        };

        fetchResume();
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => prev ? { ...prev, [name]: name === 'years' ? parseInt(value) || 0 : value } : null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData) return;

        setIsSubmitting(true);
        try {
            await axios.put(`http://localhost:8000/resumes/${id}`, formData);
            alert('Резюме успешно обновлено!');
            navigate('/'); // Возврат на главную страницу или список резюме
        } catch (err) {
            alert('Ошибка при обновлении резюме.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (error) return <p>{error}</p>;
    if (!formData) return <p>Загрузка...</p>;

    return (
        <div className="edit-resume">
            <h2>Редактировать резюме</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Имя:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Фамилия:
                    <input
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Возраст:
                    <input
                        type="number"
                        name="years"
                        value={formData.years}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Сохраняем...' : 'Сохранить изменения'}
                </button>
            </form>
        </div>
    );
};

export default EditResume;
