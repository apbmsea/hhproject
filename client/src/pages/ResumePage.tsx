import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filters from '../components/Filters';
import ResumeList from '../components/ResumeList';
import '../styles/componentsStyle/ResumePage.scss';

interface Resume {
    id: number;
    name: string;
    lastname: string;
    birthdate: string;
    specialty: string;
    course: number;
    projects: string[];
    skills: string[];
}

const ResumePage: React.FC = () => {
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [filteredResumes, setFilteredResumes] = useState<Resume[]>([]);
    const [filters, setFilters] = useState({
        specialty: '',
        projects: [] as string[],
        selectedSkills: [] as string[],
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:8000/resumes');
            setResumes(response.data);
            setFilteredResumes(response.data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const applyFilters = () => {
            let filtered = [...resumes];

            if (filters.specialty) {
                filtered = filtered.filter((resume) =>
                    resume.specialty.toLowerCase().includes(filters.specialty.toLowerCase())
                );
            }

            if (filters.projects.length > 0) {
                filtered = filtered.filter((resume) => {
                    return filters.projects.every((selectedProject) => {
                        if (selectedProject === 'college') {
                            return resume.projects.includes('Проекты колледжа');
                        }
                        if (selectedProject === 'personal') {
                            return resume.projects.includes('Личные проекты студентов');
                        }
                        return false;
                    });
                });
            }

            if (filters.selectedSkills.length > 0) {
                filtered = filtered.filter((resume) =>
                    filters.selectedSkills.every((skill) => resume.skills.includes(skill))
                );
            }


            setFilteredResumes(filtered);
        };

        applyFilters();
    }, [filters, resumes]);


    return (
        <div className="resume-page">
            <Filters
                specialties={[...new Set(resumes.map((resume) => resume.specialty))]}
                skills={[...new Set(resumes.flatMap((resume) => resume.skills))]}
                onFilterChange={setFilters}
            />
            <ResumeList resumes={filteredResumes} />
        </div>
    );
};

export default ResumePage;
