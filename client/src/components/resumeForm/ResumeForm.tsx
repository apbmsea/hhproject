import React, { useState, useEffect, useCallback } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import ProgressBar from './ProgressBar';
import '../../styles/componentsStyle/ResumeForm.scss';
import { saveToLocalStorage, getFromLocalStorage } from '../../features/resume/localStorageHelper';

const TOTAL_STEPS = 5;

const ResumeForm: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<number>(
        Number(localStorage.getItem('currentStep')) || 1
    );
    const [formData, setFormData] = useState(() => getFromLocalStorage('resumeForm') || {});

    useEffect(() => {
        saveToLocalStorage('resumeForm', formData);
    }, [formData]);

    useEffect(() => {
        localStorage.setItem('currentStep', String(currentStep));
    }, [currentStep]);

    // Используем useCallback для предотвращения создания новой функции
    const updateFormData = useCallback((newData: any) => {
        setFormData((prevData: any) => ({ ...prevData, ...newData }));
    }, []);

    const handleNext = () => {
        if (currentStep < TOTAL_STEPS) setCurrentStep(currentStep + 1);
    };

    const handlePrev = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    return (
        <section className="create-resume">
            <div className="create-resume__form">

                <div className="create-resume__content">
                {currentStep === 1 && <Step1 data={formData} updateFormData={updateFormData}/>}
                {currentStep === 2 && <Step2 data={formData} updateFormData={updateFormData}/>}
                {currentStep === 3 && <Step3 data={formData} updateFormData={updateFormData}/>}
                {currentStep === 4 && <Step4 data={formData} updateFormData={updateFormData}/>}
                {currentStep === 5 && <Step5 data={formData} updateFormData={updateFormData}/>}
                </div>

                <div className="create-resume__functional">
                    <div className="create-resume__buttons">
                        {currentStep > 1 && <button className="prev-button" onClick={handlePrev}>Назад</button>}
                        {currentStep < TOTAL_STEPS ? (
                            <button className="next-button" onClick={handleNext}>Далее</button>
                        ) : (
                            <button onClick={() => alert('Резюме сохранено!')}>Сохранить</button>
                        )}
                    </div>

                    <div className="create-resume__progress-bar">
                        <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS}/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResumeForm;



