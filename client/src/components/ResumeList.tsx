import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Filters from './Filters';

interface Resume {
    id: number;
    name: string;
    email: string;
    skills: string;
    description: string;
    tags: { id: number; name: string }[]; // Если у тегов есть идентификаторы
}

const ResumeList: React.FC = () => {
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [filteredResumes, setFilteredResumes] = useState<Resume[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        const fetchResumes = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get('http://localhost:8000/resumes'); //сылочка
                setResumes(response.data);
                setFilteredResumes(response.data);
            } catch (err) {
                setError('Ошибка при загрузке данных.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchResumes();
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = resumes.filter(
            (resume) =>
                resume.name.toLowerCase().includes(query) ||
                resume.email.toLowerCase().includes(query) ||
                resume.phone.includes(query)
        );
        setFilteredResumes(filtered);
    };

    if (isLoading) return <p>Загрузка...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <div className="resume-list-search">
                <Filters searchQuery={searchQuery} onSearch={handleSearch}/>
            </div>
            <div className="resume-list-container">
                {filteredResumes.length > 0 ? (
                    filteredResumes.map((resume) => (
                            <Link key={resume.id} to={`/resume/${resume.id}`} className="resume-card">
                                <h3>{resume.name}</h3>
                                <p>Email: {resume.email}</p>
                                <p>Навыки: {resume.skills}</p>
                                <p>Описание: {resume.description}</p>
                            </Link>
                        ))

                ) : (
                    <p>Нет подходящих резюме.</p>
                )}
            </div>
        </>
    );
};

export default ResumeList;