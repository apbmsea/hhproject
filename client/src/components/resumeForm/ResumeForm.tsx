import React, { useState } from 'react';
import axios from 'axios';

const ResumeForm: React.FC = () => {
    const [step, setStep] = useState<number>(1); // Текущий шаг
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        years: 0,
        email: '',
    });
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false); // Показывать подтверждение после создания

    const handleNextStep = () => {
        if (step < 2) setStep(step + 1);
    };

    const handlePrevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'years' ? parseInt(value) || 0 : value, // Если это возраст, преобразуем в число
        }));
    };

    const handleSubmit = async () => {
        try {
            await axios.post('http://localhost:8080/resumes', formData); // Отправка данных на сервер
            setIsSubmitted(true); // Отображаем сообщение о создании резюме
        } catch (err) {
            alert('Ошибка при создании резюме!');
            console.error(err);
        }
    };

    const handleReset = () => {
        setFormData({ name: '', lastname: '', years: 0, email: '' });
        setStep(1);
        setIsSubmitted(false); // Сбрасываем состояние подтверждения
    };

    return (
        <div className="resume-form">
            {isSubmitted ? (
                <div className="confirmation">
                    <h2>Резюме успешно создано!</h2>
                    <button onClick={handleReset}>Создать новое резюме</button>
                </div>
            ) : (
                <>
                    {step === 1 && (
                        <div>
                            <h2>Шаг 1: Личные данные</h2>
                            <label>
                                Имя:
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Фамилия:
                                <input
                                    type="text"
                                    name="lastname"
                                    value={formData.lastname}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Возраст:
                                <input
                                    type="number"
                                    name="years"
                                    value={formData.years}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <button onClick={handleNextStep}>Далее</button>
                        </div>
                    )}
                    {step === 2 && (
                        <div>
                            <h2>Шаг 2: Контактная информация</h2>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <button onClick={handlePrevStep}>Назад</button>
                            <button onClick={handleSubmit}>Создать</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ResumeForm;

