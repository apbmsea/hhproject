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

    // Обновляем родительский стейт и localStorage при каждом изменении
    useEffect(() => {
        updateFormData({ phoneNumbers, links });
    }, [phoneNumbers, links, updateFormData]);

    // Добавление нового поля телефона
    const addPhoneNumber = () => {
        setPhoneNumbers([...phoneNumbers, '']);
    };

    // Обновление конкретного номера телефона
    const updatePhoneNumber = (index: number, value: string) => {
        const updatedPhones = [...phoneNumbers];
        updatedPhones[index] = value;
        setPhoneNumbers(updatedPhones);
    };

    // Удаление поля телефона
    const removePhoneNumber = (index: number) => {
        const updatedPhones = phoneNumbers.filter((_, i) => i !== index);
        setPhoneNumbers(updatedPhones);
    };

    // Добавление нового поля ссылки
    const addLink = () => {
        setLinks([...links, '']);
    };

    // Обновление конкретной ссылки
    const updateLink = (index: number, value: string) => {
        const updatedLinks = [...links];
        updatedLinks[index] = value;
        setLinks(updatedLinks);
    };

    // Удаление поля ссылки
    const removeLink = (index: number) => {
        const updatedLinks = links.filter((_, i) => i !== index);
        setLinks(updatedLinks);
    };

    return (
        <div className="step5-container">
            <h1>Контактная информация</h1>

            {/* Поля для телефонов */}
            <h3>Телефоны</h3>
            <button onClick={addPhoneNumber}>Добавить номер телефона</button>
            {phoneNumbers.map((phone, index) => (
                <div key={index} style={{ display: 'flex', marginBottom: '10px' }}>
                    <input
                        type="text"
                        placeholder="Введите номер телефона"
                        value={phone}
                        onChange={(e) => updatePhoneNumber(index, e.target.value)}
                    />
                    <button onClick={() => removePhoneNumber(index)}>Удалить</button>
                </div>
            ))}

            {/* Поля для ссылок */}
            <h3>Ссылки</h3>
            <button onClick={addLink}>Добавить ссылку</button>
            {links.map((link, index) => (
                <div key={index} style={{ display: 'flex', marginBottom: '10px' }}>
                    <input
                        type="text"
                        placeholder="Введите ссылку"
                        value={link}
                        onChange={(e) => updateLink(index, e.target.value)}
                    />
                    <button onClick={() => removeLink(index)}>Удалить</button>
                </div>
            ))}
        </div>
    );
};

export default Step5;
