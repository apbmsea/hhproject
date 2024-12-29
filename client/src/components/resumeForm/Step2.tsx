import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEducation } from '../../features/resume/resumeSlice.ts';

const Step2: React.FC<{ onBack: () => void; onSubmit: () => void }> = ({ onBack, onSubmit }) => {
    const dispatch = useDispatch();

    const [institution, setInstitution] = useState('');
    const [degree, setDegree] = useState('');
    const [graduationYear, setGraduationYear] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (institution && degree && graduationYear) {
            dispatch(
                addEducation({
                    institution,
                    degree,
                    graduationYear,
                })
            );

            onSubmit(); // Завершаем процесс создания резюме
        } else {
            alert('Пожалуйста, заполните все поля!');
        }
    };

    return (
        <div>
            <h2>Шаг 2: Образование</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="institution">Учебное заведение:</label>
                    <input
                        type="text"
                        id="institution"
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="degree">Специальность:</label>
                    <input
                        type="text"
                        id="degree"
                        value={degree}
                        onChange={(e) => setDegree(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="graduationYear">Год окончания:</label>
                    <input
                        type="text"
                        id="graduationYear"
                        value={graduationYear}
                        onChange={(e) => setGraduationYear(e.target.value)}
                        required
                    />
                </div>

                <div style={{ marginTop: '20px' }}>
                    <button type="button" onClick={onBack}>
                        Назад
                    </button>
                    <button type="submit">Завершить</button>
                </div>
            </form>
        </div>
    );
};

export default Step2;
