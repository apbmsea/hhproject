import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface ResumeDetailsData {
    id: number;
    name: string;
    position: string;
    experience: string;
    education: string;
    skills: string[];
}

const ResumeDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [resume, setResume] = useState<ResumeDetailsData | null>(null);

    useEffect(() => {
        const fetchResumeDetails = async () => {
            const response = await fetch(`/api/resume/${id}`);
            const data = await response.json();
            setResume(data);
        };

        fetchResumeDetails();
    }, [id]);

    if (!resume) return <div>Загрузка...</div>;

    return (
        <div className="resume-details">
            <h2>{resume.name}</h2>
            <p>Позиция: {resume.position}</p>
            <p>Опыт: {resume.experience}</p>
            <p>Образование: {resume.education}</p>
            <h4>Навыки:</h4>
            <ul>
                {resume.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                ))}
            </ul>
        </div>
    );
};

export default ResumeDetails;
