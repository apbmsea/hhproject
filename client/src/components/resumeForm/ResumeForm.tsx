import React, { useState, useEffect } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import '../../styles/componentsStyle/ResumeForm.scss';

const CreateResume: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<number>(() => {
        try {
            const savedStep = localStorage.getItem('currentStep');
            return savedStep ? Number(savedStep) : 1; // Если шага нет, возвращаем 1
        } catch (error) {
            console.error('Ошибка при чтении currentStep из localStorage:', error);
            return 1; // Возвращаем 1 в случае ошибки
        }
    });

    useEffect(() => {
        console.log('Сохраняем текущий шаг:', currentStep);
        try {
            localStorage.setItem('currentStep', String(currentStep));
        } catch (error) {
            console.error('Ошибка при сохранении текущего шага в localStorage:', error);
        }
    }, [currentStep]);

    const nextStep = () => {
        setCurrentStep((prev) => Math.min(prev + 1, 2)); // Ограничиваем максимум 2
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1)); // Ограничиваем минимум 1
    };

    const handleComplete = () => {
        alert('Резюме успешно создано!');
        // Здесь можно добавить логику завершения
    };

    useEffect(() => {
        console.log('Текущий шаг после загрузки страницы:', currentStep);
    }, [currentStep]);

    return (
        <div>
            {currentStep === 1 && <Step1 onNext={nextStep} />}
            {currentStep === 2 && <Step2 onBack={prevStep} onSubmit={handleComplete} />}
        </div>
    );
};

export default CreateResume;