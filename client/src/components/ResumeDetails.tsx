import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Resume {
    id: number;
    name: string;
    lastname: string;
    years: number;
    email: string;
}

const ResumeDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [resume, setResume] = useState<Resume | null>(null);

    useEffect(() => {
        const fetchResumeDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/resumes/${id}`);
                setResume(response.data);
            } catch {
                setResume(null);
            }
        };

        fetchResumeDetails();
    }, [id]);

    if (!resume) return <div>Загрузка...</div>;

    return (
        <div className="resume-details">
            <h2>{resume.name} {resume.lastname}</h2>
            <p>Возраст: {resume.years}</p>
            <p>Email: {resume.email}</p>
        </div>
    );
};

export default ResumeDetails;