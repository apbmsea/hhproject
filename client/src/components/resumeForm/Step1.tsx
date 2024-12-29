import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updatePersonalInfo } from '../../features/resume/resumeSlice';

interface Step1Props {
    onNext: () => void;
}

const Step1: React.FC<Step1Props> = ({ onNext }) => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        name: '',
        lastName: '',
        surname: '',
        birthDate: '',
        gender: '',
    });

    const [isDataLoaded, setIsDataLoaded] = useState(false); // Флаг для предотвращения перезаписи localStorage

    const [errors, setErrors] = useState({
        name: false,
        lastName: false,
        surname: false,
        birthDate: false,
        gender: false,
    });

    // Восстановление данных из localStorage
    useEffect(() => {
        try {
            const savedData = localStorage.getItem('resumeStep1');
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                console.log('Восстановленные данные:', parsedData);
                setForm(parsedData); // Устанавливаем данные из localStorage
            }
        } catch (error) {
            console.error('Ошибка при чтении данных из localStorage:', error);
        } finally {
            setIsDataLoaded(true); // Флаг, что данные загружены
        }
    }, []);

    // Сохранение данных в localStorage только после загрузки данных
    useEffect(() => {
        if (isDataLoaded) {
            try {
                console.log('Сохраняем в localStorage:', form);
                localStorage.setItem('resumeStep1', JSON.stringify(form));
            } catch (error) {
                console.error('Ошибка при сохранении в localStorage:', error);
            }
        }
    }, [form, isDataLoaded]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: false });
    };

    const handleSubmit = () => {
        const newErrors = {
            name: !form.name.trim(),
            lastName: !form.lastName.trim(),
            surname: !form.surname.trim(),
            birthDate: !form.birthDate.trim(),
            gender: !form.gender.trim(),
        };

        setErrors(newErrors);

        // Если есть ошибки, прерываем отправку формы
        if (Object.values(newErrors).some((error) => error)) {
            return;
        }

        dispatch(updatePersonalInfo(form)); // Обновляем Redux-состояние
        onNext(); // Переход к следующему шагу
    };

    return (
        <section className="create-resume">
            <div className="create-resume-container">
                <h1 className="create-resume-h1-type-of-test">Персональные данные</h1>
                <div className="create-resume-first-input-block">
                    <div className="create-resume-input-box">
                        <h2>Имя</h2>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="input1 {errors.name ? 'input-error' : ''}"
                        />
                    </div>
                    {errors.name && <p className="error-text">Имя обязательно для заполнения</p>}
                    <div className="create-resume-input-box">
                        <h2>Фамилия</h2>
                        <input
                            type="text"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            className="input1 {errors.lastName ? 'input-error' : ''}"
                        />
                        {errors.lastName && (
                            <p className="error-text">Фамилия обязательна для заполнения</p>
                        )}
                    </div>
                    <div className="create-resume-input-box">
                        <h2>Отчество</h2>
                        <input
                            type="text"
                            name="surname"
                            value={form.surname}
                            onChange={handleChange}
                            className="input1 {errors.name ? 'input-error' : ''}"
                        />
                        {errors.surname && (
                            <p className="error-text">Отчество обязательно для заполнения</p>
                        )}
                    </div>
                </div>
                <div className="create-resume-second-block">
                    <div className="create-resume-input-box">
                        <h2>Дата рождения</h2>
                        <input
                            type="date"
                            name="birthDate"
                            value={form.birthDate}
                            onChange={handleChange}
                            className={errors.birthDate ? 'input-error' : ''}
                        />
                        {errors.birthDate && (
                            <p className="error-text">Дата рождения обязательна для заполнения</p>
                        )}
                    </div>
                    <div className="create-resume-input-box">
                        <h2>Пол</h2>
                        <label className="label-step1-radio">
                            <input
                                type="radio"
                                name="gender"
                                value="М"
                                checked={form.gender === 'М'}
                                onChange={handleChange}
                                className="input2"
                            />
                            <span>Мужской</span>
                        </label>
                        <label className="label-step1-radio">
                            <input
                                type="radio"
                                name="gender"
                                value="Ж"
                                checked={form.gender === 'Ж'}
                                onChange={handleChange}
                                className="input2"
                            />
                            <span>Женский</span>
                        </label>
                        {errors.gender && <p className="error-text">Пол обязателен для выбора</p>}
                    </div>
                </div>
                <button onClick={handleSubmit}>Далее</button>
            </div>
        </section>
    );
};

export default Step1;
