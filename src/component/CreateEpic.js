import React, { useState } from 'react';

const CreateEpic = ({ addEpic }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
    e.preventDefault();
    addEpic({ name, description });
    setName('');
    setDescription('');
    };

    return (
    <form onSubmit={handleSubmit}>
        <label>
        Epic Name:
        <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        </label>
        <br />
        <label>
        Epic Description:
        <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />
        </label>
        <br />
        <button type="submit">Create Epic</button>
    </form>
    );
};

export default CreateEpic;
