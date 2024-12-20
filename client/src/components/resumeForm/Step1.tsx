import React, { useState, useEffect } from 'react';
import '../../styles/componentsStyle/resumeFormStyles/Step1.scss'

interface Step1Props {
    data: {
        name?: string;
        lastname?: string;
        birthdate?: string;
        gender?: string;
    };
    updateFormData: (newData: any) => void;
}

const Step1: React.FC<Step1Props> = ({ data, updateFormData }) => {
    const [name, setName] = useState<string>(data.name || '');
    const [lastname, setLastname] = useState<string>(data.lastname || '');
    const [birthdate, setBirthdate] = useState<string>(data.birthdate || '');
    const [gender, setGender] = useState<string>(data.gender || '');

    useEffect(() => {
        updateFormData({ name, lastname, birthdate, gender });
    }, [name, lastname, birthdate, gender]);

    return (
        <div className="step-1 step">
            <h1>Персональные данные</h1>
            <div className="step-1__content">
                <div className="input-box">
                    <label>Имя</label>
                    <input
                        type="text"
                        placeholder="Имя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="input-box">
                    <label>Фамилия</label>
                    <input
                        type="text"
                        placeholder="Фамилия"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                </div>
                <div className="input-box">
                    <label>Дата рождения</label>
                    <input
                        type="date"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                    />
                </div>
                <div className="radio-box">
                    <h3>Пол</h3>
                    <div className="radio-box__radio">
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={gender === 'male'}
                                onChange={() => setGender('male')}
                            />
                            <span>Мужской</span>
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={gender === 'female'}
                                onChange={() => setGender('female')}
                            />
                            <span>Женский</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step1;


