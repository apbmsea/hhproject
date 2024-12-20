import React, { useState, useEffect } from 'react';
import '../../styles/componentsStyle/resumeFormStyles/Step5.scss'

interface Step5Props {
    data: {
        phoneNumbers?: string[];
        links?: string[];
    };
    updateFormData: (newData: { phoneNumbers?: string[]; links?: string[] }) => void;
}

const Step5: React.FC<Step5Props> = ({ data, updateFormData }) => {
    const [phoneNumbers, setPhoneNumbers] = useState<string[]>(data.phoneNumbers || []);
    const [links, setLinks] = useState<string[]>(data.links || []);

    useEffect(() => {
        updateFormData({ phoneNumbers, links });
    }, [phoneNumbers, links, updateFormData]);

    const addPhoneNumber = () => {
        setPhoneNumbers([...phoneNumbers, '']);
    };

    const updatePhoneNumber = (index: number, value: string) => {
        const updatedPhones = [...phoneNumbers];
        updatedPhones[index] = value;
        setPhoneNumbers(updatedPhones);
    };

    const removePhoneNumber = (index: number) => {
        const updatedPhones = phoneNumbers.filter((_, i) => i !== index);
        setPhoneNumbers(updatedPhones);
    };

    const addLink = () => {
        setLinks([...links, '']);
    };

    const updateLink = (index: number, value: string) => {
        const updatedLinks = [...links];
        updatedLinks[index] = value;
        setLinks(updatedLinks);
    };

    const removeLink = (index: number) => {
        const updatedLinks = links.filter((_, i) => i !== index);
        setLinks(updatedLinks);
    };

    return (
        <div className="step-5 step">
            <h1 className="h1-state">Контактная информация</h1>
            <h3>Телефоны</h3>
            <button className="add-btn" onClick={addPhoneNumber}>Добавить номер телефона</button>
            {phoneNumbers.map((phone, index) => (
                <div key={index} style={{ display: 'flex', marginBottom: '10px' }}>
                    <input
                        className="contact-list"
                        type="text"
                        placeholder="Введите номер телефона"
                        value={phone}
                        onChange={(e) => updatePhoneNumber(index, e.target.value)}
                    />
                    <button className="delete-btn" onClick={() => removePhoneNumber(index)}>Удалить</button>
                </div>
            ))}
            <h3>Ссылки</h3>
            <button className="add-btn" onClick={addLink}>Добавить ссылку</button>
            {links.map((link, index) => (
                <div key={index} style={{ display: 'flex', marginBottom: '10px' }}>
                    <input
                        className="contact-list"
                        type="text"
                        placeholder="Введите ссылку"
                        value={link}
                        onChange={(e) => updateLink(index, e.target.value)}
                    />
                    <button className="delete-btn" onClick={() => removeLink(index)}>Удалить</button>
                </div>
            ))}
        </div>
    );
};

export default Step5;
