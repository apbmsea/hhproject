import React, { useState, useEffect } from 'react';
import '../../styles/componentsStyle/resumeFormStyles/Step4.scss'

interface Step4Props {
    data: { description?: string };
    updateFormData: (newData: { description: string }) => void;
}

const Step4: React.FC<Step4Props> = ({ data, updateFormData }) => {
    const [description, setDescription] = useState<string>(data.description || '');

    // Сохраняем при каждом изменении
    useEffect(() => {
        updateFormData({ description });
    }, [description, updateFormData]);

    return (
        <div>
            <h1>Добавьте описание</h1>
            <textarea
                className="step step-4"
                placeholder="Введите описание здесь..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={15}
            />
        </div>
    );
};

export default Step4;
