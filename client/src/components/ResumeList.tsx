import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Resume {
    id: number;
    name: string;
    email: string;
    phone: string;
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
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                const data = response.data.map((user: any) => ({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                }));
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
                resume.email.toLowerCase().includes(query) ||
                resume.phone.includes(query)
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
                        <div key={resume.id} className="resume-card">
                            <h3>{resume.name}</h3>
                            <p>Email: {resume.email}</p>
                            <p>Телефон: {resume.phone}</p>
                        </div>
                    ))
                ) : (
                    <p>Нет подходящих резюме.</p>
                )}
            </main>
        </div>
    );
};

export default ResumeList;
