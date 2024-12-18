import React, { useEffect, useState } from 'react';
import '../../styles/componentsStyle/resumeFormStyles/Step3.scss'

interface Step3Props {
    data: any;
    updateFormData: (newData: any) => void;
}

const skillsBySpecialty: { [key: string]: string[] } = {
    frontend: ['HTML', 'CSS', 'JavaScript', 'React', 'Angular', 'Vue', 'TypeScript', 'SCSS', 'Less', 'Tailwind', 'Webpack', 'Vite', 'Next', 'Nuxt', 'Git', 'Axios', 'Redux', 'Redux-Toolkit', 'Redux-Saga', 'Mobx', 'Zustand', 'SEO', 'CI/CD', 'REST', 'UI/UX', 'ООП',],
    backend: ['Go', 'Node.js', 'Java', 'Python', 'SQL', 'NoSQL', 'HTTP/HTTPS', 'Docker', 'Kubernetes', 'API', 'CI/CD', 'S3', 'MinlO', 'MVC', 'DDD', 'Prometheus'],
    design: ['Figma', 'Photoshop', 'Illustrator', 'UI/UX', 'Blender', 'DS', 'Adobe XD', 'Plugins', 'Adaptive', 'HTMl & CSS'],
    projectManager: ['Agile', 'Scrum', 'Kanban', 'Notion', 'Jira', 'Trello', 'Asana', 'UX/UI', 'MVP', 'MoSCoW', 'Stand-ups',  'Retrospectives', 'Use cases',  'User stories',  'Google Analytics']
};

const Step3: React.FC<Step3Props> = ({ data, updateFormData }) => {
    const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);
    const [mySkills, setMySkills] = useState<string[]>(data.skills || []);

    useEffect(() => {
        const specialty = data.specialty || 'frontend';

        // Очищаем выбранные скиллы при смене специальности
        if (data.specialty !== data.previousSpecialty) {
            setMySkills([]);
            updateFormData({ skills: [] }); // Очистка скиллов в общем состоянии
        }

        // Фильтрация предложенных скиллов
        const filteredSkills = skillsBySpecialty[specialty].filter(
            (skill) => !mySkills.includes(skill)
        );
        setSuggestedSkills(filteredSkills);
    }, [data.specialty, mySkills]);

    useEffect(() => {
        updateFormData({ skills: mySkills, previousSpecialty: data.specialty });
    }, [mySkills]);

    const handleAddSkill = (skill: string) => {
        setMySkills((prev) => [...prev, skill]);
    };

    const handleRemoveSkill = (skill: string) => {
        setMySkills((prev) => prev.filter((s) => s !== skill));
    };

    return (
        <div className="step-3">
            <h1>Hard скиллы</h1>
            <div className="step-3__skills-container step">
                <div className="my-skills">
                    <h3>Выбранные скиллы</h3>
                    {mySkills.length > 0 ? (
                        <div className="skills-list">
                            {mySkills.map((skill) => (
                                <div key={skill} className="skill-block">
                                    {skill}
                                    <span
                                        className="remove-icon"
                                        onClick={() => handleRemoveSkill(skill)}
                                    >
                                        ✖
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Вы не выбрали ни одного скилла</p>
                    )}
                </div>

                <div className="suggested-skills">
                    <h3>Предложенные скиллы</h3>
                    {suggestedSkills.length > 0 ? (
                        <div className="skills-list">
                            {suggestedSkills.map((skill) => (
                                <div
                                    key={skill}
                                    className="skill-block"
                                    onClick={() => handleAddSkill(skill)}
                                >
                                    {skill}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Вы выбрали все скиллы</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Step3;