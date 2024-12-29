import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Resume {
    id: number;
    name: string;
    lastname: string;
    years: number;
    email: string;
}


const ResumeList: React.FC = () => {
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [filteredResumes, setFilteredResumes] = useState<Resume[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        const fetchResumes = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get('http://localhost:8080/resumes');
                const data: Resume[] = response.data;
                setResumes(data);
                setFilteredResumes(data);
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
                resume.lastname.toLowerCase().includes(query) ||
                resume.email.toLowerCase().includes(query)
        );
        setFilteredResumes(filtered);
    };

    if (isLoading) return <p>Загрузка...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="resume-list-container">
            <aside className="filters">
                <h2>Фильтры</h2>
                <input
                    type="text"
                    placeholder="Поиск..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </aside>

            <main className="resume-list">
                {filteredResumes.length > 0 ? (
                    filteredResumes.map((resume) => (
                        <Link key={resume.id} to={`/resume/${resume.id}`} className="resume-card">
                            <h3>{resume.name} {resume.lastname}</h3>
                            <p>Возраст: {resume.years}</p>
                            <p>Email: {resume.email}</p>
                            <Link to={`/resume/edit/${resume.id}`} className="edit-link">
                                Редактировать
                            </Link>
                        </Link>


                    ))
                ) : (
                    <p>Нет подходящих резюме.</p>
                )}
            </main>
        </div>
    );
};

export default ResumeList;