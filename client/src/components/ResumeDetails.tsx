import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/componentsStyle/ResumeDetails.scss'

interface Resume {
    id: number;
    name: string;
    lastname: string;
    birthdate: string;
    specialty: string;
    course: number;
    projects: string[];
    skills: string[];
    description: string;
    phoneNumbers: string[];
    links: string[];
}

const ResumeDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [resume, setResume] = useState<Resume | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/resumes/${id}`);
                setResume(response.data);
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchResume();
    }, [id]);

    if (isLoading) {
        return <div className="loading">Загрузка...</div>;
    }

    if (!resume) {
        return <div className="not-found">Резюме не найдено</div>;
    }

    return (
        <div className="container">
            <div className="resume-details">
                <h1>{resume.name} {resume.lastname}</h1>
                <p className="highlight">{resume.birthdate} лет</p>
                <p>Специальность: {resume.specialty}</p>
                <p>Курс: {resume.course} курс</p>
                <p>Описание: {resume.description}</p>

                <div className="skills">
                    <h2>Навыки</h2>
                    {resume.skills.map((skill, index) => (
                        <span key={index}>{skill}</span>
                    ))}
                </div>

                <div className="projects">
                    <h2>Проекты</h2>
                    {resume.projects.map((project, index) => (
                        <span key={index}>{project}</span>
                    ))}
                </div>

                <div className="contacts">
                    <h2>Контакты</h2>
                    {resume.phoneNumbers.map((phone, index) => (
                        <p key={index}>{phone}</p>
                    ))}
                    {resume.links.map((link, index) => (
                        <a key={index} href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ResumeDetails;
