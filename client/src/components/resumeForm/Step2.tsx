import React from 'react';
import '../../styles/componentsStyle/resumeFormStyles/Step2.scss'

interface Step2Props {
    data: any;
    updateFormData: (newData: any) => void;
}

const Step2: React.FC<Step2Props> = ({ data, updateFormData }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        updateFormData({ [name]: value });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;
        updateFormData({
            [name]: checked
                ? [...(data[name] || []), value]
                : (data[name] || []).filter((item: string) => item !== value),
        });
    };

    return (
        <div className="step-2">
            <h1>Выбор специальности и проекта</h1>
            <div className="step-2__form step">
                <label className="step-2__selector-box">
                    <select
                        name="specialty"
                        value={data.specialty || ''}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="frontend">Frontend-разработчик</option>
                        <option value="backend">Backend-разработчик</option>
                        <option value="design">Дизайнер</option>
                        <option value="projectManager">Project Manager</option>
                    </select>
                </label>
                <label className="step-2__selector-box">
                    <select name="course" value={data.course || ''} onChange={handleInputChange} required>
                        <option value="1">1 Курс</option>
                        <option value="2">2 Курс</option>
                        <option value="3">3 Курс</option>
                        <option value="4">4 Курс</option>
                    </select>
                </label>
                <label className="step-2__check-box">
                    <div>
                        <input
                            type="checkbox"
                            name="projects"
                            value="college"
                            checked={data.projects?.includes('college')}
                            onChange={handleCheckboxChange}
                        />
                        Проекты колледжа
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="projects"
                            value="personal"
                            checked={data.projects?.includes('personal')}
                            onChange={handleCheckboxChange}
                        />
                        Личные проекты студентов
                    </div>
                </label>
            </div>
        </div>
    );
};

export default Step2;

