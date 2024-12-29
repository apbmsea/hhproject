import React, { useState } from 'react';
import '../styles/componentsStyle/Filters.scss';

interface FiltersProps {
    specialties: string[];
    skills: string[];
    onFilterChange: (filters: {
        specialty: string;
        projects: string[];
        selectedSkills: string[];
    }) => void;
}

const Filters: React.FC<FiltersProps> = ({ specialties, skills, onFilterChange }) => {
    const [specialty, setSpecialty] = useState<string>('');
    const [projects, setProjects] = useState<string[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

    const handleSpecialtyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSpecialty(value);
        onFilterChange({ specialty: value, projects, selectedSkills });
    };

    const handleProjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const updatedProjects = event.target.checked
            ? [...projects, value]
            : projects.filter((project) => project !== value);

        setProjects(updatedProjects);
        onFilterChange({ specialty, projects: updatedProjects, selectedSkills });
    };

    const handleSkillClick = (skill: string) => {
        const updatedSkills = selectedSkills.includes(skill)
            ? selectedSkills.filter((selectedSkill) => selectedSkill !== skill)
            : [...selectedSkills, skill];

        setSelectedSkills(updatedSkills);
        onFilterChange({ specialty, projects, selectedSkills: updatedSkills });
    };

    return (
        <div className="filters">
            <h2>Фильтры</h2>

            <div className="filters__group">
                <label htmlFor="specialty"><h3>Специализация</h3></label>
                <select
                    id="specialty"
                    value={specialty}
                    onChange={handleSpecialtyChange}
                    className="filters__select"
                >
                    <option value="">Все</option>
                    {specialties.map((spec) => (
                        <option key={spec} value={spec}>
                            {spec}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filters__group">
                <label><h3>Проекты</h3></label>
                <div className="filters__checkboxes">
                    <label>
                        <input
                            type="checkbox"
                            value="college"
                            onChange={handleProjectChange}
                            checked={projects.includes('college')}
                        />
                        Проекты колледжа
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="personal"
                            onChange={handleProjectChange}
                            checked={projects.includes('personal')}
                        />
                        Личные проекты студентов
                    </label>
                </div>
            </div>

            <div className="filters__group">
                <label><h3>Скиллы</h3></label>
                <div className="filters__skills">
                    {skills.map((skill) => (
                        <button
                            key={skill}
                            type="button"
                            className={`filters__skill ${
                                selectedSkills.includes(skill) ? 'filters__skill--active' : ''
                            }`}
                            onClick={() => handleSkillClick(skill)}
                        >
                            {skill}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Filters;

