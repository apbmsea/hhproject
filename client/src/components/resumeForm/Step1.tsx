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
        <div className="step1-container">
            <h1>Персональные данные</h1>
            <div className="step1 step">
                <div className="step1__grid_item item1 input-box">
                    <label>Имя</label>
                    <input
                        type="text"
                        placeholder="Имя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="step1__grid_item item2 input-box">
                    <label>Фамилия</label>
                    <input
                        type="text"
                        placeholder="Фамилия"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                </div>
                <div className="step1__grid_item item3 input-box">
                    <label>Дата рождения</label>
                    <input
                        type="date"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                    />
                </div>
                <div className="step1__grid_item item4 radio-box">
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


