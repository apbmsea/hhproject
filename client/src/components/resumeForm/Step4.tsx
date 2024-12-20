import React, { useState, useEffect } from 'react';
import '../../styles/componentsStyle/resumeFormStyles/Step4.scss'

interface Step4Props {
    data: { description?: string };
    updateFormData: (newData: { description: string }) => void;
}

const Step4: React.FC<Step4Props> = ({ data, updateFormData }) => {
    const [description, setDescription] = useState<string>(data.description || '');

    useEffect(() => {
        updateFormData({ description });
    }, [description, updateFormData]);

    return (
        <div className="step">
            <h1>Добавьте описание</h1>
            <textarea
                className="step-4"
                placeholder="Введите описание здесь..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={16}
            />
        </div>
    );
};

export default Step4;
